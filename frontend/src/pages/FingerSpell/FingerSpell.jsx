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
import axios from "axios";

import { a } from "../../asl/A";
import { b } from "../../asl/B";
import { c } from "../../asl/C";
import { d } from "../../asl/D";
import { e } from "../../asl/E";
import { f } from "../../asl/F";
import { g } from "../../asl/G";
import { h } from "../../asl/H";
import { i } from "../../asl/I";
import { j } from "../../asl/J";
import { k } from "../../asl/K";
import { l } from "../../asl/L";
import { m } from "../../asl/M";
import { n } from "../../asl/N";
import { o } from "../../asl/O";
import { p } from "../../asl/P";
import { q } from "../../asl/Q";
import { r } from "../../asl/R";
import { s } from "../../asl/S";
//T asl
import { u } from "../../asl/U";
import { v } from "../../asl/V";
import { w } from "../../asl/W";
import { x } from "../../asl/X";
import { y } from "../../asl/Y";
//z asl

const FingerSpell = () => {
  // const baseURL = "";
  const baseURL = "http://localhost:5000";

  const asl = [
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k,
    l,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    u,
    v,
    w,
    x,
    y,
  ];

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

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
        alert("Game Ended!");
      }
    }
    // eslint-disable-next-line
  }, [wordsArray, wordIndex]);

  const startGame = () => {
    resetGame();
    setGameStart(true);
    setGameLoading(true);
    fetchWords();
  };

  const resetGame = () => {
    setGameStart(false);
    setWordsArray([]);
    setCurrentWord(null);
    setWordIndex(0);
    setLetterIndex(0);
    setGameEnded(false);
  };

  function changeDifficulty(e) {
    setDifficulty(e.target.value);
    resetGame();
  }

  const fetchWords = async () => {
    await axios
      .get(baseURL + "/api/fingerspell/" + difficulty)
      .then((result) => {
        if (difficulty === "EASY") {
          setWordsArray(getRandomItems(result.data, 5));
          setGameLoading(false);
        } else if (difficulty === "MEDIUM") {
          setWordsArray(getRandomItems(result.data, 8));
          setGameLoading(false);
        } else {
          setWordsArray(getRandomItems(result.data, 10));
          setGameLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setGameLoading(false);
      });
  };

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

      //if video feed is available start hand detection
      startDetection();
    } catch (error) {
      setCameraEnable(false);
      alert("Cannot access camera!");
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
    return () => {
      checkCamera();
    };
    // eslint-disable-next-line
  }, []);

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
              Time: <span>1:30</span>
            </span>
          </div>

          <div className="btn-container">
            <button onClick={startGame}>START</button>
            <div className="divider"></div>
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
            }}
          />

          <canvas
            className="canvas"
            ref={canvasRef}
            style={{
              height: "100%",
              width: "100%",
            }}
          />

          {loading ? <GameLoader /> : ""}
          {gameLoading ? <GameLoader className="game-loader" /> : ""}
        </div>

        <div className="bottom-indicator">
          <span></span>

          <span>
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
