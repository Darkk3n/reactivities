using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
   public class Edit
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
         private readonly IMapper mapper;
         public Handler(DataContext context, IMapper mapper)
         {
            this.context = context;
            this.mapper = mapper;
         }
         public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
         {
            var activity = await context.Activities.FindAsync(request.Activity.Id);
            if (activity == null)
            {
               return null;
            }
            mapper.Map(request.Activity, activity);

            var res = await context.SaveChangesAsync() > 0;
            if (!res)
               return Result<Unit>.Failure("Failed to edit activity");
            return Result<Unit>.Success(Unit.Value);
         }
      }
   }
}