import { useState, useEffect } from 'react';
import { useSnakeGame } from './useSnakeGame';
import { FiArrowUp, FiArrowDown, FiArrowLeft, FiArrowRight, FiAward } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import './SnakeGame.css';

export const SnakeGame = () => {
  const { snake, food, gameOver, score, highScore, resetGame, changeDirection, GRID_SIZE } = useSnakeGame();
  const [leaderboard, setLeaderboard] = useState([]);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useEffect(() => {
    if (gameOver && score > 0) {
      checkHighScore();
    }
  }, [gameOver]);

  const loadLeaderboard = async () => {
    const { data } = await supabase
      .from('snake_scores')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);
    
    setLeaderboard(data || []);
  };

  const checkHighScore = async () => {
    if (leaderboard.length < 10 || score > leaderboard[leaderboard.length - 1]?.score) {
      setShowNamePrompt(true);
    }
  };

  const submitScore = async () => {
    if (!playerName.trim()) return;
    
    await supabase
      .from('snake_scores')
      .insert({ player_name: playerName, score });
    
    setShowNamePrompt(false);
    setPlayerName('');
    loadLeaderboard();
  };

  return (
    <div className="snake-game">
      <div className="snake-game-header">
        <div className="snake-score">
          <span className="snake-label">SCORE</span>
          <span className="snake-value">{score}</span>
        </div>
        <div className="snake-score">
          <span className="snake-label">HIGH SCORE</span>
          <span className="snake-value">{highScore}</span>
        </div>
        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          style={{ background: 'rgba(255,215,0,0.2)', border: '1px solid gold', borderRadius: '8px', padding: '8px 12px', color: 'gold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <FiAward /> Top 10
        </button>
      </div>

      {showLeaderboard && (
        <div style={{ background: 'rgba(0,0,0,0.9)', padding: '16px', borderRadius: '8px', marginBottom: '16px', maxHeight: '200px', overflowY: 'auto' }}>
          <h3 style={{ color: 'gold', marginBottom: '12px', textAlign: 'center' }}>🏆 Global Leaderboard</h3>
          {leaderboard.map((entry, i) => (
            <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', color: i < 3 ? 'gold' : '#0f0', fontSize: '14px' }}>
              <span>#{i + 1} {entry.player_name}</span>
              <span>{entry.score}</span>
            </div>
          ))}
        </div>
      )}

      <div className="snake-board-container">
        <div className="snake-board">
          {Array.from({ length: GRID_SIZE }).map((_, row) =>
            Array.from({ length: GRID_SIZE }).map((_, col) => {
              const isSnakeHead = snake[0][0] === row && snake[0][1] === col;
              const isSnakeBody = snake.slice(1).some(s => s[0] === row && s[1] === col);
              const isFood = food[0] === row && food[1] === col;

              return (
                <div
                  key={`${row}-${col}`}
                  className={`snake-cell ${
                    isSnakeHead ? 'snake-head' :
                    isSnakeBody ? 'snake-body' :
                    isFood ? 'snake-food' : ''
                  }`}
                />
              );
            })
          )}
        </div>

        {gameOver && (
          <div className="snake-game-over">
            <div className="snake-game-over-content">
              {showNamePrompt ? (
                <>
                  <div className="snake-crashed">NEW HIGH SCORE!</div>
                  <div className="snake-final-score">Score: {score}</div>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submitScore()}
                    placeholder="Enter your name"
                    style={{ padding: '8px', background: '#000', border: '2px solid #0f0', color: '#0f0', borderRadius: '4px', marginBottom: '12px', width: '200px' }}
                    autoFocus
                  />
                  <button onClick={submitScore} className="snake-reboot-btn">
                    SUBMIT SCORE
                  </button>
                </>
              ) : (
                <>
                  <div className="snake-crashed">SYSTEM CRASHED</div>
                  <div className="snake-final-score">Final Score: {score}</div>
                  <button onClick={resetGame} className="snake-reboot-btn">
                    REBOOT SYSTEM
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="snake-controls">
        <div className="snake-mobile-controls">
          <button onPointerDown={() => changeDirection([-1, 0])} className="snake-control-btn">
            <FiArrowUp />
          </button>
          <div className="snake-control-row">
            <button onPointerDown={() => changeDirection([0, -1])} className="snake-control-btn">
              <FiArrowLeft />
            </button>
            <button onPointerDown={() => changeDirection([1, 0])} className="snake-control-btn">
              <FiArrowDown />
            </button>
            <button onPointerDown={() => changeDirection([0, 1])} className="snake-control-btn">
              <FiArrowRight />
            </button>
          </div>
        </div>
        <div className="snake-instructions">Use Arrow Keys or Buttons</div>
      </div>
    </div>
  );
};
