using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.PersonalInfo;

public class SocialLinkDto
{
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public int SortOrder { get; set; }
}

public class UpdatePersonalInfoCommand : IRequest<ApiResponse<bool>>
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string? ResumeUrl { get; set; }
    public string Bio { get; set; } = string.Empty;
    public List<SocialLinkDto> SocialLinks { get; set; } = new();
}

public class UpdatePersonalInfoHandler : IRequestHandler<UpdatePersonalInfoCommand, ApiResponse<bool>>
{
    private readonly PortfolioDbContext _context;

    public UpdatePersonalInfoHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<bool>> Handle(UpdatePersonalInfoCommand request, CancellationToken cancellationToken)
    {
        var info = await _context.PersonalInfo
            .Include(p => p.SocialLinks)
            .FirstOrDefaultAsync(cancellationToken);

        if (info == null)
        {
            // If there's no row, we might create one depending on business logic,
            // but normally it's seeded. We'll handle both.
            info = new Data.Entities.PersonalInfo();
            _context.PersonalInfo.Add(info);
        }

        info.Name = request.Name;
        info.Title = request.Title;
        info.Tagline = request.Tagline;
        info.Email = request.Email;
        info.Phone = request.Phone;
        info.Location = request.Location;
        info.Avatar = request.Avatar;
        info.ResumeUrl = request.ResumeUrl;
        info.Bio = request.Bio;

        // Remove existing social links
        _context.Set<SocialLink>().RemoveRange(info.SocialLinks);
        info.SocialLinks.Clear();

        // Create new social links
        var newSocialLinks = request.SocialLinks.Select(s => new SocialLink
        {
            Name = s.Name,
            Url = s.Url,
            Icon = s.Icon,
            SortOrder = s.SortOrder,
            PersonalInfoId = info.Id
        }).ToList();

        foreach (var link in newSocialLinks)
        {
            _context.Entry(link).State = EntityState.Added;
            info.SocialLinks.Add(link);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<bool>.Ok(true);
    }
}
