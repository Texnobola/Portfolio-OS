import { useState, useEffect } from 'react';
import { FiWifi, FiBattery, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useSound } from '../hooks/useSound';
import './TopBar.css';

export const TopBar = () => {
  const [time, setTime] = useState(new Date());
  const { isMuted, toggleMute } = useSound();

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
        <button onClick={toggleMute} className="topbar-mute-btn">
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
        <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};
