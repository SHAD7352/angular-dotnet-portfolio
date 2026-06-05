using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasIndex(x => x.Email).IsUnique();
        builder.Property(x => x.Email).HasMaxLength(255);
        builder.Property(x => x.FullName).HasMaxLength(255);
        builder.Property(x => x.Role).HasMaxLength(50);
    }
}

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.Property(x => x.Token).HasMaxLength(255);
        builder.HasOne(x => x.User).WithMany(x => x.RefreshTokens).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class BlogPostConfiguration : IEntityTypeConfiguration<BlogPost>
{
    public void Configure(EntityTypeBuilder<BlogPost> builder)
    {
        builder.HasIndex(x => x.Slug).IsUnique();
        builder.Property(x => x.Slug).HasMaxLength(255);
        builder.Property(x => x.Title).HasMaxLength(255);
        builder.Property(x => x.Author).HasMaxLength(100);
        
        builder.HasMany(x => x.Tags).WithOne(x => x.BlogPost).HasForeignKey(x => x.BlogPostId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.Property(x => x.Title).HasMaxLength(255);
        builder.Property(x => x.Category).HasMaxLength(100);
        
        builder.HasMany(x => x.TechStacks).WithOne(x => x.Project).HasForeignKey(x => x.ProjectId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class ExperienceConfiguration : IEntityTypeConfiguration<Experience>
{
    public void Configure(EntityTypeBuilder<Experience> builder)
    {
        builder.Property(x => x.Company).HasMaxLength(255);
        builder.Property(x => x.Role).HasMaxLength(255);
        builder.Property(x => x.Location).HasMaxLength(255);
        builder.Property(x => x.Type).HasMaxLength(100);
        
        builder.HasMany(x => x.Achievements).WithOne(x => x.Experience).HasForeignKey(x => x.ExperienceId).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Technologies).WithOne(x => x.Experience).HasForeignKey(x => x.ExperienceId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class PersonalInfoConfiguration : IEntityTypeConfiguration<PersonalInfo>
{
    public void Configure(EntityTypeBuilder<PersonalInfo> builder)
    {
        builder.Property(x => x.Name).HasMaxLength(255);
        builder.Property(x => x.Title).HasMaxLength(255);
        builder.Property(x => x.Email).HasMaxLength(255);
        
        builder.HasMany(x => x.SocialLinks).WithOne(x => x.PersonalInfo).HasForeignKey(x => x.PersonalInfoId).OnDelete(DeleteBehavior.Cascade);
    }
}
