import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import jwt from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";

import { sendResponse } from "../../utils/sendRespons";

const userRegister = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await userService.createUserintoDB(payload);

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: { user },
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {

 const {accessToken} = req.cookies;
 const verifyAccessToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);
 res.send("My profile data");
 console.log(verifyAccessToken);

});

export const userCreateController = { userRegister, getMyProfile };
