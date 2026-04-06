import Booking from "../models/bookingModel.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { trainer, date, time } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      trainer,
      date,
      time
    });

    res.json(booking);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// USER BOOKINGS
export const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.json(bookings);
};

// ADMIN BOOKINGS
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("user", "name email");
  res.json(bookings);
};

// UPDATE STATUS
export const updateBooking = async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(booking);
};