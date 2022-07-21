import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home'
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Admin from "./pages/Admin/Admin";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Fingerspell from "./pages/Fingerspell/Fingerspell";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/administrator" element={<Admin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/administrator/finger-spell" element={<Fingerspell />} />
      </Routes>
      <ToastContainer
        autoClose={1500}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default App;
