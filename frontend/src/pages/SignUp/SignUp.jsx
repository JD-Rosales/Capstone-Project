import "./SignUp.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import back from "../../assets/back.png";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Switch,
  Button,
  Fade,
  Modal,
  Box,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChooseRole from "../../components/ChooseRole/ChooseRole";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  background: "#fff",
  borderRadius: "15px",
  boxShadow: 20,
  outline: "none",
  p: 4,
  pb: 6,
};

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [role, setRole] = useState("generaluser");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [school, setSchool] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [classCode, setClassCode] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [formHeight, setFormHeight] = useState("470px");

  const [open, setOpen] = useState(true);
  const handleModal = () => {
    setOpen(!open);
  };

  const setChoosenRole = (role) => {
    setRole(role);
    handleModal();
  };

  const submit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      role,
      userInfo: {
        firstName: firstName,
        lastName: lastName,
        middleInitial: middleInitial,
        school: school,
        classCode: classCode,
      },
    };

    if (password !== password2) {
      alert("Password do not match");
    } else {
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      setPassword2("");
      setFirstName("");
      setLastName("");
      setMiddleInitial("");
      setSchool("");
      setClassCode("");
      dispatch(reset());
      alert("Account Created Successfully");
    }

    if (isError) {
      toast.error(message)
      dispatch(reset());
    }

    // eslint-disable-next-line
  }, [user, isError, isSuccess, isLoading, message]);

  useEffect(() => {
    if (role === "generaluser") {
      setFormHeight("470px");
    } else {
      setFormHeight("530px");
    }
  }, [role]);

  return (
    <div className="signup">
      <div
        className="back_home"
        onClick={() => {
          navigate("/");
        }}
      >
        <ReplyAllIcon
          sx={{
            fontSize: "50px",
            "&:hover": {
              color: "#182142",
            },
          }}
        />
      </div>

      <div className="container" style={{ height: formHeight }}>
        <h1>
          S<span>i</span>gn up
          <img
            src={back}
            alt="Back"
            onClick={() => {
              handleModal();
            }}
          />
        </h1>
        <span>As a {role}, it's quick and easy</span>

        <form>
          <FormControl fullWidth={true}>
            {role !== "generaluser" ? (
              <Grid2 container spacing={1}>
                <Grid2 xs>
                  <TextField
                    label={
                      role === "teacher"
                        ? "In which school do you teach?"
                        : "In which school do you study?"
                    }
                    type="text"
                    name="school"
                    autoComplete="school"
                    fullWidth
                    sx={{ mt: 2 }}
                    InputProps={{ sx: { height: 50 } }}
                    value={school}
                    onChange={(e) => {
                      setSchool(e.target.value);
                    }}
                  />
                </Grid2>

                {role !== "teacher" ? (
                  <Grid2 xs="auto">
                    <TextField
                      label="Class code"
                      type="text"
                      name="classCode"
                      autoComplete="classCode"
                      fullWidth
                      sx={{ mt: 2 }}
                      InputProps={{
                        sx: { height: 50, backgroundColor: "#b1e2d5" },
                      }}
                      value={classCode}
                      onChange={(e) => {
                        setClassCode(e.target.value);
                      }}
                    />
                  </Grid2>
                ) : (
                  ""
                )}
              </Grid2>
            ) : (
              ""
            )}

            <Grid2 container spacing={1}>
              <Grid2 xs={5}>
                <TextField
                  label="Last name"
                  type="text"
                  name="firstName"
                  autoComplete="firstName"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid2>

              <Grid2 xs={5}>
                <TextField
                  label="First name"
                  type="text"
                  name="firstName"
                  autoComplete="firstName"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid2>

              <Grid2 xs={2}>
                <TextField
                  label="M.I"
                  type="text"
                  name="middleInitial"
                  autoComplete="middleInitial"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={middleInitial}
                  onChange={(e) => {
                    setMiddleInitial(e.target.value);
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container>
              <Grid2 xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={1}>
              <Grid2 xs={6}>
                <TextField
                  label="Password"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  autoComplete="password"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid2>
              <Grid2 xs={6}>
                <TextField
                  label="Confirm Password"
                  type={passwordShown ? "text" : "password"}
                  name="password2"
                  autoComplete="password2"
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ sx: { height: 50 } }}
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </Grid2>
            </Grid2>

            <span className="invisible_margin"></span>

            <FormControlLabel
              control={
                <Android12Switch
                  sx={{ ml: 0.5 }}
                  onChange={() => {
                    setPasswordShown(!passwordShown);
                  }}
                />
              }
              label="Show Password"
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#42C9A3",
                height: 50,
                mt: 2,
                width: "80%",
                mx: "auto",
                borderRadius: "5px",
                fontSize: "18px",
              }}
              onClick={submit}
            >
              Sign up
            </Button>
            {/* <LoadingButton
                onClick={submit}
                loading={isLoading}
                loadingPosition="start"
                variant="contained"
                sx={{ 
                  background: "#182142",
                  height: 50,
                  mt: 2,
                  "& .MuiLoadingButton-loadingIndicator": {
                    //Loading indicator
                    marginLeft: "3em",
                  },
                 }}
                 >
                 </LoadingButton> */}
          </FormControl>
        </form>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <ChooseRole onChange={handleModal} setRole={setChoosenRole} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SignUp;
