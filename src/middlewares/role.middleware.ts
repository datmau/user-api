import { NextFunction, Response } from "express";

export const authorizeRole = (roles: string[]) =>
    (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) { 
            res.status(403).json({ message: 'No autorizado' }); 
        }
        next();
    };
