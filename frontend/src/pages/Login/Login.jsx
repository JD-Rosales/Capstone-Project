import "./Login.css";
import back from "../../assets/back.png";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, login } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const userRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [choosenRole, setChoosenRole] = useState(null);

  const getRole = () => {
    const role = JSON.parse(sessionStorage.getItem("userData"));
    setChoosenRole(role.choosenRole);
  };

  useEffect(() => {
    getRole();
  }, []);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setChoosenRole("");
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Login Success");
      clearInputs();
      dispatch(reset());
    }

    if (isError) {
      alert(message);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isLoading, isError, isSuccess, message]);

  const submit = () => {
    const userData = {
      email,
      password,
      role: choosenRole,
    };
    dispatch(login(userData));
  };

  return (
    <div className="user-login">
      <div className="container">
        <h1>
          S<span>i</span>gn in
          <img
            src={back}
            alt="Back"
            onClick={() => {
              navigate("/");
            }}
          />
        </h1>
        {/* <h3>{choosenRole}</h3> */}
        <span>Enter your credentials to login</span>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          ref={userRef}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type={passwordShown ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={password}
          ref={passwordRef}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <div className="checkbox-container">
          <input
            type="checkbox"
            name="showPassword"
            onChange={() => {
              setPasswordShown(!passwordShown);
            }}
          />
          <label htmlFor="showPassword">Show password</label>
        </div>

        <button onClick={submit}>Login</button>
        <span className="forgetPassword">Forgot password?</span>
      </div>
    </div>
  );
};

export default Login;
