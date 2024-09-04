import mongoose from "mongoose";

const ObjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    image1: {
      type: String,
    },
    image2: {
      type: String,
    },
    image3: {
      type: String,
    },

    reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
    // user : { type: mongoose.Schema.Types.ObjectId, ref: 'Register' }
  });
  
  export const Object = mongoose.model("Object", ObjectSchema);



  /// npx create-react-app my-app
  //// npm create vite@latest my-vue-app