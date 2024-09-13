import { Register } from '../models/RegisterModel.js';
import dotenv from 'dotenv';
import { connect } from "../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Booking } from '../models/BookingModel.js';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Access token is missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Token is invalid" });
    }

    req.user = decodedToken;
    next(); 
  });
};

export const registerUser = async (req, res) => {
  try {
    await connect();
    const { firstName, lastName, email, password } = req.body;

    const saltRounds = 2;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new Register({
      firstName,
      lastName,
      email,
      password: hashedPassword, 
      // address,
      // zipCode,
      // city,
      // country
    });

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

    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

 
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      secret,
      { expiresIn: '1m' } 
    );

    const adminEmails = [process.env.ADMIN1, process.env.ADMIN2, process.env.ADMIN3];
    const isAdmin = adminEmails.includes(email);
    const isUser = !isAdmin;

    res.status(200).json({
      message: "Login successful",
      isAdmin,
      isUser,
      token,
      userId: user._id,
      firstName: user.firstName
    });
  } catch (e) {
    console.error('Error during login:', e);
    res.status(500).json({ error: 'Login failed' });
  }
};


export const UserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    await connect();
    const user = await Register.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const bookings = await Booking.find({ user: id })
      .populate('apartment')
      .populate('user');

    return res.status(200).json({ user, bookings });

  } catch (err) {
    console.error('Error fetching user profile:', err);
    
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

