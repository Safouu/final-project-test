import { Apartment } from '../models/ApartmentModel.js';
import { connect } from "../db.js";

export const GetAllApartments = async (req, res) => {
    try {
      await connect();
      const apartments = await Apartment.find();
      res.status(200).json(apartments);
    } catch (error) {
      console.error('Error fetching apartments:', error);
      res.status(500).json({ error: 'Failed to fetch apartments' });
    }
  };

  export const PostApartment = async (req, res) => {
    try {
      await connect();
      const { name, price, description, image,image1, image2, image3, image4, image5, image6, latitude, longitude  } = req.body;
      const newApartment = new Apartment({ name, price, description, image, image1, image2, image3, image4, image5, image6, latitude, longitude });
      await newApartment.save();
      res.status(201).json(newApartment);
    } catch (e) {
      console.error('Error saving Apartment:', e.message || e);
      res.status(500).json({ error: 'Failed to save Apartment', details: e.message || e  });
    }
  };

export const GetSingleApartment = async (req, res) => {
    const id = req.params.id;
    try {
      await connect();
      const apartment = await Apartment.findById(id);
      if (apartment) {
        res.status(200).json(apartment);
      } else {
        res.status(404).json({ error: 'Apartment not found' });
      }
    } catch (e) {
      console.error('Error fetching Apartment by ID:', e);
      res.status(500).json({ error: 'Failed to fetch Apartment' });
    }
  };


export const DeleteSingleApartment = async (req, res) => {
    const id = req.params.id;
    try {
      await connect();
      await Apartment.findByIdAndDelete(id);
      res.status(204).send();
    } catch (e) {
      console.error('Error deleting Apartment:', e);
      res.status(500).json({ error: 'Failed to delete Apartment' });
    }
  };

export const UpdateSingleApartment = async (req, res) => {
    const id = req.params.id;
    try {
      await connect();
      const apartment = await Apartment.findByIdAndUpdate(id, req.body, { new: true });
      if (apartment) {
        res.status(200).json(apartment);
      } else {
        res.status(404).json({ error: 'Apartment not found' });
      }
    } catch (e) {
      console.error('Error updating Apartment:', e);
      res.status(500).json({ error: 'Failed to update Apartment' });
    }
  };

