﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Server.Infra;
using Server.Infra.FileService;
using Tempus.Utils.AspNetCore;

namespace Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddTransient<IFileService, LocalFileService>();

            services
    .AddMvc(opt =>
    {
        opt.Filters.Add(typeof(JsonApiValidationActionFilter));
    })
    .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
    .AddFeatureFolders();

            services.AddDbContext<AdminContext>(options =>
                 options.UseSqlServer(Configuration.GetConnectionString("ServerConnection"), opt => opt.EnableRetryOnFailure()));

            services.AddCors(opts =>
            {
                opts.AddPolicy("Development", o =>
                {
                    o.WithOrigins("http://localhost:3333").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials();
                    o.WithOrigins("http://localhost:3334").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials();
                    o.WithOrigins("http://localhost:3335").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials();
                    o.WithOrigins("http://localhost:8080").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials();
                });
            });

            services.AddMediatR();

            RegisterValidators(services);
        }

        private void RegisterValidators(IServiceCollection services)
        {
            var assembly = typeof(Startup).GetTypeInfo().Assembly;
            var validatorType = typeof(IValidator);

            var validators = assembly
                .GetExportedTypes()
                .Where(t => validatorType.IsAssignableFrom(t) && !t.IsInterface);

            foreach (var validator in validators)
            {
                services.AddTransient(validator);

                var validatorInterfaces = validator
                    .GetInterfaces()
                    .Where(t => t.IsGenericType && t.GetGenericTypeDefinition() == typeof(IValidator<>));

                foreach (var validatorInterface in validatorInterfaces)
                {
                    services.AddTransient(validatorInterface, validator);
                }
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseCors("Development");
            }
            else
            {
                app.UseCors("Production");
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            if (env.IsProduction())
            {
                app.UseDefaultFiles();

                app.UseStaticFiles();
            }

            app.UseMvc(opts =>
            {
                opts.MapRoute(
                    name: "default",
                    template: "api/{controller}/{action}/{id?}");
            });

            if (env.IsDevelopment())
            {
                app.UseWelcomePage();
            }
        }
    }
}
