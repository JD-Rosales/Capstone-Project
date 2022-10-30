import "./Assignments.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import {
  LocalizationProvider,
  DesktopDatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  Grid,
  Box,
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Divider,
  Paper,
} from "@mui/material";
import moment from "moment";
import classwork_illustration from "../../../assets/classwork_illustration.png";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  reset,
} from "../../../features/assignment/assignmentSlice";

const styles = {
  gridContainer: {
    backgroundColor: "var(--navyBlue)",
    borderRadius: "15px",
    paddingX: 5,
    paddingY: 2,
  },
  gridImage: {
    height: "150px",
  },
  box: {
    paddingY: 2,
    width: "100%",
    display: "flex",
    justifyContent: "end",
  },
  button: {
    backgroundColor: "var(--aquaGreen)",
    borderRadius: "8px",
  },
  modalButton: {
    marginTop: 2,
    width: "145px",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 695,
    background: "#fff",
    borderRadius: "15px",
    boxShadow: 20,
    outline: "none",
    p: 4,
    pb: 6,
  },
  textfieldStyle: {
    mt: 2,
    color: "#F0F0F0",
    "& .MuiFormLabel-root": {
      color: "var(--navyBlue)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "var(--navyBlue)",
    },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "var(--navyBlue)" },
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

const Assignments = () => {
  const { data, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.assignment
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const currentDate = moment(new Date()).format();
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentDate);

  const handleDateChange = (newValue) => {
    setDate(moment(newValue).format());
  };

  const handleTimeChange = (newValue) => {
    setTime(moment(newValue).format());
  };

  const toastID = useRef(null);

  const notify = () =>
    (toastID.current = toast.loading("Creating new assignment...", {
      autoClose: 15000,
      position: "top-right",
    }));

  const initialData = {
    title: "",
    description: "",
    deadline: "",
  };

  const [assignmentData, setAssignmentData] = useState(initialData);

  const inputArray = [
    {
      index: 0,
      value: "",
    },
    {
      index: 1,
      value: "",
    },
  ];

  const [inputFieldArray, setInputFieldArray] = useState(inputArray);

  const addInputField = () => {
    setInputFieldArray((prevState) => {
      return [...prevState, { index: prevState.length, value: "" }];
    });
  };

  const handleInputChange = (index, e) => {
    let newArray = [...inputFieldArray];
    newArray[index] = { index: index, value: e.target.value };

    setInputFieldArray(newArray);
  };

  // Modal
  const [assignmentModal, setAssignmentModal] = useState(false);

  const handleAssignmentModal = () => {
    setAssignmentModal(!assignmentModal);
  };
  // End Modal

  const submit = () => {
    const newDate = date.split("T")[0];
    const newTime = time.split("T")[1];
    // extract word value from input fields
    const wordsArray = inputFieldArray.map((data) => {
      return data.value.trim();
    });

    // filter data
    const filteredWordsArray = wordsArray.filter((word) => {
      return word !== "";
    });
    notify();
    const params = {
      title: assignmentData.title,
      description: assignmentData.description,
      wordsArray: filteredWordsArray,
      date: newDate,
      time: newTime,
      token,
    };

    dispatch(addAssignment(params));
  };

  useEffect(() => {
    if (isSuccess) {
      setInputFieldArray(inputArray);
      setAssignmentData(initialData);
      setDate(currentDate);
      setTime(currentDate);
      setAssignmentModal(false);
      toast.update(toastID.current, {
        render: "Assignment Created!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      dispatch(reset());
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
  }, [data, isSuccess, isLoading, isError, message]);

  return (
    <div className="teacher-assignments">
      <Sidebar />

      <Grid container spacing={0} sx={styles.gridContainer}>
        <Grid item={true} xs={6}>
          <h1>
            CLASS <span>WORK</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio
            vitae ab numquam consequuntur itaque unde libero, sit et in?
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
          <Button
            onClick={handleAssignmentModal}
            variant="contained"
            size="large"
            sx={styles.button}
          >
            ADD ASSIGNMENT
          </Button>
        </Box>
      </main>

      {/* Modals */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={assignmentModal}
        onClose={handleAssignmentModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={assignmentModal}>
          <Box sx={styles.modalStyle}>
            <h2 style={{ color: "var(--navyBlue)" }}>
              CLASS <span style={{ color: "var(--aquaGreen)" }}>WORK</span>
            </h2>
            <Grid container spacing={2}>
              <Grid item={true} xs={6}>
                <TextField
                  label="Title"
                  type="text"
                  name="title"
                  fullWidth
                  sx={styles.textfieldStyle}
                  InputProps={{ sx: { height: 50 } }}
                  value={assignmentData.title}
                  onChange={(e) => {
                    setAssignmentData({
                      ...assignmentData,
                      title: e.target.value,
                    });
                  }}
                />

                <TextField
                  label="Description"
                  type="text"
                  name="description"
                  fullWidth
                  multiline
                  rows={10}
                  sx={{ ...styles.textfieldStyle }}
                  InputProps={{ sx: { height: "auto" } }}
                  value={assignmentData.description}
                  onChange={(e) => {
                    setAssignmentData({
                      ...assignmentData,
                      description: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item={true} xs={6}>
                <Box
                  sx={{ height: "205px", maxHeight: "205px", overflow: "auto" }}
                >
                  {inputFieldArray.map((item) => {
                    return (
                      <TextField
                        key={item.index}
                        label="Letter/Word"
                        type="text"
                        name="letter"
                        fullWidth
                        sx={styles.textfieldStyle}
                        InputProps={{ sx: { height: 50 } }}
                        value={inputFieldArray[item.index].value}
                        onChange={(e) => handleInputChange(item.index, e)}
                      />
                    );
                  })}
                  <Button
                    onClick={addInputField}
                    variant="contained"
                    sx={{ ...styles.button, marginTop: 2 }}
                  >
                    ADD INPUT FIELD
                  </Button>
                </Box>

                <Divider sx={{ marginY: 2 }} />
                <Paper elevation={0}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                      label="Deadline Date"
                      inputFormat="MM/DD/YYYY"
                      disablePast={true}
                      value={date}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField {...params} sx={{ width: "50%" }} />
                      )}
                    />

                    <TimePicker
                      label="Deadline Time"
                      value={time}
                      onChange={handleTimeChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ width: "45%", marginLeft: "5%" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Paper>

                <Button
                  variant="contained"
                  onClick={submit}
                  sx={{
                    ...styles.modalButton,
                    backgroundColor: "var(--aquaGreen)",
                  }}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setInputFieldArray(inputArray);
                    setAssignmentData(initialData);
                    setDate(currentDate);
                    setTime(currentDate);
                    handleAssignmentModal();
                  }}
                  sx={{
                    ...styles.modalButton,
                    marginLeft: 2,
                    backgroundColor: "var(--navyBlue)",
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Assignments;
