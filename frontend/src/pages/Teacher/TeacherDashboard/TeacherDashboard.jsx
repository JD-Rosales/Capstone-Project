import "./TeacherDashboard.css";
import { useEffect } from "react";
import teacher2 from "../../../assets/Teacher2.png";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "../../../features/teacher/teacherSlice";

const TeacherDashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(getStudents({ classCode: "Dynu97UV" }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log(students.students.length);
    // eslint-disable-next-line
  }, [students]);

  return (
    <div className="teacher-dashboard">
      <Sidebar />
      <div className="main">
        <div className="header-container">
          <div className="header">
            <h1>
              WELCOME BACK
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
              quidem
            </p>
          </div>
          <img src={teacher2} alt="Teacher icon" />
        </div>
      </div>
      <div className="body-container">
        <div className="first-section">
          <h1>
            TOTAL
            <br /> <span>STUDENTS</span>
          </h1>

          <span className="total-student">{students?.students?.length}</span>

          <div className="student-list"></div>
        </div>
        <div className="sub-container">
          <div className="first-sub-section">
            <h1>
              CLASS<span>CODE</span>
            </h1>
            <p>{user.userInfo.classCode}</p>
          </div>
          <div className="second-sub-section">
            <h1>
              TOTAL <span>LESSONS</span>
            </h1>
            <h1 id="FL">5</h1>
          </div>
        </div>
        <div className="second-section">
          <h1>
            MANAGE <span>LESSONS</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
            animi laborum blanditiis fuga explicabo tempora autem, a incidunt
            nobis minima ullam aperiam sed oluta unde possimus beatae esse ex.
          </p>
          <button className="btn-learn">MANAGE</button>
        </div>
      </div>
    </div>
  );
};
export default TeacherDashboard;
