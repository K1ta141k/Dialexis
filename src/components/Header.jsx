import React from 'react';
import Logo from './Logo';
import '../styles/components/Header.css';

const Header = ({ className = '' }) => {
  return (
    <div className={`header-row ${className}`}>
      <Logo />
    </div>
  );
};

export default Header; 