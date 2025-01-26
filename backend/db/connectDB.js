import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgBlue.white);
        
    }catch(error){
          console.log(`Error connection to MongoDB: `.bgRed.black, error.message);
          process.exit(1) // failure , 0 status code is success
    }
}