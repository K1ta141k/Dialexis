import { useState, useMemo, useCallback } from 'react';
import { SLIDER_CONFIG, COMPONENT_NAMES } from '../constants';
import '../styles/components/Slider.css';

const Slider = ({
  value = SLIDER_CONFIG.DEFAULT_VALUE,
  min = SLIDER_CONFIG.MIN_VALUE,
  max = SLIDER_CONFIG.MAX_VALUE,
  step = SLIDER_CONFIG.STEP_VALUE,
  onChange,
  className = '',
}) => {
  const [sliderValue, setSliderValue] = useState(value);

  // Calculate WPM from pixels per second
  const calculateWPM = useCallback((pixelsPerSecond) => {
    const charsPerSecond = pixelsPerSecond / SLIDER_CONFIG.AVG_CHAR_WIDTH;
    return Math.round((charsPerSecond * SLIDER_CONFIG.SECONDS_PER_MINUTE) / SLIDER_CONFIG.AVG_WORD_LENGTH);
  }, []);

  const currentWPM = useMemo(() => calculateWPM(sliderValue), [sliderValue, calculateWPM]);

  const handleChange = useCallback((e) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  }, [onChange]);

  return (
    <div className={`slider-container ${className}`}>
      <div className="speed-label">{COMPONENT_NAMES.READING_SPEED_LABEL}</div>
      <div className="slider-row">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleChange}
          className="speed-slider"
          aria-label={COMPONENT_NAMES.SPEED_SLIDER_ARIA_LABEL}
        />
        <div className="wpm-value">{currentWPM}{COMPONENT_NAMES.WPM_SUFFIX}</div>
      </div>
    </div>
  );
};

export default Slider;
