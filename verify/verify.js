const CERTIFICATES = {
  "CBNTA-M-2026-001": {
    name: "Tushar",
    role: "Mentor",
    programme: "CUETbyNTA Mentors' Programme",
    certificateId: "CBNTA-M-2026-001",
    issueDate: "02 September 2026",
    status: "VALID"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const record = id ? CERTIFICATES[id] : null;

  if (!record) {
    document.getElementById("statusBadge").classList.add("invalid");
    document.getElementById("statusBadge").querySelector("span").textContent = "NOT FOUND";
    document.getElementById("statusText").textContent =
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
    document.getElementById("statusBadge").classList.add("invalid");
    document.getElementById("statusBadge").querySelector("span").textContent = record.status;
  }
});
