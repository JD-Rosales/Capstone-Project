import "./Administrator.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import illustration2 from "../../assets/illustration2.png";

const Administrator = () => {
  // const BASE_URL = "";
  const BASE_URL = "http://localhost:5000";
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (localStorage.length !== 0) {
      return () => {
        verifyJWT();
      };
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const verifyJWT = async () => {
    axios
      .get(BASE_URL + "/verifyJWT", {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then(() => {
        // navigate("/administrator");
      })
      .catch((err) => {
        navigate("/login");
        console.log(err);
        localStorage.clear();
      });
  };

  return (
    <div className="administrator">
      <Sidebar isAdmin="true" username={userData ? userData.username : ""} />

      <div className="main">
        <div className="header-container">
          <div>
            <h1>
              Manage <br />
              <span>Games</span>
            </h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
              metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci
              sit amet aliquet rutrum. Nunc quis massa a nunc finibus
              sollicitudin mollis eu nunc. Nullam lorem diam, fringilla
              pellentesque sodales ac, aliquam at ex. Nam vitae placerat risus,
              a ultricies ex.
            </p>
          </div>

          <div>
            <img src={illustration2} alt="Illustration2" />
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <span>
              FINGER SPELL <br /> <span>THE WORD</span>
            </span>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
              metus eu dui ornare laoreet vitae ac nibh.
            </p>

            <Link to="/manage-finger-spell">MANAGE</Link>
          </div>

          <div className="card">
            <span>
              SPELL THE <br /> <span>HAND SIGN</span>
            </span>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
              metus eu dui ornare laoreet vitae ac nibh.
            </p>

            <Link to="/manage-spell-hand-sign">MANAGE</Link>
          </div>

          <div className="card">
            <span>
              4 PICS <br /> <span>1 WORD</span>
            </span>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
              metus eu dui ornare laoreet vitae ac nibh.
            </p>

            <Link to="/manage-4-pic-1-word">MANAGE</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administrator;
