using MediatR;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;

namespace Portfolio.Api.Features.Projects;

public class DeleteProjectCommand : IRequest<ApiResponse<bool>>
{
    public Guid Id { get; set; }
}

public class DeleteProjectHandler : IRequestHandler<DeleteProjectCommand, ApiResponse<bool>>
{
    private readonly PortfolioDbContext _context;

    public DeleteProjectHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<bool>> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
    {
        var project = await _context.Projects.FindAsync(new object[] { request.Id }, cancellationToken);

        if (project == null)
        {
            return ApiResponse<bool>.Fail("Project not found.");
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<bool>.Ok(true, "Project deleted successfully.");
    }
}
