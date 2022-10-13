import "./Sidebar.css";
import { useState } from "react";
import logo2 from "../../assets/logo2.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { BiDumbbell } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { resetAll } from "../../features/auth/authSlice";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    localStorage.clear();
    dispatch(resetAll());
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo2} alt="logo"></img>
        <div className="greeting">
          <div className="img-container">
            <div
              className="image"
              style={{ backgroundImage: `url(${user.userInfo.image})` }}
            ></div>
          </div>
          <div className="name-container">
            <span>
              {user.userInfo.firstName + " " + user.userInfo.lastName}{" "}
            </span>
            <span>
              ({user.role.charAt(0).toUpperCase() + user.role.slice(1)})
            </span>
          </div>
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
          <ul>
            <li>
              <Link to="/admin/account-activation">
                <HiOutlineUserGroup className="icon" />{" "}
                <span>Account Activation</span>
              </Link>
            </li>

            <li>
              <Link to="">
                <RiDashboardFill className="icon" /> <span>Manage Games</span>
              </Link>
            </li>
          </ul>
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
          <Button
            id="settings-button"
            aria-controls={open ? "settings-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            variant="contained"
            startIcon={<IoMdSettings />}
            sx={{
              background: "#1d2549",
              ":hover": {
                bgcolor: "#42C9A3",
                color: "white",
              },
            }}
          >
            Settings
          </Button>
          <Button
            onClick={() => {
              logout();
            }}
            variant="contained"
            startIcon={<RiLogoutCircleLine />}
            sx={{
              background: "#1d2549",
              ":hover": {
                bgcolor: "#42C9A3",
                color: "white",
              },
            }}
          >
            Logout
          </Button>
        </Stack>

        <Menu
          id="settings-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "settings-button",
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleClose}>Menu ine</MenuItem>
          <MenuItem onClick={handleClose}>Adi ghap</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
