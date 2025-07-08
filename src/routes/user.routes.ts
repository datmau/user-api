import { Router } from 'express';
import { UserController } from '../controllers/user.controller'; 
import { isAuthenticated } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', isAuthenticated, authorizeRole(['USER','ADMIN']), UserController.getAll);
router.get('/:id', isAuthenticated, authorizeRole(['USER','ADMIN']), UserController.getById);
router.post('/', isAuthenticated, authorizeRole(['ADMIN']), UserController.create);
router.patch('/:id', isAuthenticated, authorizeRole(['ADMIN']), UserController.update);
//router.put('/:id', isAuthenticated, authorizeRole(['ADMIN']), UserController.update);
router.delete('/:id', isAuthenticated, authorizeRole(['ADMIN']), UserController.delete);
 
export default router;