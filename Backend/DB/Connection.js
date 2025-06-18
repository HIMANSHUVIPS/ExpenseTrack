import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected ✅");
    } catch (error) {
        console.log("Error Connecting DB ❌",error);
    }
};

export default ConnectDB;