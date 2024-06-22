import mongoose from "mongoose";
require("dotenv").config()

const dbUrl:string = process.env.DATABASE || ""

const connectDB = async() => {
    try{
        await mongoose.connect(dbUrl).then((data:any) => {
            console.log(`database is connected ${data.connection.host}`)
        })

    }catch(error:any){
        console.log(error)
    }
}

export default connectDB