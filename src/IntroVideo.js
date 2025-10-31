import React, { useRef } from "react";
import introVideo from "./video/Landingpage_video.mp4";
import "./App.css";

function IntroVideo({ onFinish }) {
  const containerRef = useRef(null);

  const handleFinish = () => {
    if (containerRef.current) {
      containerRef.current.classList.add("fade-out");
    }

    setTimeout(() => {
      onFinish();
    }, 500);
  };

  return (
    <div className="video-container" ref={containerRef}>

      <video
        className="intro-video"
        src={introVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleFinish}
      />

      <button className="skip-btn" onClick={handleFinish}>
        Skip
      </button>

    </div>
  );
}

export default IntroVideo;
