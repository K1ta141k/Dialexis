
import '../styles/components/TimerDisplay.css';

const TimerDisplay = ({ time = '00:00', className = '' }) => {
  return (
    <div className={`timer-display ${className}`}>
      {time}
    </div>
  );
};

export default TimerDisplay;
