using Microsoft.EntityFrameworkCore;
using Server.Features.Domain.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Infra
{
    public class AdminContext : DbContext
    {
        public AdminContext(DbContextOptions<AdminContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Produto>(opts =>
            {
                opts.Property(p => p.Id).ValueGeneratedNever();

                opts.HasIndex(p => p.Descricao).IsUnique();
            });

            modelBuilder.Entity<Marca>(opts =>
            {
                opts.Property(p => p.Id).ValueGeneratedNever();

                opts.HasIndex(p => p.Descricao).IsUnique();
            });
        }
    }
}
