using System.Security.Claims;
using API.Dtos;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   [AllowAnonymous]
   [ApiController]
   [Route("api/[controller]")]
   public class AccountController : ControllerBase
   {
      private readonly UserManager<AppUser> userManager;
      private readonly SignInManager<AppUser> signInManager;
      private readonly TokenService tokenService;

      public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
      {
         this.tokenService = tokenService;
         this.userManager = userManager;
         this.signInManager = signInManager;
      }

      [HttpPost(nameof(Login))]
      public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
      {
         var user = await userManager.FindByEmailAsync(loginDto.Email);
         if (user == null)
            return Unauthorized();
         var res = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
         if (res.Succeeded)
         {
            return CreateUserObject(user);
         }
         return Unauthorized();
      }

      [HttpPost(nameof(Register))]
      public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
      {
         if (await userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
         {
            ModelState.AddModelError("email", "Email taken");
            return ValidationProblem();
         }
         if (await userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
         {
            ModelState.AddModelError("username", "UserName taken");
            return ValidationProblem();
         }
         var user = new AppUser
         {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.UserName
         };
         var result = await userManager.CreateAsync(user, registerDto.Password);
         if (result.Succeeded)
         {
            return CreateUserObject(user);
         }
         return BadRequest("A problem happened during registration");
      }

      [Authorize]
      [HttpGet]
      public async Task<ActionResult<UserDto>> GetCurrentUser()
      {
         var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
         return CreateUserObject(user);
      }

      private UserDto CreateUserObject(AppUser user)
      {
         return new UserDto
         {
            DisplayName = user.DisplayName,
            Image = null,
            Token = tokenService.CreateToken(user),
            UserName = user.UserName
         };
      }
   }
}