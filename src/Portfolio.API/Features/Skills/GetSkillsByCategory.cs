using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Skills;

public class GetSkillsByCategoryQuery : IRequest<ApiResponse<List<Skill>>>
{
    public string Category { get; set; } = null!;
}

public class GetSkillsByCategoryHandler : IRequestHandler<GetSkillsByCategoryQuery, ApiResponse<List<Skill>>>
{
    private readonly PortfolioDbContext _context;

    public GetSkillsByCategoryHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<Skill>>> Handle(GetSkillsByCategoryQuery request, CancellationToken cancellationToken)
    {
        var skills = await _context.Skills
            .Where(s => s.Category.ToLower() == request.Category.ToLower())
            .OrderBy(s => s.SortOrder)
            .ToListAsync(cancellationToken);

        return ApiResponse<List<Skill>>.Ok(skills);
    }
}
