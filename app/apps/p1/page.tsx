// app/apps/c2/page.tsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css"; // For popup only
import "./apps1-style.css";
import gamesData from "../../data/games.json"; // Import games data
import CardsList from "../CardsList"; // Adjust the path if needed
import { drawLandmarks } from "@mediapipe/drawing_utils";
import { dUp, dDown, d_LR_Angle, dAttack, dPause, dReload } from "./model1"; // Import the fist detection function
import { NextPage } from "next"; // Import NextPage type
import { Hands, Results } from "@mediapipe/hands"; // Import the types from Mediapipe
import "../loading.css"; // Ensure this path is correct

interface HomePageProps {
  searchParams?: {
    showControlsOnly?: string; // Optional query parameter
  };
}

// C1Page Component
const C1Page: NextPage<HomePageProps> = ({ searchParams }) => {
  const showControlsOnly = searchParams?.showControlsOnly === "true";
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAccuracy, setShowAccuracy] = useState(true);
  const [accuracyText, setAccuracyText] = useState("");
  const [gestureText, setGestureText] = useState("");
  const [showLandmarksOnly, setShowLandmarksOnly] = useState(false);
  const [isModel1Checked, setIsModel1Checked] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const searchParams1 = useSearchParams();
  const shortLink = searchParams1.get("src");
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const game = gamesData.find((game) => game.short === shortLink);

  const toggleFullscreen = () => {
    const elem = mainRef.current;
    if (elem && !document.fullscreenElement) {
      elem.requestFullscreen();
      setIsFullscreen(true);

      const mainElement = document.getElementsByClassName("main")[0]; // Access the first element
      if (mainElement instanceof HTMLElement) {
        // Ensure the element is an HTMLElement
        mainElement.style.height = "100vh"; // Set the height to 100vh
      }
      const horElement = document.getElementsByClassName("horizontal-bar")[0]; // Access the first element
      if (horElement instanceof HTMLElement) {
        // Ensure the element is an HTMLElement
        horElement.style.paddingTop = "10px"; // Set the height to 100vh
      }
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);

      const mainElement = document.getElementsByClassName("main")[0]; // Access the first element
      if (mainElement instanceof HTMLElement) {
        // Ensure the element is an HTMLElement
        mainElement.style.height = "80vh"; // Set the height to 100vh
      }
      const horElement = document.getElementsByClassName("horizontal-bar")[0]; // Access the first element
      if (horElement instanceof HTMLElement) {
        // Ensure the element is an HTMLElement
        horElement.style.paddingTop = "3px"; // Set the height to 100vh
      }
    }
  };

  useEffect(() => {
    let camera: { start: () => void; stop: () => void } | null = null;
    let hands: Hands | null = null;

    const startCamera = async () => {
      setIsProcessing(true);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        mediaStreamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          // Additional logic...
          videoRef.current.onloadedmetadata = async () => {
            if (canvasRef.current && videoRef.current) {
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;

              hands = new Hands({
                locateFile: (file: string) =>
                  `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
              });

              hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
              });

              hands.onResults((results: Results) => {
                if (hands && canvasRef.current && videoRef.current) {
                  const canvasCtx = canvasRef.current.getContext("2d");
                  if (canvasCtx) {
                    canvasCtx.save();
                    canvasCtx.clearRect(
                      0,
                      0,
                      canvasRef.current.width,
                      canvasRef.current.height
                    );

                    // Flip the canvas horizontally
                    canvasCtx.translate(canvasRef.current.width, 0);
                    canvasCtx.scale(-1, 1);

                    if (!showLandmarksOnly) {
                      canvasCtx.drawImage(
                        videoRef.current,
                        0,
                        0,
                        canvasRef.current.width,
                        canvasRef.current.height
                      );
                    }

                    if (results.multiHandLandmarks) {
                      for (const landmarks of results.multiHandLandmarks) {
                        drawLandmarks(canvasCtx, landmarks, {
                          color: "#FF0000",
                          lineWidth: 2,
                          radius: 1.5,
                        });

                        let gestureDetected = "None"; // Default to "None"
                        if (isModel1Checked) {
                          const isUp = dUp(landmarks);
                          const isDown = dDown(landmarks);
                          const isLR = d_LR_Angle(landmarks);
                          const isAttack = dAttack(landmarks);
                          const isPause = dPause(landmarks);
                          const isReload = dReload(landmarks);

                          gestureDetected = isUp
                            ? "Up"
                            : isDown
                            ? "Down"
                            : isLR === "Right"
                            ? "Left" //Right = left because, it is detecting opposite side (mirror mode)
                            : isLR === "Left"
                            ? "Right"
                            : // : isAttack
                            // ? "Attack"
                            isPause
                            ? "Pause"
                            : isReload
                            ? "Restart"
                            : "None";
                        }
                        if (showAccuracy) {
                          const confidenceScore =
                            results.multiHandedness[0]?.score;
                          const confidence =
                            confidenceScore !== undefined
                              ? Math.round(confidenceScore * 100)
                              : 0;
                          setAccuracyText(`Confidence: ${confidence}%`);
                          setGestureText(`Gesture: ${gestureDetected}`);
                        } else {
                          setAccuracyText("");
                          if (isModel1Checked) {
                            console.log(`Gesture: ${gestureDetected}`);
                          }
                        }
                      }

                      if (showAccuracy && !results.multiHandedness.length) {
                        setAccuracyText("Hands Not Detected.");
                        setGestureText("");
                      }
                    }
                    canvasCtx.restore();
                  }
                }
              });

              const CameraUtils = await import("@mediapipe/camera_utils");
              camera = new CameraUtils.Camera(videoRef.current, {
                onFrame: async () => {
                  if (hands && videoRef.current) {
                    await hands.send({ image: videoRef.current });
                  }
                },
                width: 640,
                height: 480,
              });

              camera.start();
            }
          };
        }
      }
      setIsProcessing(false);
    };

    const stopCamera = () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (hands) {
        hands.close();
        hands = null;
      }
      if (camera) {
        camera.stop();
        camera = null;
      }
    };

    if (isCameraOn && game?.isAi) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [
    isCameraOn,
    showAccuracy,
    showLandmarksOnly,
    isModel1Checked,
    showControlsOnly,
  ]);

  return (
    <div className="container">
      <div className="main-wrapper" ref={mainRef}>
        <div className="main">
          <div className="content-wrapper">
            <div style={{ height: "auto%" }}>
              <div>
                <div className="camera-cont">
                  {/* Render controls and camera here */}
                  <div className="controls">
                    <label>
                      <input
                        type="checkbox"
                        checked={isCameraOn}
                        onChange={() => setIsCameraOn((prev) => !prev)}
                        disabled={isProcessing}
                      />
                      On/Off
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={showAccuracy}
                        onChange={() => setShowAccuracy((prev) => !prev)}
                        disabled={!isCameraOn || isProcessing}
                      />
                      Show text
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={showLandmarksOnly}
                        onChange={() => setShowLandmarksOnly((prev) => !prev)}
                        disabled={!isCameraOn || isProcessing}
                      />
                      Video
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={isModel1Checked}
                        onChange={() => setIsModel1Checked((prev) => !prev)}
                        disabled={!isCameraOn || isProcessing}
                      />
                      Gesture
                    </label>
                  </div>

                  {isProcessing && (
                    <p style={{ paddingLeft: "15px", paddingTop: "8px" }}>
                      Processing...
                    </p>
                  )}
                  <div style={{ position: "relative" }} className="camera">
                    {isCameraOn && (
                      <>
                        <div className="p">
                          <div className="progress-container">
                            <div
                              className="progress-ring"
                              style={{
                                borderTop: showLandmarksOnly
                                  ? "5px solid #2B2B2B"
                                  : "5px solid #32CD32",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="line-cont">
                          <div className="cam-contp">
                            <video ref={videoRef} style={{ display: "none" }} />
                            <canvas
                              ref={canvasRef}
                              style={{
                                width: "100vh",
                                height: "75vh",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
                          <div className="line red-line"></div>
                          <div className="line blue-line"></div>

                          {/* For labels */}
                          {showAccuracy && (accuracyText || gestureText) && (
                            <p className="labels1">
                              {accuracyText}
                              {gestureText && (
                                <>
                                  <br />
                                  {gestureText}
                                </>
                              )}
                            </p>
                          )}


                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="horizontal-bar">
            <button onClick={toggleFullscreen} className="fullscreen-btn btn">
              <i
                className={`uil ${
                  isFullscreen ? "uil-expand-arrows" : "uil-focus"
                }`}
              ></i>
            </button>

            <h4>{game?.title}</h4>
          </div>
        </div>
      </div>
      <div className="cards">
        <CardsList />
      </div>
    </div>
  );
};

export default C1Page;
