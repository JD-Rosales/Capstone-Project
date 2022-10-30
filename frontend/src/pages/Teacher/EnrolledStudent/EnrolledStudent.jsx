import "./EnrolledStudent.css";
import SideBar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEnrolledStudents } from "../../../features/student/studentSlice";
import MenuIcon from "@mui/icons-material/Menu";
import noDataAvailable_illustration from "../../../assets/noDataAvailable_illustration.png";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Pagination,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";

const textStyle = {
  color: "#000",
};

const EnrolledStudent = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useSelector((state) => state.student);
  const { user, token } = useSelector((state) => state.auth);

  const [selectedID, setSelectedID] = useState(null);

  // State for Table
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (tableData.length > 0) {
      const count = tableData.length / rowsPerPage;

      setPageCount(Math.ceil(count));
    }
    // eslint-disable-next-line
  }, [tableData]);

  // State for Table

  // State for Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = () => {
    // const params = {
    //   id: selectedID,
    //   token: token,
    // };
    // notify();
    // dispatch(updateAccountStatus(params));
  };

  const deleteTeacherAccount = () => {
    // notify2();
    // dispatch(deleteAccount(selectedID));
  };

  useEffect(() => {
    const params = {
      classCode: user.userInfo.classCode,
      token: token,
    };
    return () => dispatch(getEnrolledStudents(params));
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setTableData(data.students);
    }
    // eslint-disable-next-line
  }, [data, isSuccess]);

  return (
    <div className="enrolled-student">
      <SideBar />
      <main>
        <TableContainer
          sx={{
            marginTop: 2,
            height: 410,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "var(--aquaGreen)",
              }}
            >
              <TableRow>
                <TableCell>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  ></Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    School
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Full Name
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "40px",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ color: "var(--aquaGreen)", margin: "10px 0" }}
                      >
                        No Data Available
                      </Typography>

                      <img
                        height="150px"
                        src={noDataAvailable_illustration}
                        alt="No Data Available"
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                tableData
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                  .map((data) => {
                    return (
                      <TableRow key={data._id}>
                        <TableCell
                          sx={{
                            padding: "0 0 0 5",
                            width: "10%",
                          }}
                        >
                          <div className="image-container">
                            <div
                              className="image"
                              style={{
                                backgroundImage: `url(${data.userInfo.image})`,
                              }}
                            ></div>
                          </div>
                        </TableCell>

                        <TableCell
                          sx={{
                            padding: "0 0 0 5",
                            width: "30%",
                          }}
                        >
                          <Typography sx={textStyle}>{data.email}</Typography>
                        </TableCell>

                        <TableCell
                          sx={{
                            padding: "0 0 0 5",
                            width: "25%",
                          }}
                        >
                          <Typography sx={textStyle}>
                            {data.userInfo.school}
                          </Typography>
                        </TableCell>

                        <TableCell
                          sx={{
                            padding: "0 0 0 5",
                            width: "25%",
                          }}
                        >
                          <Typography sx={textStyle}>
                            {data.userInfo.lastName + " "}
                            {data.userInfo.firstName + " "}
                            {data.userInfo.middleInitial}
                          </Typography>
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{ padding: 1, width: "10%" }}
                        >
                          <IconButton
                            id="admin-menu-btn"
                            aria-controls={menuOpen ? "admin-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={menuOpen ? "true" : undefined}
                            onClick={(e) => {
                              setSelectedID(data._id);
                              handleMenu(e);
                            }}
                            sx={{
                              color: "#000",
                              transition: "0.3s",
                              "&:hover": {
                                backgroundColor: "var(--aquaGreen)",
                              },
                            }}
                          >
                            <MenuIcon />
                          </IconButton>
                          <Menu
                            id="admin-menu"
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={handleMenuClose}
                            MenuListProps={{
                              "aria-labelledby": "admin-menu-btn",
                            }}
                            anchorOrigin={{
                              vertical: "center",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            sx={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              backdropFilter: "blur(2px)",
                              ".MuiMenu-paper": {
                                backgroundColor: "var(--aquaGreen)",
                                color: "#000",
                              },
                            }}
                          >
                            <MenuItem
                              divider={true}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingX: 5,
                                color: "green",
                              }}
                              onClick={() => {
                                updateStatus();
                                handleMenuClose();
                              }}
                            >
                              Activate
                            </MenuItem>
                            <MenuItem
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingX: 5,
                                color: "red",
                              }}
                              onClick={() => {
                                deleteTeacherAccount();
                                handleMenuClose();
                              }}
                            >
                              Remove
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} sx={{ border: "0" }}>
                  <Pagination
                    size="large"
                    count={pageCount}
                    page={page}
                    onChange={handleChangePage}
                    boundaryCount={1}
                    siblingCount={2}
                    color="primary"
                    sx={{
                      ".MuiPaginationItem-text": {
                        color: "#000",
                      },
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
        {/* <div className="table-container">
          <div className="table-header">
            <div></div>
            <div>Email</div>
            <div>Full name</div>
            <div>School</div>
            <div></div>
          </div>

          {tableData.map((data) => {
            return (
              <div key={data._id} className="table-data">
                <div className="table-item">
                  <div
                    className="user-img"
                    style={{ backgroundImage: `url(${data.userInfo.image})` }}
                  ></div>
                </div>
                <div className="table-item">{data.email}</div>
                <div className="table-item">
                  {data.userInfo.lastName + " " + data.userInfo.firstName + ""}{" "}
                  {data.userInfo.middleInitial
                    ? data.userInfo.middleInitial + "."
                    : ""}
                </div>
                <div className="table-item">{data.userInfo.school}</div>
                <div className="table-item table-option">
                  <CgOptions />
                </div>
              </div>
            );
          })}
        </div> */}
      </main>
    </div>
  );
};

export default EnrolledStudent;
