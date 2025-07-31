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

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestartClick = () => {
    setIsPlaying(false);
    // Add any additional restart logic here
  };

  const handleViewResults = () => {
    // Handle view results functionality
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
              onPlayPauseClick={handlePlayPauseClick}
              onRestartClick={handleRestartClick}
              onViewResults={handleViewResults}
              caretSpeed={APP_CONFIG.DEFAULT_CARET_SPEED}
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
