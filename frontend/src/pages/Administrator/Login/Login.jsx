import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import logo1 from "../../../assets/logo1.png";

const Login = () => {
  // const BASE_URL = "";
  const BASE_URL = "http://localhost:5000";
  const navigate = useNavigate();

  const userRef = useRef();
  const passwordRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(BASE_URL + "/api/users/login", {
        username,
        password,
      })
      .then((response) => {
        //save the response data to local storage
        console.log(response);
        localStorage.clear();
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/administrator");
      })
      .catch((err) => {
        console.log(err);
        setUsername("");
        setPassword("");
        setMessage(err.response.data.message);
        localStorage.clear();
      });
  };

  useEffect(() => {
    userRef.current.focus();

    if (localStorage.length === 0) {
      localStorage.clear();
    } else {
      return () => {
        verifyJWT();
      };
    }
    // eslint-disable-next-line
  }, []);

  const verifyJWT = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    axios
      .get(BASE_URL + "/verifyJWT", {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then(() => {
        navigate("/administrator");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        localStorage.clear();
      });
  };

  return (
    <div className="login">
      <div className="container">
        <img src={logo1} alt="Logo" />
        <h2>
          SIGN LANUAGE <br />
          <span>TRANSLATOR GAME</span>
        </h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
          metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit
          amet aliquet rutrum. Nunc quis massa a nunc finibus sollicitudin
          mollis eu nunc. Nullam lorem diam, fringilla pellentesque sodales ac,
          aliquam at ex. Nam vitae placerat risus, a ultricies ex. Nulla
          sagittis ut urna ac viverra.
        </p>
      </div>

      <section className="form-container">
        <h1>
          Log<span>i</span>n
        </h1>
        <span>Enter your credentials to login</span>
        <span>(Administrator only)</span>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value);
              setMessage(null);
            }}
            value={username}
            required
          />

          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="Password"
            ref={passwordRef}
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage(null);
            }}
            value={password}
            required
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

          {message ? <span className="msg">{message}</span> : ""}

          <button>Login</button>
        </form>
      </section>
    </div>
  );
};

export default Login;
