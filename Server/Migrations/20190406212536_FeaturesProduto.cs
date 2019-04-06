using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class FeaturesProduto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Ativo",
                table: "Produto",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EspecificacoesTecnicas",
                table: "Produto",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Titulo",
                table: "Produto",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ativo",
                table: "Produto");

            migrationBuilder.DropColumn(
                name: "EspecificacoesTecnicas",
                table: "Produto");

            migrationBuilder.DropColumn(
                name: "Titulo",
                table: "Produto");
        }
    }
}
