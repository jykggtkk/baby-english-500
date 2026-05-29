import { EbbinghausScheduler, qualityToFeedback } from '../src/utils/ebbinghaus';

describe('EbbinghausScheduler', () => {
  it('should calculate first review interval correctly for quality >= 3', () => {
    const item = {
      sentence_id: 1,
      ease_factor: 2.5,
      repetitions: 0,
      interval_days: 0,
      last_quality: 5,
      next_review: new Date(),
    };
    const result = EbbinghausScheduler.calculateNextReview(item, 5);
    expect(result.interval_days).toBeGreaterThanOrEqual(1);
    expect(result.repetitions).toBe(1);
    expect(result.ease_factor).toBeGreaterThan(1.3);
  });

  it('should reset repetition count when quality < 3', () => {
    const item = {
      sentence_id: 1,
      ease_factor: 2.5,
      repetitions: 3,
      interval_days: 10,
      last_quality: 4,
      next_review: new Date(),
    };
    const result = EbbinghausScheduler.calculateNextReview(item, 1);
    expect(result.repetitions).toBe(0);
    expect(result.interval_days).toBe(1);
  });

  it('should increase interval with successive correct recalls', () => {
    const item = {
      sentence_id: 1,
      ease_factor: 2.5,
      repetitions: 2,
      interval_days: 6,
      last_quality: 4,
      next_review: new Date(),
    };
    const result = EbbinghausScheduler.calculateNextReview(item, 4);
    expect(result.interval_days).toBeGreaterThan(6);
    expect(result.repetitions).toBe(3);
  });

  it('should keep ease_factor at minimum 1.3', () => {
    const result = EbbinghausScheduler.calculateNextReview(
      { sentence_id: 1, ease_factor: 1.3, repetitions: 0, interval_days: 0, last_quality: 0, next_review: new Date() },
      0
    );
    expect(result.ease_factor).toBeGreaterThanOrEqual(1.3);
  });

  it('should calculate priority with higher score for overdue items', () => {
    const overdueItem = {
      sentence_id: 1, ease_factor: 2.0, repetitions: 3, interval_days: 7, last_quality: 4,
      next_review: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    };
    const futureItem = {
      sentence_id: 2, ease_factor: 2.0, repetitions: 3, interval_days: 7, last_quality: 4,
      next_review: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };
    const overduePriority = EbbinghausScheduler.getReviewPriority(overdueItem);
    const futurePriority = EbbinghausScheduler.getReviewPriority(futureItem);
    expect(overduePriority).toBeGreaterThan(futurePriority);
  });
});

describe('qualityToFeedback', () => {
  it('should return encouraging feedback for high quality', () => {
    expect(qualityToFeedback(5)).toBe('太棒了！');
    expect(qualityToFeedback(4)).toBe('太棒了！');
  });
  it('should return neutral feedback for medium quality', () => {
    expect(qualityToFeedback(3)).toBe('不错！');
  });
  it('should return constructive feedback for low quality', () => {
    expect(qualityToFeedback(0)).toBe('需要重新学习');
    expect(qualityToFeedback(1)).toBe('需要更多练习');
  });
});
