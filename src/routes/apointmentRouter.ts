import express from "express"
import { appointmentValidation } from "../validations"
import { isAuthorized } from "../middleware/jwtAuth"
import { appointmentController } from "../controllers"
const router = express.Router()

router.post('/appointment', appointmentValidation.bookAppointment, isAuthorized(['admin', 'patient']), appointmentController.bookAppointment)
router.get('/appointment/:id', appointmentValidation.getAppointmentById, isAuthorized(['admin', 'patient']), appointmentController.getAppointmentById)
router.post('/appointment/:id', appointmentValidation.cancelledAppointmentById, isAuthorized(['admin', 'patient']), appointmentController.cancelledAppointmentById)
router.get('/appointment', appointmentValidation.getAllAppointments, isAuthorized(['admin', 'patient']), appointmentController.getAllAppointments)
router.put('/appointment/:id', appointmentValidation.updateAppointmentById, isAuthorized(['admin', 'patient']), appointmentController.updateAppointmentById)

export const appointmentRouter = router