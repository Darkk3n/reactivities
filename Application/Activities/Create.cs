using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
   public class Create
   {
      public class Command : IRequest<Result<Unit>>
      {
         public Activity Activity { get; set; }
      }

      public class CommandValidator : AbstractValidator<Command>
      {
         public CommandValidator()
         {
            RuleFor(a => a.Activity).SetValidator(new ActivityValidator());
         }
      }

      public class Handler : IRequestHandler<Command, Result<Unit>>
      {
         private readonly DataContext context;
         private readonly IUserAccessor userAccessor;
         public Handler(DataContext context, IUserAccessor userAccessor)
         {
            this.userAccessor = userAccessor;
            this.context = context;
         }

         public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
         {
            var user = await context
            .Users
            .FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUsername());
            var atteendee = new ActivityAttendee
            {
               AppUser = user,
               Activity = request.Activity,
               IsHost = true
            };
            request.Activity.Attendees.Add(atteendee);

            context.Activities.Add(request.Activity);
            var res = await context.SaveChangesAsync() > 0;
            if (!res) return Result<Unit>.Failure("Failed to create activity");
            return Result<Unit>.Success(Unit.Value);
         }
      }
   }
}