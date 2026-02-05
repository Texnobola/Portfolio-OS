import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DesktopLayout } from './layouts/DesktopLayout';
import { MobileLayout } from './layouts/MobileLayout';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </ThemeProvider>
  );
}

export default App;
