using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Features.Experience;

public static class ExperienceEndpoints
{
    public static void MapExperienceEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("/api/experiences").WithTags("Experience");

        group.MapGet("/", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetAllExperiencesQuery());
            return Results.Ok(result);
        }).AllowAnonymous();
    }
}
