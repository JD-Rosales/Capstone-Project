import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Play from "./pages/Play/Play";
import Practice from "./pages/Practice/Practice";
import GuessHandSign from "./pages/GuessHandSign/GuessHandSign";
import FingerSpell from "./pages/FingerSpell/FingerSpell";
import SpellHandSign from "./pages/SpellHandSign/SpellHandSign";
import FourPicOneWord from "./pages/FourPicOneWord/FourPicOneWord";
import Learn from "./pages/Learn/Learn";

//Admin Pages
import Login from './pages/Administrator/Login/Login'
import Administrator from "./pages/Administrator/Administrator";
import AdminFingerSpell from "./pages/Administrator/AdminFingerSpell/AdminFingerSpell";
import AdminSpellHandSign from "./pages/Administrator/AdminSpellHandSign/AdminSpellHandSign";
import AdminFourPicOneWord from "./pages/Administrator/AdminFourPicOneWord/AdminFourPicOneWord"

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
        <Route path="/spell-hand-sign" element={<SpellHandSign />} />
        <Route path="/4-pics-1-word" element={<FourPicOneWord />} />
        <Route path="/learn" element={<Learn />} />

        <Route path="/login" element={<Login />} />
        <Route path="/administrator" element={<Administrator />} />
        <Route path="/manage-finger-spell" element={<AdminFingerSpell />} />
        <Route path="/manage-spell-hand-sign" element={<AdminSpellHandSign />} />
        <Route path="/manage-4-pic-1-word" element={<AdminFourPicOneWord />} />
      </Routes>
      <ToastContainer
        autoClose={1500}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default App;
