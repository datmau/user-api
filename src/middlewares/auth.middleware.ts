import { NextFunction, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};