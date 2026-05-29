import { initializeDatabase } from './databaseInitializer';
import { allSentences } from './sentences';

describe('DatabaseInitializer', () => {
  test('should have correct number of sentences', () => {
    expect(allSentences.length).toBeGreaterThan(0);
  });

  test('should have all required fields for sentences', () => {
    const firstSentence = allSentences[0];
    expect(firstSentence).toHaveProperty('english');
    expect(firstSentence).toHaveProperty('chinese');
    expect(firstSentence).toHaveProperty('scene');
    expect(firstSentence).toHaveProperty('category');
    expect(firstSentence).toHaveProperty('week');
    expect(firstSentence).toHaveProperty('stage');
  });

  test('should have valid week numbers', () => {
    const weeks = allSentences.map(s => s.week);
    expect(Math.min(...weeks)).toBe(1);
    expect(Math.max(...weeks)).toBeLessThanOrEqual(52);
  });
});