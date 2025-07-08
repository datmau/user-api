import { Request, Response } from "express";
import { UserService } from '../services/user.service';

export class UserController {

    static async getAll(req: Request, res: Response){
        const users = await UserService.getAll();
        res.json(users);
    }

    static async getById(req: Request, res: Response){
        const user = await UserService.getById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }

    static async create(req: Request, res: Response){
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            res.status(400).json({ message: 'Email, password and role are required' });
            return;
        }
        const user = await UserService.create({ email, password, role });
        res.status(201).json(user);
    }

    static async update(req: Request, res: Response){
        const { email, password, role } = req.body;
        if (!email && !password && !role) {
            res.status(400).json({ message: 'At least one field is required to update' });
            return;
        }
        const user = await UserService.update(req.params.id, { email, password, role });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }

    static async delete(req: Request, res: Response){
        const user = await UserService.getById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        await UserService.delete(req.params.id);
        res.status(204).send();
    }
};