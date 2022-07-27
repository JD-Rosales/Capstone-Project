import "./Practice.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightNav from "../../components/RightNav/RightNav";
import { useRef, useState, useEffect } from "react";
import Camera from "react-webcam";
import * as handPose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import * as fingerpose from "fingerpose";
import correct from "../../assets/correct.gif";
import wrong from "../../assets/wrong.gif";
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

import A from "../../assets/asl-img/A.png";
import B from "../../assets/asl-img/B.png";
import C from "../../assets/asl-img/C.png";
import D from "../../assets/asl-img/D.png";
import E from "../../assets/asl-img/E.png";
import F from "../../assets/asl-img/F.png";
import G from "../../assets/asl-img/G.png";
import H from "../../assets/asl-img/H.png";
import I from "../../assets/asl-img/I.png";
import J from "../../assets/asl-img/J.png";
import K from "../../assets/asl-img/K.png";
import L from "../../assets/asl-img/L.png";
import M from "../../assets/asl-img/M.png";
import N from "../../assets/asl-img/N.png";
import O from "../../assets/asl-img/O.png";
import P from "../../assets/asl-img/P.png";
import Q from "../../assets/asl-img/Q.png";
import R from "../../assets/asl-img/R.png";
import S from "../../assets/asl-img/S.png";
import T from "../../assets/asl-img/T.png";
import U from "../../assets/asl-img/U.png";
import V from "../../assets/asl-img/V.png";
import W from "../../assets/asl-img/W.png";
import X from "../../assets/asl-img/X.png";
import Y from "../../assets/asl-img/Y.png";
import Z from "../../assets/asl-img/Z.png";

const Practice = () => {
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

  const [handsign, setHandsign] = useState("");
  const [gestureConfidence, setGestureConfidence] = useState(null);
  const [cameraEnable, setCameraEnable] = useState(false);
  const [letter, setLetter] = useState(null);
  const [aslImg, setAslImg] = useState(null);
  const [gestureMatch, setGestureMatch] = useState(null);
  const [loading, setloading] = useState(true);

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

      const hand = await model.estimateHands(video, true);

      if (loading) setloading(false);

      if (hand.length > 0) {
        const estimateGesture = new fingerpose.GestureEstimator(asl);

        const gesture = await estimateGesture.estimate(hand[0].landmarks, 8.5);

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
    }, 500);
  }

  useEffect(() => {
    return () => {
      checkCamera();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (handsign === letter) {
      setGestureMatch(true);
    } else {
      setGestureMatch(false);
    }
  }, [handsign, letter, gestureMatch]);

  const btnClick = (e, img) => {
    console.log(e.currentTarget.value);
    setLetter(e.currentTarget.value);
    setAslImg(img);
  };

  return (
    <div className="practice">
      <Sidebar />

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
            Gesture Confidence:{" "}
            {gestureMatch ? <span>{gestureConfidence}</span> : ""}
          </span>

          <span>
            ASL <span>Character</span>
          </span>
        </div>

        <div className="container">
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

            {loading ? <GameLoader /> : ""}
          </div>
          <div className="asl-container">
            {letter ? (
              <img className="asl-image" src={aslImg} alt="ASL"></img>
            ) : (
              ""
            )}
          </div>
        </div>

        {letter ? (
          <div className="status-container">
            <span>Gesture Match!</span>
            {gestureMatch ? (
              <img src={correct} alt="correct!"></img>
            ) : (
              <img src={wrong} alt="wrong!"></img>
            )}
          </div>
        ) : (
          ""
        )}

        <span className="text">Click any letter to start</span>

        <div className="btn-container">
          <button type="button" value="A" onClick={(e) => btnClick(e, A)}>
            A
          </button>
          <button type="button" value="B" onClick={(e) => btnClick(e, B)}>
            B
          </button>
          <button type="button" value="C" onClick={(e) => btnClick(e, C)}>
            C
          </button>
          <button type="button" value="D" onClick={(e) => btnClick(e, D)}>
            D
          </button>
          <button type="button" value="E" onClick={(e) => btnClick(e, E)}>
            E
          </button>
          <button type="button" value="F" onClick={(e) => btnClick(e, F)}>
            F
          </button>
          <button type="button" value="G" onClick={(e) => btnClick(e, G)}>
            G
          </button>
          <button type="button" value="H" onClick={(e) => btnClick(e, H)}>
            H
          </button>
          <button type="button" value="I" onClick={(e) => btnClick(e, I)}>
            I
          </button>
          <button type="button" value="J" onClick={(e) => btnClick(e, J)}>
            J
          </button>
          <button type="button" value="K" onClick={(e) => btnClick(e, K)}>
            K
          </button>
          <button type="button" value="L" onClick={(e) => btnClick(e, L)}>
            L
          </button>
          <button type="button" value="M" onClick={(e) => btnClick(e, M)}>
            M
          </button>
          <button type="button" value="N" onClick={(e) => btnClick(e, N)}>
            N
          </button>
          <button type="button" value="O" onClick={(e) => btnClick(e, O)}>
            O
          </button>
          <button type="button" value="P" onClick={(e) => btnClick(e, P)}>
            P
          </button>
          <button type="button" value="Q" onClick={(e) => btnClick(e, Q)}>
            Q
          </button>
          <button type="button" value="R" onClick={(e) => btnClick(e, R)}>
            R
          </button>
          <button type="button" value="S" onClick={(e) => btnClick(e, S)}>
            S
          </button>
          <button type="button" value="T" onClick={(e) => btnClick(e, T)}>
            T
          </button>
          <button type="button" value="U" onClick={(e) => btnClick(e, U)}>
            U
          </button>
          <button type="button" value="V" onClick={(e) => btnClick(e, V)}>
            V
          </button>
          <button type="button" value="W" onClick={(e) => btnClick(e, W)}>
            W
          </button>
          <button type="button" value="X" onClick={(e) => btnClick(e, X)}>
            X
          </button>
          <button type="button" value="Y" onClick={(e) => btnClick(e, Y)}>
            Y
          </button>
          <button type="button" value="Z" onClick={(e) => btnClick(e, Z)}>
            Z
          </button>
        </div>
      </div>

      <RightNav
        coloredText="PRACTICE"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci sit amet aliquet rutrum. Nunc quis massa a nunc finibus sollicitudin mollis eu nunc. Nullam lorem diam, fringilla pellentesque sodales ac, aliquam at ex. Nam vitae placerat risus, a ultricies ex. Nulla sagittis ut urna ac viverra. Vestibulum condimentum, leo placerat blandit consectetur, magna nisi porta lorem, a sagittis ex justo nec felis."
      />
    </div>
  );
};

export default Practice;
