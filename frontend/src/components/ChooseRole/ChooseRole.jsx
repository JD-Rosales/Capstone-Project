import "./ChooseRole.css";
import student from "../../assets/Student.png";
import backlogo from "../../assets/back.png";
import teacher from "../../assets/Teacher.png";
import publicUser from "../../assets/PublicUser.png";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ChooseRole = (props) => {
  const theme = useTheme();

  const handleParenChange = (e) => {
    props.onChange(e.target.value);
  };

  const buttonStyle = {
    width: 140,
    height: 50,
    boxShadow: 3,
    mt: 4,
    borderRadius: "10px",
    backgroundColor: "#fff",
    color: "#182240",
    "&:hover": {
      backgroundColor: "#42c9a3",
      color: "#fff",
    },

    [theme.breakpoints.down("md")]: {
      height: 37,
      width: 130,
      boxShadow: 3,
      mt: 3,
    },

    [theme.breakpoints.down("sm")]: {
      height: 34,
      boxShadow: 3,
      mt: 0,
    },
  };

  const GridStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="chooseRole">
      <div className="header-container">
        <img
          src={backlogo}
          className="prev-icon"
          alt="logo"
          onClick={handleParenChange}
        ></img>

        <h1>SELECT YOUR ROLE</h1>
        <p>
          Please choose a <span>role</span> in order for us to identify you.
        </p>
      </div>
      <Grid2
        container
        spacing={2}
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Grid2 sx={GridStyle} xs={4}>
          <img src={publicUser} className="role" alt="General User" />
          <Button
            value="generaluser"
            variant="contained"
            disableElevation={true}
            className="button"
            sx={buttonStyle}
            onClick={(e) => {
              props.setRole(e.target.value);
            }}
          >
            Public User
          </Button>
        </Grid2>
        <Grid2 sx={GridStyle} xs={4}>
          <img src={student} className="role-one" alt="Student" />
          <Button
            value="student"
            variant="contained"
            sx={buttonStyle}
            onClick={(e) => {
              props.setRole(e.target.value);
            }}
          >
            Student
          </Button>
        </Grid2>
        <Grid2 sx={GridStyle} xs={4}>
          <img src={teacher} className="role" alt="Teacher" />
          <Button
            value="teacher"
            variant="contained"
            sx={buttonStyle}
            onClick={(e) => {
              props.setRole(e.target.value);
            }}
          >
            Teacher
          </Button>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ChooseRole;
