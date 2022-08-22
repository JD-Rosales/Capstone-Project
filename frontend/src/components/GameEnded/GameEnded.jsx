import "./GameEnded.css";

const GameEnded = (props) => {
  return (
    <div className="gameEnded">
      <h1>{props.title}</h1>

      <span className="score">
        {props.score} / {props.length}
      </span>

      {props.score === props.length ? (
        <span className="perfect">PERFECT</span>
      ) : (
        ""
      )}

      <button onClick={props.start}>PLAY AGAIN</button>
    </div>
  );
};

export default GameEnded;
