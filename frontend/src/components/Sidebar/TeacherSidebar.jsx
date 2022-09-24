import "./TeacherSidebar.css"
import logo2 from "../../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdGamepad } from "react-icons/md";
import { BiDumbbell } from "react-icons/bi";
import { GiHand } from "react-icons/gi";
import { BsFillGearFill } from "react-icons/bs"
import { FaUniversalAccess } from "react-icons/fa";

const TeacherSidebar = (props) => {
    const navigate = useNavigate()
    
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };
    const settings = () => {
        console.log('clicked settings button')
        navigate(" ");
    };
    return(
        <div className="teacher-sidebar">
            <div className="sidebar-header">
                <img src={logo2} alt="logo"></img>

                {props.isTeacher !== "true" ? (
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
                    <span>Teacher</span>
                    </span>
                </div>
                )}
            </div>
            {/* Elements to be shown in Sidebar if user is not an Administrator */}
      {props.isTeacher === "true" ? (
        <div className="list-container">
          <ul>
            <li>
              <Link to="/home">
                <AiFillHome className="icon" /> <span>Dashboard</span>
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
            
          </ul>
        </div>
      )}
      {props.isTeacher === "true" ? (
        <div className="sl-btn">
            <button className="settings-btn" onClick={settings}>
            <span  id="icons">
                <BsFillGearFill />
            </span>
            Settins
            </button>
            <button className="logout-btn" onClick={logout}>
            <span id="icons">
                <CgLogOut />
            </span>
            Logout
            </button>
        </div>
        
      ) : (
        ""
      )}
    </div>
    )
}

export default TeacherSidebar