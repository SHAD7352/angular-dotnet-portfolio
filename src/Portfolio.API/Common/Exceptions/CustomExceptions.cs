namespace Portfolio.Api.Common.Exceptions;

public class AppException : Exception
{
    public AppException() : base() { }
    public AppException(string message) : base(message) { }
    public AppException(string message, Exception innerException) : base(message, innerException) { }
}

public class NotFoundException : Exception
{
    public NotFoundException(string name, object key) : base($"Entity \"{name}\" ({key}) was not found.") { }
}

public class ValidationException : Exception
{
    public IDictionary<string, string[]> Errors { get; }

    public ValidationException() : base("One or more validation failures have occurred.")
    {
        Errors = new Dictionary<string, string[]>();
    }

    public ValidationException(IEnumerable<FluentValidation.Results.ValidationFailure> failures) : this()
    {
        Errors = failures
            .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
            .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
    }
}
