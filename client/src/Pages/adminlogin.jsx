import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../Components/navbar";
import "../Styles/adminlogin.css";

function AdminLogin() {
	const [data, setdata] = useState({ username: "", password: "" })
	const navigate = useNavigate()
	function change(e) {
		e.preventDefault()
		setdata({ ...data, [e.target.name]: e.target.value })
	}
	async function login(e) {
		e.preventDefault()
		try {
			const response = await axios.post("http://localhost:8080/admin/login", data)
			const token = response.data.token
			localStorage.setItem("TOKEN", token)
			alert("Login Successfully")
			navigate("/admindash")
		}
		catch {
			alert("Login Failed")
		}

	}
	return (
		<>
			<Navbar />
			<div className="admin-login-container">
				<form className="admin-login-form">
					<h2>Admin Login</h2>
					<label htmlFor="username">Username:</label>
					<input type="text" name="username" onChange={change} />
					<label htmlFor="password">Password:</label>
					<input type="password" name="password" onChange={change} />
					<button type="submit" onClick={login}>Login</button>
				</form>
			</div>
		</>
	);
}

export default AdminLogin;