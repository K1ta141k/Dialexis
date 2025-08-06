import { useState, useEffect } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import ReadingSpeedTest from './components/ReadingSpeedTest';
import ResultsLayout from './components/ResultsLayout';
import { APP_CONFIG } from './constants';
import { AUTH_CONFIG } from './config/auth';
import authService from './services/authService';
import randomTextService from './services/randomTextService';
import randomCodeService from './services/randomCodeService';
import './styles/components/App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedReading, setHasStartedReading] = useState(false);
  const [caretSpeed, setCaretSpeed] = useState(APP_CONFIG.DEFAULT_CARET_SPEED);
  const [showCaret, setShowCaret] = useState(false);
  const [summarySubmitted, setSummarySubmitted] = useState(false);
  const [userSummary, setUserSummary] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedMode, setSelectedMode] = useState('lit'); // 'lit' or 'code'
  const [currentText, setCurrentText] = useState(APP_CONFIG.DEFAULT_TEXT);
  const [currentCode, setCurrentCode] = useState(APP_CONFIG.DEFAULT_CODE);
  const [currentCodeLanguage, setCurrentCodeLanguage] = useState('javascript');
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const [codeDifficulty, setCodeDifficulty] = useState('intermediate');

  // Track the content used for the current summary
  const [summaryText, setSummaryText] = useState(APP_CONFIG.DEFAULT_TEXT);
  const [summaryCode, setSummaryCode] = useState(APP_CONFIG.DEFAULT_CODE);
  const [summaryCodeLanguage, setSummaryCodeLanguage] = useState('javascript');
  const [summaryMode, setSummaryMode] = useState('lit');

  // Track reading session for WPM calculation
  const [readingStartTime, setReadingStartTime] = useState(null);
  const [readingEndTime, setReadingEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [shouldResetTimer, setShouldResetTimer] = useState(false);

  const handlePlayPauseClick = () => {
    if (!hasStartedReading && !isPlaying) {
      setHasStartedReading(true);
      setReadingStartTime(Date.now());
    }
    setIsPlaying(!isPlaying);
  };

  const fetchRandomText = async () => {
    setIsLoadingText(true);
    try {
      const randomText = await randomTextService.getRandomText({
        minLength: 200,
        maxLength: 1000,
      });

      if (randomText) {
        setCurrentText(randomText);
        // eslint-disable-next-line no-console
        console.log('Loaded random text:', randomText);
      } else {
        // Fallback to default text if API fails
        setCurrentText(APP_CONFIG.DEFAULT_TEXT);
        // eslint-disable-next-line no-console
        console.log('Using fallback text:', APP_CONFIG.DEFAULT_TEXT);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching random text:', error);
      setCurrentText(APP_CONFIG.DEFAULT_TEXT);
    } finally {
      setIsLoadingText(false);
    }
  };

  const fetchRandomCode = async () => {
    setIsLoadingCode(true);
    try {
      const randomCode = await randomCodeService.getRandomCode({
        difficulty: codeDifficulty,
      });

      if (randomCode) {
        setCurrentCode(randomCode.code);
        setCurrentCodeLanguage(randomCode.language || 'javascript');
        // eslint-disable-next-line no-console
        console.log('Loaded random code:', randomCode);
      } else {
        // Fallback to default code if API fails
        setCurrentCode(APP_CONFIG.DEFAULT_CODE);
        setCurrentCodeLanguage('javascript');
        // eslint-disable-next-line no-console
        console.log('Using fallback code:', APP_CONFIG.DEFAULT_CODE);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching random code:', error);
      setCurrentCode(APP_CONFIG.DEFAULT_CODE);
    } finally {
      setIsLoadingCode(false);
    }
  };

  const handleRestartClick = () => {
    setIsPlaying(false);
    setHasStartedReading(false);
    setSummarySubmitted(false);
    setUserSummary('');
    setApiResponse(null);
    setReadingStartTime(null);
    setReadingEndTime(null);
    setShouldResetTimer(true);

    // Fetch new random content based on selected mode
    if (selectedMode === 'code') {
      fetchRandomCode();
    } else {
      fetchRandomText();
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setCaretSpeed(newSpeed);
  };

  const handleCaretToggle = () => {
    setShowCaret(!showCaret);
  };

  const handleTimeUpdate = (time) => {
    setElapsedTime(time);
  };

  const handleDifficultyChange = (difficulty) => {
    setCodeDifficulty(difficulty);
    // Fetch new code with the new difficulty if we're in code mode
    if (selectedMode === 'code' && !summarySubmitted) {
      fetchRandomCode();
    }
  };

  // Clear reset flag after timer has been reset
  useEffect(() => {
    if (shouldResetTimer) {
      setShouldResetTimer(false);
    }
  }, [shouldResetTimer]);

  const handleCodeLitChange = (mode) => {
    setSelectedMode(mode);

    // Only fetch new content if we're not in summary view
    if (!summarySubmitted) {
      // Fetch appropriate content based on the selected mode
      if (mode === 'code') {
        fetchRandomCode();
      } else {
        fetchRandomText();
      }
    }
    // eslint-disable-next-line no-console
    console.log('Selected mode:', mode);
  };

  // Fetch random text on component mount
  useEffect(() => {
    fetchRandomText();
  }, []);

  // Calculate WPM based on reading time and text length
  const calculateWPM = () => {
    if (!readingStartTime || !readingEndTime || !summaryText) {
      return 0;
    }

    const readingTimeMinutes = (readingEndTime - readingStartTime) / (1000 * 60);
    const wordCount = summaryText.split(/\s+/).length;
    const wpm = Math.round(wordCount / readingTimeMinutes);

    return wpm > 0 ? wpm : 0;
  };

  const handleSummarySubmit = async (summary) => {
    setUserSummary(summary);
    setSummarySubmitted(true);

    // Set the reading end time when user submits summary
    setReadingEndTime(Date.now());

    // Save the current content and mode for the summary
    setSummaryText(selectedMode === 'code' ? currentCode : currentText);
    setSummaryCode(currentCode);
    setSummaryCodeLanguage(currentCodeLanguage);
    setSummaryMode(selectedMode);

    // Log user credentials
    const currentUser = authService.getCurrentUser();
    const accessToken = authService.getAccessToken();
    const isLoggedIn = authService.isLoggedIn();

    // eslint-disable-next-line no-console
    console.log('=== USER CREDENTIALS ===');
    // eslint-disable-next-line no-console
    console.log('Is Logged In:', isLoggedIn);
    // eslint-disable-next-line no-console
    console.log('Current User:', currentUser);
    // eslint-disable-next-line no-console
    console.log('Access Token:', accessToken ? `${accessToken.substring(0, 20)}...` : 'None');
    // eslint-disable-next-line no-console
    console.log('========================');

    try {
      // Prepare headers with authentication if available
      const headers = {
        'Content-Type': 'application/json',
      };

      // Add authorization header if user is logged in
      if (isLoggedIn && accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/compare-texts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          original_text: selectedMode === 'code' ? currentCode : currentText,
          summary_text: summary,
          reading_mode: 'detailed',
          source: 'web',
          category: 'educational',
          language: 'en',
          difficulty_level: 'medium',
          tags: ['education', 'reading-test'],
          elapsed_time: elapsedTime, // Include elapsed time
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setApiResponse(result);

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
          <Header onLogoClick={handleRestartClick} onCodeLitChange={handleCodeLitChange} />

          {/* Row 2: Main Content */}
          <MainContent>
            {summarySubmitted ? (
              <ResultsLayout
                originalText={summaryText}
                userSummary={userSummary}
                apiResponse={apiResponse}
                selectedMode={summaryMode}
                currentCode={summaryCode}
                currentCodeLanguage={summaryCodeLanguage}
                wpm={calculateWPM()}
              />
            ) : (
              <ReadingSpeedTest
                isPlaying={isPlaying}
                hasStartedReading={hasStartedReading}
                onPlayPauseClick={handlePlayPauseClick}
                onRestartClick={handleRestartClick}
                onSummarySubmit={handleSummarySubmit}
                caretSpeed={caretSpeed}
                onSpeedChange={handleSpeedChange}
                showCaret={showCaret}
                onCaretToggle={handleCaretToggle}
                selectedMode={selectedMode}
                currentText={currentText}
                currentCode={currentCode}
                currentCodeLanguage={currentCodeLanguage}
                isLoadingText={isLoadingText}
                isLoadingCode={isLoadingCode}
                onTimeUpdate={handleTimeUpdate} // Pass the new handler
                shouldReset={shouldResetTimer} // Pass the new prop
                codeDifficulty={codeDifficulty}
                onDifficultyChange={handleDifficultyChange}
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
