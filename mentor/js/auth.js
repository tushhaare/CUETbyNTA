import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://sjetveelmoorrhxtlndt.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_bJn6AT56orTZjj13dLCnqw_lPnRNvBl";

const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

/*
 * Make the client available to dashboard.js.
 * This is safe because this is the publishable/anon key.
 */
window.cbntaSupabase = supabaseClient;


function getCurrentMentor() {
  try {
    return JSON.parse(sessionStorage.getItem("cbnta_mentor")) || null;
  } catch {
    return null;
  }
}

window.getCurrentMentor = getCurrentMentor;


function logout() {
  supabaseClient.auth.signOut().finally(() => {
    sessionStorage.removeItem("cbnta_mentor");
    window.location.href = "login.html";
  });
}


document.addEventListener("DOMContentLoaded", async () => {

  /* LOGIN */

  const form = document.getElementById("loginForm");

  if (form) {

    form.addEventListener("submit", async (event) => {

      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const message = document.getElementById("loginMessage");

      message.textContent = "Signing in...";

      const { data, error } =
        await supabaseClient.auth.signInWithPassword({
          email,
          password
        });

      if (error) {
        console.error(error);
        message.textContent = "Invalid email or password.";
        return;
      }

      const user = data.user;

      const mentor = {
        mentorId: user.user_metadata?.mentor_id,
        certificateId: user.user_metadata?.certificate_id,
        name: user.user_metadata?.name || email.split("@")[0],
        email: user.email
      };

      sessionStorage.setItem(
        "cbnta_mentor",
        JSON.stringify(mentor)
      );

      window.location.href = "dashboard.html";
    });
  }

  /* FORGOT PASSWORD */

  const forgotPassword = document.getElementById("forgotPassword");

  if (forgotPassword) {
    forgotPassword.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "reset-password.html";
    });
  }
  /* LOGOUT */

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }


  /* DASHBOARD SESSION CHECK */

  if (window.location.pathname.endsWith("/dashboard.html")) {

    const { data } =
      await supabaseClient.auth.getSession();

    if (!data.session) {
      window.location.href = "login.html";
      return;
    }

    const user = data.session.user;

    sessionStorage.setItem(
      "cbnta_mentor",
      JSON.stringify({
        mentorId: user.user_metadata?.mentor_id,
        certificateId: user.user_metadata?.certificate_id,
        name:
          user.user_metadata?.name ||
          user.email?.split("@")[0],
        email: user.email
      })
    );
  }

});
