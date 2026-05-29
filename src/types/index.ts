export interface Sentence {
  id: number;
  english: string;
  chinese: string;
  scene: string;
  category: string;
  difficulty: number;
  week: number;
  stage: number;
  image_url?: string;
  animation_url?: string;
  audio_url?: string;
}

export interface LearningProgress {
  id: number;
  sentence_id: number;
  status: 'new' | 'learning' | 'mastered';
  learned_at?: Date;
  created_at: Date;
}

export interface ReviewSchedule {
  id: number;
  sentence_id: number;
  next_review: Date;
  interval_days: number;
  ease_factor: number;
  repetitions: number;
  last_quality: number; // 0-5
  created_at: Date;
}

export interface ParentSettings {
  id: number;
  daily_limit: number; // minutes
  eye_protection: boolean;
  sound_enabled: boolean;
  reminder_enabled: boolean;
  created_at: Date;
}

export interface Sticker {
  id: string;
  name: string;
  category: string;
  image_url: string;
  description?: string;
}

export interface StickerCollection {
  id: number;
  sticker_id: string;
  category: string;
  earned_at: Date;
}

export interface AppState {
  currentSentence: Sentence | null;
  learningProgress: LearningProgress[];
  reviewSchedule: ReviewSchedule[];
  isLearning: boolean;
  currentStep: 'animation' | 'practice' | 'game';
  tigerState: 'idle' | 'happy' | 'sleepy' | 'excited' | 'learning';
  stickerCount: number;
  totalSentences: number;
  masteredSentences: number;
  dailyLimit: number;
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
}

export const theme: Theme = {
  primary: '#4ECDC4',
  secondary: '#95E1D3',
  accent: '#FFB366',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};