import { TopBar } from '../components/TopBar';
import { Dock } from '../components/Dock';
import { Window } from '../components/Window';
import { useWindowManager } from '../hooks/useWindowManager';
import { Terminal } from '../apps/Terminal';
import { Projects } from '../apps/Projects';
import { Arcade } from '../apps/Arcade';

export const DesktopLayout = () => {
  const { windows, openWindow, closeWindow, minimizeWindow, focusWindow } = useWindowManager();

  const appComponents = {
    terminal: <Terminal />,
    projects: <Projects />,
    arcade: <Arcade />,
  };

  const handleAppClick = (appId) => {
    const titles = {
      terminal: 'Terminal',
      projects: 'Projects',
      arcade: 'Arcade',
    };
    openWindow(appId, titles[appId], appComponents[appId]);
  };

  return (
    <div className="desktop-layout">
      <TopBar />
      <div className="desktop-windows">
        {windows.map(window => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onFocus={focusWindow}
            zIndex={window.zIndex}
            minimized={window.minimized}
          >
            {window.content}
          </Window>
        ))}
      </div>
      <Dock onAppClick={handleAppClick} />
    </div>
  );
};
