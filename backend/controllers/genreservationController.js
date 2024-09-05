import { connect } from "../db.js";
import { GenReservation } from "../models/genralResModel.js";

export const genReservation = async (req, res) => {
  try {
    await connect();

    const { user, apartment, startDate, endDate, totalPrice, advancePayment } =
      req.body;

    if (
      !user ||
      !apartment ||
      !startDate ||
      !endDate ||
      !totalPrice ||
      !advancePayment
    ) {
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
