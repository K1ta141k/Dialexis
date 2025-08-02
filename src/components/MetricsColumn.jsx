import MetricsTab from './MetricsTab';
import '../styles/components/MetricsColumn.css';

const MetricsColumn = ({ className = '' }) => {
  return (
    <div className={`metrics-column ${className}`}>
      <MetricsTab title="Metrics" />
      <div className="metrics-container">
        <div className="metric-row top-row">
          <h3 className="metric-title spot-on-title">
            <span className="pulsating-circle"></span>
            Spot on!
          </h3>
          <div className="metric-content">
            This is a very long piece of text that should test the overflow and word wrapping capabilities of the metric content area. It contains multiple sentences with various lengths to ensure that the text properly wraps to new lines when it reaches the edge of the container. The content should also demonstrate vertical scrolling if it exceeds the available height of the metric row. This paragraph includes words of different lengths, from short ones like &ldquo;a&rdquo; and &ldquo;is&rdquo; to longer words like &ldquo;capabilities&rdquo; and &ldquo;demonstrate&rdquo; to thoroughly test the word wrapping functionality. Additionally, we&apos;re including some technical terms and longer phrases to make sure the overflow handling works correctly with more complex content structures.
          </div>
        </div>
        <div className="metric-row middle-row">
          <h3 className="metric-title not-found-title">
            <span className="pulsating-circle orange"></span>
            Nowhere to be found...
          </h3>
          <div className="metric-content">
            Content for middle row will go here
          </div>
        </div>
        <div className="metric-row bottom-row">
          <h3 className="metric-title not-quite-title">
            <span className="pulsating-circle red"></span>
            Not quite :/
          </h3>
          <div className="metric-content">
            Content for bottom row will go here
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsColumn;
