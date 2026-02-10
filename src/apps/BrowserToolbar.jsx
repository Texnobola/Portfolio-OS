import { FiArrowLeft, FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import './Browser.css';

export const BrowserToolbar = ({ url, onNavigate, onBack, onForward, onRefresh, canGoBack, canGoForward }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.url.value;
    if (input) onNavigate(input);
  };

  return (
    <div className="browser-toolbar">
      <div className="browser-controls">
        <button onClick={onBack} disabled={!canGoBack} className="browser-btn">
          <FiArrowLeft />
        </button>
        <button onClick={onForward} disabled={!canGoForward} className="browser-btn">
          <FiArrowRight />
        </button>
        <button onClick={onRefresh} className="browser-btn">
          <FiRefreshCw />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="browser-address-bar">
        <input
          type="text"
          name="url"
          defaultValue={url}
          placeholder="Enter URL or search..."
          className="browser-url-input"
        />
      </form>
    </div>
  );
};
