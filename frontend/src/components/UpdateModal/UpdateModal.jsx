import "./UpdateModal.css";
import { useState, useEffect, useRef } from "react";
import Spinner from "../Spinner/Spinner";
import axios from "axios";

const UpdateModal = (props) => {
  const wordRef = useRef();

  const [word, setWord] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (word === "") {
      wordRef.current.focus();
    } else {
      setIsLoading(true);
      await axios
        .put(
          props.API_URL,
          {
            word,
            difficulty,
          },
          {
            headers: { Authorization: `Bearer ${props.token}` },
          }
        )
        .then((res) => {
          setIsLoading(false);
          props.fetch();
          handleParenChange(e);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const handleParenChange = (e) => {
    props.onChange(e.target.value);
  };

  useEffect(() => {
    wordRef.current.focus();
    setWord(props.word);
    setDifficulty(props.difficulty);
  }, [props.word, props.difficulty]);

  return (
    <div className="update-modal">
      <div className="content">
        <button onClick={handleParenChange}>X</button>
        <form>
          <h2>
            Ed<span>i</span>t
          </h2>
          <span>Click the input field to edit the word.</span>
          <span>To change the difficulty, click the dropdown menu.</span>

          <input
            ref={wordRef}
            value={word}
            onChange={(e) => setWord(e.target.value.toUpperCase())}
            type="text"
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">EASY</option>
            <option value="Medium">MEDIUM</option>
            <option value="Hard">HARD</option>
          </select>

          <span>Game difficulty: Easy, Medium, Hard.</span>

          <button onClick={handleSubmit}>Update</button>
        </form>
      </div>
      {isLoading ? <Spinner /> : ""}
    </div>
  );
};

export default UpdateModal;
