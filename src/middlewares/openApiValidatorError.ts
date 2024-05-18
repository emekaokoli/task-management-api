import {
  type ErrorRequestHandler,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { error as eovErrors } from 'express-openapi-validator';
import { DomainErrror } from '../utils/error';

export function openAPIValidatorErrorMiddleware(): ErrorRequestHandler {
  return function (
    error: Error,
    _req: Request,
    _res: Response,
    next: NextFunction
  ): void {
    const issues = [error.message];

    if (error instanceof eovErrors.BadRequest) {
      next(DomainErrror.badRequest([error.message]));
    }

    if (error instanceof eovErrors.Unauthorized) {
      next(DomainErrror.unauthorized());
    }

    if (error instanceof eovErrors.Forbidden) {
      next(DomainErrror.forbidden());
    }

    if (error instanceof eovErrors.MethodNotAllowed) {
      next(DomainErrror.unprocessableEntity(issues));
    }

    if (error instanceof eovErrors.NotFound) {
      next(DomainErrror.notFound(issues));
    }

    if (error instanceof eovErrors.NotAcceptable) {
      next(DomainErrror.unprocessableEntity(issues));
    }

    if (error instanceof eovErrors.MethodNotAllowed) {
      next(DomainErrror.notFound(issues));
    }

    if (error instanceof eovErrors.RequestEntityTooLarge) {
      next(DomainErrror.unprocessableEntity(issues));
    }

    if (error instanceof eovErrors.UnsupportedMediaType) {
      next(DomainErrror.unprocessableEntity(issues));
    }

    if (error instanceof eovErrors.InternalServerError) {
      next(DomainErrror.internalError(issues));
    }

    next(error);
  };
}
