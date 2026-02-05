import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import { FiMinus, FiX } from 'react-icons/fi';
import './Window.css';

export const Window = ({ id, title, children, onClose, onMinimize, onFocus, zIndex, minimized }) => {
  if (minimized) return null;

  return (
    <Rnd
      default={{
        x: Math.random() * 200 + 100,
        y: Math.random() * 100 + 50,
        width: 800,
        height: 600,
      }}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      dragHandleClassName="window-header"
      style={{ zIndex }}
      onMouseDown={() => onFocus(id)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="window"
      >
        <div className="window-header">
          <div className="window-controls">
            <button className="control-btn close" onClick={() => onClose(id)}>
              <FiX />
            </button>
            <button className="control-btn minimize" onClick={() => onMinimize(id)}>
              <FiMinus />
            </button>
          </div>
          <span className="window-title">{title}</span>
        </div>
        <div className="window-content">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
};
