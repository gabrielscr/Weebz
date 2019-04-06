using Server.Domain.Admin;
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

        public string Titulo { get; set; }

        public string Descricao { get; set; }

        public string EspecificacoesTecnicas { get; set; }

        public double Valor { get; set; }

        public string CaminhoImagem { get; set; }

        public DateTimeOffset DataCadastro { get; set; }

        public bool? Ativo { get; set; }

        public List<ProdutoMarcas> Marcas { get; set; }
    }
}
