import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespons";
import { authService } from "./auth.service";
import { Request, Response } from "express";

const userLogin = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const {accessToken, refreshToken} = await authService.userLogin(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 ,// 1 day

    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 ,// 1 day

    });

    
   sendResponse(res, {
    status: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: { accessToken, refreshToken }
})
});
export const authController = { userLogin };