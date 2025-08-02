import { useState } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import ReadingSpeedTest from './components/ReadingSpeedTest';
import ResultsLayout from './components/ResultsLayout';
import { APP_CONFIG } from './constants';
import './styles/components/App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedReading, setHasStartedReading] = useState(false);
  const [caretSpeed, setCaretSpeed] = useState(APP_CONFIG.DEFAULT_CARET_SPEED);
  const [showCaret, setShowCaret] = useState(false);
  const [summarySubmitted, setSummarySubmitted] = useState(false);
  const [userSummary, setUserSummary] = useState('');

  const handlePlayPauseClick = () => {
    if (!hasStartedReading && !isPlaying) {
      setHasStartedReading(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestartClick = () => {
    setIsPlaying(false);
    setHasStartedReading(false);
    setSummarySubmitted(false);
    setUserSummary('');
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

  const handleSummarySubmit = async (summary) => {
    setUserSummary(summary);
    setSummarySubmitted(true);

    try {
      const response = await fetch('http://localhost:8000/compare-texts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_text: APP_CONFIG.DEFAULT_TEXT,
          summary_text: summary,
          reading_mode: 'detailed',
          source: 'web',
          category: 'educational',
          language: 'en',
          difficulty_level: 'medium',
          tags: ['education', 'reading-test'],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // eslint-disable-next-line no-console
      console.log('API Response:', result);

      // You can also log specific parts of the response
      // eslint-disable-next-line no-console
      console.log('Accuracy Score:', result.accuracy_score);
      // eslint-disable-next-line no-console
      console.log('Correct Points:', result.correct_points);
      // eslint-disable-next-line no-console
      console.log('Missed Points:', result.missed_points);
      // eslint-disable-next-line no-console
      console.log('Wrong Points:', result.wrong_points);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error calling API:', error);
    }
  };

  return (
    <Background>
      <div className="App">
        {/* Grid Container */}
        <div className="grid-container">

          {/* Row 1: Header */}
          <Header onLogoClick={handleRestartClick} />

          {/* Row 2: Main Content */}
          <MainContent>
            {summarySubmitted ? (
              <ResultsLayout
                originalText={APP_CONFIG.DEFAULT_TEXT}
                userSummary={userSummary}
              />
            ) : (
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
            )}
          </MainContent>

          {/* Row 3: Footer */}
          <Footer />

        </div>
      </div>
    </Background>
  );
}

export default App;
