import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import "../Styles/userRegistration.css";
import Navbar from "../Components/navbar";

function UserRegistration() {
	const [data, setdata] = useState({ firstname: "", lastname: "", email: "", phoneno: "", password: "" })
	const [file, setfile] = useState(null)
	const navigate = useNavigate()
	function change(e) {
		e.preventDefault()
		setdata({ ...data, [e.target.name]: e.target.value })
	}
	function uploadimage(e) {
		e.preventDefault()
		setfile(e.target.files[0])
	}
	async function register(e) {
		e.preventDefault()
		try {
			const formData = new FormData()
			formData.append("firstName", data.firstname)
			formData.append("lastName", data.lastname)
			formData.append("email", data.email)
			formData.append("phoneNumber", data.phoneno)
			formData.append("password", data.password)
			formData.append("Profile_pic", file)
			const response = await axios.post("http://localhost:8080/user/register", formData)
			alert("Registered Successfully")
			navigate("/login")
		}
		catch {
			alert(" Registration Error")
		}
	}
	return (
		<>
			<Navbar />
			<div>
				<form className="register-form" >
					<h2>User Registration</h2>
					<label htmlFor="firstname">First Name</label>
					<input type="text" onChange={change} name="firstname"></input>
					<label htmlFor="lastname">Last Name</label>
					<input type="text" onChange={change} name="lastname"></input>
					<label htmlFor="email">Email</label>
					<input type="email" onChange={change} name="email"></input>
					<label htmlFor="phoneno">Phone Number</label>
					<input type="number" onChange={change} name="phoneno"></input>
					<label htmlFor="password">Password</label>
					<input type="password" onChange={change} name="password"></input>
					<label htmlFor="img">Profile Picture</label>
					<input type="file" onChange={uploadimage} />
					<button type="submit" onClick={register}>Register</button>
				</form>
			</div>
		</>
	);
}

export default UserRegistration;
