
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {

  static async register(req: Request, res: Response) {

    const { email, password } = req.body;
    const token = await AuthService.register(email, password);
    res.json({ token });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    res.json({ token });
  }
}
