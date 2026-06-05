namespace Portfolio.Api.Data.Entities;

public class Skill : AuditableEntity
{
    public string Name { get; set; } = null!;
    public string Icon { get; set; } = null!;
    public int Level { get; set; }
    public string Category { get; set; } = null!;
    public int SortOrder { get; set; }
}
