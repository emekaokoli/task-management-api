type Issues = string[];

export class DomainErrror extends Error {
  private constructor (
    public message: string,
    public statusCode = 500,
    public issues?: Issues
  ) {
    super(message);
  }

  static badRequest (issues: Issues): DomainErrror {
    return new DomainErrror('Bad input', 400, issues);
  }

  static unauthorized (): DomainErrror {
    return new DomainErrror('Please login', 401);
  }

  static forbidden (): DomainErrror {
    return new DomainErrror(
      "You don't have enough permissions to perform this action",
      403
    );
  }

  static notFound (issues?: Issues): DomainErrror {
    return new DomainErrror(
      'The resource you requested does not exist',
      404,
      issues
    );
  }

  static unprocessableEntity (issues?: Issues): DomainErrror {
    return new DomainErrror(
      'We are unable to process this request',
      422,
      issues
    );
  }

  static internalError (issues: Issues): DomainErrror {
    return new DomainErrror('Something went wrong!', 500, issues);
  }

  static badGateway (): DomainErrror {
    return new DomainErrror('Bad Gateway', 502);
  }
}
