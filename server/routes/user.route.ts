import express,{Request, Response} from "express"
import { createUser, loginUser } from "../controller/authController"

const userRouter = express.Router()

userRouter.post("/register", createUser )
userRouter.post('/login', loginUser)



export default userRouter;


///MODULATION... CREATING A MODULE IN NODE