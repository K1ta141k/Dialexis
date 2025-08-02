
import Logo from './Logo';
import ProfileIcon from './ProfileIcon';
import '../styles/components/Header.css';

const Header = ({ className = '', onLogoClick }) => {
  return (
    <div className={`header-row ${className}`}>
      <Logo onLogoClick={onLogoClick} />
      <ProfileIcon />
    </div>
  );
};

export default Header;
