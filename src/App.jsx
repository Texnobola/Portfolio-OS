import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { OSProvider } from './context/OSContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { BootScreen } from './components/BootScreen';
import { LoginScreen } from './components/LoginScreen';
import { DesktopLayout } from './layouts/DesktopLayout';
import { MobileLayout } from './layouts/MobileLayout';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [bootState, setBootState] = useState('bios');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBootComplete = () => setBootState('login');
  const handleLogin = () => setBootState('desktop');

  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <OSProvider>
          <AnimatePresence mode="wait">
            {bootState === 'bios' && (
              <BootScreen key="boot" onComplete={handleBootComplete} />
            )}
            {bootState === 'login' && (
              <LoginScreen key="login" onLogin={handleLogin} />
            )}
            {bootState === 'desktop' && (
              isMobile ? 
                <MobileLayout key="mobile" /> : 
                <DesktopLayout key="desktop" />
            )}
          </AnimatePresence>
          </OSProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
