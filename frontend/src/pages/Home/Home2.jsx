import "./Home2.css";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const Home2 = () => {
  const { width } = useSelector((state) => state.sidebar);
  return (
    <div className="home2" style={{ marginLeft: width }}>
      <h1>Test home2 {width}</h1>
    </div>
  );
};

export default Home2;
//sige kuys
