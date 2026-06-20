using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Dashboard;

public class GetContactMessagesQuery : IRequest<ApiResponse<List<ContactMessage>>>
{
    public int? Limit { get; set; }
}

public class GetContactMessagesHandler : IRequestHandler<GetContactMessagesQuery, ApiResponse<List<ContactMessage>>>
{
    private readonly PortfolioDbContext _context;

    public GetContactMessagesHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<ContactMessage>>> Handle(GetContactMessagesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.ContactMessages
            .OrderByDescending(m => m.CreatedAt)
            .AsQueryable();

        if (request.Limit.HasValue)
        {
            query = query.Take(request.Limit.Value);
        }

        var messages = await query.ToListAsync(cancellationToken);
        return ApiResponse<List<ContactMessage>>.Ok(messages);
    }
}
