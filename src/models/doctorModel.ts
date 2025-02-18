import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  specialization: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  availability: {
    day: { type: String },
    startTime: { type: String },
    endTime: { type: String },
  },
},
  { timestamps: true })

export const doctorModel = mongoose.model('doctor', doctorSchema)