using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class Inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Marca",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Descricao = table.Column<string>(nullable: true),
                    DataCadastro = table.Column<DateTimeOffset>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Marca", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Produto",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Titulo = table.Column<string>(nullable: true),
                    Descricao = table.Column<string>(nullable: true),
                    EspecificacoesTecnicas = table.Column<string>(nullable: true),
                    Valor = table.Column<double>(nullable: false),
                    CaminhoImagem = table.Column<string>(nullable: true),
                    DataCadastro = table.Column<DateTimeOffset>(nullable: false),
                    Ativo = table.Column<bool>(nullable: true),
                    MarcaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Produto_Marca_MarcaId",
                        column: x => x.MarcaId,
                        principalTable: "Marca",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Marca_Descricao",
                table: "Marca",
                column: "Descricao",
                unique: true,
                filter: "[Descricao] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_Descricao",
                table: "Produto",
                column: "Descricao",
                unique: true,
                filter: "[Descricao] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_MarcaId",
                table: "Produto",
                column: "MarcaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Produto");

            migrationBuilder.DropTable(
                name: "Marca");
        }
    }
}
