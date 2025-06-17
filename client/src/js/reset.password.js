import customAxios from "../config/axios.config.js"

const resetForm = document.getElementById('reset-form');

resetForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(resetForm);
  const payload = Object.fromEntries(formData.entries());
  const token = new URLSearchParams(window.location.search).get('token');

  if (!token) {
    alert("Token not found in URL");
    return;
  }
  console.log(token)

  try {
    const response = await customAxios.post(`/auth/reset_password?token=${token}`, payload)
    alert("Password reset successful!");
    window.location.href = "/pages/login.html"
  } catch (error) {
    console.log(error);
  }

  resetForm.reset()
});
