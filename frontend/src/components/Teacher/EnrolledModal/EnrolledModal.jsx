import "./EnrolledModal.css";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/ListItem";

const EnrolledModal = () => {
  return (
    <div className="enrolledModal">
      <h1>
        ENROLLED <span>STUDENTS</span>
        <span className="closeBtn">X</span>
      </h1>

      <Grid container spacing={2}>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default EnrolledModal;
