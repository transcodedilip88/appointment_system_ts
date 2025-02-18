import mongoose from "mongoose";
import { appt_cancelled, appt_Updated, Boocked_mail, } from "../../middleware/sendmail";
import { mongoService } from "../../helpers";
import { messages } from "../../../config";
import { apiResponse } from "../../common";
import { appointmentModel, userModel } from "../../models";
let ObjectId = mongoose.Types.ObjectId

export const bookAppointment = async (req, res) => {
  try {
    const { doctor, appointmentTime, updatedBy, cretedBy, patient } = req.body;
    let patientId = req.user.id;

    let correctTime = new Date();

    if (appointmentTime < correctTime) {
      return res.status(405).json(new apiResponse(405, messages.INVALID_TIME, {}, {}));
    }

    const newAppointmentToSave = {
      patient: patientId,
      doctor,
      appointmentTime,
      cretedBy: patientId,
      updatedBy: patientId,
    };

    const appointmentData = await mongoService.creteData(appointmentModel, newAppointmentToSave);

    await Boocked_mail(req.user.email);
    res.status(200).json(new apiResponse(200, messages.APPOINTMENT_BOOK, appointmentData, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointmentData = await mongoService.getFirstMatchId(appointmentModel, id);
    res.status(200).json(new apiResponse(200, messages.DATA_GET, appointmentData, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const cancelledAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointmentData = await mongoService.updateData(appointmentModel, id, { status: "cancelled", }, {});

    let patientId = appointmentData.patient;
    let user = await mongoService.getFirstMatchId(appointmentModel, patientId);
    await appt_cancelled(user.email);
    res.status(200).json(new apiResponse(200, messages.APPOINTMENT_CANCELLED, appointmentData, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const { patient, doctor, status, startTime, endTime } = req.query;

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    let matchCondition: any = {
    };

    if (patient) {
      matchCondition.patient = new ObjectId(patient);
    }
    if (doctor) {
      matchCondition.doctor = new ObjectId(doctor);
    }

    if (status) {
      matchCondition.status = status;
    }

    if (startTime && endTime) {
      matchCondition.appointmentTime = {
        $gt: new Date(startTime),
        $let: new Date(endTime),
      };
    }

    const appointmentData = await mongoService
      .aggregateData(appointmentModel, [
        {
          $match: matchCondition,
        },
        {
          $lookup: {
            from: "patients",
            let: { patient: "$patient" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ["$_id", "$$patient"] }],
                  },
                },
              },
            ],
            as: "patientData",
          },
        },
        {
          $lookup: {
            from: "doctors",
            let: { doctor: "$doctor" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    and: [{ $eq: ["$_id", "$$doctor"] }],
                  },
                },
              },
            ],
            as: "doctorData",
          },
        },
      ])
      // .skip((page - 1) * limit)
      // .limit(limit);

    res.status(200).json(new apiResponse(200, messages.DATA_GET, appointmentData, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const updateAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const { appointmentTime } = req.body;
    let body = req.body;
    const updateAppointment = await mongoService.updateData(
      appointmentModel,
      id,
      body,
      { status: "completed", new: true }
    );
    let patientId = updateAppointment.patient;
    let user = await userModel.findById(patientId);

    await appt_Updated(user.email);

    res.status(200).json(new apiResponse(200, messages.DATA_UPDATED, updateAppointment, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};
