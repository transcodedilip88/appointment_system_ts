import Joi from "joi";
import { messages } from "../../../config";
import { apiResponse } from "../../common";

export const bookAppointment = async (req, res, next) => {
  try {
    const schema = Joi.object({
      doctor: Joi.string().required(),
      appointmentTime: Joi.date(),
    });
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.staus(200).json({ error: error.message });
  }
};

export const getAppointmentById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    req.params = await schema.validateAsync(req.params);
    next();
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const cancelledAppointmentById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    req.params = await schema.validateAsync(req.params);
    next();
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const getAllAppointments = async (req, res, next) => {
  try {
    const schema = Joi.object({
      patient: Joi.string().optional(),
      doctor: Joi.string().optional(),
      status: Joi.string().optional(),
      page: Joi.number().optional(),
      limit: Joi.number().optional(),
      startTime: Joi.string().optional(),
      endTime: Joi.string().optional(),
    });
    req.query = await schema.validateAsync(req.query);
    next();
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const updateAppointmentById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
      appointmentTime: Joi.date().optional(),
    });
    req.params = await schema.validateAsync(req.params);
    next();
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};
