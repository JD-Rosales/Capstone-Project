import { Link, useNavigate } from "react-router-dom";
import "./ChooseRole.css";
import student from "../../assets/Student.png";
import backlogo from "../../assets/back.png";
import teacher from "../../assets/Teacher.png";
import publicuser from "../../assets/PublicUser.png";
const ChooseRole = () => {
  const navigate = useNavigate();

  return (
    <div className="ChooseRole">
      <nav>
        <Link to="/">
          <img src={backlogo} alt="logo"></img>
        </Link>
      </nav>

      <main>
        <h1>SELECT YOUR ROLE</h1>
        <small>
          By selecting the button, you will be directed to Sign Up page
          according to your chosen role.
        </small>

        <ul>
          <li>
            <img src={teacher} alt="Techer"></img>
            <button
              onClick={() => {
                navigate("/user-login");
              }}
            >
              Teacher
            </button>
          </li>
          <li>
            <img src={student} alt="Student"></img>
            <button
              onClick={() => {
                navigate("/user-login");
              }}
            >
              Student
            </button>
          </li>
          <li>
            <img src={publicuser} alt="Public User"></img>
            <button
              onClick={() => {
                navigate("/user-login");
              }}
            >
              Public User
            </button>
          </li>
        </ul>
      </main>
    </div>
  );
};
export default ChooseRole;
