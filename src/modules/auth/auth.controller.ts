import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespons";
import { authService } from "./auth.service";
import { Request, Response } from "express";

const userLogin = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await authService.userLogin(payload);
   sendResponse(res, {
    status: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: user,
})
});
export const authController = { userLogin };