using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Features.Contact;

public static class ContactEndpoints
{
    public static void MapContactEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("/api/contact").WithTags("Contact");

        group.MapPost("/", async (IMediator mediator, [FromBody] SubmitMessageCommand command) =>
        {
            var result = await mediator.Send(command);
            return Results.Ok(result);
        }).AllowAnonymous();
    }
}
