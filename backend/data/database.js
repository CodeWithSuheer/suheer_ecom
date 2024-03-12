import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: 'suheer_ecom' })
        .then(() => console.log('Database Working'))
        .catch(() => console.log('Database Not Connected'));
} 