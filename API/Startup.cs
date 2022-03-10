using API.Extensions;
using API.Middleware;
using Application.Activities;
using FluentValidation.AspNetCore;

namespace API
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
         services.AddApplicationServices(Configuration);
         services.AddControllers().AddFluentValidation(config =>
         {
            config.RegisterValidatorsFromAssemblyContaining<Create>();
         });
      }

      // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
      public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
      {
         app.UseMiddleware<ExceptionMiddleware>();

         if (env.IsDevelopment())
         {
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
         }

         // app.UseHttpsRedirection();

         app.UseCors();
         app.UseRouting();

         app.UseAuthorization();

         app.UseEndpoints(endpoints =>
         {
            endpoints.MapControllers();
         });
      }
   }
}