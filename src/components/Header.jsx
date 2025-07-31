
import Logo from './Logo';
import ProfileIcon from './ProfileIcon';
import '../styles/components/Header.css';

const Header = ({ className = '' }) => {
  return (
    <div className={`header-row ${className}`}>
      <Logo />
      <ProfileIcon />
    </div>
  );
};

export default Header;
