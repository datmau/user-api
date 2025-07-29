import { Role } from '@prisma/client';


// DTO (Data Transfer Object) definitions for user-related operations
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
  name: string;
  avatar?: string;
  bio?: string;
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
