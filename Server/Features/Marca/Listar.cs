namespace Server.Features.Marca
{
    using Domain.Admin;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Server.Infra;
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    public class Listar
    {
        public class Query : IRequest<Dto>
        {

        }

        public class Dto
        {
            public MarcaDto[] Marcas { get; set; }
        }

        public class MarcaDto
        {
            public int Id { get; set; }

            public string Descricao { get; set; }
        }

        public class QueryHandler : IRequestHandler<Query, Dto>
        {
            private readonly AdminContext _adminContext;

            public QueryHandler(AdminContext adminContext)
            {
                _adminContext = adminContext;
            }

            public async Task<Dto> Handle(Query request, CancellationToken cancellationToken)
            {
                var data = await _adminContext
                    .Set<Marca>()
                    .AsNoTracking()
                    .Select(a => new MarcaDto
                    {
                        Id = a.Id,
                        Descricao = a.Descricao
                    })
                    .OrderBy(a => a.Descricao)
                    .ToArrayAsync();

                return new Dto
                {
                    Marcas = data
                };
            }
        }
    }
}