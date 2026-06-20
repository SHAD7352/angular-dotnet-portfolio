using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;

namespace Portfolio.Api.Features.Dashboard;

public class GetDashboardStatsQuery : IRequest<ApiResponse<DashboardStatsDto>>
{
}

public class DashboardStatsDto
{
    public int ProjectsCount { get; set; }
    public int BlogPostsCount { get; set; }
    public int UnreadMessagesCount { get; set; }
    public int TotalMessagesCount { get; set; }
    public int PageViewsCount { get; set; }
}

public class GetDashboardStatsHandler : IRequestHandler<GetDashboardStatsQuery, ApiResponse<DashboardStatsDto>>
{
    private readonly PortfolioDbContext _context;

    public GetDashboardStatsHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<DashboardStatsDto>> Handle(GetDashboardStatsQuery request, CancellationToken cancellationToken)
    {
        var projectsCount = await _context.Projects.CountAsync(cancellationToken);
        var blogPostsCount = await _context.BlogPosts.CountAsync(cancellationToken);
        var totalMessagesCount = await _context.ContactMessages.CountAsync(cancellationToken);
        var unreadMessagesCount = await _context.ContactMessages.CountAsync(m => !m.IsRead, cancellationToken);
        
        // Return 2400 page views as a realistic simulated stat for a portfolio dashboard
        var pageViewsCount = 2432; 

        var stats = new DashboardStatsDto
        {
            ProjectsCount = projectsCount,
            BlogPostsCount = blogPostsCount,
            TotalMessagesCount = totalMessagesCount,
            UnreadMessagesCount = unreadMessagesCount,
            PageViewsCount = pageViewsCount
        };

        return ApiResponse<DashboardStatsDto>.Ok(stats);
    }
}
