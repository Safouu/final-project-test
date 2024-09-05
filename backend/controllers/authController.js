import { Register } from '../models/RegisterModel.js';
import dotenv from 'dotenv';
import { connect } from "../db.js";

dotenv.config();

export const registerUser = async (req, res) => {
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
};


export const loginUser = async (req, res) => {
  try {
    await connect();
    const { email, password } = req.body;
    const user = await Register.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const adminEmails = [process.env.ADMIN1, process.env.ADMIN2, process.env.ADMIN3];
    const isAdmin = adminEmails.includes(email);
    const isUser = !isAdmin;
    res.status(200).json({
      message: "Login successful",
      isAdmin,
      isUser,
      userId: user._id,
      firstName: user.firstName
    });
  } catch (e) {
    console.error('Error during login:', e);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const UserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Register.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};
