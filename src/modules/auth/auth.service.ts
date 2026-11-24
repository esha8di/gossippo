import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import appError from "../../utils/appError";
import { TloginPayload } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const userLogin = async (payload: TloginPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new appError(401, "Invalid email or password");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new appError(401, "Invalid email or password");
  }

  const jsonPlayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  // const accessToken = jwt.sign(
  //     jsonPlayload,
  //     config.jwt_access_secret, { expiresIn: config.jwt_access_expires_in } as jwt.SignOptions);

  const accessToken = jwtUtils.tokenCreate(
    jsonPlayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as jwt.SignOptions,
  );

//   const refreshToken = jwt.sign(jsonPlayload, config.jwt_refresh_secret, {
//     expiresIn: config.jwt_refresh_expires_in,
//   } as jwt.SignOptions);
const refreshToken = jwtUtils.tokenCreate(
    jsonPlayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as jwt.SignOptions,
  );

  return { accessToken, refreshToken };
};

export const authService = { userLogin };
