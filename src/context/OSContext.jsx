import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const OSContext = createContext();

export const useOS = () => useContext(OSContext);

const wallpapers = [
  '/backgrounds/background_image_1.png',
  '/backgrounds/background_image_2.png',
  '/backgrounds/background_image_3.png',
];

export const OSProvider = ({ children }) => {
  const { user } = useAuth();
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [zIndexCounter, setZIndexCounter] = useState(1000);
  const [wallpaper, setWallpaperState] = useState(() => wallpapers[Math.floor(Math.random() * wallpapers.length)]);

  useEffect(() => {
    if (!user || user.isGuest) return;

    const loadSettings = async () => {
      const { data } = await supabase
        .from('user_settings')
        .select('wallpaper')
        .eq('user_id', user.id)
        .single();
      
      if (data?.wallpaper) setWallpaperState(data.wallpaper);
    };

    loadSettings();

    const channel = supabase
      .channel('settings_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_settings',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        if (payload.new?.wallpaper) setWallpaperState(payload.new.wallpaper);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  const setWallpaper = async (newWallpaper) => {
    setWallpaperState(newWallpaper);
    
    if (user && !user.isGuest) {
      await supabase
        .from('user_settings')
        .upsert({ user_id: user.id, wallpaper: newWallpaper });
    }
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
