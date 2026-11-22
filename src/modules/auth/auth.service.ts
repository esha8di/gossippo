import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import appError from "../../utils/appError";
import { TloginPayload } from "./auth.interface";
import jwt from "jsonwebtoken";

const userLogin = async (payload: TloginPayload) => {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if(!user) {
        throw new appError(401, "Invalid email or password");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched) {
        throw new appError(401, "Invalid email or password");
    }
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {});
    
    return user;

}

export const authService = { userLogin };