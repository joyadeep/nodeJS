import mongoose from "mongoose";


const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.DB_CONN_URI!);
        await console.log("database connected successfully");
    } catch (error) {
        console.error(error);
        
    }
}

export default connectDB;
