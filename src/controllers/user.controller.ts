import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { validateDto } from "../middlewares/validate.middleware";
import { UpdateUserDto } from "../dto/update-user.dto";

export class UserController {

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
  }

  static async getPublicUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getPublicUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios públicos', error });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuario', error });
    }
  }

  static async getPublicUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserService.getPublicUserById(id);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuario público', error });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      validateDto(UpdateUserDto)(req, res, async () => {
      const { id } = req.params;
      const { name, email, role, avatar, bio } = req.body;
    

      const updatedUser = await UserService.updateUser(id, { name, email, role, avatar, bio });
      res.json(updatedUser);})
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuario no encontrado') {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(500).json({ 
          message: 'Error al actualizar usuario', 
          error: error instanceof Error ? error.message : 'Error desconocido' 
        });
      }
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await UserService.deleteUser(id);
      res.json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuario no encontrado') {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(500).json({ 
          message: 'Error al eliminar usuario', 
          error: error instanceof Error ? error.message : 'Error desconocido' 
        });
      }
    }
  }
} 