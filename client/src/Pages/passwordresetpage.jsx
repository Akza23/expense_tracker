import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router";
import "../Styles/passwordreset.css";

function Passwordreset() {
	const { token } = useSearchParams()
	const [password, setpassword] = useState({ password: "", cpassword: "" })
	function change(e) {
		e.preventDefault()
		setpassword({ ...password, [e.target.name]: e.target.value })
	}
	function reset(e) {
		e.preventDefault()
		axios.post("http://localhost:8080/user/resetpassword", { password: password.password, token }).then((response) => {
			alert("Password Successfully Reset")
		})
	}
	return (
		<>
			<div className="reset-container">
				<form className="reset-form">
					<h2>Reset Password</h2>
					<label htmlFor="password">Enter New Password</label>
					<input type="password" name="password" placeholder="New Password" onChange={change} />
					<label htmlFor="cpassword">Confirm Password</label>
					<input type="password" name="cpassword" placeholder="Confirm Password" onChange={change} />
					<button type="submit" onClick={reset}>Reset Password</button>
				</form>
			</div>
		</>
	);
}

export default Passwordreset;
