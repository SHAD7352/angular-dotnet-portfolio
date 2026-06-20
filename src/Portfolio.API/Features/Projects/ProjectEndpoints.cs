using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Features.Projects;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("/api/projects").WithTags("Projects");

        group.MapGet("/", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetAllProjectsQuery());
            return Results.Ok(result);
        }).AllowAnonymous();

        group.MapGet("/featured", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetFeaturedProjectsQuery());
            return Results.Ok(result);
        }).AllowAnonymous();

        group.MapPost("/", async ([FromBody] CreateProjectCommand command, IMediator mediator) =>
        {
            var result = await mediator.Send(command);
            return Results.Ok(result);
        }).RequireAuthorization();

        group.MapPut("/{id:guid}", async (Guid id, [FromBody] UpdateProjectCommand command, IMediator mediator) =>
        {
            command.Id = id;
            var result = await mediator.Send(command);
            return Results.Ok(result);
        }).RequireAuthorization();

        group.MapDelete("/{id:guid}", async (Guid id, IMediator mediator) =>
        {
            var result = await mediator.Send(new DeleteProjectCommand { Id = id });
            return Results.Ok(result);
        }).RequireAuthorization();
    }
}
