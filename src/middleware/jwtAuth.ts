import jwt from "jsonwebtoken";
import { apiResponse } from "../common";
import { messages } from "../../config";
require('dotenv').config()

export const isAuthorized = (allowed = []) => {
  return async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(500).json(new apiResponse(500,messages.INVALID_VERIFICATION_TOKEN,{},{}));
      }

      const token = req.headers.authorization //.split(" ")[1];

      // if (!token) {
        // return res.status(500).json(new apiResponse(500,messages.INVALID_TOKEN),{},{}));
      // }

      const decodeToken = jwt.verify(token, process.env.SECRET);
      req.user = decodeToken;
      if (allowed.length === 0 || allowed.includes(req.user.role)) {
        next();
      } else {
        return res
          .status(500)
          .json(new apiResponse(500,messages.ROLE_NOT_FOUND,{},{}));
      }
    } catch (error) {
      return res.status(500).json(new apiResponse(500,messages.SERVER_ERROR,{},{error:error.message}));
    }
  };
};

export const generateToken = (userModel) => {
  try {
    return jwt.sign(userModel, process.env.SECRET);
  } catch (error) {
    console.log(error);
  }
};

// export const jwt = {
//   sign: jwtLib.sign,
//   decode: jwtLib.decode,
//   verify: (token, secret) => new Promise((res) => {
//     jwtLib.verify(token, secret, (err, decoded) => res([err, decoded]));
//   }),
// };

