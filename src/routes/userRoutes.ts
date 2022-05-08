import express from 'express';
import bcrypt from 'bcryptjs';
import Joi, { string } from 'joi';
import UserModel from '../models/UserModel';
import {validateLogin, validateRegister} from '../middleware/userValidation';
const userRoute:express.Router=express.Router();


userRoute.get("/",(req:express.Request,res:express.Response)=>{
    
    res.status(200).json({error:false,message:"userRoute executed !!"})
})

userRoute.get("/users",async(req:express.Request,res:express.Response)=>{
    try {
        const result= await UserModel.find();
        if(!result)
            return res.status(500).json({error:true,message:"no user found"})
        return res.status(200).json({error:false,message:result})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:true,message:"cannot execute route"})
        
    }
})

userRoute.post("/login",validateLogin,async(req:express.Request,res:express.Response)=>{
    try {
        const {email,password}=req.body;
       
        const result=await UserModel.findOne({email:email});
        if(!result)
            return res.status(400).json({error:true,message:"user not found"})
        
        const checkPw=await bcrypt.compare(password,result.password);
        if(!checkPw)
            return res.status(400).json({error:true,message:"password not matched !"})
        
        return res.status(200).json({error:false,message:result})

    } catch (error) {
        console.error(error);
        res.status(400).json({error:true,message:error})
    }
})
userRoute.post("/register",validateRegister,async(req:express.Request,res:express.Response)=>{
    try {
        const {email,username,password,cpassword}=req.body;
        
        const salt=await bcrypt.genSalt(10);
        const hashed=await bcrypt.hash(password,salt);
        const user=new UserModel({
            email,username,password:hashed
        })
        const result=await user.save();
        if(!result)
        {
            return res.status(400).json({error:false,message:"something went wrong"})
        }
        return res.status(200).json({error:false,message:result})
    } catch (error) {
        console.error(error);
        res.status(400).json({error:true,message:error})
    }
})

userRoute.delete("/:_id",async(req,res)=>{
    try {
        const result=await UserModel.findByIdAndDelete(req.params._id);

        if (!result)
            return res.status(400).json({error:true,message:"user not found"})
        return res.status(200).json({error:false,message:"user deleted successfully !"})
    } catch (error) {
        return res.status(500).json({error:true,message:"cannot execute code !"})
    }
})

export default userRoute;