import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from './components/Layout';
import RequireAuth from "./components/RequireAuth"

// Public Pages
import Landing from './pages/Landing/Landing';
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

// Authenticated Pages
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Home from './pages/Home/Home';
import Play from "./pages/Play/Play";
import Practice from "./pages/Practice/Practice";
import GuessHandSign from "./pages/GuessHandSign/GuessHandSign";
import FingerSpell from "./pages/FingerSpell/FingerSpell";
import SpellHandSign from "./pages/SpellHandSign/SpellHandSign";
import FourPicOneWord from "./pages/FourPicOneWord/FourPicOneWord";
import Learn from "./pages/Learn/Learn";
import Profile from "./pages/Profile/Profile";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile"
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ChooseHand from "./pages/ChooseHand/ChooseHand";
import Lesson1 from "./pages/Lessons/Lesson1/Lesson1";

//Teacher Pages 
import TeacherDashboard from "./pages/Teacher/TeacherDashboard/TeacherDashboard";
import EnrolledStudent from "./pages/Teacher/EnrolledStudent/EnrolledStudent";
import WaitingApproval from "./pages/WaitingApproval/WaitingApproval";
import Assignments from "./pages/Teacher/Assignments/Assignments";

//Student Pages
import StudentDashboard from "./pages/Student/StudentDashboard/StudentDashboard"

//Admin Pages
import AdminSignUp from "./pages/Admin/SignUp/SignUp"
import AdminLogin from "./pages/Admin/Login/Login"
import AccountActivation from "./pages/Admin/AccountActivation/AccountActivation";
import ManageGames from "./pages/Admin/ManageGames/ManageGames";
import ManageFingerspell from "./pages/Admin/ManageGames/Fingerspell/ManageFingerspell";
import ManageGuessHandSign from  "./pages/Admin/ManageGames/GuessHandSign/ManageGuessHandSign";
import ManageSpellHandSign from  "./pages/Admin/ManageGames/SpellHandSign/ManageSpellHandSign";
// import AdminLogin from './pages/Administrator/Login/Login'
import Administrator from "./pages/Administrator/Administrator";
import AdminFingerSpell from "./pages/Administrator/AdminFingerSpell/AdminFingerSpell";
import AdminSpellHandSign from "./pages/Administrator/AdminSpellHandSign/AdminSpellHandSign";
import AdminFourPicOneWord from "./pages/Administrator/AdminFourPicOneWord/AdminFourPicOneWord"

//Test Pages
import Test from "./pages/Test/Test";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Unprotected Routes */}
          <Route path="" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin/signup" element={<AdminSignUp />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="waiting-approval" element={<WaitingApproval />} />

          <Route path="test" element={<Test />} />
          

          {/* Student and General User Routes */}
          <Route element={<RequireAuth allowedRoles={["student", "generaluser"]}/>}>
            <Route path="asl-translator" element={<Home />} />
            <Route path="play-game" element={<Play />} />
            <Route path="practice" element={<Practice />} />
            <Route path="guess-hand-sign" element={<GuessHandSign />} />
            <Route path="finger-spell" element={<FingerSpell />} />
            <Route path="spell-hand-sign" element={<SpellHandSign />} />
            <Route path="4-pics-1-word" element={<FourPicOneWord />} />
            <Route path="learn" element={<Learn />} />

            <Route path="/lesson-1" element={<Lesson1 />} />
          </Route>

          {/* Authenticated Routes */}
          <Route element={<RequireAuth allowedRoles={["teacher", "student", "generaluser", "admin"]} />}>
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="choose-hand" element={<ChooseHand />} />
            <Route path="unauthorized" element={<Unauthorized />} />
          </Route>
    
          {/* Teacher Routes */}
          <Route element={<RequireAuth allowedRoles={["teacher"]} />}>
            <Route path="teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="enrolled-students" element={<EnrolledStudent />} />
            <Route path="teacher/assignments" element={<Assignments />} />

          </Route>

          {/* Student Routes */}
          <Route element={<RequireAuth allowedRoles={["student"]} />}>
            <Route path="student-dashboard" element={<StudentDashboard />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="account-activation" element={<AccountActivation />} />
            <Route path="manage-games" element={<ManageGames />} />
            <Route path="manage-fingerspell" element={<ManageFingerspell />} />
            <Route path="manage-guesshandsign" element={<ManageGuessHandSign    />} />
            <Route path="manage-spellhandsign" element={<ManageSpellHandSign    />} />
            
          </Route>

          <Route path="administrator" element={<Administrator />} />
          <Route path="manage-finger-spell" element={<AdminFingerSpell />} />
          <Route path="manage-spell-hand-sign" element={<AdminSpellHandSign />} />
          <Route path="manage-4-pic-1-word" element={<AdminFourPicOneWord />} />
        </Route>
      </Routes>
  );
}

export default App;