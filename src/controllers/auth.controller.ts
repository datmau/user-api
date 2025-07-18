
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {

  static async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, role, avatar, bio } = req.body;
    const token = await AuthService.register({ name, email, password, role, avatar, bio });
    res.json({ token });
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json(result);
  }
}
