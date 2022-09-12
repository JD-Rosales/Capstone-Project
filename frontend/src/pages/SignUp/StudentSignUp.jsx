import "./StudentSignUp.css";
import back from "../../assets/back.png";
import { useNavigate } from "react-router-dom";

const StudentSignUp = () => {
  const navigate = useNavigate();
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

        <form action="">
          <div className="classContainer">
            <input
              type="text"
              className="school"
              placeholder="In which school do you study?"
            />

            <input
              type="text"
              className="classCode"
              placeholder="Enter class code"
            />
          </div>

          <div className="nameContainer">
            <input type="text" className="firstName" placeholder="First Name" />

            <input type="text" className="lastName" placeholder="Last Name" />

            <input type="text" className="middleInitial" placeholder="M.I" />
          </div>
          <input type="text" className="email" placeholder="Email" />
          <div className="passwordContainer">
            <input
              type="text"
              className="newPassword"
              placeholder="New Password"
            />

            <input
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
