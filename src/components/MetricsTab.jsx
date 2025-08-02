import '../styles/components/MetricsTab.css';
import AccuracyText from './AccuracyText';
import AccuracyProgress from './AccuracyProgress';

const MetricsTab = () => {
  return (
    <div className="metrics-tab">
      <div className="tab-content">
        <div className="tab-flex-container">
          <AccuracyText />
          <AccuracyProgress />
        </div>
      </div>
    </div>
  );
};

export default MetricsTab;
