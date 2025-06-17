import { loginUser } from "../services/apiService";

const loginForm = document.getElementById("login-form")
const google = document.getElementById('google-btn')

loginForm.addEventListener('submit',async (e) =>{
    e.preventDefault()

    const formData = new FormData(loginForm)
    const payload = Object.fromEntries(formData.entries());

    try {
        const res = await loginUser(payload)
        if(res.data.message== "Successfully logged!"){
            window.location.href = "/"
        }
    } catch (error) {
        
    }

    loginForm.reset();
})

google.addEventListener("click", () => {
    window.location.href = "http://localhost:4000/api/auth/google";
});