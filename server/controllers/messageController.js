import messageModel from '../models/messageModel.js';
import conversationModel from './../models/conversationModel.js';
export const sendMessage=async(req,res)=> {

    try{
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        let converstation = await conversationModel.findOne({
            participants:{ $all:[senderId,receiverId]}
        })

        if(!converstation){
            converstation = await conversationModel.create(
                {
                    participants:[senderId,receiverId],
                }
            )
        }
        
        const newMessage  = new messageModel({
            senderId,
            receiverId,
            message
        })
        
        if(newMessage){
            converstation.messages.push(newMessage._id);            
        }

        // socket io fucntionality


        await Promise.all([converstation.save(),newMessage.save()]);
        return res.status(201).json({newMessage});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getMessages = async(req,res)=>{
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await conversationModel.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages");

        if(!conversation){
            return res.status(200).json({messages:[]});
        }

        const messages = conversation.messages;
        res.status(200).json({messages});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal Server Error" });
    }
}