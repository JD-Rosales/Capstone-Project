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
} from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSemesters, reset } from "../../../features/semester/semesterSlice";

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
};

const Semester = () => {
  const dispatch = useDispatch();

  const { data, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.semester
  );

  const { token } = useSelector((state) => state.auth);

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
    }

    if (isError) {
      dispatch(reset());
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo esse
              ab, accusantium eos dicta suscipit!
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
          <Button variant="contained" size="large" sx={styles.button}>
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
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((semester) => {
                  return (
                    <TableRow>
                      <TableCell align="center" sx={styles.text}>
                        {semester.name}
                      </TableCell>
                      <TableCell align="center" sx={styles.text}>
                        {semester.isActive ? "Active" : "Inactive"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </main>
    </div>
  );
};

export default Semester;
