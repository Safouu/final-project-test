import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register", 
    required: true,
  },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment", 
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
  people: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  pets: {
    type: Number,
    required: true,
  },
});


export const Booking = mongoose.model("Booking", BookingSchema);
