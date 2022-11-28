import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEnrolledStudents,
  suspendAccount,
  unsuspendAccount,
  reset,
} from "../../../../features/student/studentSlice";
import {
  Fade,
  Modal,
  Box,
  Backdrop,
  Grid,
  Avatar,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Tooltip,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import noDataAvailable_illustration from "../../../../assets/noDataAvailable_illustration.png";
import { toast } from "react-toastify";

const styles = {
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    background: "#fff",
    color: "var(--navyBlue)",
    borderRadius: "15px",
    boxShadow: 20,
    outline: "none",
    p: 4,
    pb: 4,
  },
};

const StudentListModal = ({ teacherData, handleTeacherData }) => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.student
  );
  const { token } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
    handleTeacherData(null);
  };

  const toastID = useRef(null);

  const notify = () =>
    (toastID.current = toast.loading("Please wait...", {
      autoClose: 15000,
      position: "top-right",
    }));

  useEffect(() => {
    const params = {
      token,
      classCode: teacherData.userInfo.classCode,
    };
    dispatch(getEnrolledStudents(params));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      toast.update(toastID.current, {
        render: "Success",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    }

    if (isError) {
      toast.update(toastID.current, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, isLoading, message]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styles.modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  onClick={closeModal}
                  sx={{
                    position: "absolute",
                    right: 20,
                    top: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    padding: "10px",
                    borderRadius: "50%",
                    transition: "all 0.3s",
                    ":hover": {
                      color: "red",
                      cursor: "pointer",
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  <AiOutlineClose />
                </Typography>

                <Typography align="center" variant="h5">
                  {teacherData.userInfo.firstName + " "}
                  {teacherData.userInfo.middleInitial
                    ? teacherData.userInfo.middleInitial + "."
                    : ""}
                  {" " + teacherData.userInfo.lastName}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ height: 350 }}>
                  <TableContainer sx={{ height: 350 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Full Name</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data?.students?.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5}>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography sx={{ fontSize: "1.8rem", mb: 1 }}>
                                  No Enrolled{" "}
                                  <span style={{ color: "var(--aquaGreen)" }}>
                                    Student
                                  </span>
                                </Typography>
                                <img
                                  height={200}
                                  src={noDataAvailable_illustration}
                                  alt="No Data Available"
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        ) : (
                          data?.students?.map((student, i) => {
                            return (
                              <TableRow key={student._id}>
                                <TableCell sx={{ width: "15px" }}>
                                  {i + 1}
                                </TableCell>
                                <TableCell sx={{ width: "100px" }}>
                                  <Avatar
                                    alt="Profile Image"
                                    src={student.userInfo.image}
                                    sx={{
                                      marginX: "auto",
                                      width: 50,
                                      height: 50,
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>
                                  {student.userInfo.firstName + " "}
                                  {student.userInfo.middleInitial
                                    ? student.userInfo.middleInitial + "."
                                    : ""}
                                  {" " + student.userInfo.lastName}
                                </TableCell>
                                <TableCell align="center">
                                  <Tooltip
                                    placement="left-start"
                                    arrow
                                    title={
                                      student.isActive ? "Active" : "Suspended"
                                    }
                                  >
                                    <Switch
                                      checked={student.isActive}
                                      onChange={() => {
                                        const params = {
                                          token,
                                          id: student._id,
                                          classCode:
                                            teacherData.userInfo.classCode,
                                        };
                                        // only allow dispatch when no action is pending
                                        if (!isLoading) {
                                          if (student.isActive) {
                                            notify();
                                            dispatch(suspendAccount(params));
                                          } else {
                                            notify();
                                            dispatch(unsuspendAccount(params));
                                          }
                                        }
                                      }}
                                      // inputProps={{
                                      //   "aria-label": "controlled",
                                      // }}
                                    />
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default StudentListModal;
