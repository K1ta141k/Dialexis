import '../styles/components/WPMTab.css';
import WPMText from './WPMText';
import WPMNumber from './WPMNumber';

const WPMTab = ({ wpm = 0 }) => {
  return (
    <div className="wpm-tab">
      <div className="tab-content">
        <div className="tab-flex-container">
          <WPMText />
          <WPMNumber wpm={wpm} />
        </div>
      </div>
    </div>
  );
};

export default WPMTab;
