import { connect } from "../db.js";
import { GenReservation } from "../models/genralResModel.js";

export const genReservation = async (req, res) => {
  try {
    await connect();

    const { user, apartment, startDate, endDate, totalPrice, advancePayment } = req.body;

    if (!user || !apartment || !startDate || !endDate || !totalPrice || !advancePayment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newGenReservation = new GenReservation({
      user,
      apartment,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
      advancePayment,
    });

    await newGenReservation.save();

    res.status(201).json({
      message: "Reservation created successfully!",
      reservation: newGenReservation,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Failed to create reservation." });
  }
};

export const getGenReservations = async (req, res) => {
  const { userId } = req.params;
  try {
    await connect();

    const reservations = await GenReservation.find({ user: userId })
      .populate('apartment')
      .populate('user');

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ error: 'No reservations found for this user' });
    }

    res.json(reservations);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};
