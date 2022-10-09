import "./AdminManageRequest.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import manageRequestIllustration from "../../../assets/manageRequest.png";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminManageRequest = () => {
  const [teacherData, setTeacherData] = useState([]);

  const fetchTeacherData = async () => {
    axios
      .get("/api/teacher")
      .then((response) => {
        setTeacherData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(teacherData);
  }, [teacherData]);

  useEffect(() => {
    fetchTeacherData();
  }, []);

  return (
    <div className="admin-manage-request">
      <Sidebar isAdmin="true" />
      <div className="main">
        <div className="manageRequestHeader">
          <div>
            <h1>
              Manage <br />
              <span>Request</span>
            </h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
              metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci
              sit amet aliquet rutrum. Nunc quis massa a nunc finibus metus eu
              dui ornare laoreet vitae ac nibh. Donec porttitor orci sit amet
              aliquet rutrum. Nunc quis massa a nunc finibus metus eu dui ornare
              laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet
              rutrum. Nunc quis massa a nunc finibus
            </p>
          </div>
          <div>
            <img src={manageRequestIllustration} alt="Illustration" />
          </div>
        </div>
        <div className="tbl-container">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Full Name</th>
                <th>School</th>
              </tr>
            </thead>
            <tbody>
              {teacherData.map((data) => {
                return (
                  <tr key={data._id}>
                    <td>{data.email}</td>
                    <td>
                      {data.firstName +
                        " " +
                        data.lastName +
                        " " +
                        data.middleInitial}
                    </td>
                    <td>{data.school}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminManageRequest;
