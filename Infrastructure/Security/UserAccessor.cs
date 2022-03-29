using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
   public class UserAccessor : IUserAccessor
   {
      private readonly IHttpContextAccessor httpContext;

      public UserAccessor(IHttpContextAccessor httpContext)
      {
         this.httpContext = httpContext;

      }
      public string GetUsername()
      {
         return httpContext.HttpContext.User.FindFirstValue(ClaimTypes.Name);
      }
   }
}