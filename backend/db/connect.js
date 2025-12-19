import mongoose from "mongoose";
const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{})
        console.log("Database is connected successfully");
    } catch (error) {
        console.log("Failed to connect the Database!",error.message);
    }
};
export default connect;