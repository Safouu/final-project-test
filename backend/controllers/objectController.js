import { Object } from '../models/objectModel.js';
import { connect } from "../db.js";

export const getObjects = async (req, res) => {
    try {
      await connect();
      const objects = await Object.find();
      res.status(200).json(objects);
    } catch (error) {
      console.error('Error fetching objects:', error);
      res.status(500).json({ error: 'Failed to fetch objects' });
    }
  };

  export const postObject = async (req, res) => {
    try {
      await connect();
      const { name, price, description, image,image1, image2, image3, image4, image5, image6  } = req.body;
      const newObject = new Object({ name, price, description, image, image1, image2, image3, image4, image5, image6 });
      await newObject.save();
      res.status(201).json(newObject);
    } catch (e) {
      console.error('Error saving object:', e);
      res.status(500).json({ error: 'Failed to save object' });
    }
  };

export const getSingleObject = async (req, res) => {
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
  };


export const deleteSingleObject = async (req, res) => {
    const id = req.params.id;
    try {
      await connect();
      await Object.findByIdAndDelete(id);
      res.status(204).send();
    } catch (e) {
      console.error('Error deleting object:', e);
      res.status(500).json({ error: 'Failed to delete object' });
    }
  };

export const updateSingleObject = async (req, res) => {
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
  };