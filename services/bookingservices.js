const { getAvailableDoctors } = require('./services/doctorService');
const { checkSlotAvailability, bookSlot } = require('./slotService');
const { sendConfirmation, notifyDoctor } = require('./notificationService');
const { users } = require('../database');

let loggedInUser = null;

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  
  loggedInUser = user;
  res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
};

const getDoctors = (req, res) => {
  const { specialty } = req.query;
  const doctors = getAvailableDoctors(specialty);
  res.json(doctors);
};

const checkSlot = (req, res) => {
  const { doctorId, time } = req.body;
  const result = checkSlotAvailability(doctorId, time);
  res.json(result);
};

const bookAppointment = (req, res) => {
  if (!loggedInUser) return res.status(401).json({ error: "Not logged in" });

  const { doctorId, time, patientDetails } = req.body;
  
  // Step 13-14: submitBooking + saveAppointment
  const booking = bookSlot(doctorId, time, loggedInUser.id, patientDetails);
  
  if (!booking.success) {
    return res.status(409).json({ error: booking.message });
  }
  
  // Step 15-17: confirmations
  sendConfirmation(patientDetails, booking.appointment);
  notifyDoctor(doctorId, booking.appointment);
  
  res.json({ message: "Booking confirmed", appointment: booking.appointment });
};

module.exports = { login, getDoctors, checkSlot, bookAppointment };