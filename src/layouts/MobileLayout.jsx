import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Terminal } from '../apps/Terminal';
import { Projects } from '../apps/Projects';
import { Arcade } from '../apps/Arcade';
import './MobileLayout.css';

export const MobileLayout = () => {
  const [activeApp, setActiveApp] = useState(null);

  const apps = [
    { id: 'terminal', icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png', label: 'Terminal', component: <Terminal /> },
    { id: 'projects', icon: 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png', label: 'Projects', component: <Projects /> },
    { id: 'arcade', icon: 'https://cdn-icons-png.flaticon.com/512/808/808439.png', label: 'Arcade', component: <Arcade /> },
  ];

  return (
    <div className="mobile-layout">
      <div className="mobile-status-bar">
        <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
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
          <motion.div
            className="mobile-app-modal"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="mobile-app-header">
              <span>{activeApp.label}</span>
              <button onClick={() => setActiveApp(null)}>
                <FiX />
              </button>
            </div>
            <div className="mobile-app-content">
              {activeApp.component}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
