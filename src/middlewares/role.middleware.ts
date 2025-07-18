import { NextFunction, Response, Request } from "express";
import { Role } from '@prisma/client';

export const authorizeRole = (roles: Role[]) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: 'No autorizado' });
            return;
        }
        next();
    };

