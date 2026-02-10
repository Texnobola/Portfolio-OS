import { motion } from 'framer-motion';
import { FiRefreshCw, FiImage, FiFolderPlus, FiInfo } from 'react-icons/fi';
import './ContextMenu.css';

export const ContextMenu = ({ x, y, onClose, onAction }) => {
  const menuItems = [
    { id: 'refresh', icon: FiRefreshCw, label: 'Refresh' },
    { id: 'wallpaper', icon: FiImage, label: 'Change Wallpaper' },
    { id: 'folder', icon: FiFolderPlus, label: 'New Folder' },
    { id: 'properties', icon: FiInfo, label: 'Properties' },
  ];

  const handleClick = (id) => {
    onAction(id);
    onClose();
  };

  return (
    <>
      <div className="context-menu-overlay" onClick={onClose} />
      <motion.div
        className="context-menu"
        style={{ left: x, top: y }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {menuItems.map(item => (
          <button
            key={item.id}
            className="context-menu-item"
            onClick={() => handleClick(item.id)}
          >
            <item.icon />
            <span>{item.label}</span>
          </button>
        ))}
      </motion.div>
    </>
  );
};
