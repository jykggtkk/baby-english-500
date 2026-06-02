import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import Sound from 'react-native-sound';

interface AudioContextType {
  isPlaying: boolean;
  currentSound: Sound | null;
  playSound: (url: string, volume?: number) => Promise<void>;
  stopSound: () => void;
  pauseSound: () => void;
  resumeSound: () => void;
  preloadSound: (url: string) => Promise<void>;
  isSoundLoaded: (url: string) => boolean;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [loadedSounds, setLoadedSounds] = useState<Set<string>>(new Set());
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);

  // Initialize Sound
  useEffect(() => {
    Sound.setCategory('Playback');
    Sound.setActive(true);

    return () => {
      // Cleanup
      if (currentSound) {
        currentSound.release();
      }
      loadedSounds.forEach(soundUrl => {
        const sound = new Sound(soundUrl, Sound.MAIN_BUNDLE, (error) => {
          if (!error) {
            sound.release();
          }
        });
      });
    };
  }, []);

  const playSound = async (url: string, volume: number = 1.0) => {
    return new Promise<void>((resolve, reject) => {
      // Stop current sound if playing
      if (currentSound) {
        currentSound.stop();
        currentSound.release();
        setCurrentSound(null);
        setIsPlaying(false);
      }

      // Check if sound is already loaded
      const sound = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          reject(error);
          return;
        }

        // Add to loaded sounds if not already there
        if (!loadedSounds.has(url)) {
          setLoadedSounds(prev => new Set(prev).add(url));
        }

        sound.setNumberOfLoops(0);
        sound.setVolume(isMuted ? 0 : volume * volume);

        sound.play((success) => {
          if (success) {
            setIsPlaying(false);
          }
          resolve();
        });

        setCurrentSound(sound);
        setIsPlaying(true);
      });
    });
  };

  const stopSound = () => {
    if (currentSound) {
      currentSound.stop();
      currentSound.release();
      setCurrentSound(null);
      setIsPlaying(false);
    }
  };

  const pauseSound = () => {
    if (currentSound) {
      currentSound.pause();
      setIsPlaying(false);
    }
  };

  const resumeSound = () => {
    if (currentSound) {
      currentSound.play();
      setIsPlaying(true);
    }
  };

  const preloadSound = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (loadedSounds.has(url)) {
        resolve();
        return;
      }

      const sound = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          reject(error);
        } else {
          setLoadedSounds(prev => new Set(prev).add(url));
          sound.release();
          resolve();
        }
      });
    });
  };

  const isSoundLoaded = (url: string): boolean => {
    return loadedSounds.has(url);
  };

  const updateVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    if (currentSound) {
      currentSound.setVolume(isMuted ? 0 : clampedVolume);
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (currentSound) {
      currentSound.setVolume(newMutedState ? 0 : volume);
    }
  };

  const value: AudioContextType = {
    isPlaying,
    currentSound,
    playSound,
    stopSound,
    pauseSound,
    resumeSound,
    preloadSound,
    isSoundLoaded,
    setVolume: updateVolume,
    isMuted,
    toggleMute,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};