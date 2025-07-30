import React from 'react';
import { COMPONENT_NAMES } from '../constants';
import '../styles/components/ViewResultsButton.css';

const ViewResultsButton = ({ onClick, className = '', children = COMPONENT_NAMES.VIEW_RESULTS }) => {
  return (
    <button className={`view-results-btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default ViewResultsButton; 