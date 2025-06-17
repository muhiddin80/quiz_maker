import "bootstrap/dist/css/bootstrap.min.css";
import { registerUser } from "../services/apiService.js";

const registerForm = document.getElementById("register-form");
const google = document.getElementById("google-btn");
const errorP = document.querySelector(".errorP");

// checkToken()
//   .then(res => {
//     if (res.data.message === 'ok') {
//       window.location.href = "/pages/homePage.html";
//     }
//   })
//   .catch(err => console.log(err.response?.data?.message));

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const res = await registerUser(payload);
    if (res.data.message === "Successfully registered!") {
      window.location.href = "/";
    } else {
      errorP.textContent = res.message;
    }
  } catch (err) {
    errorP.textContent = err.response?.data?.message || "Something went wrong.";
  }

  registerForm.reset();
});

google.addEventListener("click", () => {
  window.location.href = "http://localhost:4000/api/auth/google";
});
