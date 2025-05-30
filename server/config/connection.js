// server/config/connection.ts
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooksdb';
// Optional: avoid deprecation warnings
mongoose.set('strictQuery', true);
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('🚀 MongoDB connected successfully');
    }
    catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};
export default connectDB;
