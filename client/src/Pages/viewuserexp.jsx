import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
function Viewuserexpense() {
    const [userexp, setitem] = useState([])
    const { id } = useParams()
    useEffect(() => {
        axios.get("http://localhost:8080/admin/viewuserexpense/" + id, { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } }).then((response) => {
            setitem(response.data.UserExpense)
        })
    }, [])
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Debited/Credited</th>
                </tr>
            </thead>
            {userexp.map((item) => {
                return (
                    <tbody>
                        <tr>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{new Date(item.Date).toLocaleDateString()}</td>
                            <td>{item.Amount}</td>
                            <td className={`badge ${item.DRorCR == "DR" ? "badgegreen" : "badgered"}`}>
                                {item.DRorCR}</td>
                        </tr>
                    </tbody>
                )
            })}
        </table>
    )
}

export default Viewuserexpense