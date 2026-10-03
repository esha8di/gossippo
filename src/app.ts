import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express"
import config from "./config";
import  { userRouter } from "./modules/user/user.router";


const app:Application = express();

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

app.use("/app/users", userRouter);



export default app;

