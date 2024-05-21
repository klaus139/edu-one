import mongoose, {Document, Model, Schema} from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";


export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    avatar:{
        public_id:string;
        url:string
    };
    role:string;
    courses:Array<{courseId:string}>;
    comparePassword:(password:string) => Promise<boolean>;
    SignAccessToken:() => string;
    SignRefreshToken:() => string;

}

const userSchema: Schema<IUser>= new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "please enter your name"]
        },
        email:{
            type: String,
            required:[true, "please enter your email"],
            validate:{
                validator: function(value:string){
                    return validator.isEmail(value)
                },
                message:"please enter a valid email"
            },
            unique:true,
        },
        password:{
            type:String,
            required:[true, "please enter your password"],
            minLenght:[6, "Password cannot be less than 6 characters"],
            select:false //hides the password field in the response from the database
        },
        avatar:{
            public_id:String,
            url:String,
        },
        role:{
            type:String,
            default:"user"
        },
        courses:[
            {
                courseId:String
            }
        ]
    },{timestamps:true}

);


//hash the password before saving
userSchema.pre<IUser>("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//sign access token
userSchema.methods.SignAccessToken = function(){
    return jwt.sign({id:this._id}, process.env.ACCESS_TOKEN || "",{
        expiresIn:'3d'
    });
}

//sign refreshtoken
userSchema.methods.SignRefreshToken = function(){
    return jwt.sign({id:this._id}, process.env.REFRESH_TOKEN || "",{
        expiresIn:'7d'
    });
}

userSchema.methods.comparePassword = async function(
    enteredPassword:string
):Promise<boolean>{
    return await bcrypt.compare(enteredPassword, this.password)
};

const userModel:Model<IUser>= mongoose.model("user", userSchema);
export default userModel;