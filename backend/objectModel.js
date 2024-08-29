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
    reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  });
  
  export const Object = mongoose.model("Object", ObjectSchema);



  /// npx create-react-app my-app
  //// npm create vite@latest my-vue-app