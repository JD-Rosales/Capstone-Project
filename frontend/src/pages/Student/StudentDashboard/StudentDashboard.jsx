import "./StudentDashboard.css";
import student2 from "../../../assets/student2.png";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { facts } from "../../../util/ASLFacts";
import GameLogs from "../../../components/GameLogs/GameLogs";
import Chart from "react-apexcharts";

const TeacherDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const chartOptions = {
    series: [45],
    options: {
      // chart: {
      //   height: 100,
      //   type: "radialBar",
      //   toolbar: {
      //     show: true,
      //   },
      // },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Percent"],
    },
  };
  return (
    <div className="student-dashboard">
      <Sidebar />

      <main>
        <div className="header-container">
          <div className="text-container">
            <h2 style={{ marginTop: "10px" }}>
              DID YOU <span style={{ color: "var(--aquaGreen)" }}>KNOW</span>?
            </h2>
            <Carousel
              autoPlay={true}
              interval={6000}
              stopAutoPlayOnHover={false}
              navButtonsAlwaysVisible={false}
              navButtonsAlwaysInvisible={true}
              indicators={false}
              fullHeightHover={true}
              animation="slide"
              height={130}
            >
              {facts.map((fact) => {
                return <p style={{ fontSize: ".9rem" }}>{fact}</p>;
              })}
            </Carousel>
          </div>

          <div className="img-container">
            {/* <img src={student2} alt="Teacher Logo" /> */}
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="radialBar"
              height={200}
            />
            <h2
              style={{
                color: "var(--aquaGreen)",
                textAlign: "center",
                marginTop: "-45px",
              }}
            >
              Lesson Progress
            </h2>
          </div>
        </div>

        <div className="game-logs-container">
          <GameLogs />
          {/* <div className="enrolled-student-container">
            <h1>
              CURRENT <span>PROGRESS</span>
            </h1>

            <div className="total-student">
              <span>0</span>
            </div>

            <span>Tap to view</span>
          </div>

          <div className="code-lesson">
            <div className="code-container">
              <h1>
                CLASS <span>CODE</span>
              </h1>

              <span>{user.userInfo.classCode}</span>
            </div>

            <div className="total-lessons">
              <h1>
                ASSIGN <span>LESSONS</span>
              </h1>

              <span>6</span>
            </div>
          </div>

          <div className="manage-lesson">
            <h1>
              LEARN <span>ASL</span>
            </h1>

            <p>
              Ensure that you are engaged in your study. Keep track of your
              improvement to maintain motivation.
            </p>

            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: "#42C9A3" }}
            >
              LEARN
            </Button>
          </div> */}
        </div>
      </main>
    </div>
  );
};
export default TeacherDashboard;
