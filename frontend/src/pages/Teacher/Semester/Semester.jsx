import "./Semester.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import classwork_illustration from "../../../assets/classwork_illustration.png";
import {
  Grid,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Fade,
  Modal,
  Backdrop,
  Divider,
  TextField,
  Paper,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSemesters,
  addSemester,
  changeActiveSemester,
  reset,
} from "../../../features/semester/semesterSlice";
import { toast } from "react-toastify";

const styles = {
  header: {
    backgroundColor: "var(--navyBlue)",
    py: 3,
    borderRadius: "20px",
  },
  box: {
    pt: 2,
    width: "100%",
    height: 350,
  },
  text: {
    color: "#fff",
    borderColor: "#ffffff11",
    padding: "10px 0",
  },
  button: {
    backgroundColor: "var(--aquaGreen)",
    borderRadius: "8px",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    background: "#fff",
    color: "var(--navyBlue)",
    borderRadius: "15px",
    boxShadow: 20,
    outline: "none",
    p: 4,
    pb: 4,
  },
  modalTextfieldStyle: {
    mt: 2,
    color: "#000",
    "& .MuiFormLabel-root": {
      color: "#000",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#000",
    },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "var(--aquaGreen)" },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": { borderColor: "var(--navyBlue)" },
    },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "var(--aquaGreen)",
      },
    },
  },
};

const Semester = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.semester
  );

  const { token } = useSelector((state) => state.auth);

  const toastID = useRef(null);

  const [semester, setSemester] = useState("");
  const [open, setOpen] = useState(false);

  const currentDate = moment(new Date()).format();
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  const handleStartDateChange = (newValue) => {
    setStartDate(moment(newValue).format());
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(moment(newValue).format());
  };

  const handleModal = () => {
    setOpen(!open);
    setSemester("");
  };

  const notify = () =>
    (toastID.current = toast.loading("Please wait...", {
      autoClose: 15000,
      position: "top-right",
    }));

  useEffect(() => {
    const params = {
      token,
    };
    dispatch(getSemesters(params));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      setOpen(false);
      toast.update(toastID.current, {
        render: "Success",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    }

    if (isError) {
      dispatch(reset());
      toast.update(toastID.current, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, isLoading, message]);

  return (
    <div className="semester">
      <Sidebar />
      <main>
        <Grid container spacing={0} sx={styles.header}>
          <Grid item xs={6} sx={{ pl: 5 }}>
            <h1 style={{ marginTop: "10px" }}>
              SEMESTER <span>MANAGEMENT</span>
            </h1>
            <p>
              Make sure to check the list of your learners for the current
              semester to ensure and provide a quality of education for every
              student.
            </p>
          </Grid>
          <Grid item xs={6} align="center">
            <img
              height={150}
              src={classwork_illustration}
              alt="Classwork Illustration"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }} align="end">
          <Button
            variant="contained"
            size="large"
            sx={styles.button}
            onClick={handleModal}
          >
            NEW SEMESTER
          </Button>
        </Box>

        <Box sx={styles.box}>
          <TableContainer sx={{ height: 350 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      background: "var(--navyBlue)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Semester
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      background: "var(--navyBlue)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Date
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      background: "var(--navyBlue)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Status
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      background: "var(--navyBlue)",
                      color: "#fff",
                      border: "none",
                      width: 100,
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((semester) => {
                  return (
                    <TableRow key={semester._id}>
                      <TableCell align="center" sx={styles.text}>
                        {semester.name}
                      </TableCell>

                      <TableCell align="center" sx={styles.text}>
                        {moment(semester.startDate).format("LL")}
                        {" - "} {moment(semester.endDate).format("LL")}
                      </TableCell>
                      <TableCell align="center" sx={styles.text}>
                        <Button
                          onClick={() => {
                            if (!semester.isActive) {
                              const params = {
                                id: semester._id,
                                token,
                              };
                              notify();
                              dispatch(changeActiveSemester(params));
                            }
                          }}
                          variant={semester.isActive ? "contained" : "outlined"}
                          sx={{
                            width: 120,
                            backgroundColor:
                              semester.isActive && "var(--aquaGreen)",
                            ":hover": {
                              backgroundColor:
                                semester.isActive && "var(--aquaGreen)",
                              opacity: semester.isActive && "0.8",
                            },
                          }}
                        >
                          {semester.isActive ? "Active" : "Inactive"}
                        </Button>
                      </TableCell>
                      <TableCell align="center" sx={styles.text}>
                        <FiberManualRecordIcon
                          sx={{
                            color: semester.isActive
                              ? "var(--aquaGreen)"
                              : "gray",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </main>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styles.modalStyle}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <h2>
                  NEW{" "}
                  <span style={{ color: "var(--aquaGreen)" }}>SEMESTER</span>
                </h2>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Semester"
                  type="text"
                  name="semester"
                  autoComplete="semester"
                  fullWidth
                  sx={styles.modalTextfieldStyle}
                  InputProps={{ sx: { height: 50 } }}
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                      label="Start Date"
                      inputFormat="MM/YYYY"
                      disablePast={true}
                      value={startDate}
                      onChange={handleStartDateChange}
                      renderInput={(params) => (
                        <TextField {...params} sx={{ width: "48%" }} />
                      )}
                    />

                    <MobileDatePicker
                      label="End Date"
                      inputFormat="MM/YYYY"
                      disablePast={true}
                      value={endDate}
                      onChange={handleEndDateChange}
                      renderInput={(params) => (
                        <TextField {...params} sx={{ width: "48%" }} />
                      )}
                    />
                  </LocalizationProvider>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onClick={handleModal}
                    variant="outlined"
                    sx={{
                      boxShadow: "none",
                      color: "#000",
                      height: 45,
                      mt: 2,
                      mr: 2,
                      width: "160px",
                      fontSize: "14px",
                    }}
                  >
                    CANCEL
                  </Button>

                  <Button
                    onClick={() => {
                      const params = {
                        name: semester,
                        startDate: startDate,
                        endDate: endDate,
                        token,
                      };
                      notify();
                      dispatch(addSemester(params));
                    }}
                    variant="contained"
                    sx={{
                      background: "var(--aquaGreen)",
                      boxShadow: "none",
                      color: "#F0F0F0",
                      height: 45,
                      mt: 2,
                      width: "160px",
                      fontSize: "14px",
                      ":hover": {
                        background: "var(--aquaGreen)",
                        opacity: "0.8",
                        boxShadow: "none",
                      },
                    }}
                  >
                    ADD
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Semester;
