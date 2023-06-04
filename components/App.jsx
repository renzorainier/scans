import React, { useState, useEffect } from "react";
import MainComponent from "./Main";

const VideoPlayer = () => {
  const [videoFinished, setVideoFinished] = useState(false);

  useEffect(() => {
    const video = document.getElementById("introVideo");
    video.addEventListener("ended", handleVideoEnd);
    video.play().catch((error) => {
      // Handle the error if the video cannot be played
      console.error("Failed to play the video:", error);
    });

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  const handleVideoEnd = () => {
    setVideoFinished(true);
  };

  return (
    <div>
      {!videoFinished && (
        <div className="flex items-center justify-center h-screen ">
          <video id="introVideo" src="/pictures/intro.mp4" autoPlay muted />
        </div>
      )}
      {videoFinished && <MainComponent />}
    </div>
  );
};

export default VideoPlayer;
