CREATE TABLE [dbo].[Experiences] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
    [Company] NVARCHAR(255) NOT NULL,
    [CompanyLogo] NVARCHAR(MAX) NULL,
    [Role] NVARCHAR(255) NOT NULL,
    [Location] NVARCHAR(255) NOT NULL,
    [Type] NVARCHAR(100) NOT NULL,
    [StartDate] DATETIME2 NOT NULL,
    [EndDate] DATETIME2 NULL,
    [IsCurrent] BIT NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    [SortOrder] INT NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL,
    [UpdatedAt] DATETIME2 NULL
);
