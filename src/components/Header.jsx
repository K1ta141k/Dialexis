
import Logo from './Logo';
import ProfileIcon from './ProfileIcon';
import CodeLit from './CodeLit';
import '../styles/components/Header.css';

const Header = ({ className = '', onLogoClick, onCodeLitChange }) => {
  return (
    <div className={`header-row ${className}`}>
      <Logo onLogoClick={onLogoClick} />
      <div className="header-right">
        <CodeLit onSelectionChange={onCodeLitChange} />
        <ProfileIcon />
      </div>
    </div>
  );
};

export default Header;
