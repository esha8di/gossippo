import jwt,{JwtPayload} from "jsonwebtoken";
const tokenCreate = (payload: JwtPayload, secret: string, expiresIn: jwt.SignOptions) => {
    return jwt.sign(payload, secret, { expiresIn: expiresIn } as jwt.SignOptions);
}

const verifyToken = (token: string, secret: string)=>{
    const verifiedToken = jwt.verify(token, secret);
    try{
        return verifiedToken;

    }
catch(err){
    console.log(err);
};
}
export const jwtUtils = { tokenCreate, verifyToken };