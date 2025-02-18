
import express from 'express'
import { authRouter } from './authRouter'
import { doctorRouter } from './doctorRouter'
import { userRouter } from './userRouter'
import { appointmentRouter } from './apointmentRouter'

const router = express.Router()

router.use('/',authRouter)
router.use('/',doctorRouter)
router.use('/',userRouter)
router.use('/',appointmentRouter)


export {router}