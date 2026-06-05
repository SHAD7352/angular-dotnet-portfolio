using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Features.PersonalInfo;

public static class PersonalInfoEndpoints
{
    public static void MapPersonalInfoEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("/api/personal-info").WithTags("PersonalInfo");

        group.MapGet("/", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetPersonalInfoQuery());
            return Results.Ok(result);
        }).AllowAnonymous();
    }
}
