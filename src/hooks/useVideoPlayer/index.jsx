import { useState, useEffect } from 'react';

const useVideoPlayer = (videoElement) => {
    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        progress: 0,
        speed: 1,
        isMuted: false,
    });

    const togglePlay = () => {
        console.log('togglePlay', togglePlay);
        setPlayerState({
            ...playerState,
            isPlaying: !playerState.isPlaying,
        })
    };

    useEffect(() => {
        playerState.isPlaying
            ? videoElement.current.play()
            : videoElement.current.pause();
    }, [playerState.isPlaying, videoElement]);

    const handleOnTimeUpdate = () => {
        console.log('handleOnTimeUpdate', handleOnTimeUpdate);
        const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
        setPlayerState({
            ...playerState,
            progress,
        });
    };

    const handleVideoProgress = (event) => {
        console.log('handleVideoProgress', handleVideoProgress);

        const manualChange = Number(event.target.value);
        videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
        setPlayerState({
            ...playerState,
            progress: manualChange,
        });
    };

    const handleVideoSpeed = (event) => {
        console.log('handleVideoSpeed', handleVideoSpeed);

        const speed = Number(event.target.value);
        videoElement.current.playbackRate = speed;
        setPlayerState({
            ...playerState,
            speed,
        });
    };

    const toggleMute = () => {
        console.log('toggleMute', toggleMute);

        setPlayerState({
            ...playerState,
            isMuted: !playerState.isMuted,
        });
    };

    useEffect(() => {
        playerState.isMuted
            ? (videoElement.current.muted = true)
            : (videoElement.current.muted = false)
    }, [playerState.isMuted, videoElement]);

    return {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
    }
};

export default useVideoPlayer;