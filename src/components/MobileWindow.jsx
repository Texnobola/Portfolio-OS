import { motion } from 'framer-motion';
import { FiChevronLeft } from 'react-icons/fi';
import './MobileWindow.css';

export const MobileWindow = ({ title, children, onClose }) => {
  return (
    <motion.div
      className="mobile-window"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      <div className="mobile-window-header">
        <button className="mobile-back-btn" onClick={onClose}>
          <FiChevronLeft />
        </button>
        <span className="mobile-window-title">{title}</span>
      </div>
      <div className="mobile-window-content">
        {children}
      </div>
      <div className="mobile-home-indicator" onClick={onClose}></div>
    </motion.div>
  );
};
