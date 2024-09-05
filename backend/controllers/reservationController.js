import { connect } from "../db.js";
import { Reservation } from '../models/reservationModel.js';



export const postReservation = async (req, res) => {
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
  };
  
  
  
  export const getReservation = async (req, res) => {
    try {
      await connect();
      const reservations = await Reservation.find().populate('selectedObject', 'name');
      res.status(200).json(reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).json({ error: 'Failed to fetch reservations' });
    }
  };

  export const updateReservation = async (req, res) => {
    const id = req.params.id;
    try {
      await connect();
      const reservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });
      if (reservation) {
        res.status(200).json(reservation);
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (e) {
      console.error('Error updating reservation:', e);
      res.status(500).json({ error: 'Failed to update reservation' });
    }
  };
  
  // app.patch("/reservation/:id", async (req, res) => {
  //   const id = req.params.id;
  //   try {
  //     await connect();
  //     const reservation = await Reservation.findByIdAndUpdate(id, req.body , { new: true });
  //     if (reservation) {
  //       res.status(200).json(reservation);
  //     } else {
  //       res.status(404).json({ error: 'Reservation not found' });
  //     }
  //   } catch (error) {
  //     console.error('Error updating reservation:', error);
  //     res.status(500).json({ error: 'Failed to update reservation' });
  //   }
  // })
  
  export const deleteReservation = async (req, res) => {
    const id = req.params.id;
    try {
      await connect();
      await Reservation.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      res.status(500).json({ error: 'Failed to delete reservation' });
    }
  };
  