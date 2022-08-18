import "./AdminSpellHandSign.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import RightNav from "../../../components/RightNav/RightNav";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import UpdateModal from "../../../components/UpdateModal/UpdateModal";

const AdminSpellHandSign = () => {
  // const BASE_URL = "";
  const BASE_URL = "http://localhost:5000";
  // const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [tableData, setTableData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [id, setID] = useState("");

  //variable for add
  const [addWord, setAddWord] = useState("");
  const [addDifficulty, setAddDifficulty] = useState("Easy");

  //variable for update
  const [updateWord, setUpdateWord] = useState("");
  const [updateDifficulty, setUpdateDifficulty] = useState("");

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

  const handleAdd = async (e) => {
    e.preventDefault();
    //only add if the word input field is not empty
    if (addWord !== "") {
      await axios
        .post(
          BASE_URL + "/api/spell-hand-sign",
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
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    await axios
      .get(BASE_URL + "/api/spell-hand-sign", {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    setID(id);
    setDeleteModal(true);
  };

  const handleDeleteModalChange = () => {
    setDeleteModal(!deleteModal);
    setID("");
  };

  return (
    <div className="admin-spell-hand">
      <Sidebar isAdmin="true" username={userData ? userData.username : ""} />

      <main>
        <form onSubmit={handleAdd}>
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
            <option value="EASY">Game Difficulty (EASY)</option>
            <option value="MEDIUM">Game Difficulty (MEDIUM)</option>
            <option value="HARD">Game Difficulty (HARD)</option>
          </select>

          <button>
            <IoAdd className="add-icon" />
            <span>Add</span>
          </button>
        </form>

        <div className="tbl-container">
          <table>
            <thead>
              <tr>
                <th>Words</th>
                <th>Difficulty</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((data) => {
                return (
                  <tr key={data._id}>
                    <td>{data.word}</td>
                    <td>{data.difficulty}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleUpdate(data._id, data.word, data.difficulty);
                        }}
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(data._id);
                        }}
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      <RightNav
        header="MANAGE"
        coloredText="SPELL THE HAND SIGN"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc quis massa a nunc finibus sollicitudin mollis eu nunc. Nullam lorem diam, fringilla pellentesque sodales ac, aliquam at ex. Nam vitae placerat risus, a ultricies ex. Nulla sagittis ut urna ac viverra. Vestibulum condimentum, leo placerat blandit consectetur, magna nisi porta lorem, a sagittis ex justo nec felis."
      />

      {deleteModal ? (
        <DeleteModal
          onChange={handleDeleteModalChange}
          API_URL={BASE_URL + `/api/spell-hand-sign/${id}`}
          token={userData.token}
          fetch={fetchData}
        />
      ) : (
        ""
      )}

      {updateModal ? (
        <UpdateModal
          onChange={handleUpdateModalChange}
          word={updateWord}
          difficulty={updateDifficulty}
          API_URL={BASE_URL + `/api/spell-hand-sign/${id}`}
          token={userData.token}
          fetch={fetchData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminSpellHandSign;
