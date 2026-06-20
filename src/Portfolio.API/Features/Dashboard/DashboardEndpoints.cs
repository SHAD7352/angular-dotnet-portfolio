using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Features.Dashboard;

public static class DashboardEndpoints
{
    public static void MapDashboardEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("/api/dashboard").WithTags("Dashboard");

        group.MapGet("/stats", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetDashboardStatsQuery());
            return Results.Ok(result);
        }).AllowAnonymous();

        group.MapGet("/messages", async (IMediator mediator, [FromQuery] int? limit) =>
        {
            var result = await mediator.Send(new GetContactMessagesQuery { Limit = limit });
            return Results.Ok(result);
        }).AllowAnonymous();

        group.MapPut("/messages/{id:guid}/read", async (Guid id, IMediator mediator) =>
        {
            var result = await mediator.Send(new MarkMessageAsReadCommand { Id = id });
            return Results.Ok(result);
        }).AllowAnonymous();
    }
}
