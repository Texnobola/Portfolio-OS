import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiInfo, FiAlertCircle, FiWifi, FiBattery } from 'react-icons/fi';
import './NotificationContainer.css';

const getIcon = (type) => {
  switch (type) {
    case 'success': return <FiCheck />;
    case 'warning': return <FiAlertCircle />;
    case 'wifi': return <FiWifi />;
    case 'battery': return <FiBattery />;
    default: return <FiInfo />;
  }
};

export const NotificationContainer = ({ toasts }) => {
  return (
    <div className="notification-container">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="toast-icon">{getIcon(toast.type)}</div>
            <div className="toast-message">{toast.message}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
