export const PROJECT_FILES = {
  'App.jsx': {
    name: 'App.jsx',
    language: 'javascript',
    value: `import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { OSProvider } from './context/OSContext';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider>
      <OSProvider>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </OSProvider>
    </ThemeProvider>
  );
}

export default App;`,
  },
  'useWindowManager.js': {
    name: 'useWindowManager.js',
    language: 'javascript',
    value: `import { useState, useCallback } from 'react';

export const useWindowManager = () => {
  const [windows, setWindows] = useState([]);
  const [zIndexCounter, setZIndexCounter] = useState(1000);

  const openWindow = useCallback((id, title, content) => {
    const exists = windows.find(w => w.id === id);
    if (exists) {
      focusWindow(id);
      return;
    }
    setWindows(prev => [...prev, {
      id,
      title,
      content,
      minimized: false,
      zIndex: zIndexCounter,
    }]);
    setZIndexCounter(prev => prev + 1);
  }, [windows, zIndexCounter]);

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const focusWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: zIndexCounter } : w
    ));
    setZIndexCounter(prev => prev + 1);
  }, [zIndexCounter]);

  return { windows, openWindow, closeWindow, focusWindow };
};`,
  },
  'styles.css': {
    name: 'styles.css',
    language: 'css',
    value: `:root[data-theme="light"] {
  --primary: #007AFF;
  --bg: #F5F5F7;
  --window-bg: rgba(255, 255, 255, 0.7);
  --text-primary: #1d1d1f;
  --text-secondary: #86868b;
}

:root[data-theme="dark"] {
  --primary: #00FF41;
  --bg: #0D1117;
  --window-bg: rgba(13, 17, 23, 0.8);
  --text-primary: #e6edf3;
  --text-secondary: #7d8590;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg);
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
}`,
  },
};
