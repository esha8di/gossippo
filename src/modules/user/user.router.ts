
import { Router } from 'express';
import { userCreateController } from './user.controller';




const router = Router();

router.post('/register', userCreateController.userRegister);
router.get('/profile', userCreateController.getMyProfile);
export const  userRouter = router;