using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Features.Auth;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("/api/auth").WithTags("Auth");

        group.MapPost("/login", async (IMediator mediator, [FromBody] LoginRequest request) =>
        {
            var result = await mediator.Send(request);
            return Results.Ok(result);
        }).AllowAnonymous();

        group.MapPost("/refresh", async (IMediator mediator, [FromBody] RefreshTokenRequest request) =>
        {
            var result = await mediator.Send(request);
            return Results.Ok(result);
        }).AllowAnonymous();
    }
}
