import { useState } from "react";
import {
  Fade,
  Modal,
  Box,
  Backdrop,
  Divider,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import moment from "moment";

const styles = {
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    background: "#fff",
    color: "var(--navyBlue)",
    borderRadius: "15px",
    boxShadow: 20,
    outline: "none",
    p: 4,
    pb: 6,
  },
};

const StudentAssignmentModal = ({ assignmentData, handleAssignmentData }) => {
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
    handleAssignmentData(null);
  };

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
            <h3
              style={{
                color: "var(--aquaGreen)",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {assignmentData.assignment.title + " "}
            </h3>

            <Divider />

            <Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Time Left</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Submission Date</TableCell>
                      <TableCell>Remarks</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell>{assignmentData.timeLeft}</TableCell>
                      <TableCell align="center">
                        {assignmentData.score}
                      </TableCell>
                      <TableCell>
                        {moment(assignmentData?.date).format("LL")}{" "}
                        {moment(assignmentData?.date).format("h:mma")}
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            ...styles.text,
                            color: assignmentData.late
                              ? "red"
                              : "var(--aquaGreen)",
                          }}
                        >
                          {assignmentData.late ? "LATE" : "ON TIME"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default StudentAssignmentModal;
