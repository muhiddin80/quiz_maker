import { forgotPassword } from "../services/apiService";

const formData = document.getElementById('forgot-form')

formData.addEventListener('submit',async (e)=>{
    e.preventDefault()
    
    const form = new FormData(formData)
    const payload = Object.fromEntries(form.entries())

    try {
        await forgotPassword(payload)
        alert('We send link to your email!')
    } catch (error) {
        console.log(error.message)
    }

    formData.reset()
})