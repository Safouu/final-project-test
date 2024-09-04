import express from 'express';
import GenReservation from '../models/GenReservation';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    
    const { user, apartment, startDate, endDate, totalPrice, advancePayment } = req.body;

    const newReservation = new GenReservation({
      user,
      apartment,
      startDate,
      endDate,
      totalPrice,
      advancePayment,
    });

  
    const savedReservation = await newReservation.save();

    
    res.status(201).json(savedReservation);
  } catch (error) {
   
    res.status(400).json({ error: error.message });
  }
});

export default router;
