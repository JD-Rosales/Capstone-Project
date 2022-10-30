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
  TableFooter,
  TableRow,
  TableCell,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  addGameWord,
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

  const notify = () =>
    (toastID.current = toast.loading("Adding data...", {
      autoClose: 15000,
      position: "top-right",
    }));

  const submitGameWord = (e) => {
    e.preventDefault();

    const params = {
      word: addFormData.word,
      difficulty: addFormData.difficulty,
      gameType: "fingerspell",
      token: token,
    };

    notify();
    dispatch(addGameWord(params));
  };

  useEffect(() => {
    if (isSuccess) {
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
              name="word"
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
              // loading={isLoading}
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff", width: "40%" }}>
                    Words
                  </TableCell>
                  <TableCell sx={{ color: "#fff", width: "40%" }}>
                    Difficulty
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </FormControl>

      <RightNav
        header="MANAGE"
        coloredText="FINGER SPELL THE WORD"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc quis massa a nunc finibus sollicitudin mollis eu nunc. Nullam lorem diam, fringilla pellentesque sodales ac, aliquam at ex. Nam vitae placerat risus, a ultricies ex. Nulla sagittis ut urna ac viverra. Vestibulum condimentum, leo placerat blandit consectetur, magna nisi porta lorem, a sagittis ex justo nec felis."
      />
    </div>
  );
};

export default ManageSpellHandSign;
