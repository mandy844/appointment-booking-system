const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingController = require('./services/bookingservices');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes exactly matching your sequence diagram
app.post('/api/login', bookingController.login);                 // step 1
app.get('/api/doctors', bookingController.getDoctors);           // steps 5-7
app.post('/api/check-slot', bookingController.checkSlot);        // step 10
app.post('/api/book', bookingController.bookAppointment);        // step 13

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));