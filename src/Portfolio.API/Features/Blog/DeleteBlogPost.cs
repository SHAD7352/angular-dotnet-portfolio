using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;

namespace Portfolio.Api.Features.Blog;

public class DeleteBlogPostCommand : IRequest<ApiResponse<bool>>
{
    public Guid Id { get; set; }
}

public class DeleteBlogPostHandler : IRequestHandler<DeleteBlogPostCommand, ApiResponse<bool>>
{
    private readonly PortfolioDbContext _context;

    public DeleteBlogPostHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<bool>> Handle(DeleteBlogPostCommand request, CancellationToken cancellationToken)
    {
        var post = await _context.BlogPosts.FindAsync(new object[] { request.Id }, cancellationToken);

        if (post == null)
            return ApiResponse<bool>.Fail("Blog post not found.");

        _context.BlogPosts.Remove(post);
        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<bool>.Ok(true);
    }
}
