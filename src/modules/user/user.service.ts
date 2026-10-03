
import { prisma } from '../../lib/prisma';
import { Request, Response } from "express";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import config from "../../config";
import AppError from "../../utilities/AppError";

const createUserintoDB = async (userData: any) => {
    const { name, email, password, profilePhoto } = userData;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (isUserExist) {
        throw new AppError(httpStatus.CONFLICT, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));


    const userCreate = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    await prisma.profile.create({
        data: {
            userId: userCreate.id,
            profilePhoto: profilePhoto || null
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: userCreate.id ,      
            email: userCreate.email
        },
        include: {
            profile: true
        },
        omit: {
            password: true
        }
    });
    return user;
}

export const userService = { createUserintoDB };