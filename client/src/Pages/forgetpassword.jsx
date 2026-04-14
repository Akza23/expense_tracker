import "../Styles/forgetpassword.css"
import axios, { AxiosError } from "axios"
import { useState } from "react"

function Forgetpassword() {
    const [data, setdata] = useState({ email: "" })
    function change(e) {
        e.preventDefault()
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    function update(e) {
        e.preventDefault()
        axios.post("http://localhost:8080/user/forgetpassword", data).then((response) => {
            alert("Password change Mail sended successfully")
        })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    if (error.response) {
                        alert(error.response.data?.message)
                    }
                }
            })
    }

    return (
        <>
            <div className="forgetpass-container">
                <h1>Forget Your Password?? Then Change it using your Email!!</h1>
                <form className="forgetpass-form">
                    <label htmlFor="email" >Enter your Email id:</label>
                    <input type="email"  name="email" onChange={change} />
                    <button onClick={update}>Send Reset Link</button>
                </form>
            </div>
        </>
    )
}

export default Forgetpassword