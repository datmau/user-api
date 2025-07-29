import {Request, Response, NextFunction} from 'express'; 
import { AppError } from '../errors/AppError';


export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(`[${new Date().toISOString()}] Error:`, {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method
    });

    // Handle AppError instances
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && { 
                stack: err.stack,
                name: err.name 
            })
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid or expired token',
            ...(process.env.NODE_ENV === 'development' && {
                name: err.name,
                stack: err.stack
            })
        });
    }

    // Handle validation errors (e.g., from express-validator)
    if ((err as any).errors) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Error',
            errors: (err as any).errors.map((e: any) => ({
                field: e.param,
                message: e.msg,
                value: e.value
            }))
        });
    }

    // Default error response
    const errorResponse: any = {
        status: 'error',
        message: 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && {
            name: err.name,
            message: err.message,
            stack: err.stack
        })
    };

    res.status(500).json(errorResponse);
}

// Wrapper to handle async/await errors
export const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
};