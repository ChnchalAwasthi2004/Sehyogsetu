import React, { useRef } from "react";
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
        src="/video/Landingpage_video.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleFinish}
      />
    </div>
  );
}

export default IntroVideo;