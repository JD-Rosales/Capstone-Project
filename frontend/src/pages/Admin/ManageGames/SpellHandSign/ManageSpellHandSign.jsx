import "./ManageSpellHandSign.css";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import RightNav from "../../../../components/RightNav/RightNav";
import { useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Fade,
  Modal,
  Box,
  Backdrop,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  addGameWord,
  getGameWord,
} from "../../../../features/gameWord/gameWordSlice";
import { toast } from "react-toastify";

const styles = {
  button: {
    backgroundColor: "var(--aquaGreen)",
    borderRadius: "8px",
  },
  textfieldStyle: {
    mt: 2,
    color: "#fff",
    "& .MuiFormLabel-root": {
      color: "#fff",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "var(--aquaGreen)" },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": { borderColor: "var(--navyBlue)" },
    },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "var(--aquaGreen)",
      },
    },
  },
  optionStyle: {
    mt: 2,
    color: "#fff",
    height: "50px",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--aquaGreen)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--aquaGreen)",
    },
    ".MuiSvgIcon-root ": {
      fill: "white !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--aquaGreen)",
    },
  },
  loadingButtonStyle: {
    background: "#42C9A3",
    height: 50,
    borderRadius: "5px",
    mt: 2,
    // ":hover": {
    //   bgcolor: "#182240",
    //   color: "white",
    // },
  },
  paperStyle: {
    backgroundColor: "var(--navyBlue)",
    height: "500px",
    mt: 3,
  },
  tableCellStyle: {
    color: "#fff",
  },
  deleteModalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    background: "#fff",
    borderRadius: "15px",
    boxShadow: 20,
    outline: "none",
    p: 4,
  },
  btnStyle: {
    background: "#1d2549",
    width: "100px",
    borderRadius: "8px",
    margin: "0 5px",
    ":hover": {
      background: "#42C9A3",
      color: "white",
    },
  },
};
const ManageSpellHandSign = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.gameWord
  );
  const { token } = useSelector((state) => state.auth);
  const [addFormData, setAddFormData] = useState({
    word: "",
    difficulty: "EASY",
  });

  const toastID = useRef(null);

  // modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const notify = () =>
    (toastID.current = toast.loading("Adding data...", {
      autoClose: 15000,
      position: "top-right",
    }));

  const submitGameWord = (e) => {
    e.preventDefault();

    if (!addFormData.word || addFormData.word === "") {
      toast.warning("Please input a word");
    } else {
      const params = {
        word: addFormData.word,
        difficulty: addFormData.difficulty,
        gameType: "fingerspell",
        token: token,
      };

      notify();
      dispatch(addGameWord(params));
    }
  };

  useEffect(() => {
    const params = {
      token: token,
    };
    return () => dispatch(getGameWord(params));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setAddFormData({ ...addFormData, word: "" });
      toast.update(toastID.current, {
        render: "Added Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      dispatch(reset());
    }

    if (isError) {
      toast.update(toastID.current, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [data, isSuccess, isError, message]);
  return (
    <div className="manage-spellhandsign">
      <Sidebar />

      <FormControl fullWidth>
        <Grid container spacing={2} fullwidth="true">
          <Grid item={true} xs={5}>
            <TextField
              label="Input a word"
              type="text"
              fullWidth
              sx={styles.textfieldStyle}
              InputProps={{ sx: { height: 50, color: "#fff" } }}
              value={addFormData.word}
              onChange={(e) => {
                setAddFormData({
                  ...addFormData,
                  word: e.target.value,
                });
              }}
            />
          </Grid>

          <Grid item={true} xs={4}>
            <Select
              fullWidth
              displayEmpty
              sx={styles.optionStyle}
              value={addFormData.difficulty}
              onChange={(e) => {
                setAddFormData({ ...addFormData, difficulty: e.target.value });
              }}
            >
              <MenuItem value="EASY">EASY</MenuItem>
              <MenuItem value="MEDIUM">MEDIUM</MenuItem>
              <MenuItem value="HARD">HARD</MenuItem>
            </Select>
          </Grid>

          <Grid item={true} xs={3}>
            <LoadingButton
              onClick={submitGameWord}
              loading={isLoading}
              loadingIndicator={
                <CircularProgress size="2em" sx={{ color: "#182240" }} />
              }
              variant="contained"
              fullWidth
              sx={styles.loadingButtonStyle}
            >
              Add
            </LoadingButton>
          </Grid>
        </Grid>

        <Paper fullwidth="true" sx={styles.paperStyle}>
          <TableContainer
            sx={{
              maxHeight: "500px",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--navyBlue)",
                      color: "#fff",
                    }}
                  >
                    Words
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--navyBlue)",
                      color: "#fff",
                    }}
                  >
                    Difficulty
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "var(--navyBlue)",
                      color: "#fff",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ? data.map((item) => {
                      return (
                        <TableRow key={item._id}>
                          <TableCell sx={styles.tableCellStyle}>
                            {item.word}
                          </TableCell>
                          <TableCell sx={styles.tableCellStyle}>
                            {item.difficulty}
                          </TableCell>
                          <TableCell align="right" sx={styles.tableCellStyle}>
                            <IconButton
                              onClick={handleDeleteModal}
                              aria-label="delete"
                            >
                              <Tooltip
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 500 }}
                                title="Delete"
                                arrow
                              >
                                <DeleteIcon
                                  TransitionComponent={Fade}
                                  TransitionProps={{ timeout: 500 }}
                                  color="error"
                                />
                              </Tooltip>
                            </IconButton>

                            <IconButton aria-label="update">
                              <Tooltip title="Update" arrow>
                                <EditIcon sx={{ color: "var(--aquaGreen)" }} />
                              </Tooltip>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </FormControl>

      {/* Delete Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={deleteModalOpen}
        onClose={handleDeleteModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteModalOpen}>
          <Box sx={styles.deleteModalStyle}>
            <div className="modal-container">
              <h2>Are you sure you want to delete this data?</h2>

              <div className="action-container">
                <Button
                  onClick={() => {
                    handleDeleteModal();
                  }}
                  variant="contained"
                  sx={styles.btnStyle}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    ...styles.btnStyle,
                    ":hover": {
                      background: "red",
                      color: "white",
                    },
                  }}
                >
                  Yes
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      {/* End Delete Modal */}

      <RightNav
        header="MANAGE"
        coloredText="SPELL THE HAND SIGN"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc quis massa a nunc finibus sollicitudin mollis eu nunc. Nullam lorem diam, fringilla pellentesque sodales ac, aliquam at ex. Nam vitae placerat risus, a ultricies ex. Nulla sagittis ut urna ac viverra. Vestibulum condimentum, leo placerat blandit consectetur, magna nisi porta lorem, a sagittis ex justo nec felis."
      />
    </div>
  );
};

export default ManageSpellHandSign;
