
import Caret from './Caret';
import { APP_CONFIG } from '../constants';
import '../styles/components/ReadingContent.css';

const ReadingContent = ({ text, isPlaying, caretSpeed = APP_CONFIG.DEFAULT_CARET_SPEED, className = '' }) => {
  const displayText = text || APP_CONFIG.DEFAULT_TEXT;

  return (
    <div className={`reading-content-row ${className}`}>
      <div className="reading-text">
        {isPlaying ? (
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
      </div>
    </div>
  );
};

export default ReadingContent;
