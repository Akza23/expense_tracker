import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import "../Styles/admindash.css";
function Admindash() {
	const [usercount, setcount] = useState()
	const [data, setdata] = useState()
	//   const data = [
	//   {
	//      date: new Date("2025-10-29"),
	//      count:25
	//   },
	//    {
	//      date:new Date("2025-10-30"),
	//      count:55
	//   },
	//    {
	//      date:new Date("2025-10-31"),
	//      count:60
	//   },
	//    {
	//      date:new Date("2025-11-01"),
	//      count:40
	//   },
	//    {
	//      date:new Date("2025-11-02"),
	//      count:30
	//   },
	// ];

	useEffect(() => {
		axios.get("http://localhost:8080/admin/countusers", { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } }).then((response) => {
			setcount(response.data)
		})
		axios.get("http://localhost:8080/admin/chart", { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } }).then((response) => {
			setdata(response.data.result)
			// console.log(response.data)
		})
	}, [])

	return (
		<div className="admin-dashboard">
			<nav className="admin-navbar">
				<h2 className="navbar-brand">Admin Dashboard</h2>
				<div className="nav-links">
					<Link to="/viewusers">Users</Link>
					<button ><Link to="/">Logout</Link></button>
				</div>
			</nav>

			<div className="cards-container">
				<div className="card">
					<h3>Total Users</h3>
					<p>{usercount?.Count}</p>
				</div>

				<div className="card">
					<h3>Total Expenses</h3>
					{/* <p>{expenseCount}</p> */}
				</div>
			</div>
			<div>
				<LineChart data={data} style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}>
					<Line dataKey="count" />
					<XAxis dataKey="date" tickFormatter={(date) => {
						return (
							new Date(date).toLocaleDateString("en-IN")
						)
					}} />
					<YAxis width="auto" />
					<Tooltip />
					<Legend />
				</LineChart>
			</div>
		</div>
	);
}

export default Admindash;
