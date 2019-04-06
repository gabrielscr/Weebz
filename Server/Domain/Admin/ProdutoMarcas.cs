using Server.Features.Domain.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Domain.Admin
{
    public class ProdutoMarcas
    {
        public int Id { get; set; }

        public int ProdutoId { get; set; }

        public int MarcaId { get; set; }

        public Marca Marca { get; set; }

        public string Descricao { get; set; }
    }
}
