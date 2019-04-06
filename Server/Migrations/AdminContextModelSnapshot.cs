﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Infra;

namespace Server.Migrations
{
    [DbContext(typeof(AdminContext))]
    partial class AdminContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Server.Domain.Admin.ProdutoMarcas", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Descricao");

                    b.Property<int>("MarcaId");

                    b.Property<int>("ProdutoId");

                    b.HasKey("Id");

                    b.HasIndex("MarcaId");

                    b.HasIndex("ProdutoId");

                    b.ToTable("ProdutoMarcas");
                });

            modelBuilder.Entity("Server.Features.Domain.Admin.Marca", b =>
                {
                    b.Property<int>("Id");

                    b.Property<DateTimeOffset>("DataCadastro");

                    b.Property<string>("Descricao");

                    b.HasKey("Id");

                    b.HasIndex("Descricao")
                        .IsUnique()
                        .HasFilter("[Descricao] IS NOT NULL");

                    b.ToTable("Marca");
                });

            modelBuilder.Entity("Server.Features.Domain.Admin.Produto", b =>
                {
                    b.Property<int>("Id");

                    b.Property<bool?>("Ativo");

                    b.Property<string>("CaminhoImagem");

                    b.Property<DateTimeOffset>("DataCadastro");

                    b.Property<string>("Descricao");

                    b.Property<string>("EspecificacoesTecnicas");

                    b.Property<string>("Titulo");

                    b.Property<double>("Valor");

                    b.HasKey("Id");

                    b.HasIndex("Descricao")
                        .IsUnique()
                        .HasFilter("[Descricao] IS NOT NULL");

                    b.ToTable("Produto");
                });

            modelBuilder.Entity("Server.Domain.Admin.ProdutoMarcas", b =>
                {
                    b.HasOne("Server.Features.Domain.Admin.Marca", "Marca")
                        .WithMany()
                        .HasForeignKey("MarcaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Server.Features.Domain.Admin.Produto")
                        .WithMany("Marcas")
                        .HasForeignKey("ProdutoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}