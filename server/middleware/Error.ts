import {NextFunction, Request, Response} from "express";
import ErrorHandler from "../utils/Errorhandler";

export const ErrorMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {
    err.statusCode = err.StatusCode || 500;
    err.message = err.message || "Internal server error"

    //if we wrong mongodb id error
    if(err.name === 'CastError'){
        const message = `Resource not found. invalid:${err.path}`;
        err = new ErrorHandler(message, 400)
    }

    //duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
    }

    //jwt error
    if(err.name === "jsonWebTokenError"){
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message, 400)
    }

    if(err.name === "TokenExpiredError"){
        const message = `Your token has expired, please login`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}