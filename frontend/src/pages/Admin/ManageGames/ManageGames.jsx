import "./ManageGames.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Carousel from "react-material-ui-carousel";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import illustration2 from "../../../assets/illustration2.png";
import fingerSpell_illustration from "../../../assets/fingerSpell_illustration.png";
import spellHandSign_illustration from "../../../assets/spellHandSign_illustration.png";
import fourpics1word_illustration from "../../../assets/fourpics1word_illustration.png";

const btnStyle = {
  backgroundColor: "var(--aquaGreen)",
};

const ManageGames = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-manage-games">
      <Sidebar />

      <header>
        <Grid2
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid2 xs={6}>
            <h1>
              MANAGE <span>GAMES</span>
            </h1>

            <p style={{ marginTop: "10px" }}>
              Ensure that the games are well-maintained in order to improve the
              gaming experience of the users.
            </p>
          </Grid2>

          <Grid2 xs={6} textAlign="center">
            <img src={illustration2} alt="Illustration 2" />
          </Grid2>
        </Grid2>
      </header>

      <main>
        <Carousel
          autoPlay={true}
          interval={3000}
          stopAutoPlayOnHover={true}
          navButtonsAlwaysVisible={true}
          fullHeightHover={true}
          animation="slide"
          height={380}
          indicatorIconButtonProps={{
            style: {
              color: "#f0f0f0",
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "var(--aquaGreen)",
            },
          }}
        >
          {/* Carousel Item 1 */}
          <Paper
            elevation={2}
            sx={{ height: "100%", backgroundColor: "var(--navyBlue)" }}
          >
            <Grid2 container spacing={3} sx={{ height: "100%" }}>
              <Grid2
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  height={200}
                  src={fingerSpell_illustration}
                  alt="Finger Spell the Word"
                />
              </Grid2>

              <Grid2
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 40px",
                }}
              >
                <h2>
                  <span>FINGER SPELL</span> THE WORD
                </h2>

                <p>
                  Words will appear on the screen, and the learner will sign
                  each letter in the word.
                  <br />
                  <br />
                  <i>
                    <span style={{ color: "var(--aquaGreen)" }}>Note:</span> The
                    learner’s camera must be turned on.
                  </i>
                </p>

                <Button
                  onClick={() => navigate("/manage-fingerspell")}
                  variant="contained"
                  size="large"
                  sx={btnStyle}
                >
                  MANAGE
                </Button>
              </Grid2>
            </Grid2>
          </Paper>
          {/* End Carousel Item 1 */}

          {/* Carousel Item 2 */}
          <Paper
            elevation={2}
            sx={{ height: "100%", backgroundColor: "var(--navyBlue)" }}
          >
            <Grid2 container spacing={3} sx={{ height: "100%" }}>
              <Grid2
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  height={200}
                  src={spellHandSign_illustration}
                  alt="Spell the Hand Sign"
                />
              </Grid2>

              <Grid2
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 40px",
                }}
              >
                <h2>
                  <span>SPELL THE</span> HAND SIGN
                </h2>

                <p>
                  There are hand-signed words flashed in the screen. The
                  learner’s goal is to deduce the word by typing in the box
                  provided below.
                </p>

                <Button
                  onClick={() => navigate("/manage-spellhandsign")}
                  variant="contained"
                  size="large"
                  sx={btnStyle}
                >
                  MANAGE
                </Button>
              </Grid2>
            </Grid2>
          </Paper>
          {/* End Carousel Item 2 */}

          {/* Carousel Item 3 */}
          <Paper
            elevation={2}
            sx={{ height: "100%", backgroundColor: "var(--navyBlue)" }}
          >
            <Grid2 container spacing={3} sx={{ height: "100%" }}>
              <Grid2
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  height={200}
                  src={fourpics1word_illustration}
                  alt="4 Pic 1 Word"
                />
              </Grid2>

              <Grid2
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 40px",
                }}
              >
                <h2>
                  <span>4 PIC</span> 1 WORD
                </h2>

                <p>
                  This game displays four different images linked by a single
                  word. The learner’s goal is to deduce the word from a set of
                  letters provided below the pictures.
                  <br />
                  <br />
                  <i>
                    <span style={{ color: "var(--aquaGreen)" }}>Twist:</span>{" "}
                    The set of letters that can be seen below the pictures are
                    hand-signed alphabets using American Sign Language (ASL).
                  </i>
                </p>

                <Button
                  onClick={() => navigate("/manage-4-pic-1-word")}
                  variant="contained"
                  size="large"
                  sx={btnStyle}
                >
                  MANAGE
                </Button>
              </Grid2>
            </Grid2>
          </Paper>
          {/* End Carousel Item 3 */}
        </Carousel>
      </main>
    </div>
  );
};

export default ManageGames;
