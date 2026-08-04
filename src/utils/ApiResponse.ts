import type { Response } from "express";

class ApiResponse {
    static success<T>(
        res: Response,
        message: string,
        statusCode: number,
        data: T,
    ) {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static error(
        res: Response,
        statusCode: number,
        message: string,
    ) {
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
}

export default ApiResponse;