import jwt,{JwtPayload} from "jsonwebtoken";
const tokenCreate = (payload: JwtPayload, secret: string, expiresIn: jwt.SignOptions) => {
    return jwt.sign(payload, secret, { expiresIn: expiresIn } as jwt.SignOptions);
}

export const jwtUtils = { tokenCreate };