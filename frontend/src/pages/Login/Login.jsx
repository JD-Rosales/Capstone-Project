import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Spinner from "../../components/Spinner/Spinner";

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
        <h2>WEB-BASED E-LEARNING SIGN LANUAGE TRANSLATOR GAME</h2>

        <p>
          It is able to translate sign language to text. It includes games that
          will help the user to enhance and develop their skill in learning sign
          language. It will help unimpaired individuals to be communicative with
          people who suffer from hearing impairment and as well encourage them
          to express their feelings, and it will help to lessen the
          discrimination between deaf and normal individuals through awareness
          of sign language elucidation.
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
