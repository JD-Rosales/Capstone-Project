import "./Sidebar.css";
import logo2 from "../../assets/logo2.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiDumbbell } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { resetAll } from "../../features/auth/authSlice";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    localStorage.clear();
    dispatch(resetAll());
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo2} alt="logo"></img>
        <div className="greeting">
          <span>
            <FaUserCircle />
          </span>
          <span>
            {user.userInfo.firstName + " " + user.userInfo.lastName} <br />
            <span>
              ({user.role.charAt(0).toUpperCase() + user.role.slice(1)})
            </span>
          </span>
        </div>
      </div>

      <div className="list-container">
        {user.role === "teacher" ? (
          <ul>
            <li>
              <NavLink to="/teacher-dashboard">
                <RiDashboardFill className="icon" /> <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <Link to="/enrolled-students">
                <MdPeopleAlt className="icon" /> <span>Enrolled Students</span>
              </Link>
            </li>
          </ul>
        ) : user.role === "student" ? (
          <ul>
            <li>
              <Link to="/student-dashboard">
                <RiDashboardFill className="icon" /> <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/play-game">
                <FaGamepad className="icon" /> <span>Play a Game</span>
              </Link>
            </li>

            <li>
              <Link to="/learn">
                <GiTeacher className="icon" /> <span>Learn ASL</span>
              </Link>
            </li>
          </ul>
        ) : user.role === "admin" ? (
          <></>
        ) : (
          <ul>
            <li>
              <Link to="/home">
                <AiFillHome className="icon" /> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/play-game">
                <FaGamepad className="icon" /> <span>Play a Game!</span>
              </Link>
            </li>
            <li>
              <Link to="/practice">
                <BiDumbbell className="icon" /> <span>Practice</span>
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div className="button-container">
        <Stack direction="column" spacing={1}>
          <Button variant="contained" startIcon={<IoMdSettings />}>
            Settings
          </Button>
          <Button
            onClick={() => {
              logout();
            }}
            variant="contained"
            startIcon={<RiLogoutCircleLine />}
          >
            Logout
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Sidebar;
