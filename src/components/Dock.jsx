import { motion } from 'framer-motion';
import { useState } from 'react';
import './Dock.css';

export const Dock = ({ onAppClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const apps = [
    { id: 'finder', icon: 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png', label: 'Finder' },
    { id: 'vscode', icon: 'https://cdn-icons-png.flaticon.com/512/906/906324.png', label: 'VS Code' },
    { id: 'mail', icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png', label: 'Mail' },
    { id: 'browser', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', label: 'Browser' },
    { id: 'paint', icon: 'https://cdn-icons-png.flaticon.com/512/3048/3048393.png', label: 'Paint' },
    { id: 'music', icon: 'https://cdn-icons-png.flaticon.com/512/727/727245.png', label: 'Music' },
    { id: 'camera', icon: 'https://cdn-icons-png.flaticon.com/512/685/685655.png', label: 'Camera' },
    { id: 'terminal', icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png', label: 'Terminal' },
    { id: 'settings', icon: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png', label: 'Settings' },
    { id: 'snake', icon: 'https://cdn-icons-png.flaticon.com/512/808/808439.png', label: 'Snake' },
    { id: 'fikr', icon: '/fikr_logo.png', label: 'Fikr' },
  ];

  return (
    <div className="dock-container">
      <motion.div 
        className="dock"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {apps.map((app, index) => (
          <motion.button
            key={app.id}
            className="dock-icon"
            onClick={() => onAppClick(app.id)}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            animate={{
              scale: hoveredIndex === index ? 1.5 : 
                     hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1 ? 1.2 : 1,
              y: hoveredIndex === index ? -10 : 0,
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          >
            <img src={app.icon} alt={app.label} />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
