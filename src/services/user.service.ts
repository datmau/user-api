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
        avatar: true,
        bio: true,
        createdAt: true
      }
    });
  }

  static async getPublicUsers() {
    return await prisma.user.findMany({
      select: {
        name: true,
        avatar: true,
        bio: true      }
    });
  }

  static async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        createdAt: true
      }
    });
  }

  static async getPublicUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        avatar: true,
        bio: true,
      }
    });
  }

  static async updateUser(id: string, data: UpdateUserData) {
    // Verificar que el usuario existe
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new Error('Usuario no encontrado');
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
        avatar: true,
        bio: true,
        createdAt: true
      }
    });
  }

  static async deleteUser(id: string) {
    // Verificar que el usuario existe
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new Error('Usuario no encontrado');
    }

    // Eliminar el usuario
    await prisma.user.delete({
      where: { id }
    });

    return { message: 'Usuario eliminado exitosamente' };
  }
} 