import '../styles/components/WPMNumber.css';

const WPMNumber = ({ wpm = 0 }) => {
  return (
    <div className="wpm-number">
      {wpm}
    </div>
  );
};

export default WPMNumber;
