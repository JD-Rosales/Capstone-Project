import "./Play.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightNav from "../../components/RightNav/RightNav";
import { Link } from "react-router-dom";

const Play = () => {
  return (
    <div className="play">
      <Sidebar isAdmin="false" />

      <div className="main">
        <div className="card">
          <span>
            GUESS THE <br /> <span>HAND SIGN</span>
          </span>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            metus eu dui ornare laoreet vitae ac nibh.
          </p>

          <Link to="/guess-hand-sign">PLAY</Link>
        </div>

        <div className="card">
          <span>
            FINGER SPELL <br /> <span>THE WORD</span>
          </span>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            metus eu dui ornare laoreet vitae ac nibh.
          </p>

          <Link to="">PLAY</Link>
        </div>

        <div className="card">
          <span>
            SPELL THE <br /> <span>HAND SIGN</span>
          </span>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            metus eu dui ornare laoreet vitae ac nibh.
          </p>

          <Link to="">PLAY</Link>
        </div>

        <div className="card">
          <span>
            4 PICS <br /> <span>1 WORD</span>
          </span>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            metus eu dui ornare laoreet vitae ac nibh.
          </p>

          <Link to="">PLAY</Link>
        </div>
      </div>

      <RightNav
        header="PLAY"
        coloredText="A GAME!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc quis massa a nunc finibus sollicitudin mollis eu nunc. Nullam lorem diam, fringilla pellentesque sodales ac, aliquam at ex. Nam vitae placerat risus, a ultricies ex. Nulla sagittis ut urna ac viverra. Vestibulum condimentum, leo placerat blandit consectetur, magna nisi porta lorem, a sagittis ex justo nec felis."
      />
    </div>
  );
};

export default Play;
