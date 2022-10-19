import "./Unauthorized.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../assets/back.png";
import clock from "../../assets/waiting.png";

const Unauthorized = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="waitingApproval">
      <div className="container">
        <div className="header">
          <h1>
            Unauthor<span>i</span>zed Access
          </h1>
          <img
            src={back}
            alt="back"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="body">
          <div className="side">
            <img src={clock} alt="clock" />
          </div>
          <div className="content">
            <p>
              The server could not verify that you are authorized to access the
              Teacher's Dashboard{" "}
            </p>
            <br />
            <p>
              Either you supplied ther wrong credentials or your password does
              not understand how to supply the credentials required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Unauthorized;
