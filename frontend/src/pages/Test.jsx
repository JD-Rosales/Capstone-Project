import { useState } from "react";
import EnrolledModal from "../components/Teacher/EnrolledModal/EnrolledModal";
import { Fade, Modal, Box, Backdrop } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  background: "#fff",
  borderRadius: "15px",
  boxShadow: 20,
  outline: "none",
  p: 4,
  pb: 6,
};

const Test = () => {
  const [open, setOpen] = useState(true);
  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={handleModal}>Test Modal</button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <EnrolledModal onChange={handleModal} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Test;
