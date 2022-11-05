import "./StudentDashboard.css";
import student2 from "../../../assets/student2.png";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { facts } from "../../../util/ASLFacts";

const TeacherDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="student-dashboard">
      <Sidebar />

      <main>
        <div className="header-container">
          <div className="text-container">
            <h2 style={{ marginTop: "10px" }}>
              DID YOU <span style={{ color: "var(--aquaGreen)" }}>KNOW</span>?
            </h2>
            <Carousel
              autoPlay={true}
              interval={6000}
              stopAutoPlayOnHover={false}
              navButtonsAlwaysVisible={false}
              navButtonsAlwaysInvisible={true}
              indicators={false}
              fullHeightHover={true}
              animation="slide"
              height={130}
            >
              {facts.map((fact) => {
                return <p style={{ fontSize: ".9rem" }}>{fact}</p>;
              })}
            </Carousel>
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
              Ensure that you are engaged in your study. Keep track of your
              improvement to maintain motivation.
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
