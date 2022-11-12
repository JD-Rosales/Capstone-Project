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
import { reset, getGameLogs } from "../../features/gameLogs/gameLogsSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Game Trend",
    },
  },
};

const labels = [
  "Fingerspell",
  "Guess The Hand Sign",
  "Spell The Hand Sign",
  "4 Pic 1 Word",
];

const Test = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.gameLogs);

  const gameLogsData = {
    labels,
    datasets: [
      {
        label: "Access Count",
        data: data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
    <div>
      <div style={{ height: "500px", width: "730px" }}>
        <Bar options={options} data={gameLogsData} />;
      </div>
    </div>
  );
};

export default Test;
