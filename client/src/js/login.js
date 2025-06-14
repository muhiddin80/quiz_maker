import { loginUser } from "../services/apiService";

const loginForm = document.getElementById("login-form")

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