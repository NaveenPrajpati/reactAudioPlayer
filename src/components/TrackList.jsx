import { useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { MdPlayArrow, MdPause } from "react-icons/md";
const TrackList = ({
  currentTrackIndex,
  setCurrentTrackIndex,
  playlist,
  audioRef,
}) => {
  return (
    <div className="audio-info">
      <div className="audio-image">
        <div className="icon-wrapper">
          <span className="audio-icon">
            <BsMusicNoteBeamed />
          </span>
        </div>
      </div>
      <div className="list">
        {playlist?.map((track, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentTrackIndex(index);
              setTimeout(() => {
                audioRef.current.play();
              }, 500);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              border: "none",
              background: `${index != currentTrackIndex ? "orange" : ""}`,
              borderRadius: `${index != currentTrackIndex ? "" : "5px"}`,
              width: "100%",
              padding: "4px 10px",
            }}
          >
            <p style={{ fontSize: "20px" }}>{index + 1}</p>
            <p className="" style={{ fontSize: "14px" }}>
              {track.name?.substring(0, 30)}
            </p>
            <span>
              {index === currentTrackIndex ? (
                <MdPause size={20} />
              ) : (
                <MdPlayArrow size={20} />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default TrackList;
