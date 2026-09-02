const SUPABASE_URL = "https://sjetveelmoorrhxtlndt.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_bJn6AT56orTZjj13dLCnqw_lPnRNvBl";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

function logout() {
  supabaseClient.auth.signOut().finally(() => {
    sessionStorage.removeItem("cbnta_mentor");
    window.location.href = "login.html";
  });
}

async function loadMentorSession() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error || !data.session) {
    window.location.href = "login.html";
    return null;
  }

  const user = data.session.user;

  const mentor = {
    mentorId: user.user_metadata?.mentor_id,
    certificateId: user.user_metadata?.certificate_id,
    name: user.user_metadata?.name || user.email?.split("@")[0],
    email: user.email
  };

  sessionStorage.setItem("cbnta_mentor", JSON.stringify(mentor));

  return mentor;
}

document.addEventListener("DOMContentLoaded", () => {
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
        message.textContent = "Invalid email or password.";
        return;
      }

      const user = data.user;

      sessionStorage.setItem(
        "cbnta_mentor",
        JSON.stringify({
          mentorId: user.user_metadata?.mentor_id,
          certificateId: user.user_metadata?.certificate_id,
          name: user.user_metadata?.name || email.split("@")[0],
          email: user.email
        })
      );

      window.location.href = "dashboard.html";
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  if (window.location.pathname.endsWith("/dashboard.html")) {
    loadMentorSession();
  }
});
