import Joi from "joi";
import { messages } from "../../../config";
import { apiResponse } from "../../common";

export const updateUserById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().optional(),
      phone: Joi.string().optional(),
    });
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const getUserById = async (req, res, next) => {
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

export const getAllUser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().optional(),
      search: Joi.string().optional(),
      page: Joi.number().optional(),
      limit: Joi.number().optional(),
    });
    req.query = await schema.validateAsync(req.query);
    next();
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const deleteUserById = async (req, res, next) => {
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
