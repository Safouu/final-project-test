import mongoose from "mongoose";

const registerationSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  // address: {
  //   type: String,
  //   required: true,
  // },
  // zipCode: {
  //   type: Number,
  //   required: true,
  // },
  // city: {
  //   type: String,
  //   required: true,
  // },
  // country: {
  //   type: String,
  //   required: true,
  // },
  
});

export const Register = mongoose.model("Register", registerationSchema);


