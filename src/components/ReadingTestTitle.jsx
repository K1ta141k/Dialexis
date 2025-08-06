
import { COMPONENT_NAMES } from '../constants';
import '../styles/components/ReadingTestTitle.css';

const ReadingTestTitle = ({ className = '', mode = 'lit' }) => {
  const getTitle = () => {
    return mode === 'code' ? COMPONENT_NAMES.CODE_TEST_TITLE : COMPONENT_NAMES.READING_TEST_TITLE;
  };

  return (
    <div className={`reading-test-row ${className}`}>
      <div className="reading-test-title">
        {getTitle()}
      </div>
    </div>
  );
};

export default ReadingTestTitle;
