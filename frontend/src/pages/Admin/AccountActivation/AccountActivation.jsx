import "./AccountActivation.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import manageRequestIllustration from "../../../assets/manageRequest.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUnactivated } from "../../../features/admin/adminSlice";
import Button from "@mui/material/Button";

const AccountActivation = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useSelector((state) => state.admin);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getUnactivated());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setTableData(data.teachers);
    }
    // eslint-disable-next-line
  }, [data, isSuccess]);

  return (
    <div className="account-activation">
      <Sidebar />

      <header>
        <div className="header-text">
          <h1>
            Account <span>Activation</span>
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit
            amet aliquet rutrum. Nunc quis massa a nunc finibus metus eu dui
            ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet
            rutrum. Nunc quis massa a nunc finibus metus eu dui ornare laoreet
            vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc
            quis massa a nunc finibus
          </p>
        </div>
        <div className="header-img">
          <img src={manageRequestIllustration} alt="Illustration" />
        </div>
      </header>

      <main>
        <div className="tbl-contianer">
          <div className="tbl-header">
            <div>Email</div>
            <div></div>
          </div>

          {tableData.map((data) => {
            return (
              <div key={data._id} className="tbl-data">
                <div className="tbl-item">{data.email}</div>
                <div className="tbl-item">
                  <Button
                    aria-haspopup="true"
                    variant="contained"
                    sx={{
                      background: "#42C9A3",
                      ":hover": {
                        bgcolor: "#42C9A3",
                        color: "white",
                      },
                    }}
                  >
                    Activate
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AccountActivation;
