import express from "express";
import { userController } from "../controllers";
import { userValidation } from "../validations";
import { isAuthorized } from "../middleware/jwtAuth";
const router = express.Router();

router.put('/user/:id',userValidation.updateUserById,isAuthorized(['admin','patient']),userController.updateUserById)
router.get('/user/:id',userValidation.getUserById,isAuthorized(['admin']),userController.getUserById)
router.get('/users',userValidation.getAllUser,isAuthorized(['admin']),userController.getAllUser)
router.delete('/user/:id',userValidation.deleteUserById,isAuthorized(['admin']),userController.deletedUserById)

export const userRouter = router