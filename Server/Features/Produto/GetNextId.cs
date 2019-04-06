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

    public class GetNextId
    {
        public class Query : IRequest<int>
        {
        }


        public class QueryHandler : IRequestHandler<Query, int>
        {
            readonly AdminContext _adminContext;

            public QueryHandler(AdminContext adminContext)
            {
                _adminContext = adminContext;
            }

            public async Task<int> Handle(Query request, CancellationToken cancellationToken)
            {
                var hasItens = await _adminContext
                    .Set<Produto>()
                    .AnyAsync();

                if (!hasItens)
                    return 1;

                return await _adminContext
                    .Set<Produto>()
                    .AsNoTracking()
                    .MaxAsync(p => p.Id) + 1;
            }
        }
    }
}
