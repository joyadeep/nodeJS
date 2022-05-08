import express from 'express';
import Joi from 'joi';
import { Schema } from 'mongoose';


const validateLogin =async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try {
        const schema=Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().required()
        })
        const {error}=await schema.validate(req.body);
        if(error)
            return res.status(400).json({error:true,message:error.message})
        next();
    } catch (error) {
        return res.status(500).json({error:true,message:"cannot validate !!"})
    }

}

const validateRegister= async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try {
        const schame=Joi.object({
            email:Joi.string().email().required(),
            username:Joi.string().required(),
            password:Joi.string().required(),
            cpassword:Joi.ref("passwprd")
        })
        
        const {error,value}=await schame.validate(req.body);
        if(error)
            return res.status(401).json({error:true,message:error.message})
        next();
    } catch (error) {
        return res.status(500).json({error:true,message:"cannot execute code"})
    }
}

export {validateLogin,validateRegister};