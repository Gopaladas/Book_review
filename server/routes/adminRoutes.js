import express from "express";
import {
  deleteBook,
  getAdminData,
  login,
  register,
  uploadBook,
} from "../controllers/adminController.js";
import upload from "../utils/pdfUpload.js";
const adminRoutes = express.Router();
import userAuth from "../middleware/userAuth.js";

adminRoutes.post("/admin-register", register);
adminRoutes.post("/admin-login", login);
adminRoutes.post(
  "/upload",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  userAuth,
  uploadBook
);

adminRoutes.post("/delete/:bookId", userAuth, deleteBook);
adminRoutes.get("/admindata",userAuth,getAdminData);

export default adminRoutes;
