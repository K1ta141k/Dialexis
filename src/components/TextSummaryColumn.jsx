import { forwardRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import WPMTab from './WPMTab';
import '../styles/components/TextSummaryColumn.css';

const TextSummaryColumn = forwardRef(({
  originalText,
  userSummary,
  selectedMode = 'lit',
  currentCode = '',
  currentCodeLanguage = 'javascript',
  className = '',
  wpm = 0,
}, ref) => {
  // Highlight code with Prism.js when in code mode
  const getHighlightedCode = () => {
    if (selectedMode === 'code' && currentCode) {
      return Prism.highlight(
        currentCode,
        Prism.languages[currentCodeLanguage] || Prism.languages.javascript,
        currentCodeLanguage,
      );
    }
    return null;
  };

  const highlightedCode = getHighlightedCode();

  return (
    <div ref={ref} className={`text-summary-column ${className}`}>
      {/* WPM Tab - Only show when in Lit mode */}
      {selectedMode === 'lit' && <WPMTab wpm={wpm} />}
      <div className="text-summary-container">
        <div className="original-text-section">
          <h3 className="section-title">
            {selectedMode === 'code' ? 'Original Code' : 'Original Text'}
          </h3>
          <div
            className={`text-content ${selectedMode === 'code' ? 'text-content-code' : ''}`}
          >
            {selectedMode === 'code' && highlightedCode ? (
              <div className="code-block-pre-wrapper">
                <div className="code-block-pre overflow-y-auto overflow-x-auto prose prose-sm max-w-none">
                  <pre className="m-0 p-0 bg-transparent border-none font-mono text-sm leading-relaxed">
                    <code
                      className={`bg-transparent p-0 border-none font-inherit text-inherit leading-inherit language-${currentCodeLanguage}`}
                      dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                  </pre>
                </div>
              </div>
            ) : (
              originalText
            )}
          </div>
        </div>
        <div className="vertical-divider"></div>
        <div className="summary-section">
          <h3 className="section-title">Your Summary</h3>
          <div className="summary-content">
            {userSummary}
          </div>
        </div>
      </div>
    </div>
  );
});

TextSummaryColumn.displayName = 'TextSummaryColumn';

export default TextSummaryColumn;
