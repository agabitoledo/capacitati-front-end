import React, { useRef } from 'react';
import styled from 'styled-components';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlay, faVolumeUp, faPause, faVolumeXmark, faUpRightAndDownLeftFromCenter} from "@fortawesome/free-solid-svg-icons";

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
    max-width: 500px;
    flex-wrap: wrap;
    background: rgba(255, 255, 255, 0.25);
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
    -webkit-appearance: none !important;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    height: 4px;
    width: 350px;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    cursor: pointer;
    height: 6px;
  }
  
  input[type="range"]::-moz-range-progress {
    background: white;
  }
  
  .velocity {
    appearance: none;
    background: none;
    color: #1bda4e;
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
    color: #e42222;
    font-size: 20px;
  }
`

const VideoPlayer = (props) => {
  const videoElement = useRef(null);
  const wrapper = useRef(null);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  } = useVideoPlayer(videoElement);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    }
    if (wrapper.current.requestFullScreen) {
      wrapper.current.requestFullScreen();
    } else if (wrapper.current.msRequestFullScreen) {
        wrapper.current.msRequestFullScreen();
    } else if (wrapper.current.mozRequestFullScreen) {
        wrapper.current.mozRequestFullScreen();
    } else if (wrapper.current.webkitRequestFullScreen) {
        wrapper.current.webkitRequestFullScreen();
    }
}


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

          <button className="mute-btn" onClick={toggleFullscreen}>
            AA
            <FontAwesomeIcon className="control-buttons" icon={faUpRightAndDownLeftFromCenter} />
          </button>
        </div>
      </div>
    </ContainerVideoPlayer>
  );
}

export default VideoPlayer;