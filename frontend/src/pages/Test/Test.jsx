import { useState, useRef } from "react";
import Countdown, {
  zeroPad,
  calcTimeDelta,
  formatTimeDelta,
} from "react-countdown";

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ minutes, seconds, milliseconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}:
        {zeroPad(String(milliseconds).slice(0, 2))}
      </span>
    );
  }
};

const Test = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(10000);

  const countRef = useRef(null);

  function changeDifficulty(e) {
    // setDifficulty(e.target.value);
    if (e.target.value === "easy") {
      setTimer(5000);
    } else if (e.target.value === "medium") {
      setTimer(10000);
    } else {
      setTimer(15000);
    }
  }
  return (
    <div>
      <Countdown
        ref={countRef}
        date={Date.now() + timer}
        intervalDelay={0}
        precision={1}
        renderer={renderer}
        autoStart={false}
        onComplete={() => {
          setIsCompleted(true);
        }}
      />

      {isCompleted ? <h1>Completed</h1> : <h1>Incomplete</h1>}

      <select id="cars" onChange={changeDifficulty}>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>

      <button
        onClick={() => {
          countRef.current.start();
          console.log(countRef.current);
        }}
      >
        Start Timer
      </button>

      <button
        onClick={() => {
          countRef.current.pause();
        }}
      >
        Pause Timer
      </button>

      <button
        onClick={() => {
          countRef.current.stop();
        }}
      >
        Stop Timer
      </button>
    </div>
  );
};

export default Test;
