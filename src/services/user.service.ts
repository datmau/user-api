import { prisma } from '../lib/prisma';

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
        id: true,
        name: true,
        role: true,
        avatar: true,
        bio: true,
      }
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
        id: true,
        name: true,
        role: true,
        avatar: true,
        bio: true,
      }
    });
  }
} 