import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../Styles/AddExpense.css";

function AddExpense() {
	const navigate = useNavigate();
	const [expense, setExpense] = useState({ Name: "", Description: "", Amount: "", Date: "", DRorCR: "DR" });

	function change(e) {
		e.preventDefault()
		setExpense({ ...expense, [e.target.name]: e.target.value })
	}
	async function add(e) {
		e.preventDefault()
		try {
			const response = await axios.post("http://localhost:8080/expense/add", expense, { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } })
			alert("Added successfully")
			setExpense({ Name: "", Description: "", Amount: "", Date: "", DRorCR: "DR" })
			navigate("/addexpense")
		}
		catch {
			alert("Failure")
		}
	}

	return (
		<div className="add-expense-container">
			<h2>Add Expense</h2>
			<form className="expense-form" >
				<label>Name</label>
				<input type="text" name="Name" value={expense.Name} onChange={change} />
				<label>Description</label>
				<textarea name="Description" rows="3" value={expense.Description} onChange={change}>
				</textarea>
				<label>Amount</label>
				<input type="number" name="Amount" value={expense.Amount} onChange={change} />
				<label>Date</label>
				<input type="date" name="Date" value={expense.Date} onChange={change} />
				<label>Type</label>
				<select name="DRorCR" onChange={change}>
					<option value="DR">DR (Debit)</option>
					<option value="CR">CR (Credit)</option>
				</select>
				<div className="form-buttons">
					<button type="submit" className="add-btn" onClick={add}>Add Expense</button>
					<button
						type="button"
						className="back-btn"
						onClick={() => navigate("/userdash")}
					>
						Back to Dashboard
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddExpense;
