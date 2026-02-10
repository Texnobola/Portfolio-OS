import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TopBar } from '../components/TopBar';
import { Dock } from '../components/Dock';
import { WindowFrame } from '../components/WindowFrame';
import { ContextMenu } from '../components/ContextMenu';
import { NotificationContainer } from '../components/NotificationContainer';
import { useOS } from '../context/OSContext';
import { useSound } from '../hooks/useSound';
import { useNotification } from '../context/NotificationContext';
import { Terminal } from '../apps/Terminal';
import { Projects } from '../apps/Projects';
import { SnakeGame } from '../apps/SnakeGame';
import { Browser } from '../apps/Browser';
import { Finder } from '../apps/Finder';
import { Settings } from '../apps/Settings';
import { Mail } from '../apps/Mail';
import { MusicPlayer } from '../apps/MusicPlayer';
import { Paint } from '../apps/Paint';
import { VSCode } from '../apps/VSCode';
import { Camera } from '../apps/Camera';

export const DesktopLayout = () => {
  const { windows, wallpaper, openApp } = useOS();
  const { play } = useSound();
  const { toasts, addToast } = useNotification();
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    // Welcome notification
    addToast('Welcome to SultonovOS', 'info');

    // WiFi notification after 5 seconds
    const wifiTimer = setTimeout(() => {
      addToast('Connected to Guest Network', 'wifi');
    }, 5000);

    // Random battery notification
    const batteryTimer = setTimeout(() => {
      addToast('Battery Low (20%)', 'battery');
    }, 15000);

    return () => {
      clearTimeout(wifiTimer);
      clearTimeout(batteryTimer);
    };
  }, [addToast]);

  const appComponents = {
    terminal: <Terminal />,
    projects: <Projects />,
    snake: <SnakeGame />,
    browser: <Browser />,
    finder: <Finder />,
    settings: <Settings />,
    mail: <Mail />,
    music: <MusicPlayer />,
    paint: <Paint />,
    vscode: <VSCode />,
    camera: <Camera />,
  };

  const handleAppClick = (appId) => {
    const titles = {
      terminal: 'Terminal',
      projects: 'Projects',
      snake: 'Snake Game',
      browser: 'Browser',
      finder: 'Finder',
      settings: 'Settings',
      mail: 'Mail',
      music: 'Music Player',
      paint: 'Paint',
      vscode: 'VS Code',
      camera: 'Camera',
    };
    play('windowOpen');
    openApp(appId, titles[appId], appComponents[appId]);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleContextAction = (action) => {
    switch (action) {
      case 'refresh':
        window.location.reload();
        break;
      case 'wallpaper':
        play('windowOpen');
        openApp('settings', 'Settings', appComponents.settings);
        break;
      case 'folder':
        play('error');
        break;
      case 'properties':
        alert('SultonovOS v1.0 (Pro)\nDeveloper: Sultonov O\'razali');
        break;
      default:
        break;
    }
  };

  return (
    <div className="desktop-layout" style={{ backgroundImage: `url(${wallpaper})` }} onContextMenu={handleContextMenu}>
      <TopBar />
      <div className="desktop-windows">
        {windows.map(window => (
          <WindowFrame
            key={window.id}
            id={window.id}
            title={window.title}
            zIndex={window.zIndex}
            isMinimized={window.isMinimized}
          >
            {window.content}
          </WindowFrame>
        ))}
      </div>
      <Dock onAppClick={handleAppClick} />
      <NotificationContainer toasts={toasts} />
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onAction={handleContextAction}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
