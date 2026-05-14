const users = [
  { id: 1, username: "patient1", password: "pass123", role: "patient" }
];

const doctors = [
  { id: 1, name: "Dr. Smith", specialty: "Cardiology" },
  { id: 2, name: "Dr. Jones", specialty: "Dermatology" },
  { id: 3, name: "Dr. Lee", specialty: "Neurology" }
];

const slots = [
  { id: 1, doctorId: 1, time: "2026-05-01T09:00:00", available: true, patientId: null },
  { id: 2, doctorId: 1, time: "2026-05-01T10:00:00", available: true, patientId: null },
  { id: 3, doctorId: 2, time: "2026-05-02T14:00:00", available: true, patientId: null }
];

const appointments = [];

module.exports = { users, doctors, slots, appointments };
