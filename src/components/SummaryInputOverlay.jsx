import { useState } from 'react';
import SummaryTextarea from './SummaryTextarea';
import SummarySubmitButton from './SummarySubmitButton';
import { COMPONENT_NAMES } from '../constants';
import '../styles/components/SummaryInputOverlay.css';

const SummaryInputOverlay = ({ isVisible, onSubmit, className = '' }) => {
  const [summary, setSummary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (summary.trim()) {
      onSubmit(summary);
      setSummary('');
    }
  };

  return (
    <div className={`summary-input-overlay ${!isVisible ? 'summary-input-overlay--hidden' : ''} ${className}`}>
      <div className="summary-input-container">
        <form onSubmit={handleSubmit} className="summary-form">
          <div className="textarea-container">
            <SummaryTextarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder={COMPONENT_NAMES.SUMMARY_PLACEHOLDER}
            />
            <div className="submit-button-container">
              <SummarySubmitButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SummaryInputOverlay;
