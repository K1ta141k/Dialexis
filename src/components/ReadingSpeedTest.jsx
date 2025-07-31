
import Timer from './Timer';
import ReadingTestTitle from './ReadingTestTitle';
import ReadingContent from './ReadingContent';
import ResultsRow from './ResultsRow';
import '../styles/components/ReadingSpeedTest.css';

const ReadingSpeedTest = ({ isPlaying, onPlayPauseClick, onRestartClick, onViewResults, caretSpeed = 200, className = '' }) => {
  return (
    <div className={`reading-speed-test ${className}`}>
      {/* Row 1: Reading Speed Test Title */}
      <ReadingTestTitle />

      {/* Row 2: Timer */}
      <Timer
        isPlaying={isPlaying}
        onPlayPauseClick={onPlayPauseClick}
        onRestartClick={onRestartClick}
      />

      {/* Row 3: Reading Content */}
      <ReadingContent isPlaying={isPlaying} caretSpeed={caretSpeed} />

      {/* Row 4: Results Row */}
      <ResultsRow onViewResults={onViewResults} />
    </div>
  );
};

export default ReadingSpeedTest;
