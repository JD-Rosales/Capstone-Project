import "./TeacherSignUp.css";
import back from "../../assets/back.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const TeacherSignUp = () => {
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000";

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

  const onChange = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);

    if (password === password2) {
      axios
        .post(BASE_URL + "/api/users", {
          email,
          password,
          role,
          userInfo,
        })
        .then((response) => {
          setEmail("");
          setPassword("");
          setPassword2("");
          setUserInfo({
            firstName: "",
            lastName: "",
            middleInitial: "",
            school: "",
          });
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Password do not match!");
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="newPassword"
              placeholder="New Password"
            />

            <input
              name="password2"
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
export default TeacherSignUp;
