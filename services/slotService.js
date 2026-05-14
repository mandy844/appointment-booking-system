const { slots, appointments } = require('../database');

const checkSlotAvailability = (doctorId, time) => {
  const slot = slots.find(s => s.doctorId == doctorId && s.time === time);
  if (!slot) return { available: false, reason: "Slot doesn't exist" };
  return { available: slot.available, slotId: slot.id };
};

const bookSlot = (doctorId, time, patientId, patientDetails) => {
  const slot = slots.find(s => s.doctorId == doctorId && s.time === time);
  if (!slot || !slot.available) return { success: false, message: "Slot already taken" };

  slot.available = false;
  slot.patientId = patientId;

  const appointment = {
    id: appointments.length + 1,
    doctorId,
    time,
    patientId,
    patientDetails,
    bookedAt: new Date()
  };
  appointments.push(appointment);

  return { success: true, appointment };
};

module.exports = { checkSlotAvailability, bookSlot };