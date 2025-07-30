import React from 'react';
import { COMPONENT_NAMES } from '../constants';
import '../styles/components/ReadingTestTitle.css';

const ReadingTestTitle = ({ className = '' }) => {
  return (
    <div className={`reading-test-row ${className}`}>
      <div className="reading-test-title">
        {COMPONENT_NAMES.READING_TEST_TITLE}
      </div>
    </div>
  );
};

export default ReadingTestTitle; 