
import { Router } from 'express';
import { userCreateController } from './user.controller';




const router = Router();

router.post('/register', userCreateController.userRegister);
export const  userRouter = router;