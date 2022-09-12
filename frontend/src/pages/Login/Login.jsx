import "./Login.css";
import back from "../../assets/back.png";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

const Login = () => {
  const BASE_URL = "http://localhost:5000";

  const navigate = useNavigate();
  const userRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const submit = () => {
    axios
      .post(BASE_URL + "/api/users/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
