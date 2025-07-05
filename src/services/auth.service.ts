import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { signToken } from '../utils/jwt';



export class AuthService {
    
  static async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hash, role: 'USER' } });
    return signToken({ id: user.id, role: user.role });
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) throw new Error('Error de login');
    return signToken({ id: user.id, role: user.role });
  }
}
