import "./StudentDashboard.css";
import student2 from "../../assets/student2.png";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="student-dashboard">
      <Sidebar />
      <div className="main">
        <div className="header-container">
          <div className="header">
            <h1>
              WELCOME BACK{" "}
              <span>
                {user.userInfo.firstName + " " + user.userInfo.lastName}
              </span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
              consequatur sed, expedita quidem at aut aperiam, nemo iure sit
              quam eaque exercitationem debitis sunt accusamus. Quis, provident.
              Incidunt, ratione xercitationem debitis sunt accusamus. Quis,
              provident. Incidunt, rationquis. Quis, provident. I sed, expedita
              quidem{" "}
            </p>
          </div>
          <img src={student2} alt="Student icon" />
        </div>
      </div>
      <div className="body-container">
        <div className="first-section">
          <h1>
            {" "}
            CURRENT <br /> <span>PROGRESS</span>
          </h1>
        </div>
        <div className="sub-container">
          <div className="first-sub-section">
            <h1>
              ENROLLED CLASS<span>CODE</span>
            </h1>
            <p>{user.userInfo.classCode}</p>
          </div>
          <div className="second-sub-section">
            <h1>
              FINISHED <span>LESSONS</span>
            </h1>
            <h1 id="FL">5</h1>
          </div>
        </div>
        <div className="second-section">
          <h1>
            LEARN <span>ASL</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
            animi laborum blanditiis fuga explicabo tempora autem, a incidunt
            nobis minima ullam aperiam sed oluta unde possimus beatae esse ex.
          </p>
          <button className="btn-learn">LEARN</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
