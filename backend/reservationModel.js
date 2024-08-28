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
        }
  });
  
  export const reservation = mongoose.model("Reservation", reservationSchema);

