import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import ReadingOverlay from './ReadingOverlay';
import SummaryInputOverlay from './SummaryInputOverlay';
import { APP_CONFIG } from '../constants';
import '../styles/components/CodeContent.css';

const CodeContent = ({
  code,
  language = 'javascript',
  title = 'Sample Code',
  isPlaying,
  hasStartedReading,
  onSummarySubmit,
  className = '',
}) => {
  const displayCode = code || APP_CONFIG.DEFAULT_CODE;

  // Highlight code with Prism.js
  const highlightedCode = Prism.highlight(
    displayCode,
    Prism.languages[language] || Prism.languages.javascript,
    language,
  );

  const handleSummarySubmit = (summary) => {
    if (onSummarySubmit) {
      onSummarySubmit(summary);
    }
  };

  return (
    <div className={`traversing-code-row ${className}`}>
      <div className="code-content-wrapper">
        <div className="code-block-container">
          <div className="code-block-header">
            <span className="code-block-title">{title}</span>
            <span className="code-block-language">{language}</span>
          </div>
          <div className="code-block-pre-wrapper">
            <div className="code-block-pre overflow-y-auto overflow-x-auto prose prose-sm max-w-none">
              <pre className="m-0 p-0 bg-transparent border-none font-mono text-sm leading-relaxed">
                <code
                  className="bg-transparent p-0 border-none font-inherit text-inherit leading-inherit language-javascript"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>
            </div>
          </div>
          <ReadingOverlay isPlaying={hasStartedReading} />
          <SummaryInputOverlay
            isVisible={!isPlaying && hasStartedReading}
            onSubmit={handleSummarySubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeContent;
