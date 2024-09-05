import mongoose from "mongoose";

const genralResSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register", 
    required: true,
  },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Object", 
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  advancePayment: {
    type: Number,
    required: true,
  },
});


export const GenReservation = mongoose.model("GenReservation", genralResSchema);
