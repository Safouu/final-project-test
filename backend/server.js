import express from "express";
import { Object } from "./objectModel.js";
import { connect } from "./db.js";
import { Register } from "./RegisterModel.js";
import { Contact } from "./contactModel.js";
// import { Login } from "./loginModel.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/objects", async (req, res) => {
  await connect();
  const objects = await Object.find();
  res.send(objects);
});
app.get('/contacts', async (req, res) => {
  await connect();
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.post("/login", async (req, res) => {
  await connect();
  try {
    const { email, password } = req.body;

    const user = await Register.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const adminEmails = [process.env.ADMIN1, process.env.ADMIN2 , process.env.ADMIN3];
    const isAdmin = adminEmails.includes(email);

    res.status(200).json({ message: "Login successful", isAdmin });
  } catch (e) {
    res.sendStatus(500);
  }
});

app.post("/register", async (req, res) => {
  await connect();
  try {
    const { firstName, lastName, email, password, address, zipCode, city, country } = req.body;
    const newUser = new Register({ firstName, lastName, email, password,address, zipCode, city, country });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.post("/contact", async (req, res) => {
  await connect();
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.post("/objects", async (req, res) => {
  await connect();
  try {
    const { name, price, description, image } = req.body;
    const newObject = new Object({ name, price, description, image });
    await newObject.save();
    res.status(201).json(newObject);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.get("/objects/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const object = await Object.findById(id);
    if (object) {
      res.json(object);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(404);
  }
});

app.delete("/objects/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Object.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
});

app.patch("/objects/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const object = await Object.findByIdAndUpdate(id, req.body);
    res.json(object);
  } catch (e) {
    res.sendStatus(404);
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `server is listening to port http://localhost:${process.env.PORT}`
  );
});
