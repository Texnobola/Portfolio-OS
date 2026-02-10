import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FiMinus, FiX } from 'react-icons/fi';
import { useOS } from '../context/OSContext';
import './WindowFrame.css';

export const WindowFrame = ({ id, title, children, zIndex, isMinimized }) => {
  const { closeApp, minimizeApp, focusWindow } = useOS();
  const [position, setPosition] = useState({ x: Math.random() * 200 + 100, y: Math.random() * 100 + 50 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [resizeDir, setResizeDir] = useState(null);
  const dragRef = useRef({ startX: 0, startY: 0 });
  const resizeRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0, startPosX: 0, startPosY: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragRef.current.startX,
          y: e.clientY - dragRef.current.startY,
        });
      }
      if (resizeDir) {
        const dx = e.clientX - resizeRef.current.startX;
        const dy = e.clientY - resizeRef.current.startY;
        let newWidth = resizeRef.current.startWidth;
        let newHeight = resizeRef.current.startHeight;
        let newX = resizeRef.current.startPosX;
        let newY = resizeRef.current.startPosY;

        if (resizeDir.includes('e')) newWidth = Math.max(400, resizeRef.current.startWidth + dx);
        if (resizeDir.includes('w')) {
          newWidth = Math.max(400, resizeRef.current.startWidth - dx);
          newX = resizeRef.current.startPosX + (resizeRef.current.startWidth - newWidth);
        }
        if (resizeDir.includes('s')) newHeight = Math.max(300, resizeRef.current.startHeight + dy);
        if (resizeDir.includes('n')) {
          newHeight = Math.max(300, resizeRef.current.startHeight - dy);
          newY = resizeRef.current.startPosY + (resizeRef.current.startHeight - newHeight);
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setResizeDir(null);
    };

    if (isDragging || resizeDir) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, resizeDir]);

  if (isMinimized) return null;

  const handleMouseDown = (e) => {
    if (!e.target.closest('.traffic-lights') && !e.target.closest('.resize-edge') && !e.target.closest('.resize-corner') && !e.target.closest('.window-frame-content')) {
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX - position.x,
        startY: e.clientY - position.y,
      };
    }
  };

  const handleResizeStart = (dir) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResizeDir(dir);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  return (
    <motion.div
      className="window-frame"
      style={{ 
        zIndex,
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onMouseDown={(e) => {
        focusWindow(id);
        handleMouseDown(e);
      }}
    >
      <div className="window-frame-header">
        <div className="traffic-lights">
          <button className="traffic-light close" onClick={() => closeApp(id)}>
            <FiX />
          </button>
          <button className="traffic-light minimize" onClick={() => minimizeApp(id)}>
            <FiMinus />
          </button>
          <button className="traffic-light maximize"></button>
        </div>
        <span className="window-frame-title">{title}</span>
      </div>
      <div className="window-frame-content">
        {children}
      </div>
      <div className="resize-edge resize-n" onMouseDown={handleResizeStart('n')}></div>
      <div className="resize-edge resize-s" onMouseDown={handleResizeStart('s')}></div>
      <div className="resize-edge resize-e" onMouseDown={handleResizeStart('e')}></div>
      <div className="resize-edge resize-w" onMouseDown={handleResizeStart('w')}></div>
      <div className="resize-corner resize-nw" onMouseDown={handleResizeStart('nw')}></div>
      <div className="resize-corner resize-ne" onMouseDown={handleResizeStart('ne')}></div>
      <div className="resize-corner resize-sw" onMouseDown={handleResizeStart('sw')}></div>
      <div className="resize-corner resize-se" onMouseDown={handleResizeStart('se')}></div>
    </motion.div>
  );
};
