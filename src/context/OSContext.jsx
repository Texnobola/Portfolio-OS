import { createContext, useContext, useState } from 'react';

const OSContext = createContext();

export const useOS = () => useContext(OSContext);

const wallpapers = [
  '/backgrounds/background_image_1.png',
  '/backgrounds/background_image_2.png',
  '/backgrounds/background_image_3.png',
];

export const OSProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [zIndexCounter, setZIndexCounter] = useState(1000);
  const [wallpaper, setWallpaperState] = useState(() => wallpapers[Math.floor(Math.random() * wallpapers.length)]);

  const setWallpaper = (newWallpaper) => {
    setWallpaperState(newWallpaper);
  };

  const openApp = (id, title, content) => {
    const existing = windows.find(w => w.id === id);
    
    if (existing) {
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => 
          w.id === id ? { ...w, isMinimized: false, zIndex: zIndexCounter } : w
        ));
        setZIndexCounter(prev => prev + 1);
      }
      setActiveWindowId(id);
      return;
    }

    setWindows(prev => [...prev, {
      id,
      title,
      content,
      isOpen: true,
      isMinimized: false,
      zIndex: zIndexCounter,
    }]);
    setActiveWindowId(id);
    setZIndexCounter(prev => prev + 1);
  };

  const closeApp = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeApp = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const focusWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: zIndexCounter } : w
    ));
    setActiveWindowId(id);
    setZIndexCounter(prev => prev + 1);
  };

  return (
    <OSContext.Provider value={{ windows, activeWindowId, wallpaper, setWallpaper, openApp, closeApp, minimizeApp, focusWindow }}>
      {children}
    </OSContext.Provider>
  );
};
