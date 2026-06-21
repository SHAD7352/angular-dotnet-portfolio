using System.Text.Json.Serialization;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Blog;

public class UpdateBlogPostCommand : IRequest<ApiResponse<BlogPost>>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string CoverImage { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; }
    
    [JsonPropertyName("readingTime")]
    public int ReadingTimeMinutes { get; set; }
    
    [JsonPropertyName("published")]
    public bool IsPublished { get; set; }
    public List<string> Tags { get; set; } = new();
}

public class UpdateBlogPostHandler : IRequestHandler<UpdateBlogPostCommand, ApiResponse<BlogPost>>
{
    private readonly PortfolioDbContext _context;

    public UpdateBlogPostHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<BlogPost>> Handle(UpdateBlogPostCommand request, CancellationToken cancellationToken)
    {
        var post = await _context.BlogPosts
            .Include(p => p.Tags)
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (post == null)
            return ApiResponse<BlogPost>.Fail("Blog post not found.");

        post.Title = request.Title;
        post.Slug = request.Slug;
        post.Excerpt = request.Excerpt;
        post.Content = request.Content;
        post.CoverImage = request.CoverImage;
        post.Author = request.Author;
        post.PublishedAt = request.PublishedAt;
        post.ReadingTimeMinutes = request.ReadingTimeMinutes;
        post.IsPublished = request.IsPublished;

        // Remove existing tags
        _context.Set<BlogPostTag>().RemoveRange(post.Tags);
        post.Tags.Clear();

        // Create new tags
        var newTags = request.Tags.Select(t => new BlogPostTag
        {
            Tag = t,
            BlogPostId = post.Id
        }).ToList();

        foreach (var tag in newTags)
        {
            _context.Entry(tag).State = EntityState.Added;
            post.Tags.Add(tag);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<BlogPost>.Ok(post);
    }
}
