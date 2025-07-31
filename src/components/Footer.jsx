
import { COMPONENT_NAMES } from '../constants';
import '../styles/components/Footer.css';

const Footer = ({ className = '' }) => {
  return (
    <div className={`footer-row ${className}`}>
      <div className="footer-content">
        {COMPONENT_NAMES.FOOTER_TEXT}
      </div>
    </div>
  );
};

export default Footer;
