import "./Login.css";
import back from "../../../assets/back.png";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, login } from "../../../features/auth/authSlice";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Switch,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isSuccess) {
      clearInputs();
      dispatch(reset());

      navigate("/admin/account-activation");
    }

    if (isError) {
      alert(message);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isLoading, isError, isSuccess, message]);

  const submit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      role: "admin",
    };
    dispatch(login(userData));
  };

  return (
    <div className="admin-login">
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
      <div className="container">
        <h1>
          Log<span>i</span>n
          <img src={back} alt="Back" onClick={() => {}} />
        </h1>

        <span>For Administrator only!</span>

        <form>
          <FormControl fullWidth={true}>
            <TextField
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              sx={{ mt: 2 }}
              InputProps={{ sx: { height: 50 } }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <TextField
              label="Password"
              type={passwordShown ? "text" : "password"}
              name="password"
              autoComplete="password"
              sx={{ my: 2 }}
              InputProps={{ sx: { height: 50 } }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

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
              sx={{ background: "#182142", height: 50, mt: 2 }}
              onClick={submit}
            >
              Login
            </Button>
          </FormControl>
        </form>
        <span className="forgetPassword">Forgot password?</span>
      </div>
    </div>
  );
};

export default Login;