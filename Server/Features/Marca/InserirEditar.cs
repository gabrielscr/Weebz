namespace Server.Features.Marca
{
    using FluentValidation;
    using MediatR;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Domain.Admin;
    using Server.Infra;
    using System.Threading;
    using Microsoft.EntityFrameworkCore;
    using Tempus.Utils;
    using System.IO;
    using Server.Infra.FileService;

    public class InserirEditar
    {
        public class Query : IRequest<Command>
        {
            public int Id { get; set; }
        }

        public class Command : IRequest<int>
        {
            public int? Id { get; set; }

            public string Descricao { get; set; }
        }

        public class Validation : AbstractValidator<Marca>
        {
            readonly AdminContext _adminContext;

            public Validation(AdminContext adminContext)
            {
                _adminContext = adminContext;

                Build();
            }

            private void Build()
            {
                RuleFor(p => p.Descricao)
                    .MustAsync(UniqueName)
                    .WithMessage("Marca já registrada");
            }

            private async Task<bool> UniqueName(Marca Marca, string Name, CancellationToken cancellationToken)
            {
                return !await _adminContext
                    .Set<Marca>()
                    .AsNoTracking()
                    .AnyAsync(p => p.Descricao == Marca.Descricao && p.Id != Marca.Id);
            }
        }

        public class QueryHandler : IRequestHandler<Query, Command>
        {
            readonly AdminContext _adminContext;

            public QueryHandler(AdminContext adminContext)
            {
                _adminContext = adminContext;
            }

            public async Task<Command> Handle(Query request, CancellationToken cancellationToken)
            {
                var command = await _adminContext
                    .Set<Marca>()
                    .AsNoTracking()
                    .Select(a => new Command
                    {
                        Id = a.Id,
                        Descricao = a.Descricao
                    })
                    .FirstOrDefaultAsync(p => p.Id == request.Id);

                ChecarSe.Encontrou(command);

                return command;
            }
        }

        public class CommandHandler : IRequestHandler<Command, int>
        {
            readonly AdminContext _adminContext;
            readonly Validation _validation;
            private readonly IFileService _fileService;

            public CommandHandler(AdminContext adminContext, Validation validation, IFileService fileService)
            {
                _adminContext = adminContext;
                _validation = validation;
                _fileService = fileService;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var model = await _adminContext
                    .Set<Marca>()
                    .FindAsync(request.Id);

                if (model == null)
                {
                    model = new Marca();

                    await _adminContext.AddAsync(model);
                }

                model.Id = request.Id.Value;
                model.Descricao = request.Descricao;
                model.DataCadastro = DateTimeOffset.Now;

                await _validation.ValidateAndThrowAsync(model);

                await _adminContext.SaveChangesAsync();

                return model.Id;
            }
        }
    }
}
