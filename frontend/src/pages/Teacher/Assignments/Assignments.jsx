import "./Assignments.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  Grid,
  Box,
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
} from "@mui/material";
import moment from "moment";
import classwork_illustration from "../../../assets/classwork_illustration.png";

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
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
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
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format();
  const [date, setDate] = useState(formattedDate);

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    words: [],
    deadline: "",
  });

  const inputArray = [
    {
      id: 0,
      value: "",
    },
  ];

  const wordArray = [
    {
      id: 0,
      value: "",
    },
  ];

  const [inputFieldArray, setInputFieldArray] = useState(inputArray);
  const [inputWordArray, setInputWordArray] = useState(wordArray);

  useEffect(() => {
    console.log(inputWordArray);
  }, [inputWordArray]);

  const addInputField = () => {
    setInputFieldArray((prevState) => {
      setInputWordArray((prevState) => [
        ...prevState,
        { id: prevState.length, value: "" },
      ]);
      return [...prevState, { id: prevState.length, value: "" }];
    });
  };

  const handleInputChange = (id, e) => {
    // console.log(e.target.value);
    let newArray = [...inputWordArray];
    newArray[id] = { id: id, value: e.target.value };

    setInputWordArray(newArray);
  };

  // Modal
  const [assignmentModal, setAssignmentModal] = useState(false);
  const handleAssignmentModal = () => {
    setAssignmentModal(!assignmentModal);
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  useEffect(() => {
    setDate(formattedDate);
  }, [formattedDate]);

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

        {/* <LocalizationProvider dateAdapter={AdapterMoment}>
          <Paper sx={{ padding: "20px", width: "15rem" }}>
            <DateTimePicker
              label="Date&Time picker"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Paper>
        </LocalizationProvider> */}
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
                  autoComplete="title"
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
                  autoComplete="description"
                  fullWidth
                  multiline
                  rows={6}
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
                {inputFieldArray.map((item) => {
                  return (
                    <TextField
                      key={item.id}
                      label="Letter/Word"
                      type="text"
                      name="letter/word"
                      autoComplete="letter/word"
                      fullWidth
                      sx={styles.textfieldStyle}
                      InputProps={{ sx: { height: 50 } }}
                      value={inputWordArray[item.id].value}
                      onChange={(e) => handleInputChange(item.id, e)}
                    />
                  );
                })}
                <Button
                  onClick={addInputField}
                  variant="contained"
                  size="large"
                  sx={{ ...styles.button, marginTop: 2 }}
                >
                  ADD INPUT FIELD
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
