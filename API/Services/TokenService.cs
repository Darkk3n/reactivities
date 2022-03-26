using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;

using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
   public class TokenService
   {
      private readonly IConfiguration config;

      public TokenService(IConfiguration config)
      {
         this.config = config;
      }
      public string CreateToken(AppUser appUser)
      {
         var claims = new List<Claim>
         {
            new Claim(ClaimTypes.Name, appUser.UserName),
            new Claim(ClaimTypes.NameIdentifier, appUser.Id),
            new Claim(ClaimTypes.Name, appUser.UserName)
         };

         var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
         var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

         var tokenDescriptor = new SecurityTokenDescriptor
         {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(180),
            SigningCredentials = creds
         };

         var tokenHandler = new JwtSecurityTokenHandler();

         var token = tokenHandler.CreateToken(tokenDescriptor);

         return tokenHandler.WriteToken(token);
      }
   }
}