import "./GameLogs.css";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getGameLogs } from "../../features/gameLogs/gameLogsSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GameLogs = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.gameLogs);

  const handleClick = () => {
    console.log("test");
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Game Trend",
        color: "#fff",
      },
    },
    onClick: handleClick,
  };

  const labels = [
    "Fingerspell",
    "Spell The Hand Sign",
    "Guess The Hand Sign",
    "4 Pic 1 Word",
  ];

  const gameLogsData = {
    labels,
    datasets: [
      {
        label: "Play Count",
        data: data,
        backgroundColor: ["#4F6D7A", "#474974", "#A69CAC", "#F1DCA4"],
      },
    ],
  };

  useEffect(() => {
    const params = {
      token,
    };
    dispatch(getGameLogs(params));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="game-logs">
      <Bar options={options} data={gameLogsData} />
    </div>
  );
};

export default GameLogs;