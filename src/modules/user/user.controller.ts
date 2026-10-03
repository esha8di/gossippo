import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

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

export const userCreateController = { userRegister };
