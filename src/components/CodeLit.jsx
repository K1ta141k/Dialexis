import { useState } from 'react';
import '../styles/components/CodeLit.css';

const CodeLit = ({ className = '', onSelectionChange }) => {
  const [selectedOption, setSelectedOption] = useState('lit'); // Default to 'lit'

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (onSelectionChange) {
      onSelectionChange(option);
    }
  };

  const handleKeyDown = (event, option) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOptionClick(option);
    }
  };

  return (
    <div className={`code-lit-pill ${className}`}>
      <button
        type="button"
        className={`pill-side left-side ${selectedOption === 'lit' ? 'selected' : ''}`}
        onClick={() => handleOptionClick('lit')}
        onKeyDown={(e) => handleKeyDown(e, 'lit')}
        aria-pressed={selectedOption === 'lit'}
        aria-label="Select Lit mode"
      >
        <span className="pill-text">Lit</span>
      </button>



      <button
        type="button"
        className={`pill-side right-side ${selectedOption === 'code' ? 'selected' : ''}`}
        onClick={() => handleOptionClick('code')}
        onKeyDown={(e) => handleKeyDown(e, 'code')}
        aria-pressed={selectedOption === 'code'}
        aria-label="Select Code mode"
      >
        <span className="pill-text">Code</span>
      </button>
    </div>
  );
};

export default CodeLit;
