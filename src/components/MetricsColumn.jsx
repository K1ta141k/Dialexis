import MetricsTab from './MetricsTab';
import '../styles/components/MetricsColumn.css';

const MetricsColumn = ({ apiResponse, className = '' }) => {
  // Helper function to format points as a list
  const formatPoints = (points) => {
    if (!points || points.length === 0) {
      return 'No points to display.';
    }
    return points.map((point, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`point-${point.substring(0, 20).replace(/\s+/g, '-')}-${index}`} className="point-item">
        • {point}
      </div>
    ));
  };

  return (
    <div className={`metrics-column ${className}`}>
      <MetricsTab title="Metrics" apiResponse={apiResponse} />
      <div className="metrics-container">
        <div className="metric-row top-row">
          <h3 className="metric-title spot-on-title">
            <span className="pulsating-circle"></span>
            Spot on!
          </h3>
          <div className="metric-content">
            {apiResponse ? formatPoints(apiResponse.correct_points) : 'Loading...'}
          </div>
        </div>
        <div className="metric-row middle-row">
          <h3 className="metric-title not-found-title">
            <span className="pulsating-circle orange"></span>
            Nowhere to be found...
          </h3>
          <div className="metric-content">
            {apiResponse ? formatPoints(apiResponse.missed_points) : 'Loading...'}
          </div>
        </div>
        <div className="metric-row bottom-row">
          <h3 className="metric-title not-quite-title">
            <span className="pulsating-circle red"></span>
            Not quite :/
          </h3>
          <div className="metric-content">
            {apiResponse ? formatPoints(apiResponse.wrong_points) : 'Loading...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsColumn;
