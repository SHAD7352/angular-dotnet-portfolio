using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Projects;

public class UpdateProjectCommand : IRequest<ApiResponse<Project>>
{
    public Guid Id { get; set; }
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

public class UpdateProjectHandler : IRequestHandler<UpdateProjectCommand, ApiResponse<Project>>
{
    private readonly PortfolioDbContext _context;

    public UpdateProjectHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<Project>> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
    {
        var project = await _context.Projects
            .Include(p => p.TechStacks)
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (project == null)
        {
            return ApiResponse<Project>.Fail("Project not found.");
        }

        project.Title = request.Title;
        project.Description = request.Description;
        project.Image = request.Image;
        project.Category = request.Category;
        project.LiveUrl = request.LiveUrl;
        project.GitHubUrl = request.GitHubUrl;
        project.IsFeatured = request.IsFeatured;
        project.ProjectDate = request.ProjectDate;
        project.SortOrder = request.SortOrder;

        // Clear existing tech stacks and add new ones to handle removals, additions, and reordering
        _context.Set<ProjectTechStack>().RemoveRange(project.TechStacks);
        
        project.TechStacks = request.TechStacks.Select((tech, index) => new ProjectTechStack
        {
            Technology = tech,
            SortOrder = index
        }).ToList();

        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<Project>.Ok(project, "Project updated successfully.");
    }
}
