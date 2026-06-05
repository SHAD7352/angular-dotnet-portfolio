namespace Portfolio.Api.Data.Entities;

public class BlogPost : AuditableEntity
{
    public string Title { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string Excerpt { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string CoverImage { get; set; } = null!;
    public string Author { get; set; } = null!;
    public DateTime PublishedAt { get; set; }
    public int ReadingTimeMinutes { get; set; }
    public bool IsPublished { get; set; }

    public ICollection<BlogPostTag> Tags { get; set; } = new List<BlogPostTag>();
}

public class BlogPostTag : BaseEntity
{
    public Guid BlogPostId { get; set; }
    public BlogPost BlogPost { get; set; } = null!;
    public string Tag { get; set; } = null!;
}
