import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Play from "./pages/Play/Play";
import Practice from "./pages/Practice/Practice";
import GuessHandSign from "./pages/GuessHandSign/GuessHandSign";
import FingerSpell from "./pages/FingerSpell/FingerSpell";
import FourPicOneWord from "./pages/FourPicOneWord/FourPicOneWord";
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Admin from "./pages/Admin/Admin";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import AdminFingerspell from "./pages/Admin/Fingerspell/Fingerspell";
import AdminSpellHandSign from "./pages/Admin/SpellHandSign/SpellHandSign";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/play-game" element={<Play />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/guess-hand-sign" element={<GuessHandSign />} />
        <Route path="/finger-spell" element={<FingerSpell />} />
        <Route path="/4-pics-1-word" element={<FourPicOneWord />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/administrator" element={<Admin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/administrator/finger-spell" element={<AdminFingerspell />} />
        <Route path="/administrator/spell-hand-sign" element={<AdminSpellHandSign />} />
      </Routes>
      <ToastContainer
        autoClose={1500}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default App;
