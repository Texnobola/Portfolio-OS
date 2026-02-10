import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../hooks/useSound';
import './BootScreen.css';

const bootLogs = [
  '> INITIALIZING KERNEL... OK',
  '> LOADING GRAPHICS DRIVERS... OK',
  '> MOUNTING FILESYSTEM (SULTONOV_FS)... SUCCESS',
  '> STARTING NETWORK SERVICES... OK',
  '> LOADING USER INTERFACE... READY',
];

export const BootScreen = ({ onComplete }) => {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { play } = useSound();

  useEffect(() => {
    if (currentIndex < bootLogs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, bootLogs[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        play('startup');
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete, play]);

  return (
    <motion.div
      className="boot-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="boot-logs">
        {displayedLogs.map((log, i) => (
          <div key={i} className="boot-log">
            {log}
          </div>
        ))}
        <span className="boot-cursor">_</span>
      </div>
    </motion.div>
  );
};
