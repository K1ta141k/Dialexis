import { useState, useEffect, useCallback } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import { TIMER_CONFIG, SLIDER_CONFIG, COMPONENT_NAMES } from '../constants';
import '../styles/components/Timer.css';

const Timer = ({
  isPlaying,
  onPlayPauseClick,
  onRestartClick,
  onSpeedChange,
  speed = SLIDER_CONFIG.DEFAULT_VALUE,
  showCaret,
  onCaretToggle,
  selectedMode = 'lit',
  className = '',
  shouldReset = false,
  onTimeUpdate,
  codeDifficulty = 'intermediate',
  onDifficultyChange,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, TIMER_CONFIG.UPDATE_INTERVAL);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Reset timer when shouldReset is true
  useEffect(() => {
    if (shouldReset) {
      setElapsedTime(0);
    }
  }, [shouldReset]);

  // Notify parent of time updates
  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(elapsedTime);
    }
  }, [elapsedTime, onTimeUpdate]);

  // Format time as MM:SS
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleRestartClick = useCallback(() => {
    onRestartClick();
  }, [onRestartClick]);

  return (
    <div className={`timer-row ${className}`}>
      {/* Timer Controls on the left */}
      <div className="timer-controls-left">
        <TimerControls
          isPlaying={isPlaying}
          onPlayPauseClick={onPlayPauseClick}
          onRestartClick={handleRestartClick}
          onSpeedChange={onSpeedChange}
          speed={speed}
          showCaret={showCaret}
          onCaretToggle={onCaretToggle}
          selectedMode={selectedMode}
          codeDifficulty={codeDifficulty}
          onDifficultyChange={onDifficultyChange}
        />
      </div>

      {/* Timer Display on the right */}
      <div className="timer-display-right">
        <div className="timer-label">{COMPONENT_NAMES.TIME_LABEL}</div>
        <TimerDisplay time={formatTime(elapsedTime)} />
      </div>
    </div>
  );
};

export default Timer;
