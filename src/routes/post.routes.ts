import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';
import { PostController } from '../controllers/post.controller';
const router = Router();


router.post('', isAuthenticated,  authorizeRole([Role.ADMIN, Role.USER]), PostController.createPost);
router.get('', isAuthenticated, authorizeRole([Role.ADMIN, Role.USER]), PostController.getAllPost);

export default router;


