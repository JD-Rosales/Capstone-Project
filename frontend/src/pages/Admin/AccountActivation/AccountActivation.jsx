import "./AccountActivation.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import manageRequestIllustration from "../../../assets/manageRequest.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUnactivated,
  updateAccountStatus,
  reset,
} from "../../../features/admin/adminSlice";
import Button from "@mui/material/Button";
import { Fade, Modal, Box, Backdrop, Typography } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  background: "#fff",
  color: "#000",
  borderRadius: "15px",
  boxShadow: 20,
  outline: "none",
  p: 4,
  pb: 4,
};

const AccountActivation = () => {
  const dispatch = useDispatch();
  const [ID, setID] = useState("");
  const { data, isSuccess } = useSelector((state) => state.admin);
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  // const confirmUpdate = async () => {
  //   dispatch()
  // }

  useEffect(() => {
    dispatch(getUnactivated());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setTableData(data.teachers);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [data, isSuccess]);

  return (
    <div className="account-activation">
      <Sidebar />

      <header>
        <div className="header-text">
          <h1>
            Account <span>Activation</span>
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit
            amet aliquet rutrum. Nunc quis massa a nunc finibus metus eu dui
            ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet
            rutrum. Nunc quis massa a nunc finibus metus eu dui ornare laoreet
            vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc
            quis massa a nunc finibus
          </p>
        </div>
        <div className="header-img">
          <img src={manageRequestIllustration} alt="Illustration" />
        </div>
      </header>

      <main>
        <div className="tbl-contianer">
          <div className="tbl-header">
            <div>Email</div>
            <div></div>
          </div>

          {tableData.map((data) => {
            return (
              <div key={data._id} className="tbl-data">
                <div className="tbl-item">{data.email}</div>
                <div className="tbl-item">
                  <Button
                    onClick={() => {
                      handleModal();
                      setID(data._id);
                    }}
                    aria-haspopup="true"
                    variant="contained"
                    sx={{
                      background: "#42C9A3",
                      ":hover": {
                        bgcolor: "#42C9A3",
                        color: "white",
                      },
                    }}
                  >
                    Activate
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

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
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "300",
                fontFamily: ["Poppins", "sans-serif"].join(","),
              }}
            >
              Are you sure you want to activate this account?
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "1em",
              }}
            >
              <Button
                onClick={handleModal}
                aria-haspopup="true"
                variant="contained"
                sx={{
                  background: "#42C9A3",
                  marginRight: "10px",
                  height: "60px",
                  width: "130px",
                  ":hover": {
                    bgcolor: "#42C9A3",
                    color: "white",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  dispatch(updateAccountStatus(ID));
                }}
                aria-haspopup="true"
                variant="contained"
                sx={{
                  background: "#42C9A3",
                  marginLeft: "10px",
                  height: "60px",
                  width: "130px",
                  ":hover": {
                    bgcolor: "#42C9A3",
                    color: "white",
                  },
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AccountActivation;
