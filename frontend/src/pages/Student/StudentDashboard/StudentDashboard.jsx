import "./StudentDashboard.css";
import { useEffect, useRef } from "react";
import teacher2 from "../../../assets/Teacher2.png";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  getEnrolledStudents,
} from "../../../features/student/studentSlice";
import { getAssignments } from "../../../features/assignment/assignmentSlice";
import { toast } from "react-toastify";
import GameLogs from "../../../components/GameLogs/GameLogs";
import { useNavigate } from "react-router-dom";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import axios from "axios";
import { useState } from "react";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classCodeRef = useRef(null);

  const { user, token } = useSelector((state) => state.auth);
  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.student
  );
  const [teacher, setTeacher] = useState("");

  const { data: allAssignment } = useSelector((state) => state.assignment);

  useEffect(() => {
    const params = {
      classCode: user.userInfo.classCode,
      token: token,
    };
    getTeacher();
    dispatch(getEnrolledStudents(params));
    dispatch(getAssignments(params));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
      toast.error(message);
    }
    // eslint-disable-next-line
  }, [data, isLoading, isError, isSuccess, message]);

  const getTeacher = async () => {
    await axios
      .get("/api/teacher/get-teacher", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setTeacher(
          result.data.teacher.userInfo.firstName +
            " " +
            result.data.teacher.userInfo.lastName
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="student-dashboard">
      <Sidebar />

      <main>
        <Grid
          container
          sx={{
            marginTop: "20px",
            p: 2,
            backgroundColor: "var(--navyBlue)",
            borderRadius: "20px",
            maxWidth: "1200px",
          }}
        >
          <Grid
            item={true}
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1>
              Hi, Student{" "}
              <span style={{ color: "var(--aquaGreen)" }}>
                {user.userInfo.firstName + "!"}
              </span>
            </h1>

            <p>
              It's great to have you here. Ensure that you are actively engaged
              with your classwork/s.
            </p>
          </Grid>
          <Grid item={true} xs={6} align="center">
            <img height={180} src={teacher2} alt="Teacher Illustration" />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: "20px", maxWidth: "1200px" }}>
          <Grid item={true} xs={8}>
            <GameLogs />
          </Grid>
          <Grid
            item={true}
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "space-around",
            }}
          >
            <div className="container1">
              <span
                style={{
                  display: "block",
                  width: "60%",
                  wordWrap: "break-word",
                }}
              >
                CLASS CODE{" "}
                <h2 ref={classCodeRef} value={user.userInfo.classCode}>
                  {user.userInfo.classCode}
                </h2>
              </span>

              <ContentCopyRoundedIcon
                className="copyClipboard"
                onClick={() => {
                  navigator.clipboard.writeText(
                    classCodeRef.current.attributes.value.nodeValue
                  );
                  toast("Copied to Clipboard", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                  });
                }}
              />
            </div>
            <div className="container2">
              <span
                style={{
                  display: "block",
                  width: "60%",
                  wordWrap: "break-word",
                }}
              >
                ENROLLED TEACHER
              </span>

              <h2 style={{ lineHeight: "1.2rem" }}>{teacher}</h2>
            </div>
            <div
              className="container3"
              onClick={() => navigate("/student-assignments")}
            >
              <span
                style={{
                  display: "block",
                  width: "60%",
                  wordWrap: "break-word",
                }}
              >
                ASSIGNED WORK
              </span>

              <h2>{allAssignment?.length}</h2>
            </div>

            <div className="container3">
              <span
                style={{
                  display: "block",
                  width: "60%",
                  wordWrap: "break-word",
                }}
              >
                Active Semester
              </span>

              <h2 style={{ lineHeight: "1.2rem" }}>{user.enrolledSem}</h2>
            </div>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
export default StudentDashboard;
