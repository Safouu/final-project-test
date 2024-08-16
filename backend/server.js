import express from "express"
import { Object } from './objectModel.js';
import {connect} from './db.js';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()

const app = express()
app.use(express.json());
app.use(cors());

app.get("/objects", async (req, res) => {
    await connect();
    const objects = await Object.find();
    res.send(objects);
  });

app.post("/objects", async (req, res) => {
    await connect()
    try {
      const { name, price, description, image } = req.body;
      const newObject = new Object({ name, price, description, image });
      await newObject.save();
      res.status(201).json(newObject);
    }
    catch (e) {
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

app.listen(process.env.PORT ,()=>{
    console.log(`server is listening to port http://localhost:${process.env.PORT}`)
})