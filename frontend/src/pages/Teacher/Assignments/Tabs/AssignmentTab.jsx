import { useState } from "react";
import {
  Box,
  Tab,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Grid,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSubmissions,
  reset,
} from "../../../../features/submission/submissionSlice";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const styles = {
  text: {
    fontSize: ".85rem",
    lineHeight: "1rem",
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
  loadingButtonStyle: {
    background: "#42C9A3",
    height: 45,
    borderRadius: "5px",
    width: "175px",
    mt: 1,
  },
};

const AssignmentTab = ({
  assignmentID,
  title,
  description,
  deadline,
  words,
}) => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.submission
  );

  const [assignmentData, setAssignmentData] = useState({
    title: title,
    description: description,
  });

  const { token } = useSelector((state) => state.auth);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
      alert(message);
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, isLoading, message]);

  useEffect(() => {
    const params = {
      assignmentID: assignmentID,
      token: token,
    };

    dispatch(getSubmissions(params));
    // eslint-disable-next-line
  }, []);

  const renderSubmission = (arr) => {
    const submissions = arr.map((item, index) => {
      return (
        <TableRow key={item._id}>
          <TableCell sx={{ color: "var(--aquaGreen)" }}>{index + 1}</TableCell>

          <TableCell>
            <Typography sx={styles.text}>
              {item.user.userInfo.firstName + " "}
              {item.user.userInfo.middleInitial
                ? item.user.userInfo.middleInitial + "."
                : ""}
              {" " + item.user.userInfo.lastName}
            </Typography>
          </TableCell>

          <TableCell>
            <Typography sx={styles.text}>{item.score}</Typography>
          </TableCell>

          <TableCell>
            <Typography sx={styles.text}>{item.timeLeft}</Typography>
          </TableCell>

          <TableCell>
            <Typography sx={styles.text}>
              {moment(item.date).format("LL")}{" "}
              {moment(item.date).format("h:mma")}
            </Typography>
          </TableCell>

          <TableCell>
            <Typography
              sx={{
                ...styles.text,
                color: item.late ? "red" : "var(--aquaGreen)",
              }}
            >
              {item.late ? "LATE" : "ON TIME"}
            </Typography>
          </TableCell>
        </TableRow>
      );
    });

    return submissions;
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Submissions" value={"1"} />
              <Tab label="Manage" value={"2"} />
            </TabList>
          </Box>
          <TabPanel value={"1"}>
            {/* Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Time Left</TableCell>
                    <TableCell>Submission Date</TableCell>
                    <TableCell>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderSubmission(data)}</TableBody>
              </Table>
            </TableContainer>
            {/* End Table */}
          </TabPanel>
          <TabPanel value={"2"}>
            <Grid container spacing={2}>
              <Grid item={true} xs={7}>
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
              </Grid>
              <Grid item={true} xs={5}>
                <Typography sx={{ mt: 2 }}>Deadline:</Typography>
                <Typography>
                  {moment(deadline).format("LL")}{" "}
                  {moment(deadline).format("h:mma")}
                </Typography>
              </Grid>

              <Grid item={true} xs={7}>
                <TextField
                  label="Description"
                  type="text"
                  name="description"
                  fullWidth
                  multiline
                  rows={5}
                  sx={styles.textfieldStyle}
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

              <Grid item={true} xs={5}>
                <Typography sx={{ mt: 2 }}>Letter/Words to Perform:</Typography>
                <Typography sx={{ fontSize: "1.5rem" }}>
                  {words.map((word) => {
                    return word + ", ";
                  })}
                </Typography>
              </Grid>

              <Grid item={true} xs={12}>
                <LoadingButton
                  // onClick={submitGameWord}
                  // loading={isLoading}
                  loadingIndicator={
                    <CircularProgress size="2em" sx={{ color: "#182240" }} />
                  }
                  variant="contained"
                  fullWidth
                  sx={styles.loadingButtonStyle}
                >
                  UPDATE
                </LoadingButton>

                <LoadingButton
                  // onClick={submitGameWord}
                  // loading={isLoading}
                  loadingIndicator={
                    <CircularProgress size="2em" sx={{ color: "#182240" }} />
                  }
                  variant="contained"
                  fullWidth
                  sx={{
                    ...styles.loadingButtonStyle,
                    background: "#df5c61",
                    ml: 2,
                  }}
                >
                  DELETE
                </LoadingButton>
              </Grid>

              {/* <Grid item={true} xs={6}>
                <LoadingButton
                  // onClick={submitGameWord}
                  // loading={isLoading}
                  loadingIndicator={
                    <CircularProgress size="2em" sx={{ color: "#182240" }} />
                  }
                  variant="contained"
                  fullWidth
                  sx={{
                    ...styles.loadingButtonStyle,
                    display: "block",
                    ml: "auto",
                  }}
                >
                  UPDATE
                </LoadingButton>
              </Grid>
              <Grid item={true} xs={6}>
                <LoadingButton
                  // onClick={submitGameWord}
                  // loading={isLoading}
                  loadingIndicator={
                    <CircularProgress size="2em" sx={{ color: "#182240" }} />
                  }
                  variant="contained"
                  fullWidth
                  sx={{ ...styles.loadingButtonStyle, background: "#df5c61" }}
                >
                  DELETE
                </LoadingButton>
              </Grid> */}
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default AssignmentTab;
