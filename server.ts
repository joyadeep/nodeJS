import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/db/connection';
import userRoute from './src/routes/userRoutes';

const app:express.Application =express();

dotenv.config();

app.use(express.json());

connectDB();
//middlewares
app.use("/api/user",userRoute);

app.get("/",(req:express.Request,res:express.Response)=>{
    console.log("app status : normal");
    res.status(200).json({error:false,message:"app status : normal"})   
})

app.listen(process.env.PORT,()=>{
    console.log(`server running at port ${process.env.PORT}`);  
})