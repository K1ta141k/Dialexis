
import Caret from './Caret';
import ReadingOverlay from './ReadingOverlay';
import SummaryInputOverlay from './SummaryInputOverlay';
import { APP_CONFIG } from '../constants';
import '../styles/components/ReadingContent.css';

const ReadingContent = ({
  text,
  isPlaying,
  hasStartedReading,
  caretSpeed = APP_CONFIG.DEFAULT_CARET_SPEED,
  onSummarySubmit,
  showCaret,
  isLoading = false,
  className = '',
}) => {
  const displayText = text || APP_CONFIG.DEFAULT_TEXT;

  const handleSummarySubmit = (summary) => {
    if (onSummarySubmit) {
      onSummarySubmit(summary);
    }
  };

  return (
    <div className={`reading-content-row ${className}`}>
      <div className="reading-text">
        {isLoading ? (
          <div className="loading-text">
            <div className="loading-spinner"></div>
            <p>Loading random text...</p>
          </div>
        ) : (
          <>
            {isPlaying && showCaret ? (
              <Caret
                isPlaying={isPlaying}
                text={displayText}
                speed={caretSpeed}
                caretColor="var(--accent-color)"
                caretWidth={APP_CONFIG.DEFAULT_CARET_WIDTH}
                caretHeight={APP_CONFIG.DEFAULT_CARET_HEIGHT}
              />
            ) : (
              displayText
            )}
            <ReadingOverlay isPlaying={hasStartedReading} />
            <SummaryInputOverlay
              isVisible={!isPlaying && hasStartedReading}
              onSubmit={handleSummarySubmit}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ReadingContent;
