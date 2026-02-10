import { useState, useEffect } from 'react';
import { useOS } from '../context/OSContext';
import './Settings.css';

const wallpaperOptions = [
  { id: 1, url: '/backgrounds/background_image_1.png', name: 'Abstract Blue' },
  { id: 2, url: '/backgrounds/background_image_2.png', name: 'Purple Gradient' },
  { id: 3, url: '/backgrounds/background_image_3.png', name: 'Cosmic' },
  { id: 4, url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920', name: 'Gradient Flow' },
  { id: 5, url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920', name: 'Abstract Art' },
  { id: 6, url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920', name: 'Neon Waves' },
];

const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  
  return browser;
};

export const Settings = () => {
  const { wallpaper, setWallpaper } = useOS();
  const [activeTab, setActiveTab] = useState('wallpapers');
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="settings">
      <div className="settings-sidebar">
        <button
          className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          ⚙️ General
        </button>
        <button
          className={`settings-tab ${activeTab === 'wallpapers' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallpapers')}
        >
          🖼️ Wallpapers
        </button>
        <button
          className={`settings-tab ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          💻 System
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'general' && (
          <div className="settings-section">
            <h2>General Settings</h2>
            <p>Configure your OS preferences</p>
          </div>
        )}

        {activeTab === 'wallpapers' && (
          <div className="settings-section">
            <h2>Wallpapers</h2>
            <div className="wallpaper-grid">
              {wallpaperOptions.map(wp => (
                <div
                  key={wp.id}
                  className={`wallpaper-item ${wallpaper === wp.url ? 'selected' : ''}`}
                  onClick={() => setWallpaper(wp.url)}
                >
                  <img src={wp.url} alt={wp.name} />
                  <span>{wp.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="settings-section">
            <h2>System Information</h2>
            <div className="system-info">
              <div className="info-row">
                <span className="info-label">OS Name:</span>
                <span className="info-value">SultonovOS v1.0 (Pro)</span>
              </div>
              <div className="info-row">
                <span className="info-label">Browser:</span>
                <span className="info-value">{getBrowserInfo()}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Uptime:</span>
                <span className="info-value">{formatUptime(uptime)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Developer:</span>
                <span className="info-value">Sultonov O'razali</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
