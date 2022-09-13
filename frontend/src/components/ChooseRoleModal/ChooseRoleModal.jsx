import "./ChooseRoleModal.css";
import { useNavigate } from "react-router-dom";
import student from "../../assets/Student.png";
import backlogo from "../../assets/back.png";
import teacher from "../../assets/Teacher.png";
import publicuser from "../../assets/PublicUser.png";

const ChooseRoleModal = (props) => {
  const navigate = useNavigate();

  const handleParenChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="chooseRoleModal">
      <div className="container">
        <img src={backlogo} alt="logo" onClick={handleParenChange}></img>

        <h1>SELECT YOUR ROLE</h1>
        <span>
          By selecting the button, you will be directed to Sign Up page
          according to your role
        </span>

        <div className="roleContainer">
          <div>
            <img src={publicuser} alt="General User"></img>
            <button
              onClick={() => {
                sessionStorage.clear();
                sessionStorage.setItem(
                  "userData",
                  JSON.stringify({ choosenRole: "GeneralUser" })
                );
                navigate("/user-login");
              }}
            >
              Public User
            </button>
          </div>

          <div>
            <img src={student} alt="Student"></img>
            <button
              onClick={() => {
                sessionStorage.clear();
                sessionStorage.setItem(
                  "userData",
                  JSON.stringify({ choosenRole: "Student" })
                );
                navigate("/user-login");
              }}
            >
              Student
            </button>
          </div>

          <div>
            <img src={teacher} alt="Teacher"></img>
            <button
              onClick={() => {
                sessionStorage.clear();
                sessionStorage.setItem(
                  "userData",
                  JSON.stringify({ choosenRole: "Teacher" })
                );
                navigate("/user-login");
              }}
            >
              Teacher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRoleModal;
