import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

// env config
dotenv.config();

// init app
const app = express();
const PORT = process.env.PORT || 5050

// Set Up Middlewares
app.use(express.json()); // allows us to parse incoming requests with JSON payloads
app.use(express.urlencoded({extended : false}))


// routing
app.use("/api/auth", authRoutes);

// listen server
app.listen(PORT, () =>{
    connectDB();
    console.log(`Server is running on port ${PORT}`.bgGreen.white);
    
}) 
