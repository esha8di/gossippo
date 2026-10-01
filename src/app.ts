import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express"
import config from "./config";
import httpStatus from "http-status";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
const app:Application = express()

app.use(cors({
    origin: config.app_url,
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req:Request,res:Response) => {
    res.send("Hello, World! I am Esha")
})

app.post("/app/users/register", async (req:Request,res:Response) => {
    const { name,email, password ,profilePhoto} = req.body;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (isUserExist) {
        return res.status(httpStatus.CONFLICT).json({ message: "User already exists" });
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
});

export default app;

