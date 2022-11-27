import "./AccountManagement.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Grid,
  Avatar,
  Tooltip,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import accountManagement_illustration from "../../../assets/accountManagement_illustration.png";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTeacher, reset } from "../../../features/teacher/teacherSlice";
import AccountActivationModal from "./Modal/AccountManagementModal";

const styles = {
  header: {
    mt: 3,
    backgroundColor: "var(--navyBlue)",
    borderRadius: "20px",
    padding: 2,
  },
  box: {
    height: "100%",
    justifyContent: "center",
    pl: 3,
    pt: 4,
  },
  text: {
    color: "#fff",
    borderColor: "#ffffff11",
    padding: "10px 0",
  },
};

const AccountManagement = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.teacher
  );

  const { token } = useSelector((state) => state.auth);

  const [teacherData, setTeacherData] = useState(null);

  const handleTeacherData = (newValue) => {
    setTeacherData(newValue);
  };

  useEffect(() => {
    const params = {
      token,
    };
    dispatch(getAllTeacher(params));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, isLoading, message]);

  return (
    <div className="admin-account-management">
      <Sidebar />

      <main>
        <Grid container spacing={0} sx={styles.header}>
          <Grid item={true} xs={6}>
            <Box sx={styles.box}>
              <h1>
                ACCOUNT{" "}
                <span style={{ color: "var(--aquaGreen)" }}>MANMAGEMENT</span>
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                suscipit maxime deserunt facere, quasi harum.
              </p>
            </Box>
          </Grid>

          <Grid item={true} xs={6} align="center">
            <img
              height={170}
              src={accountManagement_illustration}
              alt="Student Illustration"
            />
          </Grid>
        </Grid>

        <Box sx={{ height: "380px", mt: 2 }}>
          <TableContainer sx={{ height: "380px", mt: 2 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
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
                    EMAIL
                  </TableCell>
                  <TableCell
                    sx={{
                      background: "var(--navyBlue)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    SCHOOL
                  </TableCell>
                  <TableCell
                    sx={{
                      background: "var(--navyBlue)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    FULL NAME
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      borderTopRightRadius: "20px",
                      borderBottomRightRadius: "20px",
                      background: "var(--navyBlue)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    STATUS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.teachers?.map((teacher) => {
                  return (
                    <TableRow
                      onClick={() => {
                        setTeacherData(teacher);
                      }}
                      key={teacher._id}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#212b53",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          ...styles.text,
                          borderTopLeftRadius: "20px",
                          borderBottomLeftRadius: "20px",
                        }}
                      >
                        <Avatar
                          alt="Profile Image"
                          src={teacher.userInfo.image}
                          sx={{ marginX: "auto", width: 50, height: 50 }}
                        />
                      </TableCell>
                      <TableCell sx={styles.text}>{teacher.email}</TableCell>
                      <TableCell sx={styles.text}>
                        {teacher.userInfo.school}
                      </TableCell>
                      <TableCell sx={styles.text}>
                        {teacher.userInfo.firstName + " "}
                        {teacher.userInfo.middleInitial
                          ? teacher.userInfo.middleInitial + "."
                          : ""}
                        {" " + teacher.userInfo.lastName}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          ...styles.text,
                          borderTopRightRadius: "20px",
                          borderBottomRightRadius: "20px",
                          maxWidth: 100,
                        }}
                      >
                        {teacher.isActive ? (
                          <Tooltip arrow title="Active">
                            <FiberManualRecordIcon
                              sx={{
                                color: "var(--aquaGreen)",
                              }}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip arrow title="Suspended">
                            <WarningIcon
                              sx={{
                                color: "#d32f2f",
                              }}
                            />
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </main>

      {teacherData && (
        <AccountActivationModal
          teacherData={teacherData}
          handleTeacherData={handleTeacherData}
        />
      )}
    </div>
  );
};

export default AccountManagement;
