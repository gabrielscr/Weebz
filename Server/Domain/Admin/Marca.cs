using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Features.Domain.Admin
{
    public class Marca
    {
        public int Id { get; set; }

        public string Descricao { get; set; }

        public DateTimeOffset DataCadastro { get; set; }
    }
}
