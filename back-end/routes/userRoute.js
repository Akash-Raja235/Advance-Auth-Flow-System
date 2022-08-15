import express from 'express'
import { signup } from '../controllers/UserController.js';
import {
  signin,
  verifyEmail,
  ForgotPassword,
  ForgotPasswordChange,
  changePassword,
  loggedUser,
} from "../controllers/UserController.js";
import checkAuth from '../middleware/auth_middleware.js';
const router =express.Router()

// midddleware
// router.use('/change-password',checkAuth)

// public route
router.post('/signup',signup)
router.post('/signin',signin)
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", ForgotPassword);

router.post("/forgot-password-change/:id/:token", ForgotPasswordChange);


// protected route
router.post("/change-password",checkAuth,  changePassword);
router.get("/logged-user",checkAuth, loggedUser);
export default router;