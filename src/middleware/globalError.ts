import { type ErrorRequestHandler, type Request, type Response, type NextFunction } from 'express';
import type { ErrorResponse } from '../types/index.js';
import ApiResponse from '../utils/ApiResponse.js';

const globalError: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';

    return ApiResponse.error(res, statusCode, message)
};

export default globalError;