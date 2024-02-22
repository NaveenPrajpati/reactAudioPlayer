import { useState, useEffect, useRef, useCallback } from "react";

// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";

import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";

const Controls = ({
  audioRef,
  // progressBarRef,
  // duration,
  // setTimeProgress,
  setVolume,
  volume,
  playlist,
  currentTrackIndex,
  setCurrentTrackIndex,
  handleTrackEnded,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const playesong = () => {
    setTimeout(() => {
      audioRef.current?.play();
    }, 200);
  };
  const playAnimationRef = useRef();

  // const repeat = useCallback(() => {
  //   const currentTime = audioRef.current.currentTime;
  //   setTimeProgress(currentTime);
  //   progressBarRef.current.value = currentTime;
  //   progressBarRef.current.style.setProperty(
  //     "--range-progress",
  //     `${(progressBarRef.current.value / duration) * 100}%`
  //   );

  //   playAnimationRef.current = requestAnimationFrame(repeat);
  // }, [audioRef, duration, progressBarRef, setTimeProgress]);

  // useEffect(() => {
  //   if (isPlaying) {
  //     audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //   }
  //   playAnimationRef.current = requestAnimationFrame(repeat);
  // }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const getPreviousTrackIndex = () => {
    return (currentTrackIndex - 1 + playlist.length) % playlist.length;
  };

  const handlePrevious = () => {
    const previousTrackIndex = getPreviousTrackIndex();
    setCurrentTrackIndex(previousTrackIndex);
    playesong();
  };

  // useEffect(() => {
  //   if (audioRef) {
  //     audioRef.current.volume = volume / 100;
  //     audioRef.current.muted = muteVolume;
  //   }
  // }, [volume, audioRef, muteVolume]);

  const handleVolumeChange = (e) => {
    if (!audioRef.current) return;
    audioRef.current.volume = e.currentTarget.valueAsNumber;
    setVolume(e.currentTarget.valueAsNumber);
  };
  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>
        <button onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>
        <button onClick={handleTrackEnded}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
      <div className="volume">
        <button
          onClick={() => {
            setMuteVolume((prev) => !prev);
          }}
        >
          {muteVolume || volume < 0.01 ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
        </button>
        <input
          type="range"
          min={0}
          step={0.05}
          max={1}
          value={volume}
          onChange={handleVolumeChange}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Controls;
