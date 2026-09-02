const MENTORS = {
  M001: {
    name: "Tushar",
    certificateId: "CBNTA-M-2026-001",
    lorFile: "../../assets/mentors/M001/lor.pdf",
    certificateFile: "../../assets/mentors/M001/certificate.pdf"
  },
  M002: {
    name: "Archi",
    certificateId: "CBNTA-M-2026-002",
    lorFile: "../../assets/mentors/M002/lor.pdf",
    certificateFile: "../../assets/mentors/M002/certificate.pdf"
  },
  M003: {
    name: "Ashish",
    certificateId: "CBNTA-M-2026-003",
    lorFile: "../../assets/mentors/M003/lor.pdf",
    certificateFile: "../../assets/mentors/M003/certificate.pdf"
  },
  M004: {
    name: "Gauri",
    certificateId: "CBNTA-M-2026-004",
    lorFile: "../../assets/mentors/M004/lor.pdf",
    certificateFile: "../../assets/mentors/M004/certificate.pdf"
  },
  M005: {
    name: "Jiya",
    certificateId: "CBNTA-M-2026-005",
    lorFile: "../../assets/mentors/M005/lor.pdf",
    certificateFile: "../../assets/mentors/M005/certificate.pdf"
  },
  M006: {
    name: "Khushali",
    certificateId: "CBNTA-M-2026-006",
    lorFile: "../../assets/mentors/M006/lor.pdf",
    certificateFile: "../../assets/mentors/M006/certificate.pdf"
  },
  M007: {
    name: "Meenakshi",
    certificateId: "CBNTA-M-2026-007",
    lorFile: "../../assets/mentors/M007/lor.pdf",
    certificateFile: "../../assets/mentors/M007/certificate.pdf"
  },
  M008: {
    name: "Prince",
    certificateId: "CBNTA-M-2026-008",
    lorFile: "../../assets/mentors/M008/lor.pdf",
    certificateFile: "../../assets/mentors/M008/certificate.pdf"
  },
  M009: {
    name: "Prince",
    certificateId: "CBNTA-M-2026-009",
    lorFile: "../../assets/mentors/M009/lor.pdf",
    certificateFile: "../../assets/mentors/M009/certificate.pdf"
  },
  M010: {
    name: "Purvi",
    certificateId: "CBNTA-M-2026-010",
    lorFile: "../../assets/mentors/M010/lor.pdf",
    certificateFile: "../../assets/mentors/M010/certificate.pdf"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const sessionMentor = getCurrentMentor();
  if (!sessionMentor) return;

  const mentor = MENTORS[sessionMentor.mentorId];

  if (!mentor) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("mentorName").textContent = mentor.name;
  document.getElementById("navMentorName").textContent = sessionMentor.email;
  document.getElementById("certificateId").textContent = mentor.certificateId;

  const lor = document.getElementById("lorLink");
  const certificate = document.getElementById("certificateLink");
  const verification = document.getElementById("verificationLink");
  const linkedin = document.getElementById("linkedinLink");

  lor.href = mentor.lorFile;
  certificate.href = mentor.certificateFile;
  verification.href = `../../verify/?id=${mentor.certificateId}`;

  const linkedinText =
    `Proud to have completed my mentorship journey with CUETbyNTA as a Mentor.\n\n` +
    `It was a wonderful experience contributing to the student community and helping aspirants navigate their CUET journey.\n\n` +
    `Thank you, CUETbyNTA, for the opportunity.\n\n` +
    `#CUETbyNTA #CUET #Mentorship #Education`;

  linkedin.href =
    "https://www.linkedin.com/feed/?shareActive=true&text=" +
    encodeURIComponent(linkedinText);
});
