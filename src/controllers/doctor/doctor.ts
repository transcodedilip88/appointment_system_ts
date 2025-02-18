import { messages } from "../../../config";
import { apiResponse } from "../../common";
import { mongoService } from "../../helpers";
import { doctorModel } from "../../models";
// import doctorModel from "../../models/doctorModel";

export const doctorAdd = async (req, res) => {
  try {
    let { name, specialization, email, phone, availability } = req.body;

    let checkEmail = { email: { $regex: email, $options: "i" } }
    const checkEmailExist = await mongoService.getFirstMatch(doctorModel, checkEmail, {}, {});

    if (checkEmailExist) {
      return res.status(400).json(new apiResponse(400, messages.EMAIL_IN_USE, {}, {}));
    }

    const newDoctorToSave = {
      name,
      specialization,
      email,
      phone,
      availability,
    };

    const doctorData = await mongoService.creteData(
      doctorModel,
      newDoctorToSave
    );
    res.status(200).json(new apiResponse(200, messages.DATA_ADDED, doctorData, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    let { specialization, search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let matchConditions: any = {
      isDeleted: false,
    };

    if (specialization) {
      matchConditions.specialization = specialization;
    }

    if (search) {
      matchConditions.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    
    const doctorData = await doctorModel.find(matchConditions).skip((page - 1) * limit).limit(limit);
    if (!doctorData) {
      return res.status(401).json(new apiResponse(401, messages.DATA_NOT_FOUND, {}, {}));
    }

    res.status(200).json(new apiResponse(200, messages.DATA_GET, doctorData, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const id = req.params.id;
    const doctorData = await doctorModel.findById(id, { isDeleted: false });

    if (!doctorData) {
      return res.status(401).json(new apiResponse(401, messages.DATA_NOT_FOUND, {}, {}));
    }
    res.status(200).json(new apiResponse(200, messages.DATA_GET, doctorData, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const updateDoctorById = async (req, res) => {
  try {
    let { id } = req.params
    const { name, specialization, phone, availability } = req.body;
    const updateDoctor = {
      name,
      specialization,
      phone,
      availability,
    };

    const doctordata = await mongoService.updateData(doctorModel, id, updateDoctor, { new: true, });
    res.status(200).json(new apiResponse(200, messages.DATA_UPDATED, doctordata, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};

export const deletedDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    await mongoService.updateData(doctorModel, id, { isDeleted: true }, {});
    res.status(200).json(new apiResponse(200, messages.DATA_DELETE, {}, {}));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, messages.SERVER_ERROR, {}, { error: error.message }));
  }
};
