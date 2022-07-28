import { Link } from "react-router-dom";
import "./Landing.css";
import illustration1 from "../../assets/illustration1.png";
import logo2 from "../../assets/logo2.png";

const Landing = () => {
  return (
    <div className="landing">
      <nav>
        <img src={logo2} alt="logo"></img>

        <ul>
          <li>
            <Link to="/home">HOME</Link>
          </li>
          <li>
            <Link to="/play-game">PLAY A GAME</Link>
          </li>
          <li>
            <Link to="/practice">PRACTICE</Link>
          </li>
        </ul>
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

          <button>Start Lesson</button>
        </div>
      </main>
    </div>
  );
};

export default Landing;
