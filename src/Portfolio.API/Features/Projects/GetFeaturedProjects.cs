using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Projects;

public class GetFeaturedProjectsQuery : IRequest<ApiResponse<List<Project>>>
{
}

public class GetFeaturedProjectsHandler : IRequestHandler<GetFeaturedProjectsQuery, ApiResponse<List<Project>>>
{
    private readonly PortfolioDbContext _context;

    public GetFeaturedProjectsHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<Project>>> Handle(GetFeaturedProjectsQuery request, CancellationToken cancellationToken)
    {
        var projects = await _context.Projects
            .Include(p => p.TechStacks)
            .Where(p => p.IsFeatured)
            .OrderBy(p => p.SortOrder)
            .ToListAsync(cancellationToken);

        return ApiResponse<List<Project>>.Ok(projects);
    }
}
