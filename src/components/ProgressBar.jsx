function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time - min * 60);
  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");
  return formatted;
}
const ProgressBar = ({
  audioRef,
  duration,
  currentProgress,

  ...rest
}) => {
  return (
    <div className="progress">
      <span className="time">{formatTime(currentProgress)}</span>
      <input
        type="range"
        // ref={progressBarRef}
        min={0}
        max={duration}
        value={currentProgress}
        {...rest}
      />
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
