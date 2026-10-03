
import { Router } from 'express';
import { authController } from './auth.controller';




const router = Router();

router.get('/login', authController.userLogin);
export const  authRouter = router;