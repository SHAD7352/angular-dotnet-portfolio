using FluentValidation;
using MediatR;
using Portfolio.Api.Common.Models;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Features.Contact;

public class SubmitMessageCommand : IRequest<ApiResponse<Guid>>
{
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Subject { get; set; } = null!;
    public string Message { get; set; } = null!;
}

public class SubmitMessageValidator : AbstractValidator<SubmitMessageCommand>
{
    public SubmitMessageValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(255);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(255);
        RuleFor(x => x.Subject).NotEmpty().MaximumLength(255);
        RuleFor(x => x.Message).NotEmpty();
    }
}

public class SubmitMessageHandler : IRequestHandler<SubmitMessageCommand, ApiResponse<Guid>>
{
    private readonly PortfolioDbContext _context;

    public SubmitMessageHandler(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<Guid>> Handle(SubmitMessageCommand request, CancellationToken cancellationToken)
    {
        var message = new ContactMessage
        {
            Name = request.Name,
            Email = request.Email,
            Subject = request.Subject,
            Message = request.Message
        };

        _context.ContactMessages.Add(message);
        await _context.SaveChangesAsync(cancellationToken);

        return ApiResponse<Guid>.Ok(message.Id, "Message sent successfully.");
    }
}
