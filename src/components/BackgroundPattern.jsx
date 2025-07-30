import React from 'react';
import '../styles/components/BackgroundPattern.css';

const BackgroundPattern = ({ className = '' }) => {
  return (
    <div className={`background-pattern ${className}`}>
      <div 
        className="pattern-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
    </div>
  );
};

export default BackgroundPattern; 