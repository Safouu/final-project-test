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
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
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
  people: {
    type: Number,
    required: true,
    min: [1, 'At least one adult must be included in the reservation.'],
  },
  children: {
    type: Number,
    default: 0,
  },
  pets: {
    type: Number,
    default: 0,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  days: {
    type: Number,
    required: true,
    min: [5, 'Reservation must be for at least 5 days.'],
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  advancePayment: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

// Create the Reservation model
export const Reservation = mongoose.model('Reservation', reservationSchema);


