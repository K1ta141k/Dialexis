import React from 'react';
import { COMPONENT_NAMES } from '../constants';
import '../styles/components/Logo.css';

const Logo = ({ className = '' }) => {
  return (
    <div className={`logo-container ${className}`}>
      <h1 className="logo-text">{COMPONENT_NAMES.LOGO}</h1>
    </div>
  );
};

export default Logo; 