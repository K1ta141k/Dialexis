
import ViewResultsButton from './ViewResultsButton';
import '../styles/components/ResultsRow.css';

const ResultsRow = ({ onViewResults, className = '' }) => {
  return (
    <div className={`results-row ${className}`}>
      <div className="results-row-content">
        <div className="results-row-right">
          <ViewResultsButton onClick={onViewResults} />
        </div>
      </div>
    </div>
  );
};

export default ResultsRow;
