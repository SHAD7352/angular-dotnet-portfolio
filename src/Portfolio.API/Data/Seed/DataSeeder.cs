using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Data.Seed;

public static class DataSeeder
{
    public static async Task SeedAsync(PortfolioDbContext context)
    {
        if (await context.Users.AnyAsync()) return;

        var adminUser = new User
        {
            Id = Guid.NewGuid(),
            FullName = "Md Shad Alam",
            Email = "mdshadalamcareer@gmail.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123!"),
            Role = "Admin"
        };
        context.Users.Add(adminUser);

        var personalInfo = new PersonalInfo
        {
            Id = Guid.NewGuid(),
            Name = "Md Shad Alam",
            Title = "Dot Net Developer",
            Tagline = "Your Next Dot Net Developer",
            Email = "mdshadalamcareer@gmail.com",
            Phone = "+917091771277",
            Location = "Guwahati, Assam, India",
            Avatar = "/assets/avatar.jpg",
            Bio = "ASP.NET developer with about two years of experience..."
        };
        context.PersonalInfo.Add(personalInfo);

        await context.SaveChangesAsync();
    }
}
