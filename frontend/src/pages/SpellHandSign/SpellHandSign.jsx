import "./SpellHandSign.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightNav from "../../components/RightNav/RightNav";
import { useState, useEffect } from "react";
import axios from "axios";
import GameLoader from "../../components/GameLoader/GameLoader";

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

const SpellHandSign = () => {
  // const baseURL = "";
  const baseURL = "http://localhost:5000";

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

  const [inputWord, setInputWord] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [difficulty, setDifficulty] = useState("EASY");
  const [wordsArray, setWordsArray] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (wordsArray.length !== 0 && !gameEnded) {
      console.log(wordsArray);
      setCurrentWord(wordsArray[wordIndex]);
    }
    // eslint-disable-next-line
  }, [wordsArray, wordIndex]);

  useEffect(() => {
    if (gameStart && wordsArray.length !== 0) {
      const sum = correct + wrong;
      if (sum === wordsArray.length) {
        alert("Game Ended");
        setGameEnded(true);
      }
    }
    // eslint-disable-next-line
  }, [correct, wrong]);

  const renderImages = () => {
    if (currentWord) {
      const imgArray = [];

      for (let i = 0; i < currentWord.length; i++) {
        for (let j = 0; j < asl.length; j++) {
          if (currentWord[i] === asl[j].name) {
            imgArray.push(asl[j].image);
          }
        }
      }

      const imgElements = imgArray.map((img, key) => {
        return <img key={key} src={img} alt="handsign" />;
      });

      return imgElements;
    }
  };

  function submitBtn() {
    if (gameStart && inputWord && !gameEnded) {
      if (currentWord === inputWord) {
        setCorrect(correct + 1);
      } else {
        setWrong(wrong + 1);
      }
      setInputWord("");
      setWordIndex(wordIndex + 1);
    }
  }

  function handleInputChange(event) {
    //remove white spaces on input field
    let input = event.target.value.toUpperCase().replace(/\s/g, "");
    setInputWord(input);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      submitBtn();
    }
  }

  const startGame = () => {
    resetGame();
    setGameStart(true);
    setIsLoading(true);
    fetchWords();
  };

  const resetGame = () => {
    setGameStart(false);
    setGameEnded(false);
    setInputWord("");
    setWordsArray([]);
    setCurrentWord(null);
    setWordIndex(0);
    setCorrect(0);
    setWrong(0);
    setMinutes(0);
    setSeconds(0);
  };

  const fetchWords = async () => {
    await axios
      .get(baseURL + "/api/spell-hand-sign/" + difficulty)
      .then((result) => {
        if (difficulty === "EASY") {
          setMinutes(1);
          setSeconds(0);
          setWordsArray(getRandomItems(result.data, 5));
          setIsLoading(false);
        } else if (difficulty === "MEDIUM") {
          setMinutes(1);
          setSeconds(0);
          setWordsArray(getRandomItems(result.data, 8));
          setIsLoading(false);
        } else {
          setMinutes(0);
          setSeconds(30);
          setWordsArray(getRandomItems(result.data, 10));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
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

  function getRandomItems(arr, num) {
    const arrCopy = [...arr];
    const res = [];

    for (let i = 0; i < num; i++) {
      let index = Math.floor(Math.random() * arrCopy.length);
      res.push(arrCopy[index].word);
      arrCopy.splice(index, 1);
    }
    return res;
  }

  function changeDifficulty(e) {
    setDifficulty(e.target.value);
    // resetGame();
  }

  return (
    <div className="spell-hand">
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
          {renderImages()}
          {isLoading ? <GameLoader className="game-loader" /> : ""}
        </div>

        <div className="bottom">
          <span>
            Correct: <span>{correct}</span>
          </span>

          <span>
            {gameEnded ? wordIndex : gameStart ? wordIndex + 1 : 0}/
            {wordsArray.length}
          </span>

          <span>
            Wrong: <span>{wrong}</span>
          </span>
        </div>

        <div className="input-container">
          <input
            type="text"
            onKeyUp={handleKeyPress}
            onChange={handleInputChange}
            value={inputWord}
            placeholder="Text here..."
          ></input>

          <button onClick={submitBtn}>SUBMIT</button>
        </div>
      </div>

      <RightNav
        header="SPELL THE"
        coloredText="THE SIGN"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc quis massa a nunc finibus sollicitudin mollis eu nunc. Nullam lorem diam, fringilla pellentesque sodales ac, aliquam at ex. Nam vitae placerat risus, a ultricies ex. Nulla sagittis ut urna ac viverra. Vestibulum condimentum, leo placerat blandit consectetur, magna nisi porta lorem, a sagittis ex justo nec felis."
      />
    </div>
  );
};

export default SpellHandSign;
