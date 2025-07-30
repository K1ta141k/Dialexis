import React from 'react';
import '../styles/components/MainContent.css';

const MainContent = ({ children, className = '' }) => {
  return (
    <div className={`main-content-row ${className}`}>
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

export default MainContent; 