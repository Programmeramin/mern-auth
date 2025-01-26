import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

// env config
dotenv.config();

// init app
const app = express();

app.get("/",(req, res) =>{
    res.send("Hello world!")
    
});

// routing
app.use("/api/auth", authRoutes);

// listen server
app.listen(3000, () =>{
    connectDB();
    console.log("Server is running on port 3000".bgGreen.white);
    
})
