
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, role, avatar, bio } = req.body;
      
      // Validar campos requeridos
      if (!name || !email || !password) {
        res.status(400).json({ 
          message: 'Campos requeridos: name, email, password' 
        });
        return;
      }

      const token = await AuthService.register({ name, email, password, role, avatar, bio });
      res.json({ token });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        res.status(400).json({ message: 'Email y password son requeridos' });
        return;
      }

      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error) {
      console.error('Error en login:', error);
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  }
}
