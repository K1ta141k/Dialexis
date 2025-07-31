import '../styles/components/CaretBoolean.css';

const CaretBoolean = ({ isChecked, onToggle, className = '' }) => {
  return (
    <div className={`caret-boolean ${className}`}>
      <label className="caret-label">
        <span className="caret-text">Caret</span>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="caret-checkbox"
        />
      </label>
    </div>
  );
};

export default CaretBoolean;
