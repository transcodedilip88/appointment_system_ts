import Joi from 'joi'
import { messages } from '../../../config';
import { apiResponse } from '../../common';

export const register = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).optional().messages({ "string.pattern.base": "Password is not strong" }),
      phone: Joi.object({
        countryCode: Joi.string(),
        mobileNumber: Joi.string(),
      }),
      role: Joi.string().valid('admin', 'patient'),
    });
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
}

export const login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
    req.body = await schema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
}

export const forgotPassword = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required()
    })
    req.body = await schema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const schema = Joi.object({
      verifyToken: Joi.string().optional(),
      newPassword: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required().messages({ "string.pattern.base": "Password is not strong" }),});
    const value = await schema.validateAsync(req.body);
    req.body = value;
    next();
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const verify = async (req, res, next) => {
  try {
    const schema = Joi.object({
      verifyToken: Joi.string().required(),
      otp: Joi.number().required()
    })
    req.body = await schema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
}