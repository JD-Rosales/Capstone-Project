import "./Leaderboard.css";
import leadershipBoard_icon from "../../assets/leadershipBoard_icon.png";
import top1 from "../../assets/top1.png";
import top2 from "../../assets/top2.png";
import top3 from "../../assets/top3.png";
import { Avatar, Typography, Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";

const styles = {
  gridStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function convertRemainingTime(time) {
  const ms = time / 1000;
  const sec = time % 60000;

  const milliseconds = String(ms.toFixed(2).split(".")[1]);
  const seconds = String(sec).replace(milliseconds + "0", "");
  const minutes = Math.floor(ms / 60);

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0") +
    ":" +
    milliseconds
  );
}

const Leaderboard = ({ difficulty, gameType, data, length }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="game-leaderboard">
      <Grid container spacing={0}>
        <Grid item={true} xs={5} sx={styles.gridStyle}>
          <img height={70} src={leadershipBoard_icon} alt="Leadership Board" />
        </Grid>
        <Grid
          item={true}
          xs={7}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ lineHeight: "1.3rem" }}>
            LEADERSHIP <span style={{ color: "var(--aquaGreen)" }}>BOARD</span>
          </h2>
          <p>({difficulty})</p>
        </Grid>
      </Grid>

      <div className="list-container">
        {data.length &&
          data.map((item, i) => {
            if (i === 0) {
              return (
                <Grid
                  container
                  spacing={0}
                  mt={1}
                  key={item._id}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: user._id === item?.user?._id ? "gray" : "",
                  }}
                >
                  <Grid item={true} xs={2} sx={styles.gridStyle}>
                    <img height={25} src={top1} alt="Top 1" />
                  </Grid>

                  <Grid item={true} xs={2} sx={styles.gridStyle}>
                    <Avatar
                      alt="Remy Sharp"
                      src={item.user.userInfo.image}
                      sx={{ width: 45, height: 45 }}
                    />
                  </Grid>

                  <Grid item={true} xs={6} sx={styles.gridStyle}>
                    <Box
                      width={130}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        noWrap={true}
                        sx={{
                          display: "block",
                          fontSize: "15px",
                        }}
                      >
                        {item.user.userInfo.firstName +
                          " " +
                          item.user.userInfo.lastName}
                      </Typography>

                      <Typography
                        noWrap={true}
                        sx={{
                          display: "block",
                          fontSize: "13px",
                          marginTop: "-7px",
                          color: "#fff",
                        }}
                      >
                        Time Left: {convertRemainingTime(item.time)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item={true} xs={2} sx={styles.gridStyle}>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        marginTop: "-7px",
                        backgroundColor: "var(--aquaGreen)",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item.score}
                    </Typography>
                  </Grid>
                </Grid>
              );
            }

            if (i === 1) {
              return (
                <Grid
                  container
                  spacing={0}
                  mt={1}
                  key={item._id}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: user._id === item?.user?._id ? "gray" : "",
                  }}
                >
                  <Grid item={true} xs={2} sx={styles.gridStyle}>
                    <img height={25} src={top2} alt="Top 2" />
                  </Grid>

                  <Grid item={true} xs={2} sx={styles.gridStyle}>
                    <Avatar
                      alt="Remy Sharp"
                      src={item.user.userInfo.image}
                      sx={{ width: 45, height: 45 }}
                    />
                  </Grid>

                  <Grid item={true} xs={6} sx={styles.gridStyle}>
                    <Box
                      width={130}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        noWrap={true}
                        sx={{
                          display: "block",
                          fontSize: "15px",
                        }}
                      >
                        {item.user.userInfo.firstName +
                          " " +
                          item.user.userInfo.lastName}
                      </Typography>

                      <Typography
                        noWrap={true}
                        sx={{
                          display: "block",
                          fontSize: "13px",
                          marginTop: "-7px",
                          color: "#fff",
                        }}
                      >
                        Time Left: {convertRemainingTime(item.time)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item={true} xs={2} sx={styles.gridStyle}>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        marginTop: "-7px",
                        backgroundColor: "var(--aquaGreen)",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item.score}
                    </Typography>
                  </Grid>
                </Grid>
              );
            }

            if (i === 2) {
              return (
                <Grid
                  container
                  spacing={0}
                  mt={1}
                  key={item._id}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: user._id === item?.user?._id ? "gray" : "",
                  }}
                >
                  <Grid item={true} xs={2} sx={styles.gridStyle}>
                    <img height={25} src={top3} alt="Top 3" />
                  </Grid>

                  <Grid item={true} xs={2} sx={styles.gridStyle}>
                    <Avatar
                      alt="Remy Sharp"
                      src={item.user.userInfo.image}
                      sx={{ width: 45, height: 45 }}
                    />
                  </Grid>

                  <Grid item={true} xs={6} sx={styles.gridStyle}>
                    <Box
                      width={130}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        noWrap={true}
                        sx={{
                          display: "block",
                          fontSize: "15px",
                        }}
                      >
                        {item.user.userInfo.firstName +
                          " " +
                          item.user.userInfo.lastName}
                      </Typography>

                      <Typography
                        noWrap={true}
                        sx={{
                          display: "block",
                          fontSize: "13px",
                          marginTop: "-7px",
                          color: "#fff",
                        }}
                      >
                        Time Left: {convertRemainingTime(item.time)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item={true} xs={2} sx={styles.gridStyle}>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        marginTop: "-7px",
                        backgroundColor: "var(--aquaGreen)",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item.score}
                    </Typography>
                  </Grid>
                </Grid>
              );
            }

            return (
              <Grid
                container
                spacing={0}
                mt={1}
                key={item._id}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: user._id === item?.user?._id ? "gray" : "",
                }}
              >
                <Grid item={true} xs={2} sx={styles.gridStyle}>
                  {i + 1}
                </Grid>

                <Grid item={true} xs={2} sx={styles.gridStyle}>
                  <Avatar
                    alt="Remy Sharp"
                    src={item.user.userInfo.image}
                    sx={{ width: 45, height: 45 }}
                  />
                </Grid>

                <Grid item={true} xs={6} sx={styles.gridStyle}>
                  <Box
                    width={130}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      noWrap={true}
                      sx={{
                        display: "block",
                        fontSize: "15px",
                      }}
                    >
                      {item.user.userInfo.firstName +
                        " " +
                        item.user.userInfo.lastName}
                    </Typography>

                    <Typography
                      noWrap={true}
                      sx={{
                        display: "block",
                        fontSize: "13px",
                        marginTop: "-7px",
                        color: "#fff",
                      }}
                    >
                      Time Left: {convertRemainingTime(item.time)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item={true} xs={2} sx={styles.gridStyle}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      marginTop: "-7px",
                      backgroundColor: "var(--aquaGreen)",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.score}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
      </div>
    </div>
  );
};

export default Leaderboard;