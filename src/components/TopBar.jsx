import { useState, useEffect } from 'react';
import { FiWifi, FiBattery } from 'react-icons/fi';
import './TopBar.css';

export const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="logo">SultonovWeb OS</span>
      </div>
      <div className="topbar-right">
        <FiWifi />
        <FiBattery />
        <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};
