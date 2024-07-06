import { NextFunction, Request, Response } from "express"
import userModel from "../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export const createUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
        //try to create a user
        const {name, email, password} = req.body;

        //chek if the user is already existing

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message:"user already exist, please login instead"
            })
        }

        //i need to encrypy my password

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            name, email, password:hashPassword
        });

        res.status(200).json({

            message:"user created successfully",
            newUser
        })


    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"internal server error"
        })

    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Please fill in your email and password"
            });
        }
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email }).select("+password");
      
        if (!existingUser) {
            return res.status(400).json({
                message: "Email does not exist please register"
            });
        }

        // Check for the password
        const isMatchedPassword = await bcrypt.compare(password, existingUser.password);
        if (!isMatchedPassword) {
            return res.status(400).json({
                message: "Password is not correct"
            });
        }

        // TODO CREATE A TOKEN
        const token = jwt.sign({id:existingUser._id}, process.env.ACCESS_TOKEN!,{
            expiresIn:"3d"
        })

        return res.status(200).json({
            message: "User logged in successfully",
            data:{
                existingUser,
                token
            }

        });

    } catch (error:any) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while logging in",
            error: error.message
        });
    }
}