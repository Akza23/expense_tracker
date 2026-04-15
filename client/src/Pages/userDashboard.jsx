import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "../Styles/UserDashboard.css";

function UserDashboard() {
	const navigate = useNavigate();
	const [detailes, setdetailes] = useState()
	const handleAddExpense = () => {
		// navigate("/addexpense");
	};
	useEffect(() => {
		(async () => {
			const response = await axios.get("http://localhost:8080/user/profile", { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } })
			setdetailes(response.data)
			console.log(response.data)
		})()
	}
		, [])

	return (
		<div>
			{/* NAVBAR */}
			<nav className="user-navbar">
				<h2 className="logo">User Dashboard</h2>
				<ul className="nav-links">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/viewexpense">View Expense</Link></li>
					<li><Link to="/">Logout</Link></li>
				</ul>
			</nav>

			{/* DASHBOARD CONTENT */}
			<div className="dashboard-container">
				<img
					src={"http://localhost:8080/uploads/" + detailes?.user?.img}
					alt="User Profile"
					className="profile-pic"
				/>
				<h2>Track your expense and save your money</h2>
				<Link to="/addexpense">
					<button className="add-expense-btn" onClick={handleAddExpense}>
						Add Expense
					</button>
				</Link>
			</div>
		</div>
	);
}

export default UserDashboard;
