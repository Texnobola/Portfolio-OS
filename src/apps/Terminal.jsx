import { useState, useRef, useEffect } from 'react';
import { commands } from './commands';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Terminal.css';

const ASCII_BANNER = `
███████╗██╗   ██╗██╗  ████████╗ ██████╗ ███╗   ██╗ ██████╗ ██╗   ██╗
██╔════╝██║   ██║██║  ╚══██╔══╝██╔═══██╗████╗  ██║██╔═══██╗██║   ██║
███████╗██║   ██║██║     ██║   ██║   ██║██╔██╗ ██║██║   ██║██║   ██║
╚════██║██║   ██║██║     ██║   ██║   ██║██║╚██╗██║██║   ██║╚██╗ ██╔╝
███████║╚██████╔╝███████╗██║   ╚██████╔╝██║ ╚████║╚██████╔╝ ╚████╔╝ 
╚══════╝ ╚═════╝ ╚══════╝╚═╝    ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  
                                                                      
                    D E V   P O R T F O L I O                        
`;

export const Terminal = () => {
  const { setTheme } = useTheme();
  const { user } = useAuth();
  const [history, setHistory] = useState([
    ASCII_BANNER,
    'System initialized. Type "help" to begin...',
    '',
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const measureRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (measureRef.current) {
      setCursorPos(measureRef.current.offsetWidth);
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const [cmd, ...args] = input.trim().split(' ');
    
    const restrictedCommands = ['rm', 'sudo', 'chmod', 'chown'];
    if (user?.isGuest && restrictedCommands.includes(cmd)) {
      setHistory(prev => [...prev, `$ ${input}`, 'Permission denied. Sign in for full access.', '']);
      setInput('');
      return;
    }

    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd === 'theme') {
      if (args[0] === 'matrix') {
        setTheme('dark');
        setHistory(prev => [...prev, `$ ${input}`, 'Theme switched to Dark Mode (Matrix)', '']);
      } else if (args[0] === 'light') {
        setTheme('light');
        setHistory(prev => [...prev, `$ ${input}`, 'Theme switched to Light Mode', '']);
      } else {
        setHistory(prev => [...prev, `$ ${input}`, 'Usage: theme [matrix|light]', '']);
      }
      setInput('');
      return;
    }

    const output = commands[cmd] ? commands[cmd]() : `Command not found: ${cmd}. Type 'help' for available commands.`;
    
    if (output !== null) {
      setHistory(prev => [...prev, `$ ${input}`, output, '']);
    }
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="terminal" onClick={handleTerminalClick}>
      <div className="terminal-output" ref={outputRef}>
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'terminal-command' : 'terminal-result'}>
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-line">
        <span className="terminal-prompt">$</span>
        <div className="terminal-input-wrapper">
          <span ref={measureRef} className="terminal-measure">{input}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
            spellCheck={false}
          />
          <span className="terminal-cursor" style={{ opacity: cursorVisible ? 1 : 0, left: cursorPos }}>█</span>
        </div>
      </form>
    </div>
  );
};
