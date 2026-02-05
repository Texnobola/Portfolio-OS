import { motion } from 'framer-motion';
import { useState } from 'react';
import './Dock.css';

export const Dock = ({ onAppClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const apps = [
    { id: 'terminal', icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png', label: 'Terminal' },
    { id: 'projects', icon: 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png', label: 'Projects' },
    { id: 'arcade', icon: 'https://cdn-icons-png.flaticon.com/512/808/808439.png', label: 'Arcade' },
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
