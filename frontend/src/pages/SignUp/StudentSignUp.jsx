import "./StudentSignUp.css";
import back from "../../assets/back.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, updateMessage, register } from "../../features/auth/authSlice";

const StudentSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const role = "student";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [school, setSchool] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [classCode, setClassCode] = useState("");

  const userInfo = {
    firstName: firstName,
    lastName: lastName,
    middleInitial: middleInitial,
    classCode: classCode,
    school: school,
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Account Created");
      setEmail("");
      setPassword("");
      setPassword2("");
      setSchool("");
      setFirstName("");
      setLastName("");
      setMiddleInitial("");
      setClassCode("");
      dispatch(reset());
    }
    if (isError) {
      alert(message);
      dispatch(reset());
    }

    if (message !== "") {
      alert(message);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isLoading, isError, isSuccess, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      dispatch(updateMessage("Password do not match"));
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
    <div className="studentSignUp">
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
        <span>As a student, it's quick and easy</span>

        <form onSubmit={handleSubmit}>
          <div className="classContainer">
            <input
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              type="text"
              className="school"
              placeholder="In which school do you study?"
            />

            <input
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              type="text"
              className="classCode"
              placeholder="Enter class code"
            />
          </div>

          <div className="nameContainer">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="firstName"
              placeholder="First Name"
            />

            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="lastName"
              placeholder="Last Name"
            />

            <input
              value={middleInitial}
              onChange={(e) => setMiddleInitial(e.target.value)}
              type="text"
              className="middleInitial"
              placeholder="M.I"
            />
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="email"
            placeholder="Email"
          />
          <div className="passwordContainer">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="newPassword"
              placeholder="New Password"
            />

            <input
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              type="text"
              className="re-enterPassword"
              placeholder="Re-enter New Password"
            />
          </div>
          <div className="checkbox-container">
            <input type="checkbox" name="showPassword" />
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

export default StudentSignUp;
