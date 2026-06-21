using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Features.Blog;

public static class BlogEndpoints
{
    public static void MapBlogEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("/api/blog/posts").WithTags("Blog");

        group.MapGet("/", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetAllPostsQuery());
            return Results.Ok(result);
        }).AllowAnonymous();

        group.MapPost("/", async (CreateBlogPostCommand command, IMediator mediator) =>
        {
            var result = await mediator.Send(command);
            return Results.Ok(result);
        }).RequireAuthorization();

        group.MapPut("/{id:guid}", async (Guid id, UpdateBlogPostCommand command, IMediator mediator) =>
        {
            command.Id = id;
            var result = await mediator.Send(command);
            return Results.Ok(result);
        }).RequireAuthorization();

        group.MapDelete("/{id:guid}", async (Guid id, IMediator mediator) =>
        {
            var result = await mediator.Send(new DeleteBlogPostCommand { Id = id });
            return Results.Ok(result);
        }).RequireAuthorization();
    }
}
