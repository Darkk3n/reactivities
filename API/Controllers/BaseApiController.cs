using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   [ApiController]
   [Route("[controller]")]
   public class BaseApiController : ControllerBase
   {
      private readonly IMediator mediator;
      protected IMediator Mediator => mediator ?? HttpContext.RequestServices.GetService<IMediator>();

      protected ActionResult HandleResult<T>(Result<T> res)
      {
         if (res == null)
         {
            return NotFound();
         }
         if (res.IsSuccess && res.Value != null)
         {
            return Ok(res.Value);
         }
         if (res.IsSuccess && res.Value == null)
         {
            return NotFound();
         }
         return BadRequest(res.Error);
      }
   }
}