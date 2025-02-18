import Joi from "joi";
import { apiResponse } from "../../common";
import { messages } from "../../../config";

export const doctorAdd = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      specialization: Joi.string().required(),
      phone: Joi.string().required(),
      availability: Joi.object().required(),
    });
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(401).json(new apiResponse(401,messages.SERVER_ERROR,{},{error:error.message}));
  }
};

export const getAllDoctor = async (req, res, next) => {
  try {
    const schema = Joi.object({
      skip: Joi.number().optional(),
      limit: Joi.number().optional(),
      search: Joi.string().optional(),
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      specialization: Joi.string().optional(),
    });
    req.query = await schema.validateAsync(req.query);
    next();
  } catch (error) {
    res.status(401).json(new apiResponse(401,messages.SERVER_ERROR,{},{error:error.message}));
  }
};

export const getDoctorById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    req.params = await schema.validateAsync(req.params);
    next();
  } catch (error) {
    res.status(401).json(new apiResponse(401,messages.SERVER_ERROR,{},{error:error.message}));
  }
};

export const updateDoctorById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().optional(),
      specialization: Joi.string().optional(),
      phone: Joi.string().optional(),
      availability: Joi.string().optional()
    });
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(401).json(new apiResponse(401,messages.SERVER_ERROR,{},{error:error.message}));
  }
};

export const deletedDoctorById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required()
    })
    req.params = await schema.validateAsync(req.params)
    next()
  } catch (error) {
    res.status(401).json(new apiResponse(401,messages.SERVER_ERROR,{},{error:error.message}));
  }
}