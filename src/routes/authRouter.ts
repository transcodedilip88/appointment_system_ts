import express from "express";
import { authController } from "../controllers";
import { authValidation } from "../validations";


const router = express.Router();

router.post("/register", authValidation.register, authController.register);
router.post('/login', authValidation.login, authController.login)
router.post('/forgotpassword', authValidation.forgotPassword, authController.forgotPassword)
router.post('/resetpassword', authValidation.resetPassword, authController.resetPassword)
router.post('/verify', authValidation.verify, authController.verify)

export const authRouter = router
