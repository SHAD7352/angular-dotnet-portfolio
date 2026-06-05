CREATE TABLE [dbo].[Projects] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
    [Title] NVARCHAR(255) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    [Image] NVARCHAR(MAX) NOT NULL,
    [Category] NVARCHAR(100) NOT NULL,
    [LiveUrl] NVARCHAR(MAX) NULL,
    [GitHubUrl] NVARCHAR(MAX) NULL,
    [IsFeatured] BIT NOT NULL,
    [ProjectDate] DATETIME2 NOT NULL,
    [SortOrder] INT NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL,
    [UpdatedAt] DATETIME2 NULL
);
