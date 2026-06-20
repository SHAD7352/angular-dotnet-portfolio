using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;

namespace Portfolio.Api.Features.Dashboard;

public class MarkMessageAsReadCommand : IRequest<ApiResponse<bool>>
{
    public Guid Id { get; set; }
}

public class MarkMessageAsReadHandler : IRequestHandler<MarkMessageAsReadCommand, ApiResponse<bool>>
{
    private readonly PortfolioDbContext _context;

    public MarkMessageAsReadHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<bool>> Handle(MarkMessageAsReadCommand request, CancellationToken cancellationToken)
    {
        var message = await _context.ContactMessages.FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);
        if (message == null)
        {
            return ApiResponse<bool>.Fail("Contact message not found.");
        }

        message.IsRead = true;
        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<bool>.Ok(true, "Message marked as read.");
    }
}
