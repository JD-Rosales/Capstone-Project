import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightNav from "../../components/RightNav/RightNav";
import Camera from "react-webcam";
import { useRef, useState, useEffect } from "react";
import * as handPose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import * as fingerpose from "fingerpose";
import { drawHand } from "../../util/Drawing";
import GameLoader from "../../components/GameLoader/GameLoader";

import { a } from "../../asl/A";
import { b } from "../../asl/B";
import { c } from "../../asl/C";
import { d } from "../../asl/D";
import { e } from "../../asl/E";
import { f } from "../../asl/F";
import { g } from "../../asl/G";
import { h } from "../../asl/H";
import { i } from "../../asl/I";
import { j } from "../../asl/J";
import { k } from "../../asl/K";
import { l } from "../../asl/L";
import { m } from "../../asl/M";
import { n } from "../../asl/N";
import { o } from "../../asl/O";
import { p } from "../../asl/P";
import { q } from "../../asl/Q";
import { r } from "../../asl/R";
import { s } from "../../asl/S";
//T asl
import { u } from "../../asl/U";
import { v } from "../../asl/V";
import { w } from "../../asl/W";
import { x } from "../../asl/X";
import { y } from "../../asl/Y";
//z asl

const Home = () => {
  const asl = [
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k,
    l,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    u,
    v,
    w,
    x,
    y,
  ];

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const [handsign, setHandsign] = useState("");
  const [gestureConfidence, setGestureConfidence] = useState(null);
  const [cameraEnable, setCameraEnable] = useState(false);
  const [loading, setloading] = useState(true);

  let hasHand = 0;

  //check Camera permission
  const checkCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraEnable(true);

      //if video feed is available start hand detection
      startDetection();
    } catch (error) {
      setCameraEnable(false);
      alert("Cannot access camera!");
    }
  };

  const detectHand = async (model) => {
    if (
      cameraRef.current !== null &&
      cameraRef.current.video.readyState === 4
    ) {
      const video = cameraRef.current.video;
      const videoHeight = cameraRef.current.video.videoHeight;
      const videoWidth = cameraRef.current.video.videoWidth;

      cameraRef.current.video.width = videoWidth;
      cameraRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await model.estimateHands(video, true);

      if (loading) setloading(false);

      if (hand.length === 0) {
        hasHand++;
      }

      if (hasHand === 20) {
        setHandsign(null);
        setGestureConfidence(null);
        hasHand = 0;
      }

      if (hand.length > 0) {
        const canvas = canvasRef.current.getContext("2d");
        drawHand(hand, canvas);

        const estimateGesture = new fingerpose.GestureEstimator(asl);

        const gesture = await estimateGesture.estimate(hand[0].landmarks, 8.5);
        console.log(gesture.poseData);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const arrConfidence = gesture.gestures.map(
            (confidence) => confidence.score
          );

          const max = Math.max(...arrConfidence);

          const highestConfidence = arrConfidence.indexOf(max);
          // console.log(gesture.gestures[highestConfidence].name)

          setHandsign(gesture.gestures[highestConfidence].name);
          setGestureConfidence(
            gesture.gestures[highestConfidence].score.toFixed(2) * 10 + "%"
          );
        }
      }
    }
  };

  async function startDetection() {
    const model = await handPose.load();

    setInterval(() => {
      detectHand(model);
    }, 100);
  }

  useEffect(() => {
    return () => {
      checkCamera();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home">
      <Sidebar isAdmin="false" />

      <div className="main">
        <div className="top">
          <span>
            Web Camera:
            <span onClick={checkCamera}>
              {" "}
              {cameraEnable ? `Enabled` : `Disable`}
            </span>
          </span>

          <br />
          <span>
            Gesture Confidence: <span>{gestureConfidence}</span>
          </span>
        </div>

        <div className="camera-container">
          <Camera
            className="camera"
            ref={cameraRef}
            mirrored={true}
            style={{
              height: "100%",
              width: "100%",
            }}
          />

          <canvas
            className="canvas"
            ref={canvasRef}
            style={{
              height: "100%",
              width: "100%",
            }}
          />

          {loading ? <GameLoader /> : ""}
        </div>

        <div className="bottom">
          <span>Translation:</span>

          <span>{handsign}</span>

          <span>To acquire a text translation, do any ASL handsign</span>
        </div>
      </div>

      <RightNav
        header="SIGN LANUAGE"
        coloredText="TO TEXT TRANSLATOR"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc quis massa a nunc finibus sollicitudin mollis eu nunc. Nullam lorem diam, fringilla pellentesque sodales ac, aliquam at ex. Nam vitae placerat risus, a ultricies ex. Nulla sagittis ut urna ac viverra. Vestibulum condimentum, leo placerat blandit consectetur, magna nisi porta lorem, a sagittis ex justo nec felis."
      />
    </div>
  );
};

export default Home;
