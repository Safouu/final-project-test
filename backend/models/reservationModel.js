import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    checkin: {
      type: String,
      required: true,
    },
    checkout: {
      type: String,
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
    pricePerDay: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    checkin: {
      type: Date,
      required: true,
    },
    checkout: {
      type: Date,
      required: true,
    },
    days: {
        type: Number,
        required: true,
        },
    totalPrice: {
        type: Number,
        required: true,
        },
    advancePayment:{
            type: Number,
            required: true,
        },
    selectedObject: { type: mongoose.Schema.Types.ObjectId, ref: 'Object' },
  });
  
  export const Reservation = mongoose.model("Reservation", reservationSchema);
