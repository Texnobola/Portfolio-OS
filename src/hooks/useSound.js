import { useCallback, useState } from 'react';

const sounds = {
  startup: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
  windowOpen: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
};

export const useSound = () => {
  const [isMuted, setIsMuted] = useState(false);

  const play = useCallback((soundName) => {
    if (isMuted || !sounds[soundName]) return;
    
    const audio = new Audio(sounds[soundName]);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return { play, isMuted, toggleMute };
};
