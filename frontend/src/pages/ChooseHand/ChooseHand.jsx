import "./ChooseHand.css";
import Sidebar from "../../components/Sidebar/Sidebar";
// import { useState, useEffect, useRef } from "react";
// import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
import choose_hand from "../../assets/choose_hand_illustration.png";
import left_hand from "../../assets/left_hand.png";
import right_hand from "../../assets/right_hand.png";
import default_hand from "../../assets/default_hand.png";

const ChooseHand = () => {
  return (
    <div className="choose-hand">
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
                Choose <br /> <span>Hand</span>
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate nam, totam minus atque eaque quo iste fugit veritatis
                impedit, repellat, nemo aperiam similique vel assumenda
                perspiciatis omnis. Obcaecati nulla commodi dicta itaque laborum
                consectetur?
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
              <img src={choose_hand} alt="Choose hand Logo" />
            </Grid2>
          </Grid2>
        </header>
        <div className="hand-container">
          <div className="choices-container">
            <span>
              Left
              <span> Hand</span>
            </span>
            <img src={left_hand} alt="Left hand illustration" />
          </div>

          <div className="choices-container">
            <span>
              Right
              <span> Hand</span>
            </span>
            <img src={right_hand} alt="Right hand illustration" />
          </div>

          <div className="choices-container">
            <span>
              Default
              <span> Hand</span>
            </span>
            <img src={default_hand} alt="Default hand illustration" />
          </div>
        </div>

        <hr />

        <Grid2
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            // onClick={}
            variant="contained"
            sx={{
              background: "var(--backgroundColor)",
              boxShadow: "none",
              color: "#F0F0F0",
              height: 40,
              mt: 2,
              mr: 1,
              width: "150px",
              borderRadius: "20px",
              fontSize: "14px",
            }}
          >
            Cancel
          </Button>

          <LoadingButton
            // onClick={submit}
            loading={false}
            variant="contained"
            loadingIndicator={
              <CircularProgress size="1.5em" sx={{ color: "#182240" }} />
            }
            sx={{
              background: "#42C9A3",
              color: "#F0F0F0",
              height: 40,
              mt: 2,
              width: "150px",
              borderRadius: "20px",
              fontSize: "14px",
            }}
          >
            Update
          </LoadingButton>
        </Grid2>
      </main>
    </div>
  );
};

export default ChooseHand;
