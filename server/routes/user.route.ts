import express,{Request, Response} from "express"
import { createUser } from "../controller/authController"

const userRouter = express.Router()

userRouter.post("/register", createUser )



export default userRouter;


///MODULATION... CREATING A MODULE IN NODE