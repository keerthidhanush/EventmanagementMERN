import { Route, Routes } from "react-router-dom";  // Removed Navigate since it's not used
import Main from "./components/Main";
import Signup from "./components/Singup";  // Check the spelling: 'Singup' might need to be 'Signup'
import Login from "./components/Login";
import Admin from "./components/Admin";

function App() {
	return (
		<Routes>
			{/* Always show Main page at the root path */}
			<Route path="/" element={<Main />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/admin" element={<Admin />} />
		</Routes>
	);
}

export default App;
