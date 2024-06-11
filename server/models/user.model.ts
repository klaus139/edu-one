import mongoose, {Document, Model,Schema,} from "mongoose";
import validator from "validator"

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    avatar:{
        public_id:string;
        url:string;
    };
    role:string;
    isVerified:boolean;
    courses:Array<{courseId:string}>;
    comparePassword:(password:string) => Promise<boolean>;
    SignAccessToken:()=> string;
    SignRefreshToken:()=>string;
}


const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "please enter your name"],
        },
        email:{
            type:String,
            required:[true, "Please enter your email address"],
            validate:{
                validator:function(value:string){
                    return validator.isEmail(value)
                },
                message:"please enter a valid email"
            },
            unique:true,
        },
        password:{
            type:String,
            minlength:[6,"password cannot be less than 6 characters"],
            select:false,//i want to remove the password from the payload
        },
        avatar:{
            public_id:String,
            url:String
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
        courses:[
            {
                courseId:String
            }
        ],
    },
    {timestamps:true}
)

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel