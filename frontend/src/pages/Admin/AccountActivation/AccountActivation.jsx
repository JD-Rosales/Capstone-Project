import "./AccountActivation.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import manageRequestIllustration from "../../../assets/manageRequest.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUnactivated,
  updateAccountStatus,
  reset,
} from "../../../features/teacher/teacherSlice";
import {
  Fade,
  Modal,
  Box,
  Backdrop,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Pagination,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  background: "#fff",
  color: "#000",
  borderRadius: "15px",
  boxShadow: 20,
  outline: "none",
  p: 4,
  pb: 4,
};

const textStyle = {
  color: "#fff",
};

const AccountActivation = () => {
  const dispatch = useDispatch();

  const { data, isSuccess, isLoading } = useSelector((state) => state.teacher);

  const [ID, setID] = useState("");

  // State for Table
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (tableData.length > 0) {
      // const count = tableData.length / rowsPerPage;
      const count = tableData.length / rowsPerPage;

      setPageCount(Math.ceil(count));
    }
    // eslint-disable-next-line
  }, [tableData]);

  // State for Table

  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  const updateStatus = () => {
    dispatch(updateAccountStatus(ID));
    setOpen(false);
  };

  useEffect(() => {
    return () => dispatch(getUnactivated());
    // eslint-disable-next-line
  }, []);

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
            rutrum.
          </p>
        </div>
        <div className="header-img">
          <img src={manageRequestIllustration} alt="Illustration" />
        </div>
      </header>

      <main>
        <TableContainer sx={{ marginTop: 2, height: 420 }}>
          <Table
            sx={{
              maxHeight: 330,
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "var(--aquaGreen)",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            >
              <TableRow>
                <TableCell sx={{ borderTopLeftRadius: "20px" }}>
                  <Typography sx={textStyle}>Email</Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={textStyle}>School</Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={textStyle}>Full Name</Typography>
                </TableCell>

                <TableCell align="center" sx={{ borderTopRightRadius: "20px" }}>
                  <Typography sx={textStyle}>Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "var(--navyBlue)" }}>
              {tableData
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((data) => {
                  return (
                    <TableRow
                      key={data._id}
                      // sx={{
                      //   "&:last-child td, &:last-child th": {
                      //     // border: "0",
                      //     color: "red",
                      //   },
                      // }}
                    >
                      <TableCell sx={{ padding: "0 0 0 5", width: "30%" }}>
                        <Typography sx={textStyle}>{data.email}</Typography>
                      </TableCell>

                      <TableCell sx={{ padding: "0 0 0 5", width: "30%" }}>
                        <Typography sx={textStyle}>
                          {data.userInfo.school}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ padding: "0 0 0 5", width: "30%" }}>
                        <Typography sx={textStyle}>
                          {data.userInfo.lastName + " "}
                          {data.userInfo.firstName + " "}
                          {data.userInfo.middleInitial}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ padding: 1 }}>
                        <IconButton
                          sx={{
                            backgroundColor: "var(--aquaGreen)",
                            color: "#fff",

                            "&:hover": {
                              backgroundColor: "var(--aquaGreen)",
                              opacity: 0.8,
                            },
                          }}
                        >
                          <MenuIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell sx={{ border: "0" }}>
                  <Pagination
                    size="large"
                    count={pageCount}
                    page={page}
                    onChange={handleChangePage}
                    boundaryCount={1}
                    siblingCount={2}
                    color="primary"
                    sx={{
                      // color: "white",
                      ".css-bf9wz-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                        {
                          backgroundColor: "var(--aquaGreen)",
                        },
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
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
              textAlign={"center"}
              fontWeight="600"
              lineHeight={"2rem"}
            >
              Are you sure you want to activate this account?
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "1.5em",
              }}
            >
              <Button
                onClick={handleModal}
                aria-haspopup="true"
                variant="contained"
                sx={{
                  background: "#42C9A3",
                  height: "40px",
                  width: "90px",
                  ":hover": {
                    bgcolor: "#4283C9",
                    color: "white",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={updateStatus}
                aria-haspopup="true"
                variant="contained"
                sx={{
                  background: "#42C9A3",
                  marginRight: "10px",
                  height: "40px",
                  width: "90px",
                  marginLeft: "20px",
                  ":hover": {
                    bgcolor: "#4283C9",
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
