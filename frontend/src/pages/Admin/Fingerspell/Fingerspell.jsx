import "./Fingerspell.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { IoAdd } from "react-icons/io5";
import Spinner from "../../../components/Spinner/Spinner";
import UpdateModal from "../../../components/UpdateModal/UpdateModal";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

import React from "react";

const Fingerspell = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setID] = useState("");

  //variable for update
  const [updateWord, setUpdateWord] = useState("");
  const [updateDifficulty, setUpdateDifficulty] = useState("");

  //variable for add
  const [addWord, setAddWord] = useState("");
  const [addDifficulty, setAddDifficulty] = useState("Easy");

  const baseURL = "http://localhost:5000";
  const navigate = useNavigate();

  const getFingerSpell = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setIsLoading(true);
    await axios
      .get(baseURL + "/api/fingerspell", {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const verifyJWT = async () => {
      axios
        .get(baseURL + "/verifyJWT", {
          headers: { Authorization: `Bearer ${userData.token}` },
        })
        .then((res) => {
          if (res.data.isAuthorized === true) {
            setUser(userData.username);
            getFingerSpell();
          } else {
            localStorage.clear();
            navigate("/unauthorized");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          navigate("/unauthorized");
        });
    };

    if (localStorage.length === 0) {
      navigate("/unauthorized");
    } else {
      return () => verifyJWT();
    }
  }, [navigate, userData.token, userData.username]);

  const handleAdd = async () => {
    //only add if the word input field is not empty
    if (addWord !== "") {
      setIsLoading(true);
      await axios
        .post(
          baseURL + "/api/fingerspell",
          {
            addWord,
            addDifficulty,
          },
          {
            headers: { Authorization: `Bearer ${userData.token}` },
          }
        )
        .then((res) => {
          setAddWord("");
          setIsLoading(false);
          getFingerSpell();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const handleDelete = (id) => {
    setID(id);
    setDeleteModal(true);
  };

  const handleDeleteModalChange = () => {
    setDeleteModal(!deleteModal);
    setID("");
  };

  const handleUpdate = (id, word, difficulty) => {
    setID(id);
    setUpdateWord(word);
    setUpdateDifficulty(difficulty);
    setUpdateModal(!updateModal);
  };

  const handleUpdateModalChange = () => {
    setUpdateModal(!updateModal);
    setID("");
    setUpdateWord("");
    setUpdateDifficulty("");
  };

  return (
    <div className="admin-fingerspell">
      <Sidebar isAdmin="true" username={user} />

      <div className="main">
        <div className="header">
          <h1>
            MANAGE <span>FINGER SPELL THE WORD</span>
          </h1>
          <hr />
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Input a word"
            value={addWord}
            onChange={(e) => setAddWord(e.target.value)}
          />

          <select
            value={addDifficulty}
            onChange={(e) => setAddDifficulty(e.target.value)}
          >
            <option value="EASY">Game Level (EASY)</option>
            <option value="MEDIUM">Game Level (MEDIUM)</option>
            <option value="HARD">Game Level (HARD)</option>
          </select>

          <button
            onClick={() => {
              handleAdd();
            }}
          >
            <IoAdd className="add-icon" />
            <span>Add</span>
          </button>
        </div>

        {data.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th>WORDS</th>
                <th>DIFFICULTY</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item.word}</td>
                    <td>{item.difficulty}</td>
                    <td className="btn-container">
                      <button
                        onClick={() => {
                          handleUpdate(item._id, item.word, item.difficulty);
                        }}
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
      {updateModal ? (
        <UpdateModal
          onChange={handleUpdateModalChange}
          word={updateWord}
          difficulty={updateDifficulty}
          API_URL={baseURL + `/api/fingerspell/${id}`}
          token={userData.token}
          fetch={getFingerSpell}
        />
      ) : (
        ""
      )}

      {deleteModal ? (
        <DeleteModal
          onChange={handleDeleteModalChange}
          API_URL={baseURL + `/api/fingerspell/${id}`}
          token={userData.token}
          fetch={getFingerSpell}
        />
      ) : (
        ""
      )}

      {isLoading ? <Spinner /> : ""}
    </div>
  );
};

export default Fingerspell;
