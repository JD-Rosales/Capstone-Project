import "./EnrolledStudent.css";
import SideBar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEnrolledStudents } from "../../../features/student/studentSlice";
import { CgOptions } from "react-icons/cg";

const EnrolledStudent = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useSelector((state) => state.student);
  const { user } = useSelector((state) => state.auth);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // dispatch(getStudents({ classCode: user.userInfo.classCode }));
    return () => dispatch(getEnrolledStudents(user.userInfo.classCode));
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      // console.log(teachers.teachers);
      setTableData(data.students);
    }
    // eslint-disable-next-line
  }, [data, isSuccess]);

  return (
    <div className="enrolled-student">
      <SideBar />
      <main>
        <div className="table-container">
          <div className="table-header">
            <div></div>
            <div>Email</div>
            <div>Full name</div>
            <div>School</div>
            <div></div>
          </div>

          {tableData.map((data) => {
            return (
              <div key={data._id} className="table-data">
                <div className="table-item">
                  <div
                    className="user-img"
                    style={{ backgroundImage: `url(${data.userInfo.image})` }}
                  ></div>
                </div>
                <div className="table-item">{data.email}</div>
                <div className="table-item">
                  {data.userInfo.lastName + " " + data.userInfo.firstName + ""}{" "}
                  {data.userInfo.middleInitial
                    ? data.userInfo.middleInitial + "."
                    : ""}
                </div>
                <div className="table-item">{data.userInfo.school}</div>
                <div className="table-item table-option">
                  <CgOptions />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default EnrolledStudent;
