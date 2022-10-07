import "./EnrolledStudent.css";
import SideBar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "../../../features/teacher/teacherSlice";

const columns = [
  { id: "_id", label: "ID" },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
];

const EnrolledStudent = () => {
  const dispatch = useDispatch();
  const { students, isSuccess } = useSelector((state) => state.teacher);
  const { user } = useSelector((state) => state.auth);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getStudents({ classCode: user.userInfo.classCode }));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      console.log(students.students);
      setTableData(students.students);
    }
  }, [students, isSuccess]);

  return (
    <div className="enrolled-student">
      <SideBar />
      <main>
        <div className="table-container">
          <div className="table-header">
            <div>ID</div>
            <div>Email</div>
            <div>First Name</div>
            <div>Last Name</div>
          </div>

          {tableData.map((data) => {
            return (
              <div key={data._id} className="table-data">
                <div>{data._id}</div>
                <div>{data.email}</div>
                <div>{data.userInfo.firstName}</div>
                <div>{data.userInfo.lastName}</div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default EnrolledStudent;
