using System.Text.Json.Serialization;
using MediatR;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Blog;

public class CreateBlogPostCommand : IRequest<ApiResponse<BlogPost>>
{
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

public class CreateBlogPostHandler : IRequestHandler<CreateBlogPostCommand, ApiResponse<BlogPost>>
{
    private readonly PortfolioDbContext _context;

    public CreateBlogPostHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<BlogPost>> Handle(CreateBlogPostCommand request, CancellationToken cancellationToken)
    {
        var post = new BlogPost
        {
            Title = request.Title,
            Slug = request.Slug,
            Excerpt = request.Excerpt,
            Content = request.Content,
            CoverImage = request.CoverImage,
            Author = request.Author,
            PublishedAt = request.PublishedAt,
            ReadingTimeMinutes = request.ReadingTimeMinutes,
            IsPublished = request.IsPublished,
            Tags = request.Tags.Select(t => new BlogPostTag { Tag = t }).ToList()
        };

        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<BlogPost>.Ok(post);
    }
}
