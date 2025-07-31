import { useState } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import ReadingSpeedTest from './components/ReadingSpeedTest';
import { APP_CONFIG } from './constants';
import './styles/components/App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedReading, setHasStartedReading] = useState(false);
  const [caretSpeed, setCaretSpeed] = useState(APP_CONFIG.DEFAULT_CARET_SPEED);
  const [showCaret, setShowCaret] = useState(false);

  const handlePlayPauseClick = () => {
    if (!hasStartedReading && !isPlaying) {
      setHasStartedReading(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestartClick = () => {
    setIsPlaying(false);
    setHasStartedReading(false);
  };

  const handleViewResults = () => {
    // Handle view results functionality
  };

  const handleSpeedChange = (newSpeed) => {
    setCaretSpeed(newSpeed);
  };

  const handleCaretToggle = () => {
    setShowCaret(!showCaret);
  };

  const handleSummarySubmit = () => {
    // Handle summary submission here
  };

  return (
    <Background>
      <div className="App">
        {/* Grid Container */}
        <div className="grid-container">

          {/* Row 1: Header */}
          <Header />

          {/* Row 2: Main Content */}
          <MainContent>
            <ReadingSpeedTest
              isPlaying={isPlaying}
              hasStartedReading={hasStartedReading}
              onPlayPauseClick={handlePlayPauseClick}
              onRestartClick={handleRestartClick}
              onViewResults={handleViewResults}
              onSummarySubmit={handleSummarySubmit}
              caretSpeed={caretSpeed}
              onSpeedChange={handleSpeedChange}
              showCaret={showCaret}
              onCaretToggle={handleCaretToggle}
            />
          </MainContent>

          {/* Row 3: Footer */}
          <Footer />

        </div>
      </div>
    </Background>
  );
}

export default App;
