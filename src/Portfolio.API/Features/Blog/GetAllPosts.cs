using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Blog;

public class GetAllPostsQuery : IRequest<ApiResponse<List<BlogPost>>>
{
}

public class GetAllPostsHandler : IRequestHandler<GetAllPostsQuery, ApiResponse<List<BlogPost>>>
{
    private readonly PortfolioDbContext _context;

    public GetAllPostsHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<BlogPost>>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
    {
        var posts = await _context.BlogPosts
            .Include(p => p.Tags)
            .Where(p => p.IsPublished)
            .OrderByDescending(p => p.PublishedAt)
            .ToListAsync(cancellationToken);

        return ApiResponse<List<BlogPost>>.Ok(posts);
    }
}
