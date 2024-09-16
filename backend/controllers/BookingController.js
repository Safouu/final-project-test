import { connect } from "../db.js";
import { Booking } from "../models/BookingModel.js";

export const PostBooking = async (req, res) => {
  try {
    await connect();

    const { user, apartment, startDate, endDate, totalPrice,
            advancePayment, people, children, pets } = req.body;

    if (!user || !apartment || !startDate || !endDate || !totalPrice ||
        !advancePayment || !people) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

  
    const overlappingBooking = await Booking.findOne({
      apartment,
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } }  // 
      ]
    });

    if (overlappingBooking) {
      return res.status(409).json({ error: "Apartment is already booked for the selected dates." });
    }

    const newBooking = new Booking({
      user,
      apartment,
      startDate: start,
      endDate: end,
      totalPrice,
      advancePayment,
      people,
      children,
      pets,
    });

    await newBooking.save();

    res.status(201).json({message: "Reservation created successfully!", newBooking: newBooking,});
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Failed to create reservation." });
  }
};

export const GetSingleBooking = async (req, res) => {
  const { userId } = req.params;
  try {
    await connect();

    const booking = await Booking.find({ user: userId })
      .populate('apartment')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ error: 'No reservations found for this user' });
    }

    res.json(booking);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

// export const getGenReservation = async (req, res) => {
//   try {
//     const reservations = await GenReservation.find()
//       .populate('user', 'firstName') 
//       .populate('apartment', 'name'); 

//     res.json(reservations);
//   } catch (error) {
//     console.error('Error fetching reservations:', error);
//     res.status(500).json({ message: 'Failed to fetch reservations.' });
//   }
// };


export const GetAllBookings = async (req, res) => {
  try {
    await connect();

    const booking = await Booking.find()
      .populate('apartment')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ error: 'No reservations found' });
    }

    res.json(booking);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

export const DeleteSingleBooking = async (req, res) => {
  const id = req.params.id;
  try {
    await connect();
    await Booking.findByIdAndDelete(id);
    res.status(204).send();
  } catch (e) {
    console.error('Error deleting the Reservation:', e);
    res.status(500).json({ error: 'Failed to delete the Reservation' });
  }
};

export const UpdateSingleBooking = async (req, res) => {
  const id = req.params.id;
  try {
    await connect();
    const updateSingleBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedGuest) {
      res.status(200).json(updateSingleBooking);
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (e) {
    console.error('Error updating Reservation:', e);
    res.status(500).json({ error: 'Failed to update Reservation' });
  }
};

///////////// ADMIN BOOKING /////////////

export const PostAdminBooking = async (req, res) => {
  try {
    await connect();

    const { apartment, startDate, endDate, totalPrice,
            firstName, lastName, email,
            advancePayment, people, children, pets } = req.body;

    if (!apartment || !startDate || !endDate || !totalPrice ||
        !advancePayment || !people || !children || !pets) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

  
    const overlappingBooking = await Booking.findOne({
      apartment,
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } }  // 
      ]
    });

    if (overlappingBooking) {
      return res.status(409).json({ error: "Apartment is already booked for the selected dates." });
    }

    const newBooking = new Booking({
  
      apartment,
      startDate: start,
      endDate: end,
      totalPrice,
      firstName,
      lastName,
      email,
      advancePayment,
      people,
      children,
      pets,
    });

    await newBooking.save();

    res.status(201).json({message: "Reservation created successfully!", newBooking: newBooking,});
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Failed to create reservation." });
  }
};