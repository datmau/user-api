import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateDto } from '../middlewares/validate.middleware';
import { CreateUserDto } from '../dto/create-user.dto';


const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

export default router;
