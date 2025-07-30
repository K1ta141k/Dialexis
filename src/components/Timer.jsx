import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import { TIMER_CONFIG } from '../constants';
import '../styles/components/Timer.css';

const Timer = ({ isPlaying, onPlayPauseClick, onRestartClick, className = '' }) => {
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

  // Reset timer when restart is clicked
  useEffect(() => {
    if (!isPlaying) {
      setElapsedTime(0);
    }
  }, [isPlaying]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRestartClick = () => {
    setElapsedTime(0);
    onRestartClick();
  };

  return (
    <div className={`timer-row ${className}`}>
      {/* Timer Controls on the left */}
      <div className="timer-controls-left">
        <TimerControls 
          isPlaying={isPlaying} 
          onPlayPauseClick={onPlayPauseClick}
          onRestartClick={handleRestartClick}
        />
      </div>
      
      {/* Timer Display on the right */}
      <div className="timer-display-right">
        <div className="timer-label">Time: </div>
        <TimerDisplay time={formatTime(elapsedTime)} />
      </div>
    </div>
  );
};

export default Timer; 