import '../styles/components/ReadingOverlay.css';

const ReadingOverlay = ({ isPlaying, className = '' }) => {
  return (
    <div
      className={`reading-overlay ${isPlaying ? 'reading-overlay--hidden' : ''} ${className}`}
      aria-hidden={isPlaying}
    >
      <div className="reading-overlay__blur"></div>
    </div>
  );
};

export default ReadingOverlay;
