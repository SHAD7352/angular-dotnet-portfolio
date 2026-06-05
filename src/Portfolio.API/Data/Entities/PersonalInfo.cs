namespace Portfolio.Api.Data.Entities;

public class PersonalInfo : AuditableEntity
{
    public string Name { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Tagline { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Phone { get; set; }
    public string Location { get; set; } = null!;
    public string Avatar { get; set; } = null!;
    public string? ResumeUrl { get; set; }
    public string Bio { get; set; } = null!;

    public ICollection<SocialLink> SocialLinks { get; set; } = new List<SocialLink>();
}

public class SocialLink : BaseEntity
{
    public Guid PersonalInfoId { get; set; }
    public PersonalInfo PersonalInfo { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Url { get; set; } = null!;
    public string Icon { get; set; } = null!;
    public int SortOrder { get; set; }
}
