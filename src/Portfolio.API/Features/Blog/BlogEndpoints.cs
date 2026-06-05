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
    }
}
