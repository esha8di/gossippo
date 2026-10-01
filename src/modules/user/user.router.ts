
import { Router } from 'express';
import { userCreateController } from './user.controller';




const router = Router();

const userRegister = router.post('/register', userCreateController.userRegister);
export const  userCreateRouter = userRegister;