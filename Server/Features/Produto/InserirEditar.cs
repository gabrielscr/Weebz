namespace Server.Features.Produto
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
    using Server.Domain.Admin;

    public class InserirEditar
    {
        public class Query : IRequest<Command>
        {
            public int Id { get; set; }
        }

        public class Command : IRequest<int>
        {
            public int? Id { get; set; }

            public string Titulo { get; set; }

            public string Descricao { get; set; }

            public string EspecificacoesTecnicas { get; set; }

            public double Valor { get; set; }

            public string CaminhoImagem { get; set; }

            public string NomeImagem { get; set; }

            public bool? Ativo { get; set; }

            public MarcaDto[] Marcas { get; set; }
        }

        public class MarcaDto
        {
            public int Id { get; set; }

            public int MarcaId { get; set; }

            public string Descricao { get; set; }
        }

        public class Validation : AbstractValidator<Produto>
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
                    .WithMessage("Name already registered");
            }

            private async Task<bool> UniqueName(Produto Product, string Name, CancellationToken cancellationToken)
            {
                return !await _adminContext
                    .Set<Produto>()
                    .AsNoTracking()
                    .AnyAsync(p => p.Descricao == Product.Descricao && p.Id != Product.Id);
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
                    .Set<Produto>()
                    .AsNoTracking()
                    .Select(a => new Command
                    {
                        Id = a.Id,
                        Descricao = a.Descricao,
                        Valor = a.Valor,
                        Ativo = a.Ativo,
                        EspecificacoesTecnicas = a.EspecificacoesTecnicas,
                        Titulo = a.Titulo,
                        CaminhoImagem = a.CaminhoImagem,
                        Marcas = a.Marcas
                        .OrderBy(s => s.Descricao)
                        .Select(s => new MarcaDto {
                            Id = s.Id,
                            MarcaId = s.MarcaId,
                            Descricao = s.Descricao
                        }).ToArray()
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
                    .Set<Produto>()
                    .Include(p => p.Marcas)
                    .FirstOrDefaultAsync(p => p.Id == request.Id);

                if (model == null)
                {
                    model = new Produto();

                    await _adminContext.AddAsync(model);
                }

                await Map(request, model);

                await _validation.ValidateAndThrowAsync(model);

                await _adminContext.SaveChangesAsync();

                return model.Id;
            }

            private async Task Map(Command request, Produto model)
            {
                model.Id = request.Id.Value;
                model.Descricao = request.Descricao;
                model.Valor = request.Valor;
                model.Titulo = request.Titulo;
                model.EspecificacoesTecnicas = request.EspecificacoesTecnicas;
                model.Ativo = request.Ativo;
                model.DataCadastro = DateTimeOffset.Now;

                MapMarcas(request, model);

                await MapImage(request, model);
            }

            private async Task MapImage(Command request, Produto model)
            {
                if (!string.IsNullOrEmpty(request.NomeImagem)
                    && !string.IsNullOrEmpty(request.CaminhoImagem)
                    && !string.IsNullOrEmpty(model.CaminhoImagem))
                    await _fileService.Remove(model.CaminhoImagem);

                if (!string.IsNullOrEmpty(request.CaminhoImagem) && !string.IsNullOrEmpty(request.NomeImagem))
                    model.CaminhoImagem = await _fileService.Save(request.CaminhoImagem, Path.Combine(Constants.PastaAnexos.Produtos, request.NomeImagem));
            }

            private void MapMarcas(Command request, Produto model)
            {
                if (model.Marcas == null)
                    model.Marcas = new List<ProdutoMarcas>();

                if (request.Marcas == null)
                    request.Marcas = new MarcaDto[] { };

                // Removes duplicates
                request.Marcas = request.Marcas
                    .Where(p => !string.IsNullOrWhiteSpace(p.Descricao) || p.MarcaId < 0)
                    .GroupBy(p => p.Descricao.Trim().ToUpper())
                    .Select(p => p.First())
                    .ToArray();

            }
        }
    }
}
