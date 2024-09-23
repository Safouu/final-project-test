import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loginUser, registerUser, UserProfile } from './controllers/AuthController.js';
import { PostApartment, GetSingleApartment, DeleteSingleApartment, UpdateSingleApartment, GetAllApartments } from './controllers/ApartmentController.js';
import { getContacts, deleteContacts, deleteSingleContact, PostContact } from './controllers/contactController.js';
import {GetBookedApartment, PostBooking, GetSingleBooking, GetAllBookings, DeleteSingleBooking, UpdateSingleBooking,PostAdminBooking } from './controllers/BookingController.js';
import { postReservation,getReservation, deleteReservation, updateReservation } from './controllers/reservationController.js';

dotenv.config();
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

//////////// AUTHENTICATION ////////////
app.post('/register', registerUser);
app.post('/login', loginUser);
app.get("/userProfile/:id",UserProfile)

///////////// APARTMENT ////////////
app.post("/apartment",PostApartment)
app.get("/apartment/:id",GetSingleApartment)
app.delete("/apartment/:id",DeleteSingleApartment)
app.patch("/apartment/:id",UpdateSingleApartment)
////////  GET ALL APARTMENTS  /////////
app.get("/apartment",GetAllApartments)
//////////////////////////////////////////////////

app.get("/contacts",getContacts)
app.delete("/contacts/",deleteContacts)
app.delete("/contacts/:id",deleteSingleContact)
app.post("/contacts",PostContact)

/////////////  BOOKING ////////////
app.post("/booking/:id",PostBooking)
app.get("/booking/:id",GetSingleBooking)
app.delete("/booking/:id",DeleteSingleBooking)
app.patch("/booking/:id",UpdateSingleBooking)
////////  GET ALL BOOKINGS  /////////
app.get("/booking",GetAllBookings)
app.post("/booking/",PostAdminBooking)
////////////////////////////////////////////////////

app.get('/bookings', GetAllBookings); // New endpoint

app.get("/reservation",getReservation)
app.delete("/reservation/:id",deleteReservation)
app.patch("/reservation/:id",updateReservation)
app.post("/reservation",postReservation)


// ////////////////////////////////////////////////////////
app.get("/booking/apartment/:id",GetBookedApartment)



app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on http://localhost:${process.env.PORT}`
  );
});