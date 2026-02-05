import { useState, useEffect, useCallback } from 'react';
import './Arcade.css';

export const Arcade = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prev => {
      const newHead = [prev[0][0] + direction[0], prev[0][1] + direction[1]];
      
      if (newHead[0] < 0 || newHead[0] >= 20 || newHead[1] < 0 || newHead[1] >= 20 ||
          prev.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
        setGameOver(true);
        return prev;
      }

      const newSnake = [newHead, ...prev];
      
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
        setScore(s => s + 10);
      } else {
        newSnake.pop();
      }
      
      return newSnake;
    });
  }, [direction, food, gameOver]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKey = (e) => {
      const keyMap = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
      };
      if (keyMap[e.key]) {
        e.preventDefault();
        setDirection(keyMap[e.key]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const reset = () => {
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="arcade">
      <div className="game-info">
        <span>Score: {score}</span>
        {gameOver && <button onClick={reset}>Restart</button>}
      </div>
      <div className="game-board">
        {Array.from({ length: 20 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              className={`cell ${
                snake.some(s => s[0] === row && s[1] === col) ? 'snake' :
                food[0] === row && food[1] === col ? 'food' : ''
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};
