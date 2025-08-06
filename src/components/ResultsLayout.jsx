import TextSummaryColumn from './TextSummaryColumn';
import MetricsColumn from './MetricsColumn';
import { useColumnHeight } from '../hooks';
import '../styles/components/ResultsLayout.css';

const ResultsLayout = ({
  originalText,
  userSummary,
  apiResponse,
  selectedMode = 'lit',
  currentCode = '',
  currentCodeLanguage = 'javascript',
  className = '',
  wpm = 0,
}) => {
  const { textColumnRef } = useColumnHeight();

  return (
    <div className={`results-layout ${className}`}>
      <div className="results-grid">
        <TextSummaryColumn
          ref={textColumnRef}
          originalText={originalText}
          userSummary={userSummary}
          selectedMode={selectedMode}
          currentCode={currentCode}
          currentCodeLanguage={currentCodeLanguage}
          wpm={wpm}
        />
        <MetricsColumn apiResponse={apiResponse} />
      </div>
    </div>
  );
};

export default ResultsLayout;
