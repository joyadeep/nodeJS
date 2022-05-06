import { string } from "joi";
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },

    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }

})

interface Iuser{
    email:string;
    username?:string;
    password:string;
    role?:string;
}

export default mongoose.model<Iuser>("User",userSchema);