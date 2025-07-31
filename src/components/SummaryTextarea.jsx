import '../styles/components/SummaryTextarea.css';

const SummaryTextarea = ({ value, onChange, placeholder, className = '' }) => {
  return (
    <textarea
      className={`summary-textarea ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={6}
    />
  );
};

export default SummaryTextarea;
