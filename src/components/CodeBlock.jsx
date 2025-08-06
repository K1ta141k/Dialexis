import '../styles/components/CodeBlock.css';

const CodeBlock = ({
  code,
  language = 'javascript',
  title = null,
  className = '',
}) => {
  return (
    <div className={`code-block-container ${className}`}>
      {title && (
        <div className="code-block-header">
          <span className="code-block-title">{title}</span>
          <span className="code-block-language">{language}</span>
        </div>
      )}
      <div className="prose prose-sm max-w-none">
        <pre className="code-block-pre">
          <code className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
