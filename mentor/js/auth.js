/*
  Production authentication hook.

  This starter intentionally does NOT contain real passwords.
  Connect this file to Supabase Auth (recommended) or another
  authentication provider before putting the portal into production.
*/

const DEMO_MODE = true;

const DEMO_MENTOR = {
  mentorId: "M001",
  name: "Tushar",
  email: "mentor@example.com",
  certificateId: "CBNTA-M-2026-001"
};

function getCurrentMentor() {
  try {
    return JSON.parse(sessionStorage.getItem("cbnta_mentor")) || null;
  } catch {
    return null;
  }
}

function setCurrentMentor(mentor) {
  sessionStorage.setItem("cbnta_mentor", JSON.stringify(mentor));
}

function logout() {
  sessionStorage.removeItem("cbnta_mentor");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const message = document.getElementById("loginMessage");

      if (!email || !password) return;

      if (DEMO_MODE) {
        /*
          Demo credentials for local UI testing only.
          REMOVE DEMO_MODE and connect real authentication before launch.
        */
        if (email === "mentor@example.com" && password === "demo123") {
          setCurrentMentor(DEMO_MENTOR);
          window.location.href = "dashboard.html";
        } else {
          message.textContent = "Demo login: mentor@example.com / demo123";
        }
      }
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);

  if (window.location.pathname.endsWith("/dashboard.html")) {
    const mentor = getCurrentMentor();
    if (!mentor) {
      window.location.href = "login.html";
    }
  }
});
