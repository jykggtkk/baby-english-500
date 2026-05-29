import { openDatabase } from 'react-native-sqlite-storage';
import { Sentence, LearningProgress, ReviewSchedule, ParentSettings } from '@types';

let db: any = null;

export const initDatabase = async (): Promise<void> => {
  try {
    db = await openDatabase({
      name: 'baby_english.db',
      createFromLocation: 1, // Will create in default location
      location: 'default',
    });

    await createTables();
    await insertInitialData();
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

const createTables = async (): Promise<void> => {
  const queries = [
    // Sentences table
    `CREATE TABLE IF NOT EXISTS sentences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      english TEXT NOT NULL,
      chinese TEXT NOT NULL,
      scene TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty INTEGER DEFAULT 1,
      week INTEGER NOT NULL,
      stage INTEGER NOT NULL,
      image_url TEXT,
      animation_url TEXT,
      audio_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Learning progress table
    `CREATE TABLE IF NOT EXISTS learning_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sentence_id INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      learned_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sentence_id) REFERENCES sentences(id)
    )`,

    // Review schedule table
    `CREATE TABLE IF NOT EXISTS review_schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sentence_id INTEGER NOT NULL,
      next_review TIMESTAMP NOT NULL,
      interval_days INTEGER NOT NULL,
      ease_factor REAL DEFAULT 1.3,
      repetitions INTEGER DEFAULT 0,
      last_quality INTEGER DEFAULT 0, -- 0-5 scale
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sentence_id) REFERENCES sentences(id)
    )`,

    // Parent settings table
    `CREATE TABLE IF NOT EXISTS parent_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      daily_limit INTEGER DEFAULT 15, -- minutes
      eye_protection BOOLEAN DEFAULT TRUE,
      sound_enabled BOOLEAN DEFAULT TRUE,
      reminder_enabled BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Stickers table
    `CREATE TABLE IF NOT EXISTS stickers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      description TEXT
    )`,

    // Sticker collection table
    `CREATE TABLE IF NOT EXISTS sticker_collection (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sticker_id TEXT NOT NULL,
      category TEXT NOT NULL,
      earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sticker_id) REFERENCES stickers(id)
    )`,

    // Indexes for performance
    `CREATE INDEX IF NOT EXISTS idx_sentences_week ON sentences(week)`,
    `CREATE INDEX IF NOT EXISTS idx_sentences_stage ON sentences(stage)`,
    `CREATE INDEX IF NOT EXISTS idx_sentences_category ON sentences(category)`,
    `CREATE INDEX IF NOT EXISTS idx_progress_status ON learning_progress(status)`,
    `CREATE INDEX IF NOT EXISTS idx_progress_sentence ON learning_progress(sentence_id)`,
    `CREATE INDEX IF NOT EXISTS idx_review_next ON review_schedule(next_review)`,
    `CREATE INDEX IF NOT EXISTS idx_review_sentence ON review_schedule(sentence_id)`,
  ];

  for (const query of queries) {
    await db.executeSql(query);
  }
};

const insertInitialData = async (): Promise<void> => {
  // Check if sentences table has data
  const result = await db.executeSql('SELECT COUNT(*) as count FROM sentences');
  if (result[0].rows.item(0).count === 0) {
    // Insert sentences data
    const sentences = require('@data/sentences').allSentences;
    for (const sentence of sentences) {
      await db.executeSql(
        `INSERT INTO sentences (
          english, chinese, scene, category, difficulty, week, stage
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          sentence.english,
          sentence.chinese,
          sentence.scene,
          sentence.category,
          sentence.difficulty,
          sentence.week,
          sentence.stage,
        ]
      );
    }
  }

  // Check if parent settings exist
  const settingsResult = await db.executeSql('SELECT COUNT(*) as count FROM parent_settings');
  if (settingsResult[0].rows.item(0).count === 0) {
    // Insert default parent settings
    await db.executeSql(
      `INSERT INTO parent_settings (
        daily_limit, eye_protection, sound_enabled, reminder_enabled
      ) VALUES (?, ?, ?, ?)`,
      [15, true, true, true]
    );
  }

  // Insert stickers
  const stickersResult = await db.executeSql('SELECT COUNT(*) as count FROM stickers');
  if (stickersResult[0].rows.item(0).count === 0) {
    const stickers = [
      { id: 'cat-1', name: '小猫咪', category: '动物', image_url: 'assets/stickers/cat-1.png' },
      { id: 'dog-1', name: '小狗狗', category: '动物', image_url: 'assets/stickers/dog-1.png' },
      { id: 'bear-1', name: '小熊', category: '动物', image_url: 'assets/stickers/bear-1.png' },
      { id: 'apple-1', name: '红苹果', category: '水果', image_url: 'assets/stickers/apple-1.png' },
      { id: 'banana-1', name: '香蕉', category: '水果', image_url: 'assets/stickers/banana-1.png' },
      { id: 'cake-1', name: '蛋糕', category: '食物', image_url: 'assets/stickers/cake-1.png' },
      { id: 'ball-1', name: '皮球', category: '玩具', image_url: 'assets/stickers/ball-1.png' },
      { id: 'book-1', name: '书本', category: '学习', image_url: 'assets/stickers/book-1.png' },
      { id: 'star-1', name: '星星', category: '奖励', image_url: 'assets/stickers/star-1.png' },
      { id: 'heart-1', name: '爱心', category: '奖励', image_url: 'assets/stickers/heart-1.png' },
    ];

    for (const sticker of stickers) {
      await db.executeSql(
        `INSERT INTO stickers (
          id, name, category, image_url
        ) VALUES (?, ?, ?, ?)`,
        [sticker.id, sticker.name, sticker.category, sticker.image_url]
      );
    }
  }
};

// Database operations
export const getSentences = async (filters?: {
  week?: number;
  stage?: number;
  category?: string;
}): Promise<Sentence[]> => {
  let query = 'SELECT * FROM sentences';
  const params: any[] = [];

  if (filters) {
    const conditions = [];
    if (filters.week) {
      conditions.push('week = ?');
      params.push(filters.week);
    }
    if (filters.stage) {
      conditions.push('stage = ?');
      params.push(filters.stage);
    }
    if (filters.category) {
      conditions.push('category = ?');
      params.push(filters.category);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
  }

  query += ' ORDER BY week, id';

  const result = await db.executeSql(query, params);
  return result[0].rows.raw();
};

export const getSentencesByWeek = async (week: number): Promise<Sentence[]> => {
  const result = await db.executeSql(
    'SELECT * FROM sentences WHERE week = ? ORDER BY id',
    [week]
  );
  return result[0].rows.raw();
};

export const getLearningProgress = async (): Promise<LearningProgress[]> => {
  const result = await db.executeSql(
    'SELECT * FROM learning_progress ORDER BY created_at DESC'
  );
  return result[0].rows.raw();
};

export const getProgressBySentenceId = async (sentenceId: number): Promise<LearningProgress | null> => {
  const result = await db.executeSql(
    'SELECT * FROM learning_progress WHERE sentence_id = ?',
    [sentenceId]
  );
  return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
};

export const addLearningProgress = async (progress: Omit<LearningProgress, 'id' | 'created_at'>): Promise<void> => {
  await db.executeSql(
    `INSERT INTO learning_progress (
      sentence_id, status, learned_at
    ) VALUES (?, ?, ?)`,
    [progress.sentence_id, progress.status, progress.learned_at]
  );
};

export const updateLearningProgress = async (id: number, updates: Partial<LearningProgress>): Promise<void> => {
  const setClause = Object.keys(updates)
    .filter(key => key !== 'id')
    .map(key => `${key} = ?`)
    .join(', ');

  const values = Object.values(updates).filter((_, index) =>
    Object.keys(updates)[index] !== 'id'
  );

  await db.executeSql(
    `UPDATE learning_progress SET ${setClause} WHERE id = ?`,
    [...values, id]
  );
};

export const getReviewSchedule = async (): Promise<ReviewSchedule[]> => {
  const result = await db.executeSql(
    'SELECT * FROM review_schedule WHERE next_review <= datetime("now") ORDER BY next_review'
  );
  return result[0].rows.raw();
};

export const addReviewSchedule = async (schedule: Omit<ReviewSchedule, 'id' | 'created_at'>): Promise<void> => {
  await db.executeSql(
    `INSERT INTO review_schedule (
      sentence_id, next_review, interval_days, ease_factor, repetitions, last_quality
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      schedule.sentence_id,
      schedule.next_review,
      schedule.interval_days,
      schedule.ease_factor,
      schedule.repetitions,
      schedule.last_quality,
    ]
  );
};

export const updateReviewSchedule = async (id: number, updates: Partial<ReviewSchedule>): Promise<void> => {
  const setClause = Object.keys(updates)
    .filter(key => key !== 'id')
    .map(key => `${key} = ?`)
    .join(', ');

  const values = Object.values(updates).filter((_, index) =>
    Object.keys(updates)[index] !== 'id'
  );

  await db.executeSql(
    `UPDATE review_schedule SET ${setClause} WHERE id = ?`,
    [...values, id]
  );
};

export const getParentSettings = async (): Promise<ParentSettings | null> => {
  const result = await db.executeSql(
    'SELECT * FROM parent_settings ORDER BY id DESC LIMIT 1'
  );
  return result[0].rows.length > 0 ? result[0].rows.item(0) : null;
};

export const updateParentSettings = async (settings: Partial<ParentSettings> & { id: number }): Promise<void> => {
  const setClause = Object.keys(settings)
    .filter(key => key !== 'id')
    .map(key => `${key} = ?`)
    .join(', ');

  const values = Object.values(settings).filter((_, index) =>
    Object.keys(settings)[index] !== 'id'
  );

  await db.executeSql(
    `UPDATE parent_settings SET ${setClause} WHERE id = ?`,
    [...values, settings.id]
  );
};

export const getStickers = async (category?: string): Promise<any[]> => {
  let query = 'SELECT * FROM stickers';
  const params: any[] = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }

  query += ' ORDER BY category, name';

  const result = await db.executeSql(query, params);
  return result[0].rows.raw();
};

export const getCollectedStickers = async (): Promise<any[]> => {
  const result = await db.executeSql(
    'SELECT s.*, sc.earned_at FROM stickers s JOIN sticker_collection sc ON s.id = sc.sticker_id ORDER BY sc.earned_at DESC'
  );
  return result[0].rows.raw();
};

export const addStickerToCollection = async (stickerId: string): Promise<void> => {
  await db.executeSql(
    `INSERT INTO sticker_collection (sticker_id) VALUES (?)`,
    [stickerId]
  );
};

export const isStickerCollected = async (stickerId: string): Promise<boolean> => {
  const result = await db.executeSql(
    'SELECT COUNT(*) as count FROM sticker_collection WHERE sticker_id = ?',
    [stickerId]
  );
  return result[0].rows.item(0).count > 0;
};

export const closeDatabase = async (): Promise<void> => {
  if (db) {
    await db.close();
    db = null;
  }
};