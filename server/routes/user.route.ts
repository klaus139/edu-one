import express,{Request, Response} from "express"

const userRouter = express.Router()

userRouter.post("/register", (req:Request, res:Response) => {
    res.status(200).json({
        message:"you are working in the router file"
    })
})


userRouter.get("/password", (req:Request, res:Response) => {
    res.status(200).json({
        message:"I want a password reset"
    })
})


export default userRouter;


///MODULATION... CREATING A MODULE IN NODE