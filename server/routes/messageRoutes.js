import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";
const messageRoutes = express.Router();

messageRoutes.route("/send/:id").post(protectRoute,sendMessage);
messageRoutes.route("/:id").get(protectRoute,getMessages);

export default messageRoutes;
