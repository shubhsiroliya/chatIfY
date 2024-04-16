import userModel from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupController = async (req,res)=>{
    try{
        const {fullname:name,username,password,confirmpassword,gender} = req.body;
        if(password !== confirmpassword) {
            return res.status(400).json({message:"Password and Confirm Password do not match"});
        }

        const user = await userModel.findOne({username});
        if(user){
            return res.status(400).json({message:"Username already exists"});
        }
        const boyProfilePic = "https://avatar.iran.liara.run/public/48";
        const girlProfilePic = "https://avatar.iran.liara.run/public/75";
        const newUser = new userModel({
            name,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                username:newUser.username,
                profilePic:newUser.profilePic
            });
        }
        else{
            return res.status(400).json({error:"Invalid User Data"});
        }
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
    
}

export const loginController = async (req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await userModel.findOne({username});
        if(user && await user.matchPassword(password)){
            generateTokenAndSetCookie(user._id,res);
            res.status(200).json({
                _id:user._id,
                name:user.name,
                username:user.username,
                profilePic:user.profilePic
            });
        }
        else{
            res.status(401).json({error:"Invalid Credentials"});
        }
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const logoutController = (req,res)=>{ 
    try{
        res.cookie("token","",{httpOnly:true,maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}