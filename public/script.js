function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill in all fields");
    return;
  }

  // demo login check
  if (username === "patient1" && password === "pass123") {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("userName").innerText = username;
  } else {
    alert("Invalid login details");
  }
}
function loadDoctors() {
  const specialty = document.getElementById("specialty").value.toLowerCase();
  const doctorsList = document.getElementById("doctorsList");

  doctorsList.innerHTML = "";

  if (!specialty) {
    alert("Please enter a specialty");
    return;
  }

  // sample doctors data (you can later connect DB)
  const doctors = [
    { name: "Dr. Kimani", specialty: "cardiology" },
    { name: "Dr. Achieng", specialty: "dermatology" },
    { name: "Dr. Mutiso", specialty: "neurology" },
    { name: "Dr. Wanjiku", specialty: "cardiology" }
  ];

  const filtered = doctors.filter(d => d.specialty === specialty);

  if (filtered.length === 0) {
    doctorsList.innerHTML = "<p>No doctors found for this specialty</p>";
    return;
  }

  filtered.forEach(doc => {
    const div = document.createElement("div");
    div.className = "doctor-card";

    div.innerHTML = `
      <h3>${doc.name}</h3>
      <p>Specialty: ${doc.specialty}</p>
      <button onclick="selectDoctor('${doc.name}')">Book</button>
    `;

    doctorsList.appendChild(div);
  });
}