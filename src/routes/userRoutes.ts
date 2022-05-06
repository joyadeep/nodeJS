import express from 'express';
import bcrypt from 'bcryptjs';
import Joi, { string } from 'joi';
import UserModel from '../models/UserModel';
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

userRoute.post("/login",async(req:express.Request,res:express.Response)=>{
    try {
        const {email,password}=req.body;
        const schema=Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().required()
        })

        const {error,value}=await schema.validate(req.body);

        if(error){
            return res.status(400).json({error:true,message:error.message})
        }

        const result=await UserModel.findOne({email:email});
        if(!result)
            return res.status(400).json({error:true,message:"user not found"})
        
        

        return res.status(200).json({error:false,message:result})

    } catch (error) {
        console.error(error);
        res.status(400).json({error:true,message:error})
    }
})

userRoute.get("/test",async(req,res)=>{
    try {
        const result=await UserModel.findOne({email:"dev.joyadeep@gmail.com"});
        if(!result)
            return res.status(400).json({error:true,message:"user not found"})
        return res.status(200).json({error:false,message:result})
    } catch (error) {
        return res.status(400).json({error:true,message:"something went wrong"})
    }
})

userRoute.post("/test",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const result=await UserModel.findOne({email:email});
        if(!result)
            return res.status(400).json({error:true,message:"user not found"})
        return res.status(200).json({error:false,message:result})
    } catch (error) {
        return res.status(400).json({error:true,message:"something went wrong"})
    }
})

userRoute.post("/register",async(req:express.Request,res:express.Response)=>{
    try {
        const {email,username,password,cpassword}=req.body;
        
        const schema=Joi.object({
          email:Joi.string().email().required().messages({
              "any.required":"email is required"
          }),
          username:Joi.string().alphanum().min(6).max(15).required(),
          password:Joi.string().required(),
          cpassword:Joi.ref("password")
        })

        const{error,value}=await schema.validate(req.body);

        if(error)
            return res.status(400).json({error:true,message:error.message})

        
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

export default userRoute;