import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({error:"Unauthorized Access"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:"Unauthorized Access"});
        }

        const user = await userModel.findById(decoded.id).select("-password");
        if(!user){
            return res.status(401).json({error:"Unauthorized Access"});
        }

        req.user = user;
        next();
    }
    catch(error)
    {
        console.error("Error in protectRoute middleware: ",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export default protectRoute;