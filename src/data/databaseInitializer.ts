import { openDatabase } from 'react-native-sqlite-storage';
import { allSentences } from './sentences';

export const initializeDatabase = async () => {
  try {
    const db = await openDatabase({
      name: 'baby_english.db',
      createFromLocation: 1,
      location: 'default',
    });

    // Create tables
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS sentences (
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
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS learning_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sentence_id INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        learned_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sentence_id) REFERENCES sentences(id)
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS review_schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sentence_id INTEGER NOT NULL,
        next_review TIMESTAMP NOT NULL,
        interval_days INTEGER NOT NULL,
        ease_factor REAL DEFAULT 1.3,
        repetitions INTEGER DEFAULT 0,
        last_quality INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sentence_id) REFERENCES sentences(id)
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS parent_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        daily_limit INTEGER DEFAULT 15,
        eye_protection BOOLEAN DEFAULT TRUE,
        sound_enabled BOOLEAN DEFAULT TRUE,
        reminder_enabled BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert initial sentences if empty
    const result = await db.executeSql('SELECT COUNT(*) as count FROM sentences');
    if (result[0].rows.item(0).count === 0) {
      for (const sentence of allSentences) {
        await db.executeSql(
          `INSERT INTO sentences (english, chinese, scene, category, difficulty, week, stage)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [sentence.english, sentence.chinese, sentence.scene,
           sentence.category, sentence.difficulty, sentence.week, sentence.stage]
        );
      }
    }

    // Insert default parent settings if empty
    const settingsResult = await db.executeSql('SELECT COUNT(*) as count FROM parent_settings');
    if (settingsResult[0].rows.item(0).count === 0) {
      await db.executeSql(
        `INSERT INTO parent_settings (daily_limit, eye_protection, sound_enabled, reminder_enabled)
         VALUES (?, ?, ?, ?)`,
        [15, true, true, true]
      );
    }

    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
