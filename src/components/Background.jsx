import React from 'react';
import BackgroundPattern from './BackgroundPattern';
import ContentWrapper from './ContentWrapper';
import '../styles/components/Background.css';

const Background = ({ children, className = '' }) => {
  return (
    <div className={`background-container ${className}`}>
      {/* Background pattern */}
      <BackgroundPattern />
      
      {/* Content wrapper */}
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </div>
  );
};

export default Background; 