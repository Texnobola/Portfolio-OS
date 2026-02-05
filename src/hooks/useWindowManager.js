import { useState } from 'react';

export const useWindowManager = () => {
  const [windows, setWindows] = useState([]);
  const [zIndexCounter, setZIndexCounter] = useState(1000);

  const openWindow = (appId, title, content) => {
    const exists = windows.find(w => w.id === appId);
    if (exists) {
      focusWindow(appId);
      return;
    }
    setWindows(prev => [...prev, {
      id: appId,
      title,
      content,
      minimized: false,
      zIndex: zIndexCounter,
    }]);
    setZIndexCounter(prev => prev + 1);
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: !w.minimized } : w
    ));
  };

  const focusWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: zIndexCounter } : w
    ));
    setZIndexCounter(prev => prev + 1);
  };

  return { windows, openWindow, closeWindow, minimizeWindow, focusWindow };
};
