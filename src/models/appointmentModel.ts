import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
  cretedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  updated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  appointmentTime: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
},{timestamps:true}
);

export  const appointmentModel =  mongoose.model('appointment',appointmentSchema)