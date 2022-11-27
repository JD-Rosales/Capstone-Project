import { useState } from "react";
import {
  Fade,
  Modal,
  Box,
  Backdrop,
  Grid,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import StudentListModal from "./StudentListModal";

const styles = {
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
};

const AccountManagementModal = ({ teacherData, handleTeacherData }) => {
  const [open, setOpen] = useState(true);

  const [data, setData] = useState(null);

  const handleData = (newValue) => {
    setData(newValue);
  };

  const closeModal = () => {
    setOpen(false);
    handleTeacherData(null);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styles.modalStyle}>
            <Grid container spacing={2}>
              <Grid item={true} xs={12}>
                <Typography
                  onClick={closeModal}
                  sx={{
                    position: "absolute",
                    right: 20,
                    top: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    padding: "10px",
                    borderRadius: "50%",
                    transition: "all 0.3s",
                    ":hover": {
                      color: "red",
                      cursor: "pointer",
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  <AiOutlineClose />
                </Typography>

                <Avatar
                  alt="Student Profile"
                  src={teacherData.userInfo.image}
                  sx={{ marginX: "auto", width: 100, height: 100 }}
                />

                <Box sx={{ mt: 3, pl: 7 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    School:{" "}
                    <span style={{ fontWeight: 400 }}>
                      {teacherData.userInfo.school}
                    </span>
                  </Typography>

                  <Typography sx={{ fontWeight: "bold" }}>
                    Email:{" "}
                    <span style={{ fontWeight: 400 }}>{teacherData.email}</span>
                  </Typography>

                  <Typography sx={{ fontWeight: "bold" }}>
                    Full Name:{" "}
                    <span style={{ fontWeight: 400 }}>
                      {teacherData.userInfo.firstName + " "}
                      {teacherData.userInfo.middleInitial
                        ? teacherData.userInfo.middleInitial + "."
                        : ""}
                      {" " + teacherData.userInfo.lastName}
                    </span>
                  </Typography>
                </Box>

                <Grid item xs={12} align="center" sx={{ mt: 3 }}>
                  <Button
                    onClick={() => setData(teacherData)}
                    variant="contained"
                    disableElevation={true}
                    sx={{
                      width: 200,
                      height: 45,
                      backgroundColor: "var(--navyBlue)",
                      transition: "all 0.3s",
                      ":hover": {
                        backgroundColor: "var(--navyBlue)",
                        opacity: "0.9",
                      },
                    }}
                  >
                    VIEW STUDENTS
                  </Button>

                  {teacherData.userInfo.status ? (
                    <Button
                      variant="contained"
                      disableElevation={true}
                      sx={{
                        width: 200,
                        height: 45,
                        mt: 1.5,
                        backgroundColor: "#d32f2f",
                        transition: "all 0.3s",
                        ":hover": {
                          backgroundColor: "#d32f2f",
                          opacity: "0.9",
                        },
                      }}
                    >
                      SUSPEND ACCOUNT
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      disableElevation={true}
                      sx={{
                        width: 200,
                        height: 45,
                        mt: 1.5,
                        backgroundColor: "var(--aquaGreen)",
                        transition: "all 0.3s",
                        ":hover": {
                          backgroundColor: "var(--aquaGreen)",
                          opacity: "0.9",
                        },
                      }}
                    >
                      ACTIVATE ACCOUNT
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>

      {data && (
        <StudentListModal teacherData={data} handleTeacherData={handleData} />
      )}
    </>
  );
};

export default AccountManagementModal;
