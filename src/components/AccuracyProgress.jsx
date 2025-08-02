import '../styles/components/AccuracyProgress.css';

const AccuracyProgress = ({ percentage = 75 }) => {
  // Calculate stroke-dashoffset (lower values show higher progress)
  const strokeDashoffset = 100 - percentage;

  return (
    <div className="accuracy-progress">
      <svg className="progress-ring" width="40" height="40">
        <circle
          className="progress-ring-circle-bg"
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="2"
          fill="transparent"
          r="16"
          cx="20"
          cy="20"
        />
        <circle
          className="progress-ring-circle"
          stroke="rgba(34, 197, 94, 0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="transparent"
          r="16"
          cx="20"
          cy="20"
          style={{
            strokeDasharray: '100.53',
            strokeDashoffset: (100.53 * strokeDashoffset) / 100,
          }}
        />
      </svg>
      <div className="progress-text">
        {percentage}%
      </div>
    </div>
  );
};

export default AccuracyProgress;
