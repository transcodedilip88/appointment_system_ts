import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../../middleware/jwtAuth";
import { universalFunction } from "../../lib/function";
import { forgot_Password, login_mail, reset_Password, } from "../../middleware/sendmail";
import { mongoService } from "../../helpers";
import { messages } from "../../../config";
import { apiResponse } from "../../common";
import { userModel } from "../../models";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, isDeleted, isBlocked, phone } = req.body;
    let body = req.body;
    let checkEmail = {
      email: { $regex: email, $options: "i" }
    }
    let user = await mongoService.getFirstMatch(userModel, checkEmail, {}, {});
    if (user) return res.status(400).json(new apiResponse(400, messages.EMAIL_IN_USE, {}, {}));



    if (password) {
      const passwordHash = await universalFunction.encryptData(password);
      body.password = passwordHash;
    }


    const userToSave = { name, email, password: body?.password, role, isDeleted, isBlocked, phone, };
    const respons = await mongoService.creteData(userModel, userToSave);

    res.status(200).json(new apiResponse(200, messages?.DATA_ADDED, respons, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let checkEmail = { email: { $regex: email, $options: "i" } }
    const user = await mongoService.getFirstMatch(userModel, checkEmail, {}, {});

    if (!user) {
      return res.status(401).json(new apiResponse(401, messages?.USER_NOT_FOUND, {}, {}));
    } else if (!(await universalFunction.compareBcryptPassword(password, user?.password))) {
      return res.status(401).json(new apiResponse(401, messages.PASSWORD_INVALID, {}, {}));
    }
    if (user.isDeleted) {
      return res.status(409).json(new apiResponse(409, messages.ACCOUNT_DELETED_BY_ADMIN, {}, {}));
    }
    if (user.isBlocked) {
      return res.status(401).json(new apiResponse(401, messages.ACCOUNT_BLOCKED_BY_ADMIN, {}, {}));
    }

    const playLoad = {
      id: user._id,
    };

    const token = generateToken(playLoad);
    const twoFactorCode = await universalFunction.generate_otp();

    console.log("token :", token);
    console.log("otp:", twoFactorCode);

    await mongoService.updateData(userModel, user.id, { $set: { twoFactorAuthCode: twoFactorCode }, }, {});

    await login_mail(user?.email, token, twoFactorCode);
    res.status(200).json(new apiResponse(200, messages.LOGIN_SUCCESSFULLY, { token, twoFactorCode }, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await mongoService.getFirstMatch(userModel, { email: email }, {}, {});

    if (!user) {
      return res.status(400).json(new apiResponse(400, messages.USER_NOT_FOUND, {}, {}));
    }

    const token = {
      id: user?._id,
      name: user?.name,
    };

    const forgotPasswordToken = jwt.sign(token, user.password);
    console.log(forgotPasswordToken);
    await forgot_Password(user?.email, forgotPasswordToken);
    res.status(200).json({ message: messages.EMAIL_SEND });
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, verifyToken } = req.body;
    let token = jwt.decode(verifyToken);
    let id = token.id;

    let user = await mongoService.getFirstMatchId(userModel, id);

    if (!user) {
      res.status(400).json(messages.USER_NOT_FOUND);
    }

    jwt.verify(verifyToken, user.password);

    const passwordHash = await universalFunction.encryptData(newPassword);

    const oldPassword = await universalFunction.compareBcryptPassword(newPassword, user.password);

    if (oldPassword) {
      return res.status(400).json(new apiResponse(400, messages.OLD_NEW_PASSWORD_CANNOT_BE_SAME, {}, {}));
    }

    user.password = passwordHash;

    const updatePassword = {
      $set: { password: user.password, isBlocked: false, },
    };

    await mongoService.updateData(userModel, id, updatePassword, {});

    await reset_Password(user.email, user.name);
    res.status(200).json(new apiResponse(200, messages.PASSWORD_CHANGED, {}, {}));
  } catch (error) {
    return res
      .status(500)
      .json(
        new apiResponse(
          500,
          messages.SERVER_ERROR,
          {},
          { error: error.message }
        )
      );
  }
};

export const verify = async (req, res) => {
  try {
    const { verifyToken, otp } = req.body;
    const decode = await jwt.verify(verifyToken, process.env.SECRET);

    const { id } = decode;
    let user = await mongoService.getFirstMatchId(userModel, id);

    if (!user) {
      return res.status(401).json(new apiResponse(401, messages.USER_NOT_FOUND, {}, {}));
    } else if (otp != user.twoFactorAuthCode) {
      return res.status(400).json(new apiResponse(400, messages.INVALID_OTP, {}, {}));
    }

    const userData = await mongoService.updateData(userModel, id, { $set: { twoFactorAuthCode: "", }, }, { new: true });

    const playLoad = {
      id: user?._id,
      email: user?.email,
      role: user?.role,
    };

    let token = generateToken(playLoad);
    res.status(200).json(new apiResponse(200, messages.OTP_VERIFIED, userData, { token }));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};
