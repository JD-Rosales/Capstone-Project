import "./Sidebar.css";
import logo2 from "../../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdGamepad } from "react-icons/md";
import { BiDumbbell } from "react-icons/bi";
import { GiHand } from "react-icons/gi";
import { FaUniversalAccess } from "react-icons/fa";

const Sidebar = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo2} alt="logo"></img>

        {props.isAdmin !== "true" ? (
          <div className="greeting">
            <span>
              <FaUserCircle />
            </span>
            <span>
              Hello, User! <br />
              <span>(User)</span>
            </span>
          </div>
        ) : (
          <div className="greeting">
            <span>
              <FaUserCircle />
            </span>
            <span>
              Hello, {props.username}! <br />
              <span>(Administrator)</span>
            </span>
          </div>
        )}
      </div>

      {/* Elements to be shown in Sidebar if user is not an Administrator */}
      {props.isAdmin !== "true" ? (
        <div className="list-container">
          <ul>
            <li>
              <Link to="/home">
                <AiFillHome className="icon" /> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/play-game">
                <MdGamepad className="icon" /> <span>Play a Game!</span>
              </Link>
            </li>
            <li>
              <Link to="/practice">
                <BiDumbbell className="icon" /> <span>Practice</span>
              </Link>
            </li>

            <li>
              <Link to="/learn">
                <GiHand className="icon" /> <span>Learn ASL</span>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="list-container">
          <ul>
            <li>
              <Link to="/administrator">
                <FaUniversalAccess className="icon" /> <span>Manage Games</span>
              </Link>
            </li>

            <li>
              <Link to="/manage-request">
                <FaUniversalAccess className="icon" />{" "}
                <span>Manage Request</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* {props.isAdmin === "true" ? (
        <div className="games-list-container">
          <button className="games-btn">Manage Games</button>

          <div className="game-list-content">
            <Link className="to-fingerspell" to="/administrator/finger-spell">
              Finger Spell
            </Link>
            <Link
              className="to-spell-hand-sign"
              to="/administrator/spell-hand-sign"
            >
              Spell Hand Sign
            </Link>
          </div>
        </div>
      ) : (
        ""
      )} */}

      {props.isAdmin === "true" ? (
        <button className="logout-btn" onClick={logout}>
          <span>
            <CgLogOut />
          </span>
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
