import '../styles/components/MetricsTab.css';
import AccuracyText from './AccuracyText';
import AccuracyProgress from './AccuracyProgress';

const MetricsTab = ({ apiResponse }) => {
  // Extract accuracy score from API response
  const accuracyScore = apiResponse?.accuracy_score || 0;

  return (
    <div className="metrics-tab">
      <div className="tab-content">
        <div className="tab-flex-container">
          <AccuracyText />
          <AccuracyProgress percentage={accuracyScore} />
        </div>
      </div>
    </div>
  );
};

export default MetricsTab;
