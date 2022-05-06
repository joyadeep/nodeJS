import express from 'express';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const userRoute:express.Router=express.Router();

userRoute.get("/",(req:express.Request,res:express.Response)=>{
    res.status(200).json({error:false,message:"userRoute executed !!"})
})

userRoute.post("/login",(req:express.Request,res:express.Response)=>{
    try {
        const {email,password}=req.body;
        res.status(200).json({error:false,message:req.body})

    } catch (error) {
        console.error(error);
        res.status(400).json({error:true,message:error})
    }
})

userRoute.post("/register",async(req:express.Request,res:express.Response)=>{
    try {
        const {email,username,password,cpassword}=req.body;
        const schema=Joi.object({
          email:Joi.string().email().required(),
          username:Joi.string().alphanum().min(6).max(15).required(),
          password:Joi.string().required(),
          cpassword:Joi.ref("password")
        })

        const{error,value}=await schema.validate(req.body);

        if(error)
            return res.status(400).json({error:true,message:error.message})

        const salt=await bcrypt.genSalt(10);
        const hashed=await bcrypt.hash(password,salt);

        return res.status(200).json({error:false,message:req.body,hashedPW:hashed})
    } catch (error) {
        console.error(error);
        res.status(400).json({error:true,message:error})
    }
})

export default userRoute;