using System.Net;
using System.Text.Json;
using Portfolio.Api.Common.Models;

namespace Portfolio.Api.Common.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = new ApiResponse<object>
        {
            Success = false
        };

        switch (exception)
        {
            case Exceptions.ValidationException validationException:
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                response.Message = "Validation failed";
                response.Errors = validationException.Errors.SelectMany(kvp => kvp.Value.Select(v => $"{kvp.Key}: {v}")).ToList();
                break;
            case Exceptions.NotFoundException notFoundException:
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                response.Message = notFoundException.Message;
                break;
            case Exceptions.AppException appException:
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                response.Message = appException.Message;
                break;
            default:
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Message = "An unexpected error occurred.";
                break;
        }

        var result = JsonSerializer.Serialize(response, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        return context.Response.WriteAsync(result);
    }
}
