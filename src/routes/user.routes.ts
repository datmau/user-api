import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Rutas protegidas para usuarios autenticados
router.get('/users', isAuthenticated, authorizeRole([Role.ADMIN, Role.USER]), UserController.getAllUsers);
router.get('/users/:id', isAuthenticated, authorizeRole([Role.ADMIN, Role.USER]), UserController.getUserById);

// Rutas públicas (sin email y password)
router.get('/public/users', UserController.getPublicUsers);
router.get('/public/users/:id', UserController.getPublicUserById);

export default router; 
