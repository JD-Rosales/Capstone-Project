import "./StudentProgress.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  Grid,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import classwork_illustration from "../../../assets/classwork_illustration.png";
import { useSelector, useDispatch } from "react-redux";
import { getAssignments } from "../../../features/assignment/assignmentSlice";
import { getActiveEnrolledStudents } from "../../../features/student/studentSlice";
import { useEffect, useState } from "react";
import StudentProfileModal from "./Modal/StudentProfileModal";
import StudentAssignmentModal from "./Modal/StudentAssignmentModal";

const styles = {
  gridContainer: {
    backgroundColor: "var(--navyBlue)",
    borderRadius: "15px",
    paddingX: 5,
    paddingY: 2,
    mt: 3,
  },
  gridImage: {
    height: "150px",
  },
  box: {
    pt: 2,
    width: "100%",
    height: 400,
  },
  text: {
    color: "#fff",
    borderColor: "#ffffff11",
    padding: "10px 0",
  },
};

const StudentProgress = () => {
  const dispatch = useDispatch();
  const { data: assignments } = useSelector((state) => state.assignment);
  const { data: students } = useSelector((state) => state.student);
  const { user, token } = useSelector((state) => state.auth);

  const [studentData, setStudentData] = useState(null);
  const handleStudentData = (newValue) => {
    setStudentData(newValue);
  };

  const [assignmentData, setAssignmentData] = useState(null);
  const handleAssignmentData = (newValue) => {
    setAssignmentData(newValue);
  };

  useEffect(() => {
    const params = {
      token,
    };
    dispatch(getAssignments(params));

    const params2 = {
      classCode: user.userInfo.classCode,
      token: token,
    };
    dispatch(getActiveEnrolledStudents(params2));
    // eslint-disable-next-line
  }, []);

  const getProgress = (assignment, student) => {
    let submission = null;

    assignment.submissions.forEach((element) => {
      if (student._id === element.student) {
        submission = element.submission.score;
      }
    });

    if (submission) return submission;
    else return "No Submission";
  };

  const modalData = (assignment, student) => {
    let submission = null;

    assignment.submissions.forEach((element) => {
      if (student._id === element.student) {
        submission = element.submission;
      }
    });

    if (submission) return { ...submission, assignment };
    else return null;
  };

  return (
    <div className="student-progress">
      <Sidebar />

      <Grid container spacing={0} sx={styles.gridContainer}>
        <Grid item={true} xs={6}>
          <h1 style={{ marginTop: "10px" }}>
            STUDENTS <span>PROGRESS</span>
          </h1>
          <p>
            Track the progress of your learner, and make sure they are making
            great development in a specific period of time.
          </p>
        </Grid>
        <Grid item={true} xs={6} display="flex" justifyContent="center">
          <img
            style={styles.gridImage}
            src={classwork_illustration}
            alt="Classwork Illustration"
          />
        </Grid>
      </Grid>

      <main>
        <Box sx={styles.box}>
          <TableContainer sx={{ height: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      background: "var(--navyBlue)",
                      color: "#fff",
                      border: "none",
                    }}
                  ></TableCell>

                  <TableCell
                    sx={{
                      background: "var(--navyBlue)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Full Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      background: "var(--navyBlue)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Lesson
                  </TableCell>
                  {assignments.map((assignment) => {
                    return (
                      <TableCell
                        align="center"
                        key={assignment._id}
                        sx={{
                          background: "var(--navyBlue)",
                          color: "#fff",
                          border: "none",
                        }}
                      >
                        {assignment.title}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {students?.students?.map((student, i) => {
                  return (
                    <TableRow
                      key={student._id}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#212b53",
                        },
                      }}
                    >
                      <TableCell align="center" sx={styles.text}>
                        {i + 1}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          setStudentData(student);
                        }}
                        sx={{
                          ...styles.text,
                          pl: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            backgroundColor: "var(--aquaGreen)",
                          },
                        }}
                      >
                        {student.userInfo.firstName + " "}
                        {student.userInfo.middleInitial
                          ? student.userInfo.middleInitial + "."
                          : ""}
                        {" " + student.userInfo.lastName}
                      </TableCell>

                      <TableCell
                        onClick={() => {
                          setStudentData(student);
                        }}
                        align="center"
                        sx={{
                          ...styles.text,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            backgroundColor: "var(--aquaGreen)",
                          },
                        }}
                      >
                        {(student.lesson.progress / 5) * 100 + "%"}
                      </TableCell>
                      {assignments.map((assignment) => {
                        return (
                          <TableCell
                            onClick={() => {
                              setAssignmentData(modalData(assignment, student));
                            }}
                            align="center"
                            key={assignment._id}
                            sx={{
                              ...styles.text,
                              cursor: "pointer",
                              transition: "all 0.2s",
                              "&:hover": {
                                backgroundColor: "var(--aquaGreen)",
                              },
                            }}
                          >
                            {getProgress(assignment, student)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </main>
      {studentData && (
        <StudentProfileModal
          studentData={studentData}
          handleStudentData={handleStudentData}
        />
      )}

      {assignmentData && (
        <StudentAssignmentModal
          assignmentData={assignmentData}
          handleAssignmentData={handleAssignmentData}
        />
      )}
    </div>
  );
};

export default StudentProgress;
