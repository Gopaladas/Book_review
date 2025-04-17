import express from "express";
import userAuth from "../middleware/userAuth.js";
import { bookData, bookDetails, downloadBook, getUserData, updateUser } from "../controllers/userController.js";
import { review } from "../controllers/reviewControllers.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.get("/downloadBook/:bookId", userAuth, downloadBook);
userRouter.post("/review/:bookId",userAuth,review);
userRouter.get("/bookData",bookData);
userRouter.get("/bookdetails/:bookId",bookDetails)
userRouter.post("/updateProfile",userAuth,updateUser);
export default userRouter;
