import { messages } from "../../../config";
import { apiResponse } from "../../common";
import { mongoService } from "../../helpers";
import { userModel } from "../../models";

export const updateUserById = async (req, res) => {
  try {
    let {id} = req.params
    const { name, phone} = req.body;
    const userToUpdate = {
      name,
      phone,
    };

    const userData = await mongoService.updateData(userModel, id, userToUpdate, {
      new: true,
    });
    res.status(200).json(new apiResponse(200, messages.SUCCESS, userData, {}));

  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await mongoService.getFirstMatchId(userModel, id);

    if (!userData) {
      return res.status(401).json(new apiResponse(401, messages.USER_NOT_FOUND, {}, {}));
    }

    res.status(200).json(new apiResponse(200, messages.SUCCESS, userData, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const getAllUser = async (req, res) => {
  try {
    const { search } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let matchConditions: any = {
      isDeleted: false,
    };

    if (search) {
      matchConditions.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $optiions: "i" } },
      ];
    }

    const userData = await userModel.find(matchConditions).skip((page - 1) * limit).limit(limit);
    res.status(200).json(new apiResponse(200, messages.SUCCESS, userData, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const deletedUserById = async (req, res) => {
  try {
    const { id } = req.params;

    await mongoService.updateData(userModel, id, { isDeleted: true }, {});
    res.status(200).json(new apiResponse(200, messages.SUCCESS, {}, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};
