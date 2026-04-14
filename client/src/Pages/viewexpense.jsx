import axios from 'axios';
import { useEffect, useState } from 'react';
import '../Styles/viewexpense.css';

function Viewexpense() {
	const [items, setitem] = useState([])
	const [tab, settab] = useState(1)
	useEffect(() => {
		if (tab == 1) {
			axios.get("http://localhost:8080/expense/view", { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } }).then((response) => {
				setitem(response.data)
			})
		}
		if (tab == 2) {
			axios.get("http://localhost:8080/expense/weekly", { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } }).then((response) => {
				setitem(response.data)
			})
		}
		if (tab == 3) {
			axios.get("http://localhost:8080/expense/monthly", { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } }).then((response) => {
				setitem(response.data)
			})
		}
	}, [tab])

	// useEffect(()=>{
	// all({preventDefault:(()=>{})})

	// },[])
	// function all(e){
	//   e.preventDefault()

	//   axios.get("http://localhost:8080/expense/view",{headers:{Authorization:`Bearer ${localStorage.getItem("TOKEN")}`}}).then((response) => {
	//     setitem(response.data)
	//   })

	// }
	// function weekly(e){
	//   e.preventDefault()

	//   axios.get("http://localhost:8080/expense/weekly",{headers:{Authorization:`Bearer ${localStorage.getItem("TOKEN")}`}}).then((response) => {
	//     setitem(response.data)
	//   })

	// }
	// function monthly(e){
	//   e.preventDefault()

	//   axios.get("http://localhost:8080/expense/monthly",{headers:{Authorization:`Bearer ${localStorage.getItem("TOKEN")}`}}).then((response) => {
	//     setitem(response.data)
	//   })
	// }

	return (
		<div className="expense-container">
			<h1>Your Expenses</h1>
			<div className='list'>
				<button className={tab == 1 && 'focus'} onClick={() => settab(1)}>All</button>
				<button className={tab == 2 && 'focus'} onClick={() => settab(2)}>Weekly</button>
				<button className={tab == 3 && 'focus'} onClick={() => settab(3)}>Monthly</button>
			</div>
			<div className="expense-list">
				<div className='header'>
					<p>Name</p>
					<p>Description</p>
					<p>Date</p>
					<p>Amount</p>
					<p>Debited/Credited</p>
				</div>
				{items.map((item) => {
					return (
						<div className='item'>
							<p>{item.Name}</p>
							<p>{item.Description}</p>
							<p>{new Date(item.Date).toLocaleDateString()}</p>
							<p>{item.Amount}</p>
							<p className={`badge ${item.DRorCR == "DR" ? "badgegreen" : "badgered"}`}>
								{item.DRorCR}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Viewexpense;
