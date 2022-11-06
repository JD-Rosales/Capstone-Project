import "./FingerSpell.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightNav from "../../components/RightNav/RightNav";
import Camera from "react-webcam";
import { useRef, useState, useEffect } from "react";
import * as handPose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import * as fingerpose from "fingerpose";
import { drawHand } from "../../util/Drawing";
import GameLoader from "../../components/GameLoader/GameLoader";
import { toast } from "react-toastify";
import { rightSigns } from "../../util/rightASL/rightSigns";
import { leftSigns } from "../../util/leftASL/leftSigns";
import Countdown, { zeroPad } from "react-countdown";
import { useSelector, useDispatch } from "react-redux";
import { reset, getWords } from "../../features/gameWord/gameWordSlice";

const FingerSpell = () => {
  const dispatch = useDispatch();
  const { data, isError, isSuccess, message } = useSelector(
    (state) => state.gameWord
  );
  const gameType = "fingerspell";

  const { user, token } = useSelector((state) => state.auth);

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const [asl, setASL] = useState([]);
  const [handsign, setHandsign] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [cameraEnable, setCameraEnable] = useState(false);
  const [handView, setHandView] = useState("False");
  const [loading, setloading] = useState(true);
  const [gameLoading, setGameLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("EASY");
  const [wordsArray, setWordsArray] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  const currentDate = Date.now();
  const [timer, setTimer] = useState(currentDate);

  // Timer
  const timerRef = useRef(null);
  const renderer = ({ minutes, seconds, milliseconds }) => {
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}:
        {zeroPad(String(milliseconds).slice(0, 2))}
      </span>
    );
  };
  // End Timer

  // start timer if model is loaded and the game is started
  useEffect(() => {
    const gameTimer = timerRef.current;
    if (gameStart && !loading && timer !== currentDate && !gameLoading) {
      gameTimer.start();
    }
    // eslint-disable-next-line
  }, [timer, loading, gameStart]);

  useEffect(() => {
    if (wordsArray.length !== 0 && currentWord && !gameEnded) {
      if (letterIndex === currentWord.length) {
        setLetterIndex(0);
        setWordIndex(wordIndex + 1);
      } else if (handsign === currentWord[letterIndex]) {
        setHandsign(null);
        setLetterIndex(letterIndex + 1);
      }
    }
    // eslint-disable-next-line
  }, [handsign, letterIndex]);

  useEffect(() => {
    if (wordsArray.length !== 0 && !gameEnded) {
      if (wordIndex !== wordsArray.length)
        setCurrentWord(wordsArray[wordIndex].word);
      else {
        setGameEnded(true);
        setLetterIndex(currentWord.length - 1);
        timerRef.current.pause();
        alert("Game Ended!");
      }
    }
    // eslint-disable-next-line
  }, [wordsArray, wordIndex]);

  const startGame = () => {
    if (!gameStart) {
      resetGame();
      setGameStart(true);
      setGameLoading(true);

      const params = {
        token: token,
        gameType: gameType,
        difficulty: difficulty,
      };
      dispatch(getWords(params));
    }
  };

  const resetGame = () => {
    setGameStart(false);
    setWordsArray([]);
    setCurrentWord(null);
    setWordIndex(0);
    setLetterIndex(0);
    setGameEnded(false);
    timerRef.current.stop();
    setTimer(currentDate);
  };

  function changeDifficulty(e) {
    setDifficulty(e.target.value);
    // resetGame();
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      setGameLoading(false);
      if (difficulty === "EASY") {
        setTimer(Date.now() + 90000);
        setWordsArray(getRandomItems(data, 5));
        setGameLoading(false);
      } else if (difficulty === "MEDIUM") {
        setTimer(Date.now() + 60000);
        setWordsArray(getRandomItems(data, 8));
        setGameLoading(false);
      } else {
        setTimer(Date.now() + 30000);
        setWordsArray(getRandomItems(data, 10));
        setGameLoading(false);
      }
    }

    if (isError) {
      dispatch(reset());
      setGameLoading(false);
      toast.error(message);
    }
    // eslint-disable-next-line
  }, [data, isError, isSuccess, message]);

  const renderLetters = () => {
    if (currentWord) {
      const arr = currentWord.split("");

      const spanElements = arr.map((letter, key) => {
        if (letterIndex === key) {
          return (
            <span className="colored-letter" key={key}>
              {letter}
            </span>
          );
        } else {
          return <span key={key}>{letter}</span>;
        }
      });

      return spanElements;
    }
  };

  function getRandomItems(arr, num) {
    const arrCopy = [...arr];
    const res = [];

    for (let i = 0; i < num; i++) {
      let index = Math.floor(Math.random() * arrCopy.length);
      res.push(arrCopy[index]);
      arrCopy.splice(index, 1);
    }
    return res;
  }

  //check Camera permission
  const checkCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraEnable(true);
    } catch (error) {
      setCameraEnable(false);
      toast.error("Cannot Access Camera!");
    }
  };

  const detectHand = async (model) => {
    if (
      cameraRef.current !== null &&
      cameraRef.current.video.readyState === 4
    ) {
      const video = cameraRef.current.video;
      const videoHeight = cameraRef.current.video.videoHeight;
      const videoWidth = cameraRef.current.video.videoWidth;

      cameraRef.current.video.width = videoWidth;
      cameraRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await model.estimateHands(video, true);

      if (loading) setloading(false);

      if (hand.length > 0) {
        setHandView("True");
      } else {
        setHandView("False");
      }

      if (hand.length > 0) {
        const canvas = canvasRef.current.getContext("2d");
        drawHand(hand, canvas);

        const estimateGesture = new fingerpose.GestureEstimator(asl);

        const gesture = await estimateGesture.estimate(hand[0].landmarks, 8.5);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const arrConfidence = gesture.gestures.map(
            (confidence) => confidence.score
          );

          const max = Math.max(...arrConfidence);

          const highestConfidence = arrConfidence.indexOf(max);
          // console.log(gesture.gestures[highestConfidence].name)

          setHandsign(gesture.gestures[highestConfidence].name);
        }
      }
    }
  };

  async function startDetection() {
    const model = await handPose.load();

    setInterval(() => {
      detectHand(model);
    }, 100);
  }

  useEffect(() => {
    if (cameraEnable) {
      startDetection();
    }
    // eslint-disable-next-line
  }, [cameraEnable]);

  useEffect(() => {
    if (user.userSettings.hand) {
      setASL(rightSigns);
    } else {
      setASL(leftSigns);
    }
    checkCamera();
    // eslint-disable-next-line
  }, [cameraEnable]);

  return (
    <div className="finger-spell">
      <Sidebar isAdmin="false" />

      <div className="main">
        <div className="top">
          <div className="top-left">
            <span>
              Game Difficulty:{" "}
              <select onChange={changeDifficulty}>
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </span>

            <span>
              Time:{" "}
              <span>
                <Countdown
                  ref={timerRef}
                  date={timer}
                  intervalDelay={0}
                  precision={2}
                  renderer={renderer}
                  autoStart={false}
                  onComplete={() => {
                    setGameEnded(true);
                  }}
                />
              </span>
            </span>
          </div>

          <div className="btn-container">
            <button
              onClick={startGame}
              style={{ display: gameStart ? "none" : "" }}
            >
              START
            </button>
            <div
              className="divider"
              style={{ display: gameStart ? "none" : "" }}
            ></div>
            <button onClick={resetGame}>RESET</button>
          </div>

          <div className="top-right">
            <span>
              Web Camera:
              <span onClick={checkCamera}>
                {" "}
                {cameraEnable ? `Enabled` : `Disable`}
              </span>
            </span>

            <span>
              Hand Detected: <span>{handView}</span>
            </span>
          </div>
        </div>

        <div className="camera-container">
          <Camera
            className="camera"
            ref={cameraRef}
            mirrored={true}
            style={{
              height: "100%",
              width: "100%",
              display: gameEnded ? "none" : "",
            }}
          />

          <canvas
            className="canvas"
            ref={canvasRef}
            style={{
              height: "100%",
              width: "100%",
              display: gameEnded ? "none" : "",
            }}
          />

          {loading ? <GameLoader /> : ""}
          {gameLoading ? <GameLoader className="game-loader" /> : ""}
        </div>

        <div className="bottom-indicator">
          <span></span>

          <span style={{ visibility: !gameStart ? "hidden" : "" }}>
            {gameEnded ? wordIndex : gameStart ? wordIndex + 1 : 0}/
            {wordsArray.length}
          </span>

          <span></span>
        </div>

        <div className="bottom">
          <span>Finger Spell the Word:</span>

          <div>{renderLetters()}</div>
        </div>
      </div>

      <RightNav
        header="FINGER SPELL"
        coloredText="THE WORD"
        text="Words will appear on the screen, and the learner will sign each letter in the word.
        Note: The learner’s camera must be turned on."
      />
    </div>
  );
};

export default FingerSpell;
