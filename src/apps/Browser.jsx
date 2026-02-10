import { useState } from 'react';
import { BrowserToolbar } from './BrowserToolbar';
import { BrowserHome } from './BrowserHome';
import { FiShield } from 'react-icons/fi';
import './Browser.css';

const BLOCKED_DOMAINS = ['github.com', 'x.com', 'twitter.com', 'facebook.com', 'instagram.com'];

export const Browser = () => {
  const [history, setHistory] = useState(['']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const currentUrl = history[currentIndex];

  const isUrlBlocked = (url) => {
    try {
      const domain = new URL(url).hostname;
      return BLOCKED_DOMAINS.some(blocked => domain.includes(blocked));
    } catch {
      return false;
    }
  };

  const handleNavigate = (url) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(url);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setIsBlocked(isUrlBlocked(url));
    setIframeKey(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsBlocked(isUrlBlocked(history[currentIndex - 1]));
      setIframeKey(prev => prev + 1);
    }
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsBlocked(isUrlBlocked(history[currentIndex + 1]));
      setIframeKey(prev => prev + 1);
    }
  };

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleOpenInNewTab = () => {
    window.open(currentUrl, '_blank');
  };

  return (
    <div className="browser">
      <BrowserToolbar
        url={currentUrl}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onForward={handleForward}
        onRefresh={handleRefresh}
        canGoBack={currentIndex > 0}
        canGoForward={currentIndex < history.length - 1}
      />
      <div className="browser-content">
        {!currentUrl ? (
          <BrowserHome onNavigate={handleNavigate} />
        ) : isBlocked ? (
          <div className="browser-blocked">
            <FiShield className="browser-blocked-icon" />
            <h3>This website prevents embedding for security.</h3>
            <p>The site owner has restricted iframe access.</p>
            <button onClick={handleOpenInNewTab} className="browser-blocked-btn">
              Open in New Tab
            </button>
          </div>
        ) : (
          <iframe
            key={iframeKey}
            src={currentUrl}
            className="browser-iframe"
            title="Browser Content"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        )}
      </div>
    </div>
  );
};
