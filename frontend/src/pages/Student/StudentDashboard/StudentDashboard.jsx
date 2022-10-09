import "./StudentDashboard.css";
import student2 from "../../../assets/student2.png";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const TeacherDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="student-dashboard">
      <Sidebar />

      <main>
        <div className="header-container">
          <div className="text-container">
            <h1>
              Welcome Back, <span>{user.userInfo.firstName + "!"}</span>
            </h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab rerum
              eum voluptate dicta, assumenda recusandae tempora quia porro
              exercitationem.
            </p>
          </div>

          <div className="img-container">
            <img src={student2} alt="Teacher Logo" />
          </div>
        </div>

        <div className="body-container">
          <div className="enrolled-student-container">
            <h1>
              CURRENT <span>PROGRESS</span>
            </h1>

            <div className="total-student">
              <span>0</span>
            </div>

            <span>Tap to view</span>
          </div>

          <div className="code-lesson">
            <div className="code-container">
              <h1>
                CLASS <span>CODE</span>
              </h1>

              <span>{user.userInfo.classCode}</span>
            </div>

            <div className="total-lessons">
              <h1>
                ASSIGN <span>LESSONS</span>
              </h1>

              <span>6</span>
            </div>
          </div>

          <div className="manage-lesson">
            <h1>
              LEARN <span>ASL</span>
            </h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, dicta voluptatibus? Ipsam fugit maiores vero quaerat
              numquam.
            </p>

            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: "#42C9A3" }}
            >
              LEARN
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default TeacherDashboard;
