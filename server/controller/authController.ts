import { NextFunction, Request, Response } from "express"
import userModel from "../models/user.model";


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

        const newUser = await userModel.create({
            name, email, password
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