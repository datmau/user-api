import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token no proporcionado' });
    return;
  }
  
  try {
    (req as any).user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};