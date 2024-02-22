import React, { useState, useEffect, useRef } from "react";
import { loadPlaylistFromIndexedDB, savePlaylistToIndexedDB } from "./db";
import "./App.css";
import "./styles/progressbar.css";
import TrackList from "./components/TrackList";
import ProgressBar from "./components/ProgressBar";
import Controls from "./components/Controls";

const App = () => {
  const [playlist, setPlaylist] = useState([""]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [duration, setDuration] = useState(0);
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const storedTrackIndex = localStorage.getItem("currentTrackIndex");
    const storedTime = localStorage.getItem("currentTime");
    if (storedTrackIndex !== null && storedTime !== null) {
      setCurrentTrackIndex(parseInt(storedTrackIndex));
      setCurrrentProgress(parseInt(storedTime));
    }
    setTimeout(() => {
      audioRef.current.currentTime = parseInt(storedTime);
      audioRef.current.play();
    }, 500);
  }, []);

  useEffect(() => {
    loadPlaylistFromIndexedDB(setPlaylist);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      localStorage.setItem("currentTrackIndex", currentTrackIndex);
      localStorage.setItem("currentTime", currrentProgress);
    }
  }, [currentTrackIndex, currrentProgress]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        const newPlaylist = [...playlist, { name: file.name, dataURL }];
        // const newPlaylist = [{ name: file.name, dataURL }];
        setPlaylist(newPlaylist);
        savePlaylistToIndexedDB(newPlaylist);
      };
      reader.readAsDataURL(file);
    });
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  const getNextTrackIndex = () => {
    return (currentTrackIndex + 1) % playlist.length;
  };

  const handleTrackEnded = () => {
    const nextTrackIndex = getNextTrackIndex();
    setCurrentTrackIndex(nextTrackIndex);
    setTimeout(() => {
      audioRef.current.play();
    }, 200);
  };

  return (
    <div className="container">
      <h1 className="heading">Audio Player</h1>
      <input
        type="file"
        accept=".mp3"
        onChange={handleFileChange}
        multiple
        className="custom-file-input"
      />
      <TrackList
        playlist={playlist}
        currentTrackIndex={currentTrackIndex}
        setCurrentTrackIndex={setCurrentTrackIndex}
        audioRef={audioRef}
      />
      <ProgressBar
        audioRef={audioRef}
        duration={duration}
        currentProgress={currrentProgress}
        onChange={(e) => {
          if (!audioRef.current) return;
          audioRef.current.currentTime = e.currentTarget.valueAsNumber;
          setCurrrentProgress(e.currentTarget.valueAsNumber);
        }}
      />
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setVolume={setVolume}
        volume={volume}
        audioRef={audioRef}
        handleTrackEnded={handleTrackEnded}
        playlist={playlist}
        setCurrentTrackIndex={setCurrentTrackIndex}
        currentTrackIndex={currentTrackIndex}
      />

      {playlist[currentTrackIndex] && (
        <audio
          ref={audioRef}
          src={
            playlist[currentTrackIndex]
              ? playlist[currentTrackIndex].dataURL
              : ""
          }
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => {
            setCurrrentProgress(e.currentTarget.currentTime);
          }}
          onEnded={handleTrackEnded}
          onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
};

export default App;
