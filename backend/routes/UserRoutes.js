import express from 'express';
import { getActiveSessions, getAdmins, login, logout, signUp, updateUser } from '../controllers/UserController.js';
import { superAdminOnly } from '../middleware/Auth.js';

const userRouter = express.Router();

userRouter.post("/signUp",signUp);
userRouter.post("/login",login);
userRouter.delete("/logout",logout);
userRouter.post("/getAdmins",getAdmins);
userRouter.post("/updateUser",superAdminOnly,updateUser);
userRouter.post("/getActiveSessions",getActiveSessions);


export default userRouter;