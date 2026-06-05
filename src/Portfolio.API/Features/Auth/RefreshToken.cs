using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Auth;
using Portfolio.Api.Common.Exceptions;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;

namespace Portfolio.Api.Features.Auth;

public class RefreshTokenRequest : IRequest<ApiResponse<LoginResponse>>
{
    public string RefreshToken { get; set; } = null!;
}

public class RefreshTokenValidator : AbstractValidator<RefreshTokenRequest>
{
    public RefreshTokenValidator()
    {
        RuleFor(x => x.RefreshToken).NotEmpty();
    }
}

public class RefreshTokenHandler : IRequestHandler<RefreshTokenRequest, ApiResponse<LoginResponse>>
{
    private readonly PortfolioDbContext _context;
    private readonly IJwtTokenService _jwtService;
    private readonly JwtSettings _jwtSettings;

    public RefreshTokenHandler(PortfolioDbContext context, IJwtTokenService jwtService, Microsoft.Extensions.Options.IOptions<JwtSettings> jwtSettings)
    {
        _context = context;
        _jwtService = jwtService;
        _jwtSettings = jwtSettings.Value;
    }

    public async Task<ApiResponse<LoginResponse>> Handle(RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var refreshToken = await _context.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == request.RefreshToken, cancellationToken);

        if (refreshToken == null || refreshToken.IsRevoked || refreshToken.ExpiresAt < DateTime.UtcNow)
        {
            throw new AppException("Invalid or expired refresh token.");
        }

        // Revoke the old token
        refreshToken.IsRevoked = true;

        var user = refreshToken.User;
        var newAccessToken = _jwtService.GenerateAccessToken(user);
        var newRefreshToken = _jwtService.GenerateRefreshToken();
        var expiresAt = DateTime.UtcNow.AddMinutes(_jwtSettings.AccessTokenExpirationMinutes);

        _context.RefreshTokens.Add(new Data.Entities.RefreshToken
        {
            Token = newRefreshToken,
            ExpiresAt = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpirationDays),
            UserId = user.Id
        });

        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<LoginResponse>.Ok(new LoginResponse
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            ExpiresAt = expiresAt
        }, "Token refreshed successfully");
    }
}
