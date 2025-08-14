import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { UpdateUserData } from '../types';

export class UserService {

  static async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
  }

  static async getPublicUsers() {
    return await prisma.user.findMany({
      select: {
        name: true
      }
    });
  }

  static async getUserById(id: string) {

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: {
          select: {
            avatar: true,
            bio: true,
          }
        }
      }
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return user;
  }

  static async getPublicUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
      }
    });
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return user;
  }

  static async updateUser(id: string, data: UpdateUserData) {
    // Verificar que el usuario existe
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // Actualizar solo los campos proporcionados
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
  }

  static async deleteUser(id: string) {
    // Verificar que el usuario existe
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // Eliminar el usuario
    await prisma.user.delete({
      where: { id }
    });

    return { message: 'Usuario eliminado exitosamente' };
  }
} 