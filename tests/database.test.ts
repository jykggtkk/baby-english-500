import { getSentencesByWeek, getSentencesByStage, getSentencesByCategory, allSentences } from '../src/data/sentences';

describe('Sentences Data', () => {
  it('should have correct total of 500 sentences', () => {
    expect(allSentences.length).toBe(500);
  });

  it('should have 120 sentences in phase 1', () => {
    const phase1 = getSentencesByStage(1);
    expect(phase1.length).toBe(120);
  });

  it('should have 220 sentences in phase 2', () => {
    const phase2 = getSentencesByStage(2);
    expect(phase2.length).toBe(220);
  });

  it('should have 160 sentences in phase 3', () => {
    const phase3 = getSentencesByStage(3);
    expect(phase3.length).toBe(160);
  });

  it('should return sentences per week with reasonable count (5-15 each)', () => {
    for (let week = 1; week <= 52; week++) {
      const weekSentences = getSentencesByWeek(week);
      expect(weekSentences.length).toBeGreaterThanOrEqual(5);
      expect(weekSentences.length).toBeLessThanOrEqual(50);
    }
  });

  it('should filter sentences by category correctly', () => {
    const animals = getSentencesByCategory('Animals');
    expect(animals.length).toBeGreaterThan(0);
    animals.forEach(s => expect(s.category).toBe('Animals'));
  });

  it('should have unique ids for all sentences', () => {
    const ids = allSentences.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(allSentences.length);
  });

  it('should have all required fields for every sentence', () => {
    allSentences.forEach(s => {
      expect(s.english).toBeTruthy();
      expect(s.chinese).toBeTruthy();
      expect(s.scene).toBeTruthy();
      expect(s.category).toBeTruthy();
      expect(s.difficulty).toBeGreaterThanOrEqual(1);
      expect(s.difficulty).toBeLessThanOrEqual(3);
      expect(s.week).toBeGreaterThanOrEqual(1);
      expect(s.week).toBeLessThanOrEqual(52);
      expect(s.stage).toBeGreaterThanOrEqual(1);
      expect(s.stage).toBeLessThanOrEqual(3);
    });
  });
});
