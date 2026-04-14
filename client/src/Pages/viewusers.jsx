import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { toast } from 'sonner'
import "../Styles/viewusers.css"

function Viewusers() {
    const [users, setusers] = useState([])
    const searchref = useRef()
    const dialogref = useRef()
    const newname = useRef()
    const [line, setline] = useState("")
    const [id, setid] = useState("")
    const [refresh, setrefresh] = useState(false);
    async function viewusers() {
        const response = await axios.get("http://localhost:8080/admin/viewusers?search=" + line, { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } })
        setusers(response.data.users)
    }
    function search() {
        setline(searchref.current.value)
    }
    useEffect(() => {
        viewusers()
    }, [line, refresh])
    function update(id) {
        dialogref.current.showModal()
        setid(id)
    }
    async function changeit() {
        try {
            await axios.put("http://localhost:8080/admin/updateuser/" + id, { firstName: newname.current.value }, { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } })
            toast.success("updated successfully")
            setrefresh(!refresh)
            dialogref.current.close()
        }
        catch {
            toast.error("Not updated")
        }
    }
    async function remove(id) {
        try {
            // setid(id)
            await axios.delete("http://localhost:8080/admin/deleteuser/" + id, { headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` } })
            toast.success("deleted successfully")
            setrefresh(!refresh)
        }
        catch {
            toast.error("Not Deleted")
        }
    }
    return (
        <div className="view-users">
            <h1 className="title">User Details</h1>
            <div className="search-bar">
                <input type="text" placeholder="Search the user" className="search-input" ref={searchref} />
                <button className="search-btn" onClick={search}>Search</button>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>USER NAME</th>
                        <th>EMAIL ID</th>
                    </tr>
                </thead>
                {users.map((item) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{item.firstName}</td>
                                <td>{item.email}</td>
                                <td><button className="update-btn" onClick={() => update(item._id)}>Update</button></td>
                                <td><button className="remove-btn" onClick={() => remove(item._id)}>Remove</button></td>
                                <td><button className="viewexp-btn"><Link to={"/viewuserexpense/" + item._id}>View Expense</Link></button></td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
            <div>
                <dialog ref={dialogref}>
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" ref={newname} />
                    <button onClick={changeit}>Update</button>
                    <button onClick={() => {
                        dialogref.current.close()
                    }}>Exit</button>
                </dialog>
            </div>
        </div>
    )
}

export default Viewusers
