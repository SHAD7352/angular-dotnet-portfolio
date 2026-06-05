namespace Portfolio.Api.Data.Entities;

public class Project : AuditableEntity
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Image { get; set; } = null!;
    public string Category { get; set; } = null!;
    public string? LiveUrl { get; set; }
    public string? GitHubUrl { get; set; }
    public bool IsFeatured { get; set; }
    public DateTime ProjectDate { get; set; }
    public int SortOrder { get; set; }

    public ICollection<ProjectTechStack> TechStacks { get; set; } = new List<ProjectTechStack>();
}

public class ProjectTechStack : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public string Technology { get; set; } = null!;
    public int SortOrder { get; set; }
}
