import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Terminal.css';

export const Terminal = () => {
  const [history, setHistory] = useState(['Welcome to SultonovWeb Terminal. Type "help" for commands.']);
  const [input, setInput] = useState('');
  const { setTheme } = useTheme();

  const commands = {
    whoami: () => 'Sultonov O\'razali',
    help: () => 'Available commands: whoami, theme, clear, about',
    theme: (arg) => {
      if (arg === 'matrix') {
        setTheme('dark');
        return 'Theme switched to Dark Mode (Matrix)';
      }
      if (arg === 'light') {
        setTheme('light');
        return 'Theme switched to Light Mode';
      }
      return 'Usage: theme [matrix|light]';
    },
    clear: () => {
      setHistory([]);
      return null;
    },
    about: () => 'Senior Creative Frontend Engineer | sultonovweb.uz',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [cmd, ...args] = input.trim().split(' ');
    const output = commands[cmd] ? commands[cmd](args[0]) : `Command not found: ${cmd}`;
    
    if (output !== null) {
      setHistory(prev => [...prev, `$ ${input}`, output]);
    }
    setInput('');
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'terminal-command' : 'terminal-result'}>
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-line">
        <span className="terminal-prompt">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal-input"
          autoFocus
        />
      </form>
    </div>
  );
};
