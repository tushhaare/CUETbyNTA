const MENTORS = {

  M001: {
    name: "Tushar",
    certificateId: "CBNTA-M-2026-001",
    lorFile: "../../assets/mentors/M001/1lor.pdf",
    certificateFile: "../../assets/mentors/M001/1.pdf"
  },

  M002: {
    name: "Archi",
    certificateId: "CBNTA-M-2026-002",
    lorFile: "../../assets/mentors/M002/2lor.pdf",
    certificateFile: "../../assets/mentors/M002/2.pdf"
  },

  M003: {
    name: "Ashish",
    certificateId: "CBNTA-M-2026-003",
    lorFile: "../../assets/mentors/M003/3lor.pdf",
    certificateFile: "../../assets/mentors/M003/3.pdf"
  },

  M004: {
    name: "Gauri",
    certificateId: "CBNTA-M-2026-004",
    lorFile: "../../assets/mentors/M004/4lor.pdf",
    certificateFile: "../../assets/mentors/M004/4.pdf"
  },

  M005: {
    name: "Jiya",
    certificateId: "CBNTA-M-2026-005",
    lorFile: "../../assets/mentors/M005/5lor.pdf",
    certificateFile: "../../assets/mentors/M005/5.pdf"
  },

  M006: {
    name: "Khushali",
    certificateId: "CBNTA-M-2026-006",
    lorFile: "../../assets/mentors/M006/6lor.pdf",
    certificateFile: "../../assets/mentors/M006/6.pdf"
  },

  M007: {
    name: "Meenakshi",
    certificateId: "CBNTA-M-2026-007",
    lorFile: "../../assets/mentors/M007/7lor.pdf",
    certificateFile: "../../assets/mentors/M007/7.pdf"
  },

  M008: {
    name: "Prince",
    certificateId: "CBNTA-M-2026-008",
    lorFile: "../../assets/mentors/M008/8lor.pdf",
    certificateFile: "../../assets/mentors/M008/8.pdf"
  },

  M009: {
    name: "Prince",
    certificateId: "CBNTA-M-2026-009",
    lorFile: "../../assets/mentors/M009/9lor.pdf",
    certificateFile: "../../assets/mentors/M009/9.pdf"
  },

  M010: {
    name: "Purvi",
    certificateId: "CBNTA-M-2026-010",
    lorFile: "../../assets/mentors/M010/10lor.pdf",
    certificateFile: "../../assets/mentors/M010/10.pdf"
  }

};


document.addEventListener("DOMContentLoaded", async () => {

  const sessionMentor = getCurrentMentor();

  if (!sessionMentor) return;

  const mentor = MENTORS[sessionMentor.mentorId];

  if (!mentor) {
    window.location.href = "login.html";
    return;
  }


  /* BASIC DASHBOARD */

  document.getElementById("mentorName").textContent =
    mentor.name;

  document.getElementById("navMentorName").textContent =
    sessionMentor.email;

  document.getElementById("certificateId").textContent =
    mentor.certificateId;

  document.getElementById("mentorIdInfo").textContent =
    sessionMentor.mentorId;

  document.getElementById("certificateIdInfo").textContent =
    mentor.certificateId;


  const lor =
    document.getElementById("lorLink");

  const certificate =
    document.getElementById("certificateLink");

  const verification =
    document.getElementById("verificationLink");

  const linkedin =
    document.getElementById("linkedinLink");


  lor.href = mentor.lorFile;

  certificate.href = mentor.certificateFile;

  verification.href =
    `../../verify/?id=${mentor.certificateId}`;


  /* LINKEDIN */

  const linkedinText =
    `Proud to have completed my mentorship journey with CUETbyNTA as a Mentor.\n\n` +
    `It was a wonderful experience contributing to the student community and helping aspirants navigate their CUET journey.\n\n` +
    `Thank you, CUETbyNTA, for the opportunity.\n\n` +
    `#CUETbyNTA #CUET #Mentorship #Education`;

  linkedin.href =
    "https://www.linkedin.com/feed/?shareActive=true&text=" +
    encodeURIComponent(linkedinText);


  /* ID VERIFICATION */

  setupIdentityVerification();

});


async function setupIdentityVerification() {

  const supabase = window.cbntaSupabase;

  if (!supabase) {
    console.error("Supabase client unavailable.");
    return;
  }


  const form =
    document.getElementById("idUploadForm");

  const fileInput =
    document.getElementById("idFile");

  const signoff =
    document.getElementById("idSignoff");

  const submitBtn =
    document.getElementById("idSubmitBtn");

  const status =
    document.getElementById("idStatus");

  const statusBox =
    document.getElementById("idVerificationStatus");

  const statusInfo =
    document.getElementById("idStatusInfo");


  /* GET CURRENT USER */

  const {
    data: sessionData,
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError || !sessionData.session) {
    window.location.href = "login.html";
    return;
  }

  const user = sessionData.session.user;

  const mentorData = getCurrentMentor();

  if (!mentorData) return;


  /* LOAD EXISTING SUBMISSION */

  const {
    data: existing,
    error: existingError
  } = await supabase
    .from("mentor_id_documents")
    .select("status, signoff, signed_off_at, updated_at")
    .eq("mentor_user_id", user.id)
    .maybeSingle();


  if (!existingError && existing) {

    statusInfo.textContent =
      existing.status === "submitted"
        ? "Submitted"
        : existing.status;

    if (existing.signoff) {

      statusBox.innerHTML =
        `<div class="success-note">
          ✓ ID submitted successfully and sign-off recorded.
        </div>`;

    }

  }


  /* SUBMIT */

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    status.textContent = "";


    const file = fileInput.files[0];

    if (!file) {
      status.textContent =
        "Please select your identity document.";
      return;
    }


    /* SIZE CHECK */

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {

      status.textContent =
        "File is too large. Maximum size is 5 MB.";

      return;
    }


    /* TYPE CHECK */

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf"
    ];

    if (!allowedTypes.includes(file.type)) {

      status.textContent =
        "Only JPG, PNG or PDF files are allowed.";

      return;
    }


    if (!signoff.checked) {

      status.textContent =
        "Please confirm the sign-off before submitting.";

      return;
    }


    submitBtn.disabled = true;

    submitBtn.textContent =
      "Uploading...";


    try {

      const extension =
        getFileExtension(file.name);

      const filePath =
        `${user.id}/identity.${extension}`;


      /* UPLOAD TO PRIVATE BUCKET */

      const {
        error: uploadError
      } = await supabase
        .storage
        .from("mentor-id-documents")
        .upload(
          filePath,
          file,
          {
            upsert: true,
            contentType: file.type
          }
        );


      if (uploadError) {
        throw uploadError;
      }


      /* SAVE SUBMISSION RECORD */

      const {
        error: databaseError
      } = await supabase
        .from("mentor_id_documents")
        .upsert(
          {
            mentor_user_id: user.id,
            mentor_id: mentorData.mentorId,
            file_path: filePath,
            status: "submitted",
            signoff: true,
            signed_off_at:
              new Date().toISOString(),
            updated_at:
              new Date().toISOString()
          },
          {
            onConflict: "mentor_user_id"
          }
        );


      if (databaseError) {
        throw databaseError;
      }


      /* SUCCESS */

      status.textContent = "";

      statusBox.innerHTML =
        `<div class="success-note">
          ✓ Your ID has been submitted successfully.
          Your sign-off has been recorded.
        </div>`;

      statusInfo.textContent =
        "Submitted";

      fileInput.value = "";

      signoff.checked = false;

    } catch (error) {

      console.error(error);

      status.textContent =
        "Something went wrong while uploading your ID. Please try again.";

    } finally {

      submitBtn.disabled = false;

      submitBtn.textContent =
        "Submit ID for Verification";

    }

  });

}


function getFileExtension(filename) {

  const parts =
    filename.toLowerCase().split(".");

  const extension =
    parts[parts.length - 1];

  if (
    extension === "jpg" ||
    extension === "jpeg"
  ) {
    return "jpg";
  }

  if (extension === "png") {
    return "png";
  }

  if (extension === "pdf") {
    return "pdf";
  }

  return "bin";
}
