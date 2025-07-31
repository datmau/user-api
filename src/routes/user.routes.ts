import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Rutas protegidas para usuarios autenticados
router.get('', isAuthenticated, authorizeRole([Role.ADMIN, Role.USER]), UserController.getAllUsers);
router.get('/:id', isAuthenticated, authorizeRole([Role.ADMIN, Role.USER]), UserController.getUserById);
router.patch('/:id', isAuthenticated, authorizeRole([Role.ADMIN]), UserController.updateUser);
router.delete('/:id', isAuthenticated, authorizeRole([Role.ADMIN]), UserController.deleteUser);

// Rutas públicas (sin email y password)
router.get('/public', UserController.getPublicUsers);
router.get('/public/:id', UserController.getPublicUserById);

export default router; 
