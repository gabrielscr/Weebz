using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Features.Domain.Admin
{
    public class Produto
    {
        public int Id { get; set; }

        public string Descricao { get; set; }

        public double Valor { get; set; }

        public string CaminhoImagem { get; set; }

        public DateTimeOffset DataCadastro { get; set; }


    }
}
