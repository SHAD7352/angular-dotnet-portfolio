using System.Reflection;
using System.Text;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Api.Common.Auth;
using Portfolio.Api.Common.Behaviors;
using Portfolio.Api.Common.Middleware;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Seed;
using Portfolio.Api.Features.Auth;
using Portfolio.Api.Features.Skills;
using Portfolio.Api.Features.Projects;
using Portfolio.Api.Features.Experience;
using Portfolio.Api.Features.Blog;
using Portfolio.Api.Features.Contact;
using Portfolio.Api.Features.PersonalInfo;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Configuration
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

// 2. Add DbContext
builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Add MediatR & FluentValidation
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));

// 4. Add Auth Services
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

// 5. Add Authentication & Authorization
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings!.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// 6. Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
});

// 7. Add OpenAPI / Scalar
builder.Services.AddOpenApi();

var app = builder.Build();

// Migrate and Seed Database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    await context.Database.MigrateAsync();
    await DataSeeder.SeedAsync(context);
}

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthentication();
app.UseAuthorization();

// Map Endpoints (Will add feature endpoints here)
app.MapGet("/", () => "Portfolio API is running.");

app.MapAuthEndpoints();
app.MapSkillEndpoints();
app.MapProjectEndpoints();
app.MapExperienceEndpoints();
app.MapBlogEndpoints();
app.MapContactEndpoints();
app.MapPersonalInfoEndpoints();

app.Run();
