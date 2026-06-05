using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Projects;

public class GetAllProjectsQuery : IRequest<ApiResponse<List<Project>>>
{
}

public class GetAllProjectsHandler : IRequestHandler<GetAllProjectsQuery, ApiResponse<List<Project>>>
{
    private readonly PortfolioDbContext _context;

    public GetAllProjectsHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<Project>>> Handle(GetAllProjectsQuery request, CancellationToken cancellationToken)
    {
        var projects = await _context.Projects
            .Include(p => p.TechStacks)
            .OrderBy(p => p.SortOrder)
            .ToListAsync(cancellationToken);

        return ApiResponse<List<Project>>.Ok(projects);
    }
}
