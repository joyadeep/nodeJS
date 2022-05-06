import express from 'express';
import userRoute from './src/routes/userRoutes';

const app:express.Application =express();

app.use(express.json());

//middlewares
app.use("/api/user",userRoute);

app.get("/",(req:express.Request,res:express.Response)=>{
    console.log("app status : normal");
    res.status(200).json({error:false,message:"app status : normal"})   
})

app.listen(5000,()=>{
    console.log("server running at port 5000");
    
})