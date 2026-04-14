import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../Styles/UserLogin.css";
import Navbar from "../Components/navbar";

function UserLogin() {
	const navigate = useNavigate()
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	function handleChange(e) {
		e.preventDefault()
		setLoginData({ ...loginData, [e.target.name]: e.target.value })
	}
	async function login(e) {
		e.preventDefault()
		try {
			const response = await axios.post("http://localhost:8080/user/login", loginData)
			const token = response.data.token
			localStorage.setItem("TOKEN", token)
			alert("Login Successfully")
			navigate("/userdash")
		}
		catch {
			alert("Login Failed")
		}
	}
	return (
		<>
			<Navbar />
			<div className="login-container">
				<form className="login-form" >
					<h2>User Login</h2>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" onChange={handleChange} />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" onChange={handleChange} />
					<Link to="/forgetpassword"><p>Forget Password?</p></Link>
					<button type="submit" onClick={login}>Login</button>
				</form>
			</div>
		</>
	);
}

export default UserLogin;
