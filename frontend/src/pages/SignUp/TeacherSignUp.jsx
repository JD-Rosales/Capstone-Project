import "./TeacherSignUp.css";
import back from "../../assets/back.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";

const TeacherSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const role = "teacher";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    middleInitial: "",
    school: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      setPassword2("");
      setUserInfo({
        firstName: "",
        lastName: "",
        middleInitial: "",
        school: "",
      });

      console.log("Login Success");
    } else if (message !== "") {
      alert(message);
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
    }
  }, [user, isError, isSuccess, isLoading, message, dispatch]);

  const onChange = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
    } else {
      const userData = {
        email,
        password,
        role,
        userInfo,
      };

      dispatch(register(userData));
    }
  };

  return (
    <div className="teacherSignup">
      <div className="container">
        <h1>
          S<span>i</span>gn up
          <img
            src={back}
            alt="Back"
            onClick={() => {
              navigate("/");
            }}
          />
        </h1>
        <span>As a teacher, it's quick and easy</span>

        <form onSubmit={handleSubmit}>
          <input
            name="school"
            value={userInfo.school}
            onChange={onChange}
            type="text"
            className="school"
            placeholder="In which school do you study?"
          />

          <div className="nameContainer">
            <input
              name="firstName"
              value={userInfo.firstName}
              onChange={onChange}
              type="text"
              className="firstName"
              placeholder="First Name"
            />

            <input
              name="lastName"
              value={userInfo.lastName}
              onChange={onChange}
              type="text"
              className="lastName"
              placeholder="Last Name"
            />

            <input
              name="middleInitial"
              value={userInfo.middleInitial}
              onChange={onChange}
              type="text"
              className="middleInitial"
              placeholder="M.I"
            />
          </div>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="email"
            placeholder="Email"
          />
          <div className="passwordContainer">
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="newPassword"
              placeholder="New Password"
            />

            <input
              type={passwordShown ? "text" : "password"}
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="re-enterPassword"
              placeholder="Re-enter New Password"
            />
          </div>
          <div className="checkbox-container">
            <input
              onChange={() => {
                setPasswordShown(!passwordShown);
              }}
              type="checkbox"
              name="showPassword"
            />
            <label htmlFor="showPassword">Show password</label>
          </div>

          <button className="signup">Sign Up</button>
          <p>
            By clicking Sign Up, you agree to our Terms, Privacy Policy and
            Cookies Policy.
          </p>
        </form>
      </div>
    </div>
  );
};
export default TeacherSignUp;
