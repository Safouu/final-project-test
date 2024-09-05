import { connect } from "../db.js";
import { Contact } from '../models/contactModel.js';

export const getContacts = async (req, res) => {
    try {
      await connect();
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  };

  export const PostContact = async (req, res) => {
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
  };

  export const deleteSingleContact = async (req, res) => {
    const id = req.params.id;
    try {
      await connect();
      await Contact.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      res.status(500).json({ error: 'Failed to delete reservation' });
    }
  };

  export const deleteContacts = async (req, res) => {
    try {
      await connect();
      await Contact.deleteMany();
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting contacts:', error);
      res.status(500).json({ error: 'Failed to delete contacts' });
    }
  };