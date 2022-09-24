import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Play from "./pages/Play/Play";
import Practice from "./pages/Practice/Practice";
import GuessHandSign from "./pages/GuessHandSign/GuessHandSign";
import FingerSpell from "./pages/FingerSpell/FingerSpell";
import SpellHandSign from "./pages/SpellHandSign/SpellHandSign";
import FourPicOneWord from "./pages/FourPicOneWord/FourPicOneWord";
import Learn from "./pages/Learn/Learn";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import WaitingApproval  from "./pages/WaitingApproval/WaitingApproval"
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard"
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
//Admin Pages
import AdminLogin from './pages/Administrator/Login/Login'
import Administrator from "./pages/Administrator/Administrator";
import AdminFingerSpell from "./pages/Administrator/AdminFingerSpell/AdminFingerSpell";
import AdminSpellHandSign from "./pages/Administrator/AdminSpellHandSign/AdminSpellHandSign";
import AdminFourPicOneWord from "./pages/Administrator/AdminFourPicOneWord/AdminFourPicOneWord"
import AdminManageRequest from "./pages/Administrator/AdminManageRequest/AdminManageRequest";

//Test Pages
// import AppDrawer from "./pages/MUI/AppDrawer";
function App() {
  const { user } = useSelector(
    (state) => state.auth
  );
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/waiting-approval" element={<WaitingApproval />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard/>} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/administrator" element={<Administrator />} />
        <Route path="/manage-finger-spell" element={<AdminFingerSpell />} />
        <Route path="/manage-spell-hand-sign" element={<AdminSpellHandSign />} />
        <Route path="/manage-4-pic-1-word" element={<AdminFourPicOneWord />} />
        <Route path="/manage-request" element={<AdminManageRequest />} />

        </Routes>


        {/* { user ? 
        (
          <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          </>
        ) :

        (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        )
        } */}
    </div>
  );
}

export default App;
