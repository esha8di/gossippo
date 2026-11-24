
import { NextFunction, Router } from 'express';
import { userCreateController } from './user.controller';
import { Request, Response } from 'express';
import { jwtUtils } from '../../utils/jwt';
import config from '../../config';
import { userService } from './user.service';
import { JwtPayload } from 'jsonwebtoken';
import { Role } from '../../../generated/prisma/enums'
import httpStatus from 'http-status';
declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                name: string;
                id: string;
                role: Role;
            };
        }
    }
}

const router = Router();

router.post('/register', userCreateController.userRegister);
router.get('/profile',async (req: Request,res: Response ,next: NextFunction)=>{
    const {accessToken} = req.cookies;
    const verifyAccessToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);
    
     if(typeof verifyAccessToken === "string") {
        throw new Error("Invalid access token");
     }
    
     const {email, name, id, role} = verifyAccessToken as JwtPayload;

     const requiredRole = [Role.ADMIN, Role.USER, Role.AUTHOR ];

     if(!requiredRole.includes(role as Role)) {
        return res.status(403).json({
            status: false,
            statusCode:httpStatus.FORBIDDEN,
            message: "You are not authorized to access this resource"
        });
     }

     req.user = {email, name, id, role};
     


    next();
}, userCreateController.getMyProfile);
export const  userRouter = router;