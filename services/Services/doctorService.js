const { doctors, slots } = require('../../database');

const getDoctorsBySpecialty = (specialty) => {
  if (!specialty) return doctors;
  return doctors.filter(doc => doc.specialty.toLowerCase() === specialty.toLowerCase());
};

const getAvailableDoctors = (specialty = null) => {
  let filtered = getDoctorsBySpecialty(specialty);
  return filtered.map(doc => ({
    ...doc,
    availableSlots: slots.filter(slot => slot.doctorId === doc.id && slot.available)
  }));
};

module.exports = { getDoctorsBySpecialty, getAvailableDoctors };