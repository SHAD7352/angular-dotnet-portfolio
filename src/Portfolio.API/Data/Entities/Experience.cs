namespace Portfolio.Api.Data.Entities;

public class Experience : AuditableEntity
{
    public string Company { get; set; } = null!;
    public string? CompanyLogo { get; set; }
    public string Role { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string Type { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsCurrent { get; set; }
    public string Description { get; set; } = null!;
    public int SortOrder { get; set; }

    public ICollection<ExperienceAchievement> Achievements { get; set; } = new List<ExperienceAchievement>();
    public ICollection<ExperienceTechnology> Technologies { get; set; } = new List<ExperienceTechnology>();
}

public class ExperienceAchievement : BaseEntity
{
    public Guid ExperienceId { get; set; }
    public Experience Experience { get; set; } = null!;
    public string Achievement { get; set; } = null!;
    public int SortOrder { get; set; }
}

public class ExperienceTechnology : BaseEntity
{
    public Guid ExperienceId { get; set; }
    public Experience Experience { get; set; } = null!;
    public string Technology { get; set; } = null!;
}
