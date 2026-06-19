using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Data.Seed;

public static class DataSeeder
{
    public static async Task SeedAsync(PortfolioDbContext context)
    {
        // Clear existing data to ensure fresh seeding
        await context.Users.ExecuteDeleteAsync();
        await context.PersonalInfo.ExecuteDeleteAsync();
        await context.Skills.ExecuteDeleteAsync();
        await context.Experiences.ExecuteDeleteAsync();
        await context.Projects.ExecuteDeleteAsync();
        await context.BlogPosts.ExecuteDeleteAsync();

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
            Avatar = "assets/images/profile.png",
            Bio = "ASP.NET developer with about two years of experience delivering web applications using C#, ASP.NET MVC, and EF Core. I design and consume RESTful APIs, optimize SQL Server databases and queries, and implement maintainable backend features. I work in Agile teams, focusing on measurable improvements in performance and reliability while producing clean, testable code."
        };
        context.PersonalInfo.Add(personalInfo);

        context.Skills.AddRange(
            new Skill { Id = Guid.NewGuid(), Name = "C#", Icon = "csharp", Level = 92, Category = "backend", SortOrder = 1 },
            new Skill { Id = Guid.NewGuid(), Name = "Java", Icon = "java", Level = 70, Category = "backend", SortOrder = 2 },
            new Skill { Id = Guid.NewGuid(), Name = "JavaScript", Icon = "javascript", Level = 85, Category = "frontend", SortOrder = 3 },
            new Skill { Id = Guid.NewGuid(), Name = "SQL", Icon = "sql", Level = 90, Category = "database", SortOrder = 4 },
            new Skill { Id = Guid.NewGuid(), Name = "HTML5", Icon = "html5", Level = 95, Category = "frontend", SortOrder = 5 },
            new Skill { Id = Guid.NewGuid(), Name = "CSS3", Icon = "css3", Level = 90, Category = "frontend", SortOrder = 6 },
            new Skill { Id = Guid.NewGuid(), Name = "Bootstrap", Icon = "bootstrap", Level = 92, Category = "frontend", SortOrder = 7 },
            new Skill { Id = Guid.NewGuid(), Name = "jQuery", Icon = "jquery", Level = 88, Category = "frontend", SortOrder = 8 },
            new Skill { Id = Guid.NewGuid(), Name = "Angular", Icon = "angular", Level = 75, Category = "frontend", SortOrder = 9 },
            new Skill { Id = Guid.NewGuid(), Name = "React.js", Icon = "react", Level = 70, Category = "frontend", SortOrder = 10 },
            new Skill { Id = Guid.NewGuid(), Name = "ASP.NET Core", Icon = "dotnet", Level = 92, Category = "backend", SortOrder = 11 },
            new Skill { Id = Guid.NewGuid(), Name = "ASP.NET MVC", Icon = "dotnet", Level = 95, Category = "backend", SortOrder = 12 },
            new Skill { Id = Guid.NewGuid(), Name = "Entity Framework Core", Icon = "efcore", Level = 90, Category = "backend", SortOrder = 13 },
            new Skill { Id = Guid.NewGuid(), Name = "RESTful APIs", Icon = "api", Level = 92, Category = "backend", SortOrder = 14 },
            new Skill { Id = Guid.NewGuid(), Name = "WinForms", Icon = "windows", Level = 85, Category = "backend", SortOrder = 15 },
            new Skill { Id = Guid.NewGuid(), Name = "WebForms", Icon = "web", Level = 82, Category = "backend", SortOrder = 16 },
            new Skill { Id = Guid.NewGuid(), Name = "MS SQL Server", Icon = "sqlserver", Level = 92, Category = "database", SortOrder = 17 },
            new Skill { Id = Guid.NewGuid(), Name = "MySQL", Icon = "mysql", Level = 80, Category = "database", SortOrder = 18 },
            new Skill { Id = Guid.NewGuid(), Name = "Visual Studio", Icon = "visualstudio", Level = 95, Category = "tools", SortOrder = 19 },
            new Skill { Id = Guid.NewGuid(), Name = "Git", Icon = "git", Level = 88, Category = "tools", SortOrder = 20 },
            new Skill { Id = Guid.NewGuid(), Name = "GitHub", Icon = "github", Level = 88, Category = "tools", SortOrder = 21 },
            new Skill { Id = Guid.NewGuid(), Name = "RDLC Reports", Icon = "report", Level = 85, Category = "tools", SortOrder = 22 },
            new Skill { Id = Guid.NewGuid(), Name = "Crystal Reports", Icon = "report", Level = 80, Category = "tools", SortOrder = 23 }
        );

        var exp1Id = Guid.NewGuid();
        context.Experiences.Add(new Experience
        {
            Id = exp1Id,
            Company = "Vasp Technologies Pvt. Ltd.",
            CompanyLogo = "assets/images/companies/vasp.png",
            Role = "Dot Net Developer",
            Location = "Guwahati, India",
            Type = "full-time",
            StartDate = new DateTime(2025, 6, 1, 0, 0, 0, DateTimeKind.Utc),
            IsCurrent = true,
            Description = "As a key developer on the product team, I build and maintain features for enterprise HRMS and School ERP solutions and contribute to the warehouse management system to improve inventory control and data management.",
            Achievements = new List<ExperienceAchievement>
            {
                new ExperienceAchievement { Id = Guid.NewGuid(), Achievement = "Design and implement features for HRMS and School ERP using ASP.NET and C#, focusing on task management and user registration modules", SortOrder = 1 },
                new ExperienceAchievement { Id = Guid.NewGuid(), Achievement = "Develop and maintain warehouse management functionality to improve inventory accuracy and data handling using MS SQL and efficient queries", SortOrder = 2 },
                new ExperienceAchievement { Id = Guid.NewGuid(), Achievement = "Integrate REST APIs and backend services to enable real-time data exchange across modules and external systems", SortOrder = 3 }
            },
            Technologies = new List<ExperienceTechnology>
            {
                new ExperienceTechnology { Id = Guid.NewGuid(), Technology = "ASP.NET Core" },
                new ExperienceTechnology { Id = Guid.NewGuid(), Technology = "Dapper" },
                new ExperienceTechnology { Id = Guid.NewGuid(), Technology = "MS SQL Server" }
            }
        });

        var exp2Id = Guid.NewGuid();
        context.Experiences.Add(new Experience
        {
            Id = exp2Id,
            Company = "NM Technologies Pvt Ltd",
            CompanyLogo = "assets/images/companies/nmtech.png",
            Role = "ASP.NET Developer",
            Location = "Kolkata, India",
            Type = "full-time",
            StartDate = new DateTime(2024, 2, 1, 0, 0, 0, DateTimeKind.Utc),
            EndDate = new DateTime(2025, 5, 31, 0, 0, 0, DateTimeKind.Utc),
            IsCurrent = false,
            Description = "Developed and maintained web applications using C#, ASP.NET, MS SQL, Bootstrap, and jQuery within Visual Studio.",
            Achievements = new List<ExperienceAchievement>
            {
                new ExperienceAchievement { Id = Guid.NewGuid(), Achievement = "Built features for payroll, HRMS, vehicle parking management, and inventory systems, demonstrating versatile domain experience", SortOrder = 1 }
            },
            Technologies = new List<ExperienceTechnology>
            {
                new ExperienceTechnology { Id = Guid.NewGuid(), Technology = "C#" },
                new ExperienceTechnology { Id = Guid.NewGuid(), Technology = "ASP.NET" },
                new ExperienceTechnology { Id = Guid.NewGuid(), Technology = "WinForms" }
            }
        });

        context.Projects.AddRange(
            new Project
            {
                Id = Guid.NewGuid(),
                Title = "School ERP System",
                Description = "Comprehensive School ERP solution with student registration, fee management, attendance tracking, and academic management modules.",
                Image = "assets/images/projectsimg/school-erp.png",
                Category = "fullstack",
                LiveUrl = "https://dc.sfsguwahati.in/",
                GitHubUrl = "",
                IsFeatured = true,
                ProjectDate = new DateTime(2025, 8, 1, 0, 0, 0, DateTimeKind.Utc),
                SortOrder = 1,
                TechStacks = new List<ProjectTechStack>
                {
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "ASP.NET Core", SortOrder = 1 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "MS SQL Server", SortOrder = 2 }
                }
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Title = "Vehicle Parking Management System",
                Description = "Designed and maintained a Vehicle Parking Management System using ASP.NET Core/MVC to provide real-time parking slot monitoring, allocation, and history tracking.",
                Image = "assets/images/projectsimg/VehicleParkingSystem.png",
                Category = "fullstack",
                LiveUrl = "https://smartpower.co.in/parking-fee-management-system",
                GitHubUrl = "https://github.com/SHAD7352",
                IsFeatured = false,
                ProjectDate = new DateTime(2025, 5, 1, 0, 0, 0, DateTimeKind.Utc),
                SortOrder = 2,
                TechStacks = new List<ProjectTechStack>
                {
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "ASP.NET Core", SortOrder = 1 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "SQL Server", SortOrder = 2 }
                }
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Title = "Angular & .NET Core Portfolio",
                Description = "A modern, full-stack personal portfolio application built using Angular for the frontend and .NET Core for the backend API. It features projects, skills, and blog sections with a responsive design.",
                Image = "assets/images/projectsimg/portfolio.png",
                Category = "fullstack",
                LiveUrl = "",
                GitHubUrl = "https://github.com/SHAD7352/angular-dotnet-portfolio",
                IsFeatured = true,
                ProjectDate = new DateTime(2026, 6, 19, 0, 0, 0, DateTimeKind.Utc),
                SortOrder = 3,
                TechStacks = new List<ProjectTechStack>
                {
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Angular", SortOrder = 1 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "ASP.NET Core", SortOrder = 2 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Entity Framework Core", SortOrder = 3 }
                }
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Title = "Jewellery & Scheme Managing Application",
                Description = "Developed RESTful APIs with ASP.NET Core to support mobile (customer) and web (admin) platforms for managing jewellery investment schemes. Enabled administrators to create, assign, and track schemes and agent collections, implementing server-side logic and EF-based data models for reliable tracking. Implemented financial calculation features to compute and display gold/diamond values based on customer investments and current market rates.",
                Image = "https://placehold.co/600x400/8e44ad/ffffff?text=Jewellery+Scheme",
                Category = "backend",
                LiveUrl = "https://shyamsundarco.com/scheme",
                GitHubUrl = "",
                IsFeatured = false,
                ProjectDate = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                SortOrder = 4,
                TechStacks = new List<ProjectTechStack>
                {
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "ASP.NET Core", SortOrder = 1 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Entity Framework", SortOrder = 2 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "REST APIs", SortOrder = 3 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "SQL Server", SortOrder = 4 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "C#", SortOrder = 5 }
                }
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Title = "Book Store Web Application",
                Description = "Built an ASP.NET Core 7 MVC book store web application featuring book category management, detailed book entries, and image upload support. Implemented user-friendly interfaces and used Entity Framework Core for data access, enabling reliable CRUD operations and optimized queries.",
                Image = "https://placehold.co/600x400/d35400/ffffff?text=Book+Store",
                Category = "fullstack",
                LiveUrl = "",
                GitHubUrl = "https://github.com/mdshadalamcareer/bookstore",
                IsFeatured = true,
                ProjectDate = new DateTime(2024, 11, 1, 0, 0, 0, DateTimeKind.Utc),
                SortOrder = 5,
                TechStacks = new List<ProjectTechStack>
                {
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "ASP.NET Core 7", SortOrder = 1 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "MVC", SortOrder = 2 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Entity Framework Core", SortOrder = 3 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "SQL Server", SortOrder = 4 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Bootstrap", SortOrder = 5 }
                }
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Title = "Inventory and Invoice Generator",
                Description = "Developed a web application to manage product inventory and generate invoices using ASP.NET with MVC patterns for maintainable server-side logic. Integrated invoice generation with customer and product selection and used Entity Framework for data persistence and transactional operations.",
                Image = "https://placehold.co/600x400/27ae60/ffffff?text=Inventory+System",
                Category = "fullstack",
                LiveUrl = "",
                GitHubUrl = "https://github.com/mdshadalamcareer/inventory-invoice",
                IsFeatured = false,
                ProjectDate = new DateTime(2024, 3, 1, 0, 0, 0, DateTimeKind.Utc),
                SortOrder = 6,
                TechStacks = new List<ProjectTechStack>
                {
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "ASP.NET", SortOrder = 1 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "MVC", SortOrder = 2 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Entity Framework", SortOrder = 3 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "SQL Server", SortOrder = 4 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Bootstrap", SortOrder = 5 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "jQuery", SortOrder = 6 }
                }
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Title = "HRMS System",
                Description = "Enterprise Human Resource Management System with employee management, attendance tracking, leave management, and payroll processing features built at Vasp Technologies.",
                Image = "https://placehold.co/600x400/2980b9/ffffff?text=HRMS+System",
                Category = "fullstack",
                LiveUrl = "",
                GitHubUrl = "",
                IsFeatured = false,
                ProjectDate = new DateTime(2025, 7, 1, 0, 0, 0, DateTimeKind.Utc),
                SortOrder = 7,
                TechStacks = new List<ProjectTechStack>
                {
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "ASP.NET", SortOrder = 1 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "C#", SortOrder = 2 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "MS SQL Server", SortOrder = 3 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Bootstrap", SortOrder = 4 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "jQuery", SortOrder = 5 }
                }
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Title = "Financial Accountability System for Transparency (FAST)",
                Description = "Developing a modern, cloud-based accounting and ERP system designed as a web-based alternative to traditional desktop software like Tally Prime. Features a high-speed, keyboard-driven \"Gateway of Fast\" interface for rapid data entry, coupled with a modern web architecture for remote accessibility and real-time syncing. [Status: Ongoing]",
                Image = "https://placehold.co/600x400/34495e/ffffff?text=MSFS+FAST",
                Category = "fullstack",
                LiveUrl = "https://fast.msfsguwahati.org/auth/login",
                GitHubUrl = "",
                IsFeatured = true,
                ProjectDate = new DateTime(2026, 2, 10, 0, 0, 0, DateTimeKind.Utc),
                SortOrder = 8,
                TechStacks = new List<ProjectTechStack>
                {
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Blazor WebAssembly", SortOrder = 1 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "ASP.NET Core 10", SortOrder = 2 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "C#", SortOrder = 3 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "SQL Server", SortOrder = 4 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Entity Framework Core", SortOrder = 5 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "REST APIs", SortOrder = 6 },
                    new ProjectTechStack { Id = Guid.NewGuid(), Technology = "Bootstrap", SortOrder = 7 }
                }
            }
        );

        context.BlogPosts.AddRange(
            new BlogPost
            {
                Id = Guid.NewGuid(),
                Title = "Building RESTful APIs with ASP.NET Core",
                Slug = "restful-apis-aspnet-core",
                Excerpt = "Learn how to design and implement scalable RESTful APIs using ASP.NET Core with best practices for enterprise applications.",
                Content = "# Building RESTful APIs with ASP.NET Core\n\nIn this guide, we will explore how to create robust RESTful APIs...",
                CoverImage = "assets/images/blog/aspnet-api.png",
                Author = "Md Shad Alam",
                PublishedAt = new DateTime(2025, 1, 15, 0, 0, 0, DateTimeKind.Utc),
                ReadingTimeMinutes = 10,
                IsPublished = true
            },
            new BlogPost
            {
                Id = Guid.NewGuid(),
                Title = "Entity Framework Core: Best Practices",
                Slug = "ef-core-best-practices",
                Excerpt = "Discover Entity Framework Core patterns and techniques that will help you write more efficient and maintainable data access code.",
                Content = "# Entity Framework Core: Best Practices\n\nEntity Framework Core is a powerful ORM...",
                CoverImage = "assets/images/projectsimg/ef-core.png",
                Author = "Md Shad Alam",
                PublishedAt = new DateTime(2025, 1, 5, 0, 0, 0, DateTimeKind.Utc),
                ReadingTimeMinutes = 8,
                IsPublished = true
            },
            new BlogPost
            {
                Id = Guid.NewGuid(),
                Title = "SQL Server Query Optimization Tips",
                Slug = "sql-server-optimization",
                Excerpt = "Learn techniques to optimize your SQL Server queries and improve database performance for enterprise applications.",
                Content = "# SQL Server Query Optimization Tips\n\nOptimizing database queries is crucial...",
                CoverImage = "assets/images/projectsimg/sql-optimization.png",
                Author = "Md Shad Alam",
                PublishedAt = new DateTime(2024, 12, 20, 0, 0, 0, DateTimeKind.Utc),
                ReadingTimeMinutes = 7,
                IsPublished = true
            },
            new BlogPost
            {
                Id = Guid.NewGuid(),
                Title = "From WinForms to ASP.NET Core: A Migration Guide",
                Slug = "winforms-to-aspnet-migration",
                Excerpt = "A practical guide for developers transitioning from desktop WinForms applications to web-based ASP.NET Core solutions.",
                Content = "# From WinForms to ASP.NET Core\n\nMany organizations are modernizing their legacy applications...",
                CoverImage = "assets/images/blog/migration.png",
                Author = "Md Shad Alam",
                PublishedAt = new DateTime(2024, 11, 28, 0, 0, 0, DateTimeKind.Utc),
                ReadingTimeMinutes = 12,
                IsPublished = true
            }
        );

        await context.SaveChangesAsync();
    }
}
