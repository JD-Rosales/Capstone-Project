import "./Sidebar.css";
import logo2 from "../../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdGamepad } from "react-icons/md";
import { BiDumbbell } from "react-icons/bi";
import { GiHand } from "react-icons/gi";

const Sidebar = (props) => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));

  const logout = () => {
    localStorage.clear();
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
            Hello, User! <br />
            <span>(User)</span>
          </span>
        </div>

        {/* {props.isAdmin === 'true' ? <span className='username'>Hi, {userData.username}!</span>: ""}
        {props.isAdmin === 'true' ? <span>(Administrator)</span>: ""} */}
      </div>

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
        ""
      )}

      {props.isAdmin === "true" ? (
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
      )}

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
