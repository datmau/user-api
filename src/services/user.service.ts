import { Role } from "@prisma/client";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export class UserService {
    static async getAll() {
        return await prisma.user.findMany({ select: { id: true, email: true, role: true, createdAt: true } });
    }

    static async getById(id: string) {
        return await prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, role: true, createdAt: true }
        });
    }

    static async create(data: { email: string; password: string; role: Role }) {
        const { email, password, role } = data;
        const hash = await bcrypt.hash(password, 10);
        return await prisma.user.create({
            data: {
                email,
                password: hash,
                role: role || Role.USER
            },
            select: { id: true, email: true, role: true, createdAt: true }
        });
    }

    static async update(id: string, data: { email?: string; password?: string; role?: Role }) {
        const{ password } = data;
        const hash = password ? await bcrypt.hash(password, 10) : undefined;
        return await prisma.user.update({
            where: { id },
            data:{
                ...data,
                password: hash ? hash : undefined,
            },
            select: { id: true, email: true, role: true, createdAt: true }
        });
    };

    static async delete(id: string) {
        return await prisma.user.delete({
            where: { id },
        });
    }
};