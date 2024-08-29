import express from "express";
import { Object } from "./objectModel.js";
import { connect } from "./db.js";
import { Register } from "./RegisterModel.js";
import { Contact } from "./contactModel.js";
import { Reservation } from "./reservationModel.js";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();


app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true })); 
app.use(cors());

app.get("/objects", async (req, res) => {
  try {
    await connect();
    const objects = await Object.find();
    res.status(200).json(objects);
  } catch (error) {
    console.error('Error fetching objects:', error);
    res.status(500).json({ error: 'Failed to fetch objects' });
  }
});

app.get("/contacts", async (req, res) => {
  try {
    await connect();
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});



app.post("/login", async (req, res) => {
  try {
    await connect();
    const { email, password } = req.body;

    const user = await Register.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const adminEmails = [process.env.ADMIN1, process.env.ADMIN2, process.env.ADMIN3];
    const isAdmin = adminEmails.includes(email);

    res.status(200).json({ message: "Login successful", isAdmin });
  } catch (e) {
    console.error('Error during login:', e);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post("/register", async (req, res) => {
  try {
    await connect();
    const { firstName, lastName, email, password, address, zipCode, city, country } = req.body;
    const newUser = new Register({ firstName, lastName, email, password, address, zipCode, city, country });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    console.error('Error during registration:', e);
    res.status(500).json({ error: 'Registration failed' });
  }
});



app.post("/contact", async (req, res) => {
  try {
    await connect();
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (e) {
    console.error('Error saving contact message:', e);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

app.post("/objects", async (req, res) => {
  try {
    await connect();
    const { name, price, description, image } = req.body;
    const newObject = new Object({ name, price, description, image });
    await newObject.save();
    res.status(201).json(newObject);
  } catch (e) {
    console.error('Error saving object:', e);
    res.status(500).json({ error: 'Failed to save object' });
  }
});

app.post("/reservation", async (req, res) => {
  try {
    await connect();
    const {
      firstName,
      lastName,
      email,
      phone,
      checkin,
      checkout,
      people,
      children,
      pets,
      pricePerDay,
      days,
      totalPrice,
      advancePayment,
      selectedObject
    } = req.body;

    const newReservation = new Reservation({
      firstName,
      lastName,
      email,
      phone,
      checkin: new Date(checkin),
      checkout: new Date(checkout),
      people,
      children,
      pets,
      pricePerDay,
      days,
      totalPrice,
      advancePayment,
      selectedObject
    });

    
    await newReservation.save();

    
    res.status(201).json({ message: "Reservation created successfully!", reservation: newReservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Failed to create reservation." });
  }
});

app.get("/reservation", async (req, res) => {
  try {
    await connect();
    const reservations = await Reservation.find().populate('selectedObject', 'name');
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});



app.get("/objects/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await connect();
    const object = await Object.findById(id);
    if (object) {
      res.status(200).json(object);
    } else {
      res.status(404).json({ error: 'Object not found' });
    }
  } catch (e) {
    console.error('Error fetching object by ID:', e);
    res.status(500).json({ error: 'Failed to fetch object' });
  }
});

app.delete("/objects/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await connect();
    await Object.findByIdAndDelete(id);
    res.status(204).send(); 
  } catch (e) {
    console.error('Error deleting object:', e);
    res.status(500).json({ error: 'Failed to delete object' });
  }
});

app.patch("/objects/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await connect();
    const object = await Object.findByIdAndUpdate(id, req.body, { new: true }); 
    if (object) {
      res.status(200).json(object);
    } else {
      res.status(404).json({ error: 'Object not found' });
    }
  } catch (e) {
    console.error('Error updating object:', e);
    res.status(500).json({ error: 'Failed to update object' });
  }
});

// app.post("/add-guest", async (req, res) => {
//   try {
//     await connect();
//     const { firstName, lastName, email, phone, people, children, pets, pricePerDay, days, totalPrice, advancePayment, checkin, checkout } = req.body;
//     const newReservation = new Reservation({ firstName, lastName, email, phone, people, children, pets, pricePerDay, days, totalPrice, advancePayment, checkin, checkout });
//     await newReservation.save();
//     res.status(201).json(newReservation);
//   } catch (e) {
//     console.error('Error saving reservation:', e);
//     res.status(500).json({ error: 'Failed to save reservation' });
//   }
// })

app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on http://localhost:${process.env.PORT}`
  );
});
