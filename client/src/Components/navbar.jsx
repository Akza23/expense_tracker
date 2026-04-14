
import { Link } from "react-router";
import "../Styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Expense Tracker</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">User Registration</Link></li>
        <li><Link to="/login">User Login</Link></li>
        <li><Link to="/adminlogin">Admin Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar
