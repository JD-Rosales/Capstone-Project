import "./TeacherDashboard.css";
import { useEffect } from "react";
import teacher2 from "../../../assets/Teacher2.png";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { getEnrolledStudents } from "../../../features/student/studentSlice";

const TeacherDashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.student
  );

  useEffect(() => {
    return () => dispatch(getEnrolledStudents(user.userInfo.classCode));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      // setStudentList(data.students);
    }

    if (isError) {
      alert(message);
    }
  }, [data, isLoading, isError, isSuccess, message]);

  return (
    <div className="teacher-dashboard">
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
            <img src={teacher2} alt="Teacher Logo" />
          </div>
        </div>

        <div className="body-container">
          <div className="enrolled-student-container">
            <h1>
              ENROLLED <span>STUDENTS</span>
            </h1>

            <div className="total-student">
              <span>{data?.students?.length}</span>
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
                TOTAL <span>LESSONS</span>
              </h1>

              <span>6</span>
            </div>
          </div>

          <div className="manage-lesson">
            <h1>
              MANAGE <span>LESSONS</span>
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
              MANAGE
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default TeacherDashboard;
