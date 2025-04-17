import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/is-auth", userAuth, isAuthenticated);
export default router;
