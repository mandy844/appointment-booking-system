const sendConfirmation = (patientDetails, appointment) => {
  console.log(`📧 Email to ${patientDetails.email}: Appointment confirmed for ${appointment.time}`);
  console.log(`📱 SMS to ${patientDetails.phone}: Booking ID ${appointment.id}`);
  return true;
};

const notifyDoctor = (doctorId, appointment) => {
  console.log(`🩺 Push/Email to Doctor ${doctorId}: New appointment at ${appointment.time}`);
  return true;
};

module.exports = { sendConfirmation, notifyDoctor };