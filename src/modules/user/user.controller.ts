import { prisma } from '../../lib/prisma';
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import config from "../../config";

const userRegister = async (req:Request,res:Response) => {
    const { name,email, password ,profilePhoto} = req.body;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (isUserExist) {
        throw new Error("User already exists");
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

    res.status(httpStatus.CREATED).json({ message: "User registered successfully", user });
}

export const userCreateController = {userRegister};