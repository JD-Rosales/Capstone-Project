import "./Assignments.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  DesktopDatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TextField, Paper } from "@mui/material";
import moment from "moment";
import { useState, useEffect } from "react";

const Assignments = () => {
  const currentDate = new Date();

  // const formattedDate = moment(currentDate).format();
  const [formattedDate, setFormattedDate] = useState(
    moment(currentDate).format()
  );
  const [date, setDate] = useState(formattedDate);
  const [time, setTime] = useState(formattedDate);

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };
  const handleTimeChange = (newValue) => {
    setTime(newValue);
  };

  useEffect(() => {
    console.log("Current Date: " + date.toString());
    setFormattedDate(date);
  }, [date]);

  useEffect(() => {
    console.log("Current Time: " + time.toString());
  }, [time]);

  useEffect(() => {
    console.log("test");
    setDate(formattedDate);
  }, [formattedDate]);

  return (
    <div className="teacher-assignments">
      <Sidebar />

      <header>
        {/* <h1>Date: {date}</h1>
        <h11>Time: {time}</h11> */}
      </header>

      <main>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Paper sx={{ padding: "20px", width: "15rem" }}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <br />
            <br />
            <TimePicker
              label="Time"
              value={time}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Paper>
        </LocalizationProvider>
      </main>
    </div>
  );
};

export default Assignments;
