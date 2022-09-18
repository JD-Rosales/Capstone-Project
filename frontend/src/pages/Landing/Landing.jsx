import "./Landing.css";
import illustration1 from "../../assets/illustration1.png";
import logo2 from "../../assets/logo2.png";
import ChooseRoleModal from "../../components/ChooseRoleModal/ChooseRoleModal";
import ChooseRoleModal2 from "../../components/ChooseRoleModal2/ChooseRoleModal2";
import { useState } from "react";

const Landing = () => {
  const [chooseRoleModal, setChooseRoleModal] = useState(false);
  const [chooseRoleModal2, setChooseRoleModal2] = useState(false);

  const handleRoleModal = () => {
    setChooseRoleModal(!chooseRoleModal);
  };

  const handleRoleModal2 = () => {
    setChooseRoleModal2(!chooseRoleModal2);
  };

  return (
    <div className="landing">
      <nav>
        <img src={logo2} alt="logo"></img>
      </nav>

      <main>
        <div className="illustrator-container">
          <img src={illustration1} alt="Illustration"></img>
        </div>
        <div className="header-container">
          <h1>
            IT'S A <span>BEAUTIFUL</span> <br />
            DAY TO <span>LEARN</span> <br />
            SOMETHING <span>NEW</span>!
          </h1>

          <span className="subtitle">
            Get a better understanding of the sign lanuage that is most <br />
            widely used around the world.
          </span>

          <button
            className="getStarted"
            onClick={() => {
              handleRoleModal();
            }}
          >
            Get Started
          </button>

          <span>
            Don't have an account?
            <span
              className="signUp"
              onClick={() => {
                handleRoleModal2();
              }}
            >
              Sign Up
            </span>
          </span>
        </div>
      </main>

      {/* for Sign in */}
      {chooseRoleModal ? <ChooseRoleModal onChange={handleRoleModal} /> : ""}

      {/* for Sign Up */}
      {chooseRoleModal2 ? <ChooseRoleModal2 onChange={handleRoleModal2} /> : ""}
    </div>
  );
};

export default Landing;
