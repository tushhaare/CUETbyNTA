
const CERTIFICATES = {
  "CBNTA-M-2026-001": {
    name: "Tushar",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-001",
    issueDate: "02 September 2026",
    status: "VALID"
  },

  "CBNTA-M-2026-002": {
    name: "Archi Bajaj",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-002",
    issueDate: "02 September 2026",
    status: "VALID"
  },

  "CBNTA-M-2026-003": {
    name: "Ashish",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-003",
    issueDate: "02 September 2026",
    status: "VALID"
  },

  "CBNTA-M-2026-004": {
    name: "Gauri",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-004",
    issueDate: "02 September 2026",
    status: "VALID"
  },

  "CBNTA-M-2026-005": {
    name: "Jiyashri",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-005",
    issueDate: "02 September 2026",
    status: "VALID"
  },

  "CBNTA-M-2026-006": {
    name: "Khushali Solanki",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-006",
    issueDate: "02 September 2026",
    status: "VALID"
  },

  "CBNTA-M-2026-007": {
    name: "Meenakshi Goswami",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-007",
    issueDate: "02 September 2026",
    status: "VALID"
  },

  "CBNTA-M-2026-008": {
    name: "Prince P.K.",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-008",
    issueDate: "02 September 2026",
    status: "VALID"
  },

  "CBNTA-M-2026-009": {
    name: "Prince Patel",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-009",
    issueDate: "02 September 2026",
    status: "VALID"
  },

  "CBNTA-M-2026-010": {
    name: "Purvi Agrawal",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-010",
    issueDate: "02 September 2026",
    status: "VALID"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const record = id ? CERTIFICATES[id] : null;

  const statusBadge = document.getElementById("statusBadge");
  const statusText = document.getElementById("statusText");

  if (!record) {
    statusBadge.classList.add("invalid");
    statusBadge.querySelector("span").textContent = "NOT FOUND";

    statusText.textContent =
      "No certificate matching this verification ID could be found.";

    document.getElementById("status").textContent = "INVALID";

    ["name", "role", "programme", "certificateId", "issueDate"].forEach((key) => {
      document.getElementById(key).textContent = "—";
    });

    return;
  }

  document.getElementById("name").textContent = record.name;
  document.getElementById("role").textContent = record.role;
  document.getElementById("programme").textContent = record.programme;
  document.getElementById("certificateId").textContent = record.certificateId;
  document.getElementById("issueDate").textContent = record.issueDate;
  document.getElementById("status").textContent = record.status;

  if (record.status !== "VALID") {
    statusBadge.classList.add("invalid");
    statusBadge.querySelector("span").textContent = record.status;
    statusText.textContent =
      "This certificate is not currently valid.";
  }
});
