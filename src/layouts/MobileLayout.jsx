import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileWindow } from '../components/MobileWindow';
import { Terminal } from '../apps/Terminal';
import { Browser } from '../apps/Browser';
import { Finder } from '../apps/Finder';
import { SnakeGame } from '../apps/SnakeGame';
import { Settings } from '../apps/Settings';
import { Camera } from '../apps/Camera';
import { useOS } from '../context/OSContext';
import './MobileLayout.css';

export const MobileLayout = () => {
  const { wallpaper } = useOS();
  const [activeApp, setActiveApp] = useState(null);

  const apps = [
    { id: 'finder', icon: 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png', label: 'Finder', component: <Finder /> },
    { id: 'mail', icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png', label: 'Mail', component: <Mail /> },
    { id: 'browser', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', label: 'Browser', component: <Browser /> },
    { id: 'terminal', icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png', label: 'Terminal', component: <Terminal /> },
    { id: 'settings', icon: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png', label: 'Settings', component: <Settings /> },
    { id: 'snake', icon: 'https://cdn-icons-png.flaticon.com/512/808/808439.png', label: 'Snake', component: <SnakeGame /> },
    { id: 'camera', icon: 'https://cdn-icons-png.flaticon.com/512/685/685655.png', label: 'Camera', component: <Camera /> },
  ];

  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="mobile-layout" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div className="mobile-status-bar">
        <span>{getTime()}</span>
        <div className="mobile-status-icons">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>
      
      <div className="mobile-grid">
        {apps.map(app => (
          <motion.button
            key={app.id}
            className="mobile-app-icon"
            onClick={() => setActiveApp(app)}
            whileTap={{ scale: 0.9 }}
          >
            <img src={app.icon} alt={app.label} />
            <span>{app.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeApp && (
          <MobileWindow
            title={activeApp.label}
            onClose={() => setActiveApp(null)}
          >
            {activeApp.component}
          </MobileWindow>
        )}
      </AnimatePresence>
    </div>
  );
};
