import express from "express"
import { doctorController } from "../controllers"
import { doctorValidation } from "../validations"
import { isAuthorized } from "../middleware/jwtAuth"

const router = express.Router()

router.post('/doctor', doctorValidation.doctorAdd, isAuthorized(['admin']), doctorController.doctorAdd)
router.get('/doctor', doctorValidation.getAllDoctor, isAuthorized(['admin']), doctorController.getAllDoctor)
router.get('/doctor/:id', doctorValidation.getDoctorById, isAuthorized(['admin']), doctorController.getDoctorById)
router.put('/doctor/:id', doctorValidation.updateDoctorById, isAuthorized(['admin']), doctorController.updateDoctorById)
router.delete('/doctor/:id', doctorValidation.deletedDoctorById, isAuthorized(['admin']), doctorController.deletedDoctorById)

export const doctorRouter = router