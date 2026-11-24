import jwt, { JwtPayload } from "jsonwebtoken";
const tokenCreate = (
  payload: JwtPayload,
  secret: string,
  expiresIn: jwt.SignOptions,
) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn } as jwt.SignOptions);
};

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return verifiedToken;
  } catch (err:any) {
    console.error("Error verifying token:", err);
    throw new Error(err.message || "Token verification failed");
  }
};
export const jwtUtils = { tokenCreate, verifyToken };
