using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.PersonalInfo;

public class GetPersonalInfoQuery : IRequest<ApiResponse<Data.Entities.PersonalInfo>>
{
}

public class GetPersonalInfoHandler : IRequestHandler<GetPersonalInfoQuery, ApiResponse<Data.Entities.PersonalInfo>>
{
    private readonly PortfolioDbContext _context;

    public GetPersonalInfoHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<Data.Entities.PersonalInfo>> Handle(GetPersonalInfoQuery request, CancellationToken cancellationToken)
    {
        var info = await _context.PersonalInfo
            .Include(p => p.SocialLinks)
            .FirstOrDefaultAsync(cancellationToken);

        if (info == null)
            return ApiResponse<Data.Entities.PersonalInfo>.Fail("Personal info not found.");

        return ApiResponse<Data.Entities.PersonalInfo>.Ok(info);
    }
}
