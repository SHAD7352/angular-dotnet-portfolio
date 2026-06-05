using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Skills;

public class GetAllSkillsQuery : IRequest<ApiResponse<List<Skill>>>
{
}

public class GetAllSkillsHandler : IRequestHandler<GetAllSkillsQuery, ApiResponse<List<Skill>>>
{
    private readonly PortfolioDbContext _context;

    public GetAllSkillsHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<Skill>>> Handle(GetAllSkillsQuery request, CancellationToken cancellationToken)
    {
        var skills = await _context.Skills
            .OrderBy(s => s.SortOrder)
            .ToListAsync(cancellationToken);

        return ApiResponse<List<Skill>>.Ok(skills);
    }
}
