namespace Server.Features.Marca
{
    using Domain.Admin;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Server.Infra;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Tempus.Utils;

    public class Excluir
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class CommandHandler : AsyncRequestHandler<Command>
        {
            private readonly AdminContext _adminContext;

            public CommandHandler(AdminContext adminContext)
            {
                _adminContext = adminContext;
            }

            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _adminContext
                    .Set<Marca>()
                    .FirstOrDefaultAsync(p => p.Id == request.Id);

                ChecarSe.Encontrou(product);

                _adminContext.Remove(product);

                await _adminContext.SaveChangesAsync();
            }
        }
    }
}