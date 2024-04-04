import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";
const userRoutes = express.Router();

userRoutes.route("/users").get(protectRoute,getAllUsers);


export default userRoutes;
