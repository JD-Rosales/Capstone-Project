import "./ChooseRole.css";
import student from "../../assets/Student.png";
import backlogo from "../../assets/back.png";
import teacher from "../../assets/Teacher.png";
import publicUser from "../../assets/PublicUser.png";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";

const buttonStyle = {
  width: 140,
  height: 50,
  boxShadow: 20,
  mt: 4,
  borderRadius: "10px",
  backgroundColor: "#42C9A3",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#182142",
  },
};

const ChooseRole = (props) => {
  const handleParenChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="chooseRole">
      <div className="header-container">
        <img src={backlogo} alt="logo" onClick={handleParenChange}></img>

        <h1>SELECT YOUR ROLE</h1>
        <p>
          Please choose a <span>role</span> in order for us to identify you.
        </p>
      </div>
      <Grid2 container spacing={2}>
        <Grid2
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          xs={4}
        >
          <img src={publicUser} alt="General User" />
          <Button
            value="generaluser"
            variant="contained"
            sx={buttonStyle}
            onClick={(e) => {
              props.setRole(e.target.value);
            }}
          >
            General User
          </Button>
        </Grid2>
        <Grid2
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          xs={4}
        >
          <img src={student} alt="Student" />
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
        <Grid2
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          xs={4}
        >
          <img src={teacher} alt="Teacher" />
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
