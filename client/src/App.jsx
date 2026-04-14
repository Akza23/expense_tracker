import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import './App.css'
import Navbar from "./Components/navbar.jsx"
import AddExpense from './Pages/addExpense.jsx'
import Admindash from './Pages/admindash.jsx'
import AdminLogin from './Pages/adminlogin.jsx'
import Forgetpassword from './Pages/forgetpassword.jsx'
import Passwordreset from './Pages/passwordresetpage.jsx'
import UserDashboard from './Pages/userDashboard.jsx'
import UserLogin from './Pages/userLogin.jsx'
import UserRegistration from './Pages/userReg.jsx'
import Viewexpense from './Pages/viewexpense.jsx'
import Viewuserexpense from './Pages/viewuserexp.jsx'
import Viewusers from './Pages/viewusers.jsx'
function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<Toaster />
			<Routes>
				<Route path="/" element={<Navbar />} />
				<Route path="/register" element={<UserRegistration />} />
				<Route path="/login" element={<UserLogin />} />
				<Route path="/userdash" element={<UserDashboard />} />
				<Route path="/addexpense" element={<AddExpense />} />
				<Route path="/viewexpense" element={<Viewexpense />} />
				<Route path="/adminlogin" element={<AdminLogin />} />
				<Route path="/admindash" element={<Admindash />} />
				<Route path="/viewusers" element={<Viewusers />} />
				<Route path="/viewuserexpense/:id" element={<Viewuserexpense />} />
				<Route path="/forgetpassword" element={<Forgetpassword />} />
				<Route path="/passwordreset" element={<Passwordreset />} />
			</Routes>
		</>
	)
}

export default App
