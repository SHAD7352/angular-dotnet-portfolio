using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Portfolio.Api.Common.Auth;

public interface ICurrentUserService
{
    Guid? UserId { get; }
    string? Email { get; }
    bool IsAuthenticated { get; }
}

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid? UserId
    {
        get
        {
            var userIdStr = _httpContextAccessor.HttpContext?.User?.FindFirstValue(JwtRegisteredClaimNames.Sub);
            return Guid.TryParse(userIdStr, out var userId) ? userId : null;
        }
    }

    public string? Email => _httpContextAccessor.HttpContext?.User?.FindFirstValue(JwtRegisteredClaimNames.Email);

    public bool IsAuthenticated => _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
}
