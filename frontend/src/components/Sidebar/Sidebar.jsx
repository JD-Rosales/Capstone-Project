import "./Sidebar.css";
import { useState } from "react";
import logo2 from "../../assets/logo2.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { BiDumbbell } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { RiSettings3Fill } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { resetAll } from "../../features/auth/authSlice";
import { Fade, Modal, Box, Backdrop, Button } from "@mui/material";
import logout_illustration from "../../assets/logout_illustration.png";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  background: "#fff",
  borderRadius: "15px",
  boxShadow: 20,
  outline: "none",
  p: 4,
  pb: 6,
};

const btnStyle = {
  background: "#1d2549",
  width: "100px",
  borderRadius: "8px",
  margin: "0 5px",
  ":hover": {
    background: "#42C9A3",
    color: "white",
  },
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    localStorage.clear();
    dispatch(resetAll());
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo2} alt="logo"></img>
        <div className="greeting">
          <div className="img-container">
            <div
              className="image"
              style={{ backgroundImage: `url(${user?.userInfo.image})` }}
            ></div>
          </div>
          <div className="name-container">
            <span>
              {user?.userInfo.firstName + " " + user?.userInfo.lastName}{" "}
            </span>
            <span>
              ({user?.role.charAt(0).toUpperCase() + user?.role.slice(1)})
            </span>
          </div>
        </div>
      </div>

      <div className="list-container">
        {user?.role === "teacher" ? (
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

            <li>
              <Link to="/assignment">
                <MdPeopleAlt className="icon" /> <span>Assignments</span>
              </Link>
            </li>
          </ul>
        ) : user?.role === "student" ? (
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
              <Link to="/lesson-list">
                <GiTeacher className="icon" /> <span>Learn ASL</span>
              </Link>
            </li>
          </ul>
        ) : user?.role === "admin" ? (
          <ul>
            <li>
              <Link to="/admin">
                <RiDashboardFill className="icon" /> <span>Dashboard</span>
              </Link>
            </li>

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
            <li>
              <Link to="/learn">
                <BiDumbbell className="icon" /> <span>Learn ASL</span>
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div className="bottom-list">
        <ul>
          <li>
            <Link
              to="#"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={isMenuOpen ? "active-menu" : ""}
            >
              <RiSettings3Fill className="icon" />
              <span>Settings</span>
            </Link>
          </li>

          {isMenuOpen ? (
            <div className="menu-container">
              <ul>
                <li>
                  <Link to="/update-profile">
                    <span>Edit Profile</span>
                  </Link>
                </li>

                <li>
                  <Link to="/change-password">
                    <span>Change password</span>
                  </Link>
                </li>

                {user.role !== "admin" ? ( //removes choose hand in settings menu if role is admin
                  <li>
                    <Link to="/choose-hand">
                      <span>Choose hand</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          ) : (
            ""
          )}

          <li>
            <Link to="#" onClick={handleModal}>
              <RiLogoutBoxRFill className="icon" />
              <span>Sign out</span>
            </Link>
          </li>
        </ul>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <div className="modal-container">
              <span
                onClick={() => {
                  handleModal();
                }}
                className="x-close"
              >
                X
              </span>
              <img
                className="image"
                src={logout_illustration}
                alt="Logout Illustration"
              />

              <h2>Are you sure you want to logout your account?</h2>

              <div className="action-container">
                <Button
                  onClick={() => {
                    handleModal();
                  }}
                  variant="contained"
                  sx={btnStyle}
                >
                  No
                </Button>
                <Button
                  onClick={() => {
                    logout();
                  }}
                  variant="contained"
                  sx={btnStyle}
                >
                  Yes
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Sidebar;
