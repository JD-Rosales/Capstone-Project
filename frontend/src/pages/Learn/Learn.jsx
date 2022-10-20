import "./Learn.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Grid2 from "@mui/material/Unstable_Grid2";
import learn_illustration from "../../assets/edit_profile.png"; //needs to change
import Carousel from "react-material-ui-carousel";
import {
  Button,
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";

const carouselStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const cardStyle = {
  width: 220,
  borderRadius: 5,
  backgroundColor: "var(--navyBlue)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
};

const CardContentStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 20px",
};

const Learn = () => {
  return (
    <div className="learn">
      <Sidebar />

      <main>
        <header>
          <Grid2 container spacing={0}>
            <Grid2
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>
                LEARN <br /> <span>ASL</span>
              </h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
                nulla tempora tempore? Modi consectetur perspiciatis ipsum,
                perferendis minima vitae aliquid!
              </p>
            </Grid2>
            <Grid2
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={learn_illustration} alt="Edit Profile Logo" />
            </Grid2>
          </Grid2>
        </header>

        <div className="carousel-container">
          <Carousel
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            fullHeightHover={false}
            animation="slide"
            height={300}
          >
            {/* Carousel Item 1 */}
            <Box sx={carouselStyle}>
              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      1
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      2
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      3
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      4
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}
            </Box>
            {/* End Carousel Item 1 */}

            {/* Carousel Item 2 */}
            <Box sx={carouselStyle}>
              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      5
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      6
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      7
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      8
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}
            </Box>
            {/* Carousel Item 2 */}

            {/* Carousel Item 3 */}

            <Box sx={carouselStyle}>
              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      9
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      10
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      11
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}

              {/* Start Card */}
              <Card sx={cardStyle}>
                <CardContent sx={CardContentStyle}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    LESSON
                  </Typography>

                  <Avatar
                    sx={{
                      bgcolor: "var(--aquaGreen)",
                      width: 80,
                      height: 80,
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      12
                    </Typography>
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      textAlign: "center",
                      color: "#fff",
                      lineHeight: "1rem",
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--aquaGreen)",
                      marginBottom: "10px",
                      width: 120,
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
              {/* End Card */}
            </Box>
            {/* Carousel Item 3 */}
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default Learn;
