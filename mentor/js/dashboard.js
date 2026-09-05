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



document.addEventListener(
  "DOMContentLoaded",
  async () => {

    const sessionMentor =
      getCurrentMentor();


    if (!sessionMentor) {

      window.location.href =
        "login.html";

      return;
    }


    const mentor =
      MENTORS[
        sessionMentor.mentorId
      ];


    if (!mentor) {

      window.location.href =
        "login.html";

      return;
    }


    /*
     * BASIC INFORMATION
     */

    document.getElementById(
      "mentorName"
    ).textContent =
      mentor.name;


    document.getElementById(
      "navMentorName"
    ).textContent =
      sessionMentor.email;


    document.getElementById(
      "certificateId"
    ).textContent =
      mentor.certificateId;


    document.getElementById(
      "mentorIdInfo"
    ).textContent =
      sessionMentor.mentorId;


    document.getElementById(
      "certificateIdInfo"
    ).textContent =
      mentor.certificateId;


    /*
     * ID VERIFICATION IS THE GATE.
     */

    await setupIdentityVerification(
      mentor
    );

  }
);



async function setupIdentityVerification(
  mentor
) {

  const supabase =
    window.cbntaSupabase;


  if (!supabase) {

    console.error(
      "Supabase client unavailable."
    );

    return;
  }


  /*
   * ELEMENTS
   */

  const identitySection =
    document.getElementById(
      "identitySection"
    );


  const uploadArea =
    document.getElementById(
      "uploadArea"
    );


  const submittedArea =
    document.getElementById(
      "submittedArea"
    );


  const submittedFileName =
    document.getElementById(
      "submittedFileName"
    );


  const viewSubmittedId =
    document.getElementById(
      "viewSubmittedId"
    );


  const documentsSection =
    document.getElementById(
      "documentsSection"
    );


  const verificationSection =
    document.getElementById(
      "verificationSection"
    );


  const infoSection =
    document.getElementById(
      "infoSection"
    );


  const importantSection =
    document.getElementById(
      "importantSection"
    );


  const form =
    document.getElementById(
      "idUploadForm"
    );


  const fileInput =
    document.getElementById(
      "idFile"
    );


  const signoff =
    document.getElementById(
      "idSignoff"
    );


  const submitBtn =
    document.getElementById(
      "idSubmitBtn"
    );


  const status =
    document.getElementById(
      "idStatus"
    );


  const statusBox =
    document.getElementById(
      "idVerificationStatus"
    );


  const statusInfo =
    document.getElementById(
      "idStatusInfo"
    );


  const linkedinBtn =
    document.getElementById(
      "linkedinLink"
    );


  const linkedinStatus =
    document.getElementById(
      "linkedinStatus"
    );



  /*
   * GET CURRENT SESSION
   */

  const {
    data: sessionData,
    error: sessionError
  } =
    await supabase.auth.getSession();


  if (
    sessionError ||
    !sessionData.session
  ) {

    window.location.href =
      "login.html";

    return;
  }


  const user =
    sessionData.session.user;


  const mentorData =
    getCurrentMentor();


  if (!mentorData) {

    window.location.href =
      "login.html";

    return;
  }



  /*
   * CHECK EXISTING ID SUBMISSION
   */

  const {
    data: existing,
    error: existingError
  } =
    await supabase
      .from(
        "mentor_id_documents"
      )
      .select(
        "file_path,status,signoff,signed_off_at,updated_at"
      )
      .eq(
        "mentor_user_id",
        user.id
      )
      .maybeSingle();


  if (existingError) {

    console.error(
      "Could not check ID verification:",
      existingError
    );

    status.textContent =
      "Unable to check your verification status. Please refresh and try again.";

    return;
  }



  /*
   * UNLOCK DOCUMENTS
   */

  function unlockDocuments() {

    documentsSection.style.display =
      "grid";


    verificationSection.style.display =
      "grid";


    infoSection.style.display =
      "grid";


    importantSection.style.display =
      "block";


    /*
     * LOR
     */

    const lor =
      document.getElementById(
        "lorLink"
      );


    lor.href =
      mentor.lorFile;


    lor.target =
      "_blank";


    lor.removeAttribute(
      "download"
    );


    /*
     * CERTIFICATE
     */

    const certificate =
      document.getElementById(
        "certificateLink"
      );


    certificate.href =
      mentor.certificateFile;


    certificate.target =
      "_blank";


    certificate.removeAttribute(
      "download"
    );


    /*
     * PUBLIC VERIFICATION
     */

    const verification =
      document.getElementById(
        "verificationLink"
      );


    verification.href =
      `../../verify/?id=${mentor.certificateId}`;


    /*
     * LINKEDIN
     */

    setupLinkedInSharing(
      mentor,
      linkedinBtn,
      linkedinStatus
    );

  }



  /*
   * SHOW SUBMITTED DOCUMENT
   */

  async function showSubmittedDocument(
    record
  ) {

    /*
     * Hide upload form permanently.
     */

    if (uploadArea) {

      uploadArea.style.display =
        "none";

    }


    if (submittedArea) {

      submittedArea.style.display =
        "block";

    }


    /*
     * Status
     */

    statusInfo.textContent =
      record.status === "approved"
        ? "Approved"
        : "Submitted";


    statusBox.innerHTML =
      `<div class="success-note">
        ✓ Identity verification submitted successfully.
      </div>`;


    /*
     * File name
     */

    const path =
      record.file_path || "";


    const filename =
      path.split("/").pop() ||
      "Identity document";


    if (submittedFileName) {

      submittedFileName.textContent =
        filename;

    }


    /*
     * Create a temporary private URL.
     *
     * The Supabase bucket remains private.
     */

    if (
      record.file_path &&
      viewSubmittedId
    ) {

      const {
        data: signedUrlData,
        error: signedUrlError
      } =
        await supabase
          .storage
          .from(
            "mentor-id-documents"
          )
          .createSignedUrl(
            record.file_path,
            600
          );


      if (
        !signedUrlError &&
        signedUrlData?.signedUrl
      ) {

        viewSubmittedId.href =
          signedUrlData.signedUrl;

        viewSubmittedId.target =
          "_blank";

        viewSubmittedId.style.display =
          "inline-flex";

      } else {

        viewSubmittedId.style.display =
          "none";

        console.error(
          "Could not create secure ID view URL:",
          signedUrlError
        );

      }

    }


    /*
     * Unlock the rest of dashboard.
     */

    unlockDocuments();

  }



  /*
   * EXISTING SUBMISSION
   */

  if (
    existing &&
    existing.signoff === true &&
    (
      existing.status === "submitted" ||
      existing.status === "approved"
    )
  ) {

    await showSubmittedDocument(
      existing
    );

    return;
  }



  /*
   * NO SUBMISSION
   *
   * Keep everything else locked.
   */

  if (uploadArea) {

    uploadArea.style.display =
      "block";

  }


  if (submittedArea) {

    submittedArea.style.display =
      "none";

  }


  documentsSection.style.display =
    "none";


  verificationSection.style.display =
    "none";


  infoSection.style.display =
    "none";


  importantSection.style.display =
    "none";


  statusInfo.textContent =
    "Not submitted";



  /*
   * SUBMIT ID
   */

  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      status.textContent =
        "";


      const file =
        fileInput.files[0];


      /*
       * FILE REQUIRED
       */

      if (!file) {

        status.textContent =
          "Please select your identity document.";

        return;
      }


      /*
       * MAXIMUM 5 MB
       */

      const maxSize =
        5 * 1024 * 1024;


      if (
        file.size > maxSize
      ) {

        status.textContent =
          "File is too large. Maximum size is 5 MB.";

        return;
      }


      /*
       * ALLOWED TYPES
       */

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf"
      ];


      if (
        !allowedTypes.includes(
          file.type
        )
      ) {

        status.textContent =
          "Only JPG, PNG or PDF files are allowed.";

        return;
      }


      /*
       * SIGN-OFF REQUIRED
       */

      if (
        !signoff.checked
      ) {

        status.textContent =
          "Please confirm the sign-off before submitting.";

        return;
      }


      /*
       * LOCK BUTTON WHILE UPLOADING
       */

      submitBtn.disabled =
        true;


      submitBtn.textContent =
        "Uploading...";


      try {

        /*
         * FILE EXTENSION
         */

        const extension =
          getFileExtension(
            file.name
          );


        /*
         * PRIVATE STORAGE PATH
         */

        const filePath =
          `${user.id}/identity.${extension}`;


        /*
         * UPLOAD
         *
         * IMPORTANT:
         * upsert:false prevents replacing
         * an existing document.
         */

        const {
          error: uploadError
        } =
          await supabase
            .storage
            .from(
              "mentor-id-documents"
            )
            .upload(
              filePath,
              file,
              {
                upsert: false,
                contentType:
                  file.type
              }
            );


        if (uploadError) {

          throw uploadError;

        }


        /*
         * CREATE DATABASE RECORD
         */

        const {
          error: databaseError
        } =
          await supabase
            .from(
              "mentor_id_documents"
            )
            .insert({

              mentor_user_id:
                user.id,

              mentor_id:
                mentorData.mentorId,

              file_path:
                filePath,

              status:
                "submitted",

              signoff:
                true,

              signed_off_at:
                new Date().toISOString(),

              updated_at:
                new Date().toISOString()

            });


        if (databaseError) {

          throw databaseError;

        }


        /*
         * SUCCESS
         */

        status.textContent =
          "";


        statusInfo.textContent =
          "Submitted";


        /*
         * Lock the upload area
         * and show submitted document.
         */

        await showSubmittedDocument({

          file_path:
            filePath,

          status:
            "submitted",

          signoff:
            true

        });


      } catch (error) {

        console.error(
          "ID submission error:",
          error
        );


        status.textContent =
          "Something went wrong while uploading your ID. Please try again.";


      } finally {

        submitBtn.disabled =
          false;


        submitBtn.textContent =
          "Submit ID for Verification";

      }

    }
  );

}



/*
 * =========================================
 * LINKEDIN — PHONE FIRST
 * =========================================
 */

function setupLinkedInSharing(
  mentor,
  button,
  statusElement
) {

  if (!button) {
    return;
  }


  const caption =
    `Proud to have completed my 10-month mentorship journey with CUETbyNTA as a Mentor.\n\n` +
    `It was a wonderful experience contributing to the student community and helping aspirants navigate their CUET journey.\n\n` +
    `Thank you, CUETbyNTA, for the opportunity.\n\n` +
    `#CUETbyNTA #CUET #Mentorship #Education`;


  button.textContent =
    "Share Certificate on LinkedIn";


  button.onclick =
    async () => {

      statusElement.textContent =
        "Preparing your certificate...";


      button.disabled =
        true;


      try {

        /*
         * Fetch certificate PDF.
         */

        const response =
          await fetch(
            mentor.certificateFile
          );


        if (!response.ok) {

          throw new Error(
            "Certificate could not be loaded."
          );

        }


        const blob =
          await response.blob();


        /*
         * Convert PDF into a File.
         */

        const certificateFile =
          new File(
            [blob],
            "CUETbyNTA-Certificate.pdf",
            {
              type:
                "application/pdf"
            }
          );


        /*
         * =================================
         * NATIVE PHONE SHARE
         * =================================
         *
         * This is the primary route.
         *
         * On supported Android/iPhone
         * browsers the operating system's
         * share sheet will appear.
         */

        if (
          navigator.share &&
          navigator.canShare &&
          navigator.canShare({
            files:
              [certificateFile]
          })
        ) {

          statusElement.textContent =
            "Opening your phone's share options...";


          await navigator.share({

            title:
              "CUETbyNTA Mentorship Certificate",

            text:
              caption,

            files:
              [certificateFile]

          });


          statusElement.textContent =
            "Certificate ready to share.";

          return;
        }



        /*
         * =================================
         * BROWSER FALLBACK
         * =================================
         */

        const certificateUrl =
          new URL(
            mentor.certificateFile,
            window.location.href
          ).href;


        /*
         * Open certificate.
         */

        window.open(
          certificateUrl,
          "_blank"
        );


        /*
         * Open LinkedIn with caption.
         */

        const linkedinUrl =
          "https://www.linkedin.com/feed/?shareActive=true&text=" +
          encodeURIComponent(
            caption
          );


        setTimeout(
          () => {

            window.open(
              linkedinUrl,
              "_blank"
            );

          },
          500
        );


        statusElement.textContent =
          "Certificate opened. Attach it to your LinkedIn post and publish.";


      } catch (error) {

        console.error(
          "LinkedIn sharing error:",
          error
        );


        /*
         * User cancelled native share.
         */

        if (
          error?.name ===
          "AbortError"
        ) {

          statusElement.textContent =
            "";

          return;
        }


        statusElement.textContent =
          "Unable to open sharing. Please open your certificate and share it manually.";

      } finally {

        button.disabled =
          false;

      }

    };

}



/*
 * =========================================
 * FILE EXTENSION
 * =========================================
 */

function getFileExtension(
  filename
) {

  const parts =
    filename
      .toLowerCase()
      .split(".");


  const extension =
    parts[
      parts.length - 1
    ];


  if (
    extension === "jpg" ||
    extension === "jpeg"
  ) {

    return "jpg";

  }


  if (
    extension === "png"
  ) {

    return "png";

  }


  if (
    extension === "pdf"
  ) {

    return "pdf";

  }


  return "bin";

}
