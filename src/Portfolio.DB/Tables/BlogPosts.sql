CREATE TABLE [dbo].[BlogPosts] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
    [Title] NVARCHAR(255) NOT NULL,
    [Slug] NVARCHAR(255) NOT NULL UNIQUE,
    [Excerpt] NVARCHAR(MAX) NOT NULL,
    [Content] NVARCHAR(MAX) NOT NULL,
    [CoverImage] NVARCHAR(MAX) NOT NULL,
    [Author] NVARCHAR(100) NOT NULL,
    [PublishedAt] DATETIME2 NOT NULL,
    [ReadingTimeMinutes] INT NOT NULL,
    [IsPublished] BIT NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL,
    [UpdatedAt] DATETIME2 NULL
);
