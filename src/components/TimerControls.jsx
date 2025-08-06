
import Slider from './Slider';
import CaretBoolean from './CaretBoolean';
import DifficultySlider from './DifficultySlider';
import { useState } from 'react';
import '../styles/components/TimerControls.css';

const TimerControls = ({
  isPlaying,
  onPlayPauseClick,
  onRestartClick,
  onSpeedChange,
  speed = 200,
  showCaret,
  onCaretToggle,
  selectedMode = 'lit',
  className = '',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Python');
  const [difficulty, setDifficulty] = useState(1);

  const languages = ['Python', 'Java', 'C', 'C++'];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    }
  };

  const handleOptionKeyDown = (e, language) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLanguageSelect(language);
    }
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className={`timer-controls ${className}`}>
      {/* Play/Pause Button */}
      <button
        type="button"
        className="timer-icon play-pause-icon"
        onClick={onPlayPauseClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPlayPauseClick();
          }
        }}
        aria-label={isPlaying ? 'Pause timer' : 'Start timer'}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pause-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 play-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
        )}
      </button>

      {/* Restart Button - Always Visible */}
      <button
        type="button"
        className="timer-icon restart-icon"
        onClick={onRestartClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onRestartClick();
          }
        }}
        aria-label="Restart timer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
        </svg>
      </button>

      {/* Code Mode Controls - Only visible in Code mode */}
      {selectedMode === 'code' && (
        <>
          <div className="code-pill-container">
            <div
              className="code-pill"
              onClick={toggleDropdown}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              aria-label={`Select programming language. Currently selected: ${selectedLanguage}`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <span className="code-pill-text">{selectedLanguage}</span>
              <div className={`code-pill-icon ${isDropdownOpen ? 'rotated' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>

            {isDropdownOpen && (
              <div className="code-dropdown" role="listbox" aria-label="Programming language options">
                {languages.map((language) => (
                  <div
                    key={language}
                    className={`dropdown-option ${selectedLanguage === language ? 'selected' : ''}`}
                    onClick={() => handleLanguageSelect(language)}
                    onKeyDown={(e) => handleOptionKeyDown(e, language)}
                    role="option"
                    tabIndex={0}
                    aria-selected={selectedLanguage === language}
                  >
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>

          <DifficultySlider
            value={difficulty}
            onChange={handleDifficultyChange}
          />
        </>
      )}

      {/* Caret Boolean - Only visible in Lit mode */}
      {selectedMode === 'lit' && (
        <CaretBoolean
          isChecked={showCaret}
          onToggle={onCaretToggle}
        />
      )}

      {/* Speed Slider - Only visible when caret is enabled and in Lit mode */}
      {showCaret && selectedMode === 'lit' && (
        <Slider
          value={speed}
          onChange={onSpeedChange}
        />
      )}
    </div>
  );
};

export default TimerControls;
