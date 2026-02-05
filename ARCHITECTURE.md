# SultonovWeb OS - Project Structure

## 📁 Folder Structure
```
portfolio-os/
├── src/
│   ├── context/
│   │   └── ThemeContext.jsx          # Global theme management (light/dark)
│   ├── hooks/
│   │   └── useWindowManager.js       # Window state management hook
│   ├── components/
│   │   ├── Window.jsx                # Draggable/resizable window component
│   │   ├── Window.css
│   │   ├── Dock.jsx                  # macOS-style dock with magnification
│   │   ├── Dock.css
│   │   ├── TopBar.jsx                # Top bar with clock and status icons
│   │   └── TopBar.css
│   ├── layouts/
│   │   ├── DesktopLayout.jsx         # Desktop mode (>768px)
│   │   ├── MobileLayout.jsx          # Mobile mode (≤768px)
│   │   └── MobileLayout.css
│   ├── apps/
│   │   ├── Terminal.jsx              # Interactive terminal app
│   │   ├── Terminal.css
│   │   ├── Projects.jsx              # Projects grid display
│   │   ├── Projects.css
│   │   ├── Arcade.jsx                # Snake game
│   │   └── Arcade.css
│   ├── App.jsx                       # Main app with bimodal logic
│   ├── main.jsx
│   └── index.css                     # Global styles + CSS variables
├── tailwind.config.js                # Tailwind with custom theme colors
├── postcss.config.js
└── package.json
```

## 🎨 Theme System
- Light Mode: #007AFF (Deep Sky Blue) on #F5F5F7 (Apple White)
- Dark Mode: #00FF41 (Cyberpunk Green) on #0D1117 (Deep Space Dark)
- Glassmorphism: backdrop-filter: blur(20px)

## 🚀 Key Features
1. **Bimodal Layout**: Automatically switches between desktop and mobile at 768px
2. **Window Manager**: Open, close, minimize, and focus windows with z-index management
3. **Interactive Terminal**: Commands include `whoami`, `theme matrix`, `help`, `clear`, `about`
4. **Dock Animation**: Spring-based magnification on hover
5. **Snake Game**: Fully functional arcade game with arrow key controls

## 📦 Dependencies
- React + Vite
- Tailwind CSS
- Framer Motion (animations)
- React Icons (FaTerminal, FaFolder, FaGamepad, etc.)
- react-rnd (draggable/resizable windows)

## 🎯 Run the Project
```bash
npm install
npm run dev
```

## 🎨 Design Philosophy
- Soft shadows: box-shadow: 0 20px 50px rgba(0,0,0,0.15)
- Spring animations: type: 'spring', damping: 25, stiffness: 300
- No default HTML styles - everything is custom
