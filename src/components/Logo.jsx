
import { COMPONENT_NAMES } from '../constants';
import '../styles/components/Logo.css';

const Logo = ({ className = '', onLogoClick }) => {
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLogoClick();
    }
  };

  return (
    <button
      className={`logo-container ${className}`}
      onClick={handleLogoClick}
      onKeyDown={handleKeyDown}
      aria-label="Return to homepage"
    >
      <h1 className="logo-text">{COMPONENT_NAMES.LOGO}</h1>
    </button>
  );
};

export default Logo;
