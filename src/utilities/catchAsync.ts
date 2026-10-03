import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import AppError from "./AppError";
export const catchAsync = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            const statusCode = error instanceof AppError ? error.statusCode : httpStatus.INTERNAL_SERVER_ERROR;
            res.status(statusCode).json({
                status: false,
                statusCode,
                message: error instanceof Error ? error.message : "Internal Server Error"
            });
        }
    };
};
