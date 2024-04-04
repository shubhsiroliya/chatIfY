import userModel from "../models/userModel.js";
export const getAllUsers = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        // const users = await userModel.find({_id:{$ne:loggedInUserId}}).select("-password");
        const users = await userModel.find().select("-password");       
        res.status(200).json({users});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}