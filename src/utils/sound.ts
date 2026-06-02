import Sound from 'react-native-sound';

// Sound manager for handling audio playback
export class SoundManager {
  private static instance: SoundManager;
  private sounds: Map<string, Sound> = new Map();
  private preloadQueue: Set<string> = new Set();
  private isMuted: boolean = false;

  private constructor() {
    Sound.setCategory('Playback');
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  /**
   * Preload a sound file
   * @param url - URL or file path of the sound
   * @param volume - Volume level (0-1)
   */
  async preloadSound(url: string, volume: number = 1.0): Promise<void> {
    if (this.sounds.has(url)) {
      return; // Already loaded
    }

    return new Promise((resolve, reject) => {
      const sound = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.error(`Failed to preload sound ${url}:`, error);
          reject(error);
          return;
        }

        sound.setNumberOfLoops(0);
        sound.setVolume(this.isMuted ? 0 : volume);
        this.sounds.set(url, sound);
        this.preloadQueue.delete(url);
        resolve();
      });
    });
  }

  /**
   * Play a sound
   * @param url - URL or file path of the sound
   * @param volume - Volume level (0-1)
   * @param numberOfLoops - Number of times to loop (0 = play once)
   * @returns Promise that resolves when playback completes
   */
  async playSound(
    url: string,
    volume: number = 1.0,
    numberOfLoops: number = 0
  ): Promise<void> {
    // Check if sound is loaded, preload if necessary
    if (!this.sounds.has(url)) {
      await this.preloadSound(url, volume);
    }

    const sound = this.sounds.get(url);
    if (!sound) {
      throw new Error(`Sound not found: ${url}`);
    }

    return new Promise((resolve, reject) => {
      sound.setNumberOfLoops(numberOfLoops);
      sound.setVolume(this.isMuted ? 0 : volume);

      sound.play((success) => {
        if (success) {
          resolve();
        } else {
          reject(new Error('Sound playback failed'));
        }
      });
    });
  }

  /**
   * Stop all currently playing sounds
   */
  stopAllSounds(): void {
    this.sounds.forEach(sound => {
      sound.stop();
    });
  }

  /**
   * Pause all currently playing sounds
   */
  pauseAllSounds(): void {
    this.sounds.forEach(sound => {
      sound.pause();
    });
  }

  /**
   * Resume all paused sounds
   */
  resumeAllSounds(): void {
    this.sounds.forEach(sound => {
      sound.play();
    });
  }

  /**
   * Set global volume
   * @param volume - Volume level (0-1)
   */
  setVolume(volume: number): void {
    this.sounds.forEach(sound => {
      sound.setVolume(this.isMuted ? 0 : volume);
    });
  }

  /**
   * Toggle mute/unmute
   * @param muted - Whether to mute sounds
   */
  setMuted(muted: boolean): void {
    this.isMuted = muted;
    this.sounds.forEach(sound => {
      sound.setVolume(muted ? 0 : sound.getVolume());
    });
  }

  /**
   * Check if a sound is currently playing
   * @param url - URL of the sound
   */
  isSoundPlaying(url: string): boolean {
    const sound = this.sounds.get(url);
    return sound ? sound.getNumberOfLoops() !== 0 : false;
  }

  /**
   * Unload a sound to free memory
   * @param url - URL of the sound
   */
  unloadSound(url: string): void {
    const sound = this.sounds.get(url);
    if (sound) {
      sound.release();
      this.sounds.delete(url);
    }
  }

  /**
   * Clean up all sounds
   */
  dispose(): void {
    this.sounds.forEach(sound => {
      sound.release();
    });
    this.sounds.clear();
    this.preloadQueue.clear();
  }
}

// Global instance
export const soundManager = SoundManager.getInstance();

// Convenience functions
export const playSound = (url: string, volume?: number) =>
  soundManager.playSound(url, volume);

export const preloadSound = (url: string, volume?: number) =>
  soundManager.preloadSound(url, volume);

export const stopAllSounds = () => soundManager.stopAllSounds();

export const setVolume = (volume: number) => soundManager.setVolume(volume);

export const setMuted = (muted: boolean) => soundManager.setMuted(muted);