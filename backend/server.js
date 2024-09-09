import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loginUser, registerUser, UserProfile } from './controllers/authController.js';
import { getObjects, postObject, getSingleObject, deleteSingleObject, updateSingleObject } from './controllers/objectController.js';
import { getContacts, deleteContacts, deleteSingleContact, PostContact } from './controllers/contactController.js';
import { genReservation, getGenReservations, getAllGenReservations, deleteSingleGuest, updateSingleGuest } from './controllers/genreservationController.js';
import { postReservation,getReservation, deleteReservation, updateReservation } from './controllers/reservationController.js';

dotenv.config();
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get("/userProfile/:id",UserProfile)

app.get("/objects",getObjects)
app.get("/objects/:id",getSingleObject)
app.delete("/objects/:id",deleteSingleObject)
app.patch("/objects/:id",updateSingleObject)
app.post("/objects",postObject)

app.get("/contacts",getContacts)
app.delete("/contacts/",deleteContacts)
app.delete("/contacts/:id",deleteSingleContact)
app.post("/contacts",PostContact)

app.post("/genReservation",genReservation)
app.get("/genReservation/:userId",getGenReservations)
app.get("/genReservation",getAllGenReservations)
app.delete("/genReservation/:id",deleteSingleGuest)
app.patch("/genReservation/:id",updateSingleGuest)

app.get("/reservation",getReservation)
app.delete("/reservation/:id",deleteReservation)
app.patch("/reservation/:id",updateReservation)
app.post("/reservation",postReservation)



app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on http://localhost:${process.env.PORT}`
  );
});