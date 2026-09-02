const MENTORS = {
  M001: {
    mentorId: "M001",
    name: "Tushar",
    certificateId: "CBNTA-M-2026-001",
    lorFile: "../../assets/mentors/M001/lor.pdf",
    certificateFile: "../../assets/mentors/M001/certificate.pdf",
    verificationPath: "../../verify/?id=CBNTA-M-2026-001",
    linkedinText:
      "Proud to have completed my mentorship journey with CUETbyNTA as a Mentor.\\n\\nIt was a wonderful experience contributing to the student community and helping aspirants navigate their CUET journey.\\n\\nThank you, CUETbyNTA, for the opportunity.\\n\\n#CUETbyNTA #CUET #Mentorship #Education"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const sessionMentor = getCurrentMentor();
  if (!sessionMentor) return;

  const mentor = MENTORS[sessionMentor.mentorId] || MENTORS.M001;

  document.getElementById("mentorName").textContent = mentor.name;
  document.getElementById("navMentorName").textContent = mentor.email;
  document.getElementById("certificateId").textContent = mentor.certificateId;

  const lor = document.getElementById("lorLink");
  const certificate = document.getElementById("certificateLink");
  const verification = document.getElementById("verificationLink");
  const linkedin = document.getElementById("linkedinLink");

  lor.href = mentor.lorFile;
  certificate.href = mentor.certificateFile;
  verification.href = mentor.verificationPath;

  const shareUrl =
    "https://www.linkedin.com/feed/?shareActive=true&text=" +
    encodeURIComponent(mentor.linkedinText);

  linkedin.href = shareUrl;
});
