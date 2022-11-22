import "./RighNav.css";

const RightNav = (props) => {
  return (
    <div className="right-nav">
      <div className="header-container">
        <h1>
          {props.header} <br />
          <span>{props.coloredText}</span>
        </h1>
      </div>

      <div className="text">
        <p className="description">
          {props.text} <br /> {props.description}
        </p>
      </div>
    </div>
  );
};

export default RightNav;
