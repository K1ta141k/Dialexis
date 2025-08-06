import { useState, useCallback } from 'react';
import '../styles/components/DifficultySlider.css';

const DifficultySlider = ({
  value = 2, // 1 = Beginner, 2 = Intermediate, 3 = Advanced
  onChange,
  className = '',
}) => {
  const [difficultyValue, setDifficultyValue] = useState(value);

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const difficultyValues = ['beginner', 'intermediate', 'advanced'];

  const difficultyColors = {
    1: 'rgba(34, 197, 94, 0.8)', // green for Beginner
    2: 'rgba(249, 115, 22, 0.8)', // orange for Intermediate
    3: 'rgba(239, 68, 68, 0.8)', // red for Advanced
  };

  const handleChange = useCallback((e) => {
    const newValue = parseInt(e.target.value, 10);
    setDifficultyValue(newValue);
    if (onChange) {
      // Return the actual difficulty string value
      onChange(difficultyValues[newValue - 1]);
    }
  }, [onChange, difficultyValues]);

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
