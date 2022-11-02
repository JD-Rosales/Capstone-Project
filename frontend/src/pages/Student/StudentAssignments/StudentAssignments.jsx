import "./StudentAssignments.css";
import { useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import assignment_illustration from "../../../assets/assignment_illustration.png";
import { GiNotebook } from "react-icons/gi";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAssignments,
  reset,
} from "../../../features/assignment/assignmentSlice";
import moment from "moment";

const styles = {
  gridContainer: {
    backgroundColor: "var(--navyBlue)",
    borderRadius: "15px",
    paddingX: 5,
    paddingY: 2,
  },
  gridImage: {
    height: "200px",
  },
  paperStyle: {
    backgroundColor: "var(--navyBlue)",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    py: 1,
    px: 3,
    borderRadius: "15px",
    mb: 2,
  },
  iconStyle: {
    fontSize: "40px",
    color: "var(--aquaGreen)",
    marginRight: "15px",
  },
};

const StudentAssignments = () => {
  const navigate = useNavigate();
  const { data, isSuccess, isError, message } = useSelector(
    (state) => state.assignment
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = {
      token,
    };
    return () => {
      dispatch(getAssignments(params));
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
      alert(message);
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, message]);

  return (
    <div className="student-assignments">
      <Sidebar />

      <Grid container spacing={0} sx={styles.gridContainer}>
        <Grid
          item={true}
          xs={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <h1>
            ASSIGN<span style={{ color: "var(--aquaGreen)" }}>MENT</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi aut
            reiciendis nostrum dolorum vel adipisci totam quas, quod quaerat
            accusantium?
          </p>
        </Grid>

        <Grid
          item={true}
          xs={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            style={styles.gridImage}
            src={assignment_illustration}
            alt="assignment Illustration"
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          height: "300px",
          width: "100%",
          maxHeight: "300px",
          overflow: "auto",
          mt: 4,
        }}
      >
        {data
          ? data.map((item) => {
              return (
                <Paper
                  onClick={() => {
                    if (!item.isClose) {
                      navigate("/student-classwork", { state: item });
                    }
                  }}
                  elevation={2}
                  sx={{
                    ...styles.paperStyle,
                    cursor: !item.isClose ? "pointer" : "",
                    transition: ".3s",
                    ":hover": { backgroundColor: !item.isClose ? "" : "" },
                  }}
                  key={item._id}
                >
                  <GiNotebook
                    style={{
                      ...styles.iconStyle,
                      color: item.isClose ? "gray" : "var(--aquaGreen)",
                    }}
                  />
                  <Typography
                    sx={{
                      mr: 2,
                      fontSize: "1.5rem",
                      color: item.isClose ? "gray" : "#fff",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      ml: "auto",
                      fontSize: ".9rem",
                      color: item.isClose ? "gray" : "#fff",
                      textDecoration: item.isClose ? "line-through" : "none",
                    }}
                  >
                    {moment(item.deadline).format("LL")}{" "}
                    {moment(item.deadline).format("h:mma")}
                  </Typography>
                </Paper>
              );
            })
          : ""}
      </Box>
    </div>
  );
};

export default StudentAssignments;
