import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { Sentence, LearningProgress, ReviewSchedule, ParentSettings } from '@types';
import { initializeDatabase } from '../data/databaseInitializer';

interface DatabaseContextType {
  sentences: Sentence[];
  learningProgress: LearningProgress[];
  reviewSchedule: ReviewSchedule[];
  parentSettings: ParentSettings | null;
  isLoading: boolean;
  addProgress: (progress: LearningProgress) => void;
  updateProgress: (id: number, status: 'new' | 'learning' | 'mastered') => void;
  addReviewSchedule: (schedule: ReviewSchedule) => void;
  updateReviewSchedule: (id: number, schedule: Partial<ReviewSchedule>) => void;
  getParentSettings: () => ParentSettings | null;
  updateParentSettings: (settings: ParentSettings) => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [db, setDb] = React.useState<any>(null);
  const [sentences, setSentences] = React.useState<Sentence[]>([]);
  const [learningProgress, setLearningProgress] = React.useState<LearningProgress[]>([]);
  const [reviewSchedule, setReviewSchedule] = React.useState<ReviewSchedule[]>([]);
  const [parentSettings, setParentSettings] = React.useState<ParentSettings | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Initialize database
  useEffect(() => {
    const initDatabase = async () => {
      try {
        // Initialize database with data
        const database = await initializeDatabase();
        setDb(database);

        // Load initial data
        await loadData(database);

        setIsLoading(false);
      } catch (error) {
        console.error('Database initialization error:', error);
        setIsLoading(false);
      }
    };

    initDatabase();
  }, []);

const loadData = async (db: any) => {
    try {
      // Load sentences
      const sentencesResult = await db.executeSql('SELECT * FROM sentences ORDER BY week, id');
      const sentencesData = sentencesResult[0].rows.raw();
      setSentences(sentencesData);

      // Load learning progress
      const progressResult = await db.executeSql('SELECT * FROM learning_progress ORDER BY created_at DESC');
      const progressData = progressResult[0].rows.raw();
      setLearningProgress(progressData);

      // Load review schedule
      const scheduleResult = await db.executeSql('SELECT * FROM review_schedule WHERE next_review <= datetime("now")');
      const scheduleData = scheduleResult[0].rows.raw();
      setReviewSchedule(scheduleData);

      // Load parent settings
      const settingsResult = await db.executeSql('SELECT * FROM parent_settings ORDER BY id DESC LIMIT 1');
      if (settingsResult[0].rows.length > 0) {
        setParentSettings(settingsResult[0].rows.item(0));
      }

      // Initialize review schedules for new sentences
      await initializeReviewSchedules(db, sentencesData, progressData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const initializeReviewSchedules = async (db: any, sentences: any[], progress: any[]) => {
    const masteredSentenceIds = progress
      .filter(p => p.status === 'mastered')
      .map(p => p.sentence_id);

    const newSentences = sentences.filter(s =>
      !masteredSentenceIds.includes(s.id) &&
      !progress.some(p => p.sentence_id === s.id)
    );

    for (const sentence of newSentences) {
      // Create review schedule using Ebbinghaus algorithm
      const schedule = {
        sentence_id: sentence.id,
        next_review: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
        interval_days: 1,
        ease_factor: 2.5,
        repetitions: 0,
        last_quality: 0,
        created_at: new Date(),
      };

      await db.executeSql(
        `INSERT INTO review_schedule (
          sentence_id, next_review, interval_days, ease_factor,
          repetitions, last_quality, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          schedule.sentence_id,
          schedule.next_review.toISOString(),
          schedule.interval_days,
          schedule.ease_factor,
          schedule.repetitions,
          schedule.last_quality,
          schedule.created_at.toISOString(),
        ]
      );
    }
  };

  const addProgress = (progress: LearningProgress) => {
    setLearningProgress(prev => [...prev, progress]);
  };

  const updateProgress = (id: number, status: 'new' | 'learning' | 'mastered') => {
    const now = new Date();
    const updatedProgress = {
      ...learningProgress.find(p => p.id === id),
      status,
      learned_at: status === 'mastered' ? now : undefined,
    };

    setLearningProgress(prev =>
      prev.map(p => p.id === id ? updatedProgress : p)
    );
  };

  const addReviewSchedule = (schedule: ReviewSchedule) => {
    setReviewSchedule(prev => [...prev, schedule]);
  };

  const updateReviewSchedule = (id: number, updates: Partial<ReviewSchedule>) => {
    setReviewSchedule(prev =>
      prev.map(s => s.id === id ? { ...s, ...updates } : s)
    );
  };

  const getParentSettings = () => {
    return parentSettings;
  };

  const updateParentSettings = (settings: ParentSettings) => {
    setParentSettings(settings);
  };

  const value: DatabaseContextType = {
    sentences,
    learningProgress,
    reviewSchedule,
    parentSettings,
    isLoading,
    addProgress,
    updateProgress,
    addReviewSchedule,
    updateReviewSchedule,
    getParentSettings,
    updateParentSettings,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};