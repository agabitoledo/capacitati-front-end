import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import useVideoPlayer from '../../utils/hooks/useVideoPlayer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faVolumeUp, faPause, faVolumeXmark, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { updateProgress } from '../../services/Courses';

export const ContainerVideoPlayer = styled.div`
video {
    width: 100%;
}
.video-wrapper {
    width: 100%;
    max-width: 700px;
    position: relative;
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-radius: 10px;
  }
  
  .video-wrapper:hover .controls {
    transform: translateY(0%);
  }
  
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: absolute;
    bottom: 30px;
    padding: 14px;
    width: 100%;
    max-width: 80%;
    flex-wrap: wrap;
    background: #f0aebe8b;
    box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    transform: translateY(150%);
    transition: all 0.3s ease-in-out;
  }
  
  .actions button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }
  
  .actions button i {
    //background-color: none;
    color: white;
    font-size: 30px;
  }
  
  input[type="range"] {
    background: #F77896;
    border-radius: 20px;
    height: 4px;
    width: 200px;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    cursor: pointer;
    height: 6px;
  }
  
  input[type="range"]::-moz-range-progress {
  }
  
  .velocity {
    appearance: none;
    background: none;
    color: #0e0e0e;
    outline: none;
    border: none;
    text-align: center;
    font-size: 16px;
  }
  
  .mute-btn {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }
  
  .mute-btn i {
    background-color: none;
    font-size: 20px;
  }
`

const VideoPlayer = (props) => {
  const videoElement = useRef(null);
  const wrapper = useRef(null);
  const [isWatched, setIsWatched] = useState(false);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  } = useVideoPlayer(videoElement);

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    if (wrapper.current.requestFullscreen) {
      wrapper.current.requestFullscreen();
    } else if (wrapper.current.msRequestFullscreen) {
      wrapper.current.msRequestFullscreen();
    } else if (wrapper.current.mozRequestFullScreen) {
      wrapper.current.mozRequestFullScreen();
    } else if (wrapper.current.webkitRequestFullscreen) {
      wrapper.current.webkitRequestFullscreen();
    }
  };

  useEffect(() => {
    if (playerState.progress > 5 && isWatched === false) {
      console.log('foivisto')
      setIsWatched(true);
      console.log("isWatched", isWatched);
      updateProgress(props.courseId, props.userId, props.classNumber).then(() => {
        props.handleWatched(props.classNumber)
      });
    }
  }, [playerState.progress, isWatched, props]);

  return (
    <ContainerVideoPlayer>
      <div className="video-wrapper">
        <video
          src={props.videoPath}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
        />
        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <FontAwesomeIcon className="control-buttons" icon={faPlay} />
              ) : (
                <FontAwesomeIcon className="control-buttons" icon={faPause} />
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <select
            className="velocity"
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>

          <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? (
              <FontAwesomeIcon className="control-buttons" icon={faVolumeUp} />
            ) : (
              <FontAwesomeIcon className="control-buttons" icon={faVolumeXmark} />
            )}

          </button>

          <button className="mute-btn" onClick={toggleFullScreen}>
            <FontAwesomeIcon className="control-buttons" icon={faUpRightAndDownLeftFromCenter} />
          </button>
        </div>
      </div>
    </ContainerVideoPlayer>
  );
}

export default VideoPlayer;