import express from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../exceptions/HttpException';

// Http error handler
const httpMiddlewareError = (
    error: HttpException,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
): void => {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Unexpected error';
    response.status(status).send({
        status,
        message,
    });
    next();
};

// Generic error handler
const failSafeHandler = (
    error: any | Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
): void => {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    next();
};

export { httpMiddlewareError, failSafeHandler };
