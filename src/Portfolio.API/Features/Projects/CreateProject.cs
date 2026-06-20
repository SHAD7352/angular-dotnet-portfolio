using MediatR;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Projects;

public class CreateProjectCommand : IRequest<ApiResponse<Project>>
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
    public List<string> TechStacks { get; set; } = new();
}

public class CreateProjectHandler : IRequestHandler<CreateProjectCommand, ApiResponse<Project>>
{
    private readonly PortfolioDbContext _context;

    public CreateProjectHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<Project>> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        var project = new Project
        {
            Title = request.Title,
            Description = request.Description,
            Image = request.Image,
            Category = request.Category,
            LiveUrl = request.LiveUrl,
            GitHubUrl = request.GitHubUrl,
            IsFeatured = request.IsFeatured,
            ProjectDate = request.ProjectDate,
            SortOrder = request.SortOrder,
            TechStacks = request.TechStacks.Select((tech, index) => new ProjectTechStack
            {
                Technology = tech,
                SortOrder = index
            }).ToList()
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<Project>.Ok(project, "Project created successfully.");
    }
}
