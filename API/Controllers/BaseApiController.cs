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

      public BaseApiController()
      {

      }
   }
}