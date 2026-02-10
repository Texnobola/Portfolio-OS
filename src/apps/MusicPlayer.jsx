import { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2 } from 'react-icons/fi';
import './MusicPlayer.css';

const tracks = [
  {
    id: 1,
    title: 'Lofi Study Session',
    artist: 'Chill Beats',
    url: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    cover: '🎵',
  },
  {
    id: 2,
    title: 'Synthwave Dreams',
    artist: 'Retro Wave',
    url: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    cover: '🎹',
  },
  {
    id: 3,
    title: 'Jazz Cafe',
    artist: 'Smooth Jazz',
    url: 'https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3',
    cover: '🎷',
  },
];

export const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextTrack = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const handlePrevious = () => {
    const prevTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const track = tracks[currentTrack];

  return (
    <div className="music-player">
      <audio ref={audioRef} src={track.url} />
      
      <div className="player-header">
        <div className={`album-cover ${isPlaying ? 'spinning' : ''}`}>
          <span>{track.cover}</span>
        </div>
        <div className="track-info">
          <div className="track-title">{track.title}</div>
          <div className="track-artist">{track.artist}</div>
        </div>
      </div>

      <div className="visualizer">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`bar ${isPlaying ? 'active' : ''}`} style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>

      <div className="progress-bar">
        <span className="time">{formatTime(currentTime)}</span>
        <div className="progress">
          <div className="progress-fill" style={{ width: `${(currentTime / duration) * 100}%` }} />
        </div>
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="player-controls">
        <button onClick={handlePrevious} className="control-btn">
          <FiSkipBack />
        </button>
        <button onClick={handlePlayPause} className="control-btn play-btn">
          {isPlaying ? <FiPause /> : <FiPlay />}
        </button>
        <button onClick={handleNext} className="control-btn">
          <FiSkipForward />
        </button>
      </div>

      <div className="volume-control">
        <FiVolume2 />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-slider"
        />
      </div>
    </div>
  );
};
