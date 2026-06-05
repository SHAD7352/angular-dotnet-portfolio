using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Common.Auth;
using Portfolio.Api.Common.Exceptions;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;

namespace Portfolio.Api.Features.Auth;

public class LoginRequest : IRequest<ApiResponse<LoginResponse>>
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class LoginResponse
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }
}

public class LoginValidator : AbstractValidator<LoginRequest>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty();
    }
}

public class LoginHandler : IRequestHandler<LoginRequest, ApiResponse<LoginResponse>>
{
    private readonly PortfolioDbContext _context;
    private readonly IJwtTokenService _jwtService;
    private readonly JwtSettings _jwtSettings;

    public LoginHandler(PortfolioDbContext context, IJwtTokenService jwtService, Microsoft.Extensions.Options.IOptions<JwtSettings> jwtSettings)
    {
        _context = context;
        _jwtService = jwtService;
        _jwtSettings = jwtSettings.Value;
    }

    public async Task<ApiResponse<LoginResponse>> Handle(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            throw new AppException("Invalid credentials.");
        }

        var accessToken = _jwtService.GenerateAccessToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken();
        var expiresAt = DateTime.UtcNow.AddMinutes(_jwtSettings.AccessTokenExpirationMinutes);

        user.RefreshTokens.Add(new Data.Entities.RefreshToken
        {
            Token = refreshToken,
            ExpiresAt = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpirationDays),
            UserId = user.Id
        });

        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<LoginResponse>.Ok(new LoginResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresAt = expiresAt
        }, "Login successful");
    }
}
