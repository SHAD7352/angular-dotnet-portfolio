using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Experience;

public class GetAllExperiencesQuery : IRequest<ApiResponse<List<Data.Entities.Experience>>>
{
}

public class GetAllExperiencesHandler : IRequestHandler<GetAllExperiencesQuery, ApiResponse<List<Data.Entities.Experience>>>
{
    private readonly PortfolioDbContext _context;

    public GetAllExperiencesHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<Data.Entities.Experience>>> Handle(GetAllExperiencesQuery request, CancellationToken cancellationToken)
    {
        var experiences = await _context.Experiences
            .Include(e => e.Achievements)
            .Include(e => e.Technologies)
            .OrderByDescending(e => e.IsCurrent)
            .ThenByDescending(e => e.StartDate)
            .ToListAsync(cancellationToken);

        return ApiResponse<List<Data.Entities.Experience>>.Ok(experiences);
    }
}
