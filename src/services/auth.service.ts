import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { signToken } from '../utils/jwt';
import { Role } from '@prisma/client';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: Role;
  avatar?: string;
  bio?: string;
}

export class AuthService {
    
  static async register(data: RegisterData) {
    const { name, email, password, role = Role.USER, avatar, bio } = data;
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ 
      data: { 
        name,
        email, 
        password: hash, 
        role,
        avatar,
        bio 
      } 
    });
    return signToken({ id: user.id, role: user.role });
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) throw new Error('Error de login');
    return { token: signToken({ id: user.id, role: user.role }), id: user.id, name: user.name, email: user.email, role: user.role };
  }
}
