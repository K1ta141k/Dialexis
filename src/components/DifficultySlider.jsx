import { useState, useCallback } from 'react';
import '../styles/components/DifficultySlider.css';

const DifficultySlider = ({
  value = 1, // 1 = Easy, 2 = Medium, 3 = Difficult
  onChange,
  className = '',
}) => {
  const [difficultyValue, setDifficultyValue] = useState(value);

  const difficulties = ['Easy', 'Medium', 'Difficult'];

  const difficultyColors = {
    1: 'rgba(34, 197, 94, 0.8)', // green for Easy
    2: 'rgba(249, 115, 22, 0.8)', // orange for Medium
    3: 'rgba(239, 68, 68, 0.8)', // red for Difficult
  };

  const handleChange = useCallback((e) => {
    const newValue = parseInt(e.target.value, 10);
    setDifficultyValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  }, [onChange]);

  const sliderStyle = {
    '--slider-thumb-color': difficultyColors[difficultyValue],
  };

  return (
    <div className={`difficulty-slider-container ${className}`}>
      <div className="difficulty-label">{difficulties[difficultyValue - 1]}</div>
      <div className="difficulty-row">
        <input
          type="range"
          min={1}
          max={3}
          step={1}
          value={difficultyValue}
          onChange={handleChange}
          className="difficulty-slider"
          aria-label="Select difficulty level"
          style={sliderStyle}
        />
      </div>
    </div>
  );
};

export default DifficultySlider;
