import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const Connection = ()=>{
    const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@gmail-clone.ii6mq1y.mongodb.net/?retryWrites=true&w=majority`
    try{
        // console.log(DB_URI);
        mongoose.connect(DB_URI);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log(`Error while connecting with the database`,err.message);
    }
}
export default Connection;