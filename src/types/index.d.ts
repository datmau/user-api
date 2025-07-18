import { Role } from '@prisma/client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export interface PublicUser {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: Role;
  avatar?: string;
  bio?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: Role;
  avatar?: string;
  bio?: string;
}

export interface LoginResponse {
  token: string;
  id: string;
  name: string;
  email: string;
  role: Role;
}
