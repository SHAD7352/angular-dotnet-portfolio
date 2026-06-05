using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Features.Skills;

public static class SkillEndpoints
{
    public static void MapSkillEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("/api/skills").WithTags("Skills");

        group.MapGet("/", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetAllSkillsQuery());
            return Results.Ok(result);
        }).AllowAnonymous();

        group.MapGet("/category/{category}", async (IMediator mediator, string category) =>
        {
            var result = await mediator.Send(new GetSkillsByCategoryQuery { Category = category });
            return Results.Ok(result);
        }).AllowAnonymous();
    }
}
