import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Spinner from "../../components/Spinner/Spinner";
import logo1 from "../../assets/logo1.png";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/users/login";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await axios
      .post(API_URL, {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          //save the response data to local storage
          localStorage.clear();
          localStorage.setItem("userData", JSON.stringify(response.data));
          navigate("/administrator");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setUsername("");
        setPassword("");
        setMessage(err.response.data.message);
        localStorage.clear();
        setIsLoading(false);
      });
  };

  useEffect(() => {
    userRef.current.focus();

    if (localStorage.length === 1) {
      navigate("/administrator");
    }
  }, [navigate]);

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
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="Password"
            ref={passwordRef}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
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

          {message && username === "" && password === "" ? (
            <span className="msg">{message}</span>
          ) : (
            ""
          )}

          <button>Login</button>
        </form>
      </section>
      {isLoading ? <Spinner /> : ""}
    </div>
  );
};

export default Login;
