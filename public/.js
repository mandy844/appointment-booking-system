let selectedDoctorId = null;
let selectedTime = null;

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (res.ok) {
    const data = await res.json();
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('userName').innerText = data.user.username;
  } else {
    alert('Login failed');
  }
}

async function loadDoctors() {
  const specialty = document.getElementById('specialty').value;
  const res = await fetch(`/api/doctors?specialty=${specialty}`);
  const doctors = await res.json();
  
  const container = document.getElementById('doctorsList');
  container.innerHTML = '<h3>Available Doctors</h3>';
  
  doctors.forEach(doc => {
    const docDiv = document.createElement('div');
    docDiv.className = 'doctor-card';
    docDiv.innerHTML = `<strong>${doc.name}</strong> (${doc.specialty})`;
    
    const slotsDiv = document.createElement('div');
    slotsDiv.className = 'slots';
    doc.availableSlots.forEach(slot => {
      const timeBtn = document.createElement('button');
      timeBtn.innerText = new Date(slot.time).toLocaleString();
      timeBtn.onclick = () => selectSlot(doc.id, slot.time);
      slotsDiv.appendChild(timeBtn);
    });
    
    docDiv.appendChild(slotsDiv);
    container.appendChild(docDiv);
  });
}

async function selectSlot(doctorId, time) {
  // Step 10: checkSlot
  const res = await fetch('/api/check-slot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ doctorId, time })
  });
  
  const result = await res.json();
  
  if (result.available) {
    // Step 12a: show booking form
    selectedDoctorId = doctorId;
    selectedTime = time;
    document.getElementById('bookingForm').style.display = 'block';
  } else {
    // Step 12b: conflict error
    alert('❌ Slot already taken! Please select another.');
  }
}

async function confirmBooking() {
  const email = document.getElementById('patientEmail').value;
  const phone = document.getElementById('patientPhone').value;
  
  const res = await fetch('/api/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      doctorId: selectedDoctorId,
      time: selectedTime,
      patientDetails: { email, phone }
    })
  });
  
  if (res.ok) {
    alert('✅ Appointment confirmed! Check console for SMS/email/push logs.');
    document.getElementById('bookingForm').style.display = 'none';
    loadDoctors(); // refresh slots
  } else {
    const err = await res.json();
    alert('❌ ' + err.error);
  }
}