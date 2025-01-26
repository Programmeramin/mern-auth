import {User} from "../models/user.models.js";
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

/**
 @description signup
 @method POST
 @route api/auth/signup
 @access public
 */
export const signup = async (req, res) =>{
    
    const {email, password, name} = req.body;

    try {

        // verification
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }
   
        const userAlreadyExists = await User.findOne({email});

        // exists user check
        if(userAlreadyExists){
            return res.status(400).json({success : false, message :  error.message, user : userAlreadyExists});     
        };
            

        // hash password
        const hashPass = await bcrypt.hash(password, 10);
    
        // verification code create function
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // create usrer
        const user = new User({
            email,
            password : hashPass,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        await user.save();

        // JWT Verification
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success : true,
            message : "User created successfully",
            user : {
                ...user._doc,
                password : undefined,
            }
        })

    }catch(error){
       res.status(400).json({success : false, message : error.message});
    }

}



/**
 @description login
 @method POST
 @route api/auth/login
 @access public
 */
 export const login = async (req, res) =>{
    res.send("login route");
}


/**
 @description logout
 @method POST
 @route api/auth/logout
 @access public
 */
 export const logout = async (req, res) =>{
    res.send("logout route");
}

