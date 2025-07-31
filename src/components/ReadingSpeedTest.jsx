
import Timer from './Timer';
import ReadingTestTitle from './ReadingTestTitle';
import ReadingContent from './ReadingContent';
import ResultsRow from './ResultsRow';
import { SLIDER_CONFIG } from '../constants';
import '../styles/components/ReadingSpeedTest.css';

const ReadingSpeedTest = ({
  isPlaying,
  hasStartedReading,
  onPlayPauseClick,
  onRestartClick,
  onViewResults,
  onSummarySubmit,
  caretSpeed = SLIDER_CONFIG.DEFAULT_VALUE,
  onSpeedChange,
  showCaret,
  onCaretToggle,
  className = '',
}) => {
  return (
    <div className={`reading-speed-test ${className}`}>
      {/* Row 1: Reading Speed Test Title */}
      <ReadingTestTitle />

      {/* Row 2: Timer */}
      <Timer
        isPlaying={isPlaying}
        onPlayPauseClick={onPlayPauseClick}
        onRestartClick={onRestartClick}
        onSpeedChange={onSpeedChange}
        speed={caretSpeed}
        showCaret={showCaret}
        onCaretToggle={onCaretToggle}
      />

      {/* Row 3: Reading Content */}
      <ReadingContent
        isPlaying={isPlaying}
        hasStartedReading={hasStartedReading}
        caretSpeed={caretSpeed}
        onSummarySubmit={onSummarySubmit}
        showCaret={showCaret}
      />

      {/* Row 4: Results Row */}
      <ResultsRow onViewResults={onViewResults} />
    </div>
  );
};

export default ReadingSpeedTest;
