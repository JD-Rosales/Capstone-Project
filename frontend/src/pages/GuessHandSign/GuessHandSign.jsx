import { useState, useEffect } from "react";
import RightNav from "../../components/RightNav/RightNav";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./GuessHandSign.css";
import GameEnded from "../../components/GameEnded/GameEnded";

import A from "../../assets/asl-img/A.png";
import B from "../../assets/asl-img/B.png";
import C from "../../assets/asl-img/C.png";
import D from "../../assets/asl-img/D.png";
import E from "../../assets/asl-img/E.png";
import F from "../../assets/asl-img/F.png";
import G from "../../assets/asl-img/G.png";
import H from "../../assets/asl-img/H.png";
import I from "../../assets/asl-img/I.png";
import J from "../../assets/asl-img/J.png";
import K from "../../assets/asl-img/K.png";
import L from "../../assets/asl-img/L.png";
import M from "../../assets/asl-img/M.png";
import N from "../../assets/asl-img/N.png";
import O from "../../assets/asl-img/O.png";
import P from "../../assets/asl-img/P.png";
import Q from "../../assets/asl-img/Q.png";
import R from "../../assets/asl-img/R.png";
import S from "../../assets/asl-img/S.png";
import T from "../../assets/asl-img/T.png";
import U from "../../assets/asl-img/U.png";
import V from "../../assets/asl-img/V.png";
import W from "../../assets/asl-img/W.png";
import X from "../../assets/asl-img/X.png";
import Y from "../../assets/asl-img/Y.png";
import Z from "../../assets/asl-img/Z.png";

const GuessHandSign = () => {
  const asl = [
    { name: "A", image: A },
    { name: "B", image: B },
    { name: "C", image: C },
    { name: "D", image: D },
    { name: "E", image: E },
    { name: "F", image: F },
    { name: "G", image: G },
    { name: "H", image: H },
    { name: "I", image: I },
    { name: "J", image: J },
    { name: "K", image: K },
    { name: "L", image: L },
    { name: "M", image: M },
    { name: "N", image: N },
    { name: "O", image: O },
    { name: "P", image: P },
    { name: "Q", image: Q },
    { name: "R", image: R },
    { name: "S", image: S },
    { name: "T", image: T },
    { name: "U", image: U },
    { name: "V", image: V },
    { name: "W", image: W },
    { name: "X", image: X },
    { name: "Y", image: Y },
    { name: "Z", image: Z },
  ];

  const [letter, setLetter] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [aslArray, setAslArray] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [difficulty, setDifficulty] = useState("EASY");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const renderAsl = () => {
    if (aslArray.length > 0) {
      return <img src={aslArray[imgIndex].image} alt="ASL" />;
    }
  };

  //Test
  useEffect(() => {
    if (aslArray.length > 0) {
      console.log(aslArray);
    }
  }, [aslArray]);

  useEffect(() => {
    if (gameStart) {
      const sum = correct + wrong;
      if (sum === aslArray.length) {
        setGameEnded(true);
        alert("Game Over!");
      }
    }
    // eslint-disable-next-line
  }, [correct, wrong]);

  useEffect(() => {
    if (letter !== "") {
      checkAnswer();
    }
    // eslint-disable-next-line
  }, [letter]);

  const startGame = () => {
    resetGame();
    setGameStart(true);
    if (difficulty === "EASY") {
      setMinutes(1);
      setSeconds(0);
      setAslArray(getRandomItems(asl, 5));
    } else if (difficulty === "MEDIUM") {
      setMinutes(1);
      setSeconds(0);
      setAslArray(getRandomItems(asl, 10));
    } else {
      setMinutes(0);
      setSeconds(30);
      setAslArray(getRandomItems(asl, 15));
    }
  };

  const resetGame = () => {
    setGameStart(false);
    setLetter("");
    setAslArray([]);
    setImgIndex(0);
    setCorrect(0);
    setWrong(0);
    setMinutes(0);
    setSeconds(0);
    setGameEnded(false);
  };

  const changeDifficulty = (e) => {
    setDifficulty(e.target.value);
    resetGame();
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

  const btnClick = (e) => {
    if (gameStart && !gameEnded) {
      setLetter(e.currentTarget.value);
    }
  };

  const checkAnswer = () => {
    if (letter === aslArray[imgIndex].name) {
      setCorrect(correct + 1);
      setLetter("");
      //only increment if the imgIndex is not greater than the length of AslArray
      if (imgIndex < aslArray.length - 1) {
        setImgIndex(imgIndex + 1);
      }
    } else if (letter !== aslArray[imgIndex].name && letter !== "") {
      setWrong(wrong + 1);
      setLetter("");
      //only increment if the imgIndex is not greater than the length of AslArray
      if (imgIndex < aslArray.length - 1) {
        setImgIndex(imgIndex + 1);
      }
    }
  };

  //Countdown Timer
  useEffect(() => {
    if (gameStart && !gameEnded) {
      const intervalId = setInterval(() => {
        if (seconds === 0) {
          setSeconds(59);
        }
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setSeconds(59);
        }

        //minutes
        if (minutes !== 0 && seconds === 0) {
          setMinutes(minutes - 1);
        }

        //stop the timer
        if (minutes === 0 && seconds === 0) {
          clearInterval(intervalId);
          setMinutes(0);
          setSeconds(0);
          setGameEnded(true);
          alert("Times Up!");
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  });

  return (
    <div className="guess-hand-sign">
      <Sidebar isAdmin="false" />

      <div className="main">
        <div className="top">
          <div className="difficulty-container">
            <span>Game Difficulty: </span>
            <select onChange={changeDifficulty}>
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>

          <div className="btn-container">
            <button onClick={startGame}>START</button>
            <div className="divider"></div>
            <button onClick={resetGame}>RESET</button>
          </div>

          <div className="timer-container">
            <span>
              Time:{" "}
              <span>
                {minutes}:{seconds}
              </span>
            </span>
          </div>
        </div>

        <div className="asl-container">
          {gameEnded ? (
            <GameEnded
              title="GAME OVER"
              score={correct}
              length={aslArray.length}
              start={startGame}
            />
          ) : (
            renderAsl()
          )}
        </div>

        <div className="bottom">
          <span>
            Correct: <span>{correct}</span>
          </span>

          <span>
            {gameStart ? imgIndex + 1 : 0}/{gameStart ? aslArray.length : 0}
          </span>

          <span>
            Wrong: <span>{wrong}</span>
          </span>
        </div>

        <div className="letter-container">
          <button type="button" value="A" onClick={(e) => btnClick(e)}>
            A
          </button>
          <button type="button" value="B" onClick={(e) => btnClick(e)}>
            B
          </button>
          <button type="button" value="C" onClick={(e) => btnClick(e)}>
            C
          </button>
          <button type="button" value="D" onClick={(e) => btnClick(e)}>
            D
          </button>
          <button type="button" value="E" onClick={(e) => btnClick(e)}>
            E
          </button>
          <button type="button" value="F" onClick={(e) => btnClick(e)}>
            F
          </button>
          <button type="button" value="G" onClick={(e) => btnClick(e)}>
            G
          </button>
          <button type="button" value="H" onClick={(e) => btnClick(e)}>
            H
          </button>
          <button type="button" value="I" onClick={(e) => btnClick(e)}>
            I
          </button>
          <button type="button" value="J" onClick={(e) => btnClick(e)}>
            J
          </button>
          <button type="button" value="K" onClick={(e) => btnClick(e)}>
            K
          </button>
          <button type="button" value="L" onClick={(e) => btnClick(e)}>
            L
          </button>
          <button type="button" value="M" onClick={(e) => btnClick(e)}>
            M
          </button>
          <button type="button" value="N" onClick={(e) => btnClick(e)}>
            N
          </button>
          <button type="button" value="O" onClick={(e) => btnClick(e)}>
            O
          </button>
          <button type="button" value="P" onClick={(e) => btnClick(e)}>
            P
          </button>
          <button type="button" value="Q" onClick={(e) => btnClick(e)}>
            Q
          </button>
          <button type="button" value="R" onClick={(e) => btnClick(e)}>
            R
          </button>
          <button type="button" value="S" onClick={(e) => btnClick(e)}>
            S
          </button>
          <button type="button" value="T" onClick={(e) => btnClick(e)}>
            T
          </button>
          <button type="button" value="U" onClick={(e) => btnClick(e)}>
            U
          </button>
          <button type="button" value="V" onClick={(e) => btnClick(e)}>
            V
          </button>
          <button type="button" value="W" onClick={(e) => btnClick(e)}>
            W
          </button>
          <button type="button" value="X" onClick={(e) => btnClick(e)}>
            X
          </button>
          <button type="button" value="Y" onClick={(e) => btnClick(e)}>
            Y
          </button>
          <button type="button" value="Z" onClick={(e) => btnClick(e)}>
            Z
          </button>
        </div>
      </div>

      <RightNav
        header="GUESS THE"
        coloredText="HAND SIGN"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc quis massa a nunc finibus sollicitudin mollis eu nunc. Nullam lorem diam, fringilla pellentesque sodales ac, aliquam at ex. Nam vitae placerat risus, a ultricies ex. Nulla sagittis ut urna ac viverra. Vestibulum condimentum, leo placerat blandit consectetur, magna nisi porta lorem, a sagittis ex justo nec felis."
      />
    </div>
  );
};

export default GuessHandSign;
