import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[10, 10]];
const INITIAL_DIRECTION = [0, 1];
const TICK_RATE = 200;

const getRandomFood = (snake) => {
  while (true) {
    const food = [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE),
    ];
    if (!snake.some(segment => segment[0] === food[0] && segment[1] === food[1])) {
      return food;
    }
  }
};

export const useSnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0');
  });

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(getRandomFood(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prev => {
      const newHead = [prev[0][0] + direction[0], prev[0][1] + direction[1]];

      if (
        newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
        newHead[1] < 0 || newHead[1] >= GRID_SIZE ||
        prev.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
      ) {
        setGameOver(true);
        return prev;
      }

      const newSnake = [newHead, ...prev];

      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setFood(getRandomFood(newSnake));
        setScore(s => {
          const newScore = s + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snakeHighScore', newScore.toString());
          }
          return newScore;
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, highScore]);

  useEffect(() => {
    const interval = setInterval(moveSnake, TICK_RATE);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyMap = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        const newDir = keyMap[e.key];
        setDirection(prev => {
          if (prev[0] + newDir[0] === 0 && prev[1] + newDir[1] === 0) {
            return prev;
          }
          return newDir;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const changeDirection = useCallback((newDir) => {
    setDirection(prev => {
      if (prev[0] + newDir[0] === 0 && prev[1] + newDir[1] === 0) {
        return prev;
      }
      return newDir;
    });
  }, []);

  return { snake, food, gameOver, score, highScore, resetGame, changeDirection, GRID_SIZE };
};
