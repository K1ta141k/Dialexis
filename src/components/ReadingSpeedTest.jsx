
import Timer from './Timer';
import ReadingTestTitle from './ReadingTestTitle';
import ReadingContent from './ReadingContent';
import CodeContent from './CodeContent';
import { SLIDER_CONFIG } from '../constants';
import '../styles/components/ReadingSpeedTest.css';

const ReadingSpeedTest = ({
  isPlaying,
  hasStartedReading,
  onPlayPauseClick,
  onRestartClick,
  onSummarySubmit,
  caretSpeed = SLIDER_CONFIG.DEFAULT_VALUE,
  onSpeedChange,
  showCaret,
  onCaretToggle,
  selectedMode = 'lit',
  currentText,
  currentCode,
  currentCodeLanguage,
  isLoadingText,
  isLoadingCode,
  className = '',
}) => {
  return (
    <div className={`reading-speed-test ${className}`}>
      {/* Row 1: Reading Speed Test Title */}
      <ReadingTestTitle mode={selectedMode} />

      {/* Row 2: Timer */}
      <Timer
        isPlaying={isPlaying}
        onPlayPauseClick={onPlayPauseClick}
        onRestartClick={onRestartClick}
        onSpeedChange={onSpeedChange}
        speed={caretSpeed}
        showCaret={showCaret}
        onCaretToggle={onCaretToggle}
        selectedMode={selectedMode}
      />

      {/* Row 3: Content (Reading or Code) */}
      {selectedMode === 'code' ? (
        <CodeContent
          code={currentCode}
          language={currentCodeLanguage}
          isPlaying={isPlaying}
          hasStartedReading={hasStartedReading}
          onSummarySubmit={onSummarySubmit}
          isLoading={isLoadingCode}
        />
      ) : (
        <ReadingContent
          isPlaying={isPlaying}
          hasStartedReading={hasStartedReading}
          caretSpeed={caretSpeed}
          onSummarySubmit={onSummarySubmit}
          showCaret={showCaret}
          text={currentText}
          isLoading={isLoadingText}
        />
      )}

    </div>
  );
};

export default ReadingSpeedTest;
