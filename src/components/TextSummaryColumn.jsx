import { forwardRef } from 'react';
import '../styles/components/TextSummaryColumn.css';

const TextSummaryColumn = forwardRef(({ originalText, userSummary, className = '' }, ref) => {
  return (
    <div ref={ref} className={`text-summary-column ${className}`}>
      <div className="text-summary-container">
        <div className="original-text-section">
          <h3 className="section-title">Original Text</h3>
          <div className="text-content">
            {originalText}
          </div>
        </div>
        <div className="vertical-divider"></div>
        <div className="summary-section">
          <h3 className="section-title">Your Summary</h3>
          <div className="summary-content">
            {userSummary}
          </div>
        </div>
      </div>
    </div>
  );
});

TextSummaryColumn.displayName = 'TextSummaryColumn';

export default TextSummaryColumn;
