import { messages } from "../../config";
import { apiResponse } from "../common";
import { doctorApptUpcoming, patientupcoming_appt } from "../middleware/sendmail";
import { appointmentModel, doctorModel, userModel } from "../models";
import cron from "node-cron";

cron.schedule("* */4 * * *", async (req, res) => {
    try {
        const currentTime = new Date();
        const fourHoursLater = new Date(currentTime.getTime() + 4 * 60 * 60 * 1000);

        const appointmentData = await appointmentModel.findOne({
            appointmentTime: {
                $gte: currentTime,
                $lte: fourHoursLater,
            },
            status: "scheduled",
        });

        if (appointmentData === null) {
            return res.status(401).json(new apiResponse(401,messages.APPOINTMENT_NOT_FOUND,{},{}));
        }

        let patientId = appointmentData.patient;
        let doctorId = appointmentData.doctor;

        const userId = await userModel.findOne(patientId);
        const doctor = await doctorModel.findOne(doctorId);

        await patientupcoming_appt(userId.email);
        await doctorApptUpcoming(doctor.email);
    } catch (error) {
        res.status(500).json(new apiResponse(500,messages.SERVER_ERROR,{},{error:error.message}));
    }
});
