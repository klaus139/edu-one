import express, {NextFunction, Request, Response} from "express";
import cookieParser from "cookie-parser"
import cors from 'cors'
import morgan from "morgan"


export const app = express();

app.use(express.json({limit:"50mb"}));

app.use(cookieParser())

app.use(morgan('dev'));

app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}));



app.use('*', (req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any
    err.statusCode = 400;
    next(err);
})



