import type { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
        error: {
            path: req.originalUrl,
            message: 'Requested route is not found',
        },
    });
};

export default notFound;