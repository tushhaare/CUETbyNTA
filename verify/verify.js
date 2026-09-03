const CERTIFICATES = {

  "CBNTA-M-2026-001": {
    name: "Tushar",
    role: "Mentor",
    mentorId: "M001",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-001",
    issueDate: "02 September 2026",
    status: "VALID",
    photo: "../assets/mentors/M001/photo.jpg"
  },

  "CBNTA-M-2026-002": {
    name: "Archi Bajaj",
    role: "Mentor",
    mentorId: "M002",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-002",
    issueDate: "02 September 2026",
    status: "VALID",
    photo: "../assets/mentors/M002/photo.jpg"
  },

  "CBNTA-M-2026-003": {
    name: "Ashish Kumar",
    role: "Mentor",
    mentorId: "M003",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-003",
    issueDate: "02 September 2026",
    status: "VALID",
    photo: "../assets/mentors/M003/photo.jpg"
  },

  "CBNTA-M-2026-004": {
    name: "Gauri Sapra",
    role: "Mentor",
    mentorId: "M004",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-004",
    issueDate: "02 September 2026",
    status: "VALID",
    photo: "../assets/mentors/M004/photo.jpg"
  },

  "CBNTA-M-2026-005": {
    name: "Jiya Shrivastav",
    role: "Mentor",
    mentorId: "M005",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-005",
    issueDate: "02 September 2026",
    status: "VALID",
    photo: "../assets/mentors/M005/photo.jpg"
  },

  "CBNTA-M-2026-006": {
    name: "Khushali Solanki",
    role: "Mentor",
    mentorId: "M006",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-006",
    issueDate: "02 September 2026",
    status: "VALID",
    photo: "../assets/mentors/M006/photo.jpg"
  },

  "CBNTA-M-2026-007": {
    name: "Meenakshi Goswami",
    role: "Mentor",
    mentorId: "M007",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-007",
    issueDate: "02 September 2026",
    status: "VALID",
    photo: "../assets/mentors/M007/photo.jpg"
  },

  "CBNTA-M-2026-008": {
    name: "Prince Kumar",
    role: "Mentor",
    mentorId: "M008",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-008",
    issueDate: "02 September 2026",
    status: "VALID",
    photo: "../assets/mentors/M008/photo.jpg"
  },

  "CBNTA-M-2026-009": {
    name: "Prince Patel",
    role: "Mentor",
    mentorId: "M009",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-009",
    issueDate: "02 September 2026",
    status: "VALID",
    photo: "../assets/mentors/M009/photo.jpg"
  },

  "CBNTA-M-2026-010": {
    name: "Purvi Agrawal",
    role: "Mentor",
    mentorId: "M010",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-010",
    issueDate: "02 September 2026",
    status: "VALID",
    photo: "../assets/mentors/M010/photo.jpg"
  }

};


document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const record = id ? CERTIFICATES[id] : null;

  const statusBadge = document.getElementById("statusBadge");
  const statusBadgeText = document.getElementById("statusBadgeText");
  const statusText = document.getElementById("statusText");

  const name = document.getElementById("name");
  const role = document.getElementById("role");
  const mentorId = document.getElementById("mentorId");
  const programme = document.getElementById("programme");
  const certificateId = document.getElementById("certificateId");
  const issueDate = document.getElementById("issueDate");
  const status = document.getElementById("status");

  const mentorPhoto = document.getElementById("mentorPhoto");
  const mentorInitials = document.getElementById("mentorInitials");


  // INVALID / NOT FOUND

  if (!record) {

    statusBadge.classList.add("invalid");
    statusBadgeText.textContent = "NOT FOUND";

    statusText.textContent =
      "No certificate matching this verification ID could be found.";

    name.textContent = "—";
    role.textContent = "—";
    mentorId.textContent = "—";
    programme.textContent = "—";
    certificateId.textContent = "—";
    issueDate.textContent = "—";
    status.textContent = "INVALID";

    status.classList.remove("valid-value");

    mentorInitials.textContent = "?";

    return;
  }


  // POPULATE DATA

  name.textContent = record.name;
  role.textContent = record.role;
  mentorId.textContent = record.mentorId;
  programme.textContent = record.programme;
  certificateId.textContent = record.certificateId;
  issueDate.textContent = record.issueDate;
  status.textContent = record.status;


  // MENTOR INITIALS FALLBACK

  const initials = record.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();

  mentorInitials.textContent = initials || "?";


  // MENTOR PHOTO

  if (record.photo) {

    mentorPhoto.src = record.photo;

    mentorPhoto.onload = () => {
      mentorPhoto.style.display = "block";
      mentorInitials.style.display = "none";
    };

    mentorPhoto.onerror = () => {
      mentorPhoto.style.display = "none";
      mentorInitials.style.display = "flex";
    };

  }


  // NON-VALID STATUS

  if (record.status !== "VALID") {

    statusBadge.classList.add("invalid");

    statusBadgeText.textContent = record.status;

    statusText.textContent =
      "This certificate is not currently valid.";

    status.classList.remove("valid-value");

  }

});
