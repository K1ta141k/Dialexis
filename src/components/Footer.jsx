import React from 'react';
import '../styles/components/Footer.css';

const Footer = ({ className = '' }) => {
  return (
    <div className={`footer-row ${className}`}>
      <div className="footer-content">
        © 2024 Dialexis. Reading speed test application.
      </div>
    </div>
  );
};

export default Footer; 