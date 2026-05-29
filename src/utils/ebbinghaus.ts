import { ReviewSchedule } from '@types';
import { addReviewSchedule, updateReviewSchedule } from './database';

export interface EbbinghausItem {
  sentence_id: number;
  ease_factor: number;
  repetitions: number;
  interval_days: number;
  last_quality: number; // 0-5 scale
  next_review: Date;
}

export class EbbinghausScheduler {
  /**
   * Calculate next review based on SM-2 algorithm (SuperMemo 2)
   * @param item - Current review item
   * @param quality - Quality of recall (0-5)
   * @returns New review schedule
   */
  static calculateNextReview(
    item: EbbinghausItem,
    quality: number
  ): Omit<ReviewSchedule, 'id' | 'created_at'> {
    let newInterval = item.interval_days;
    let newRepetitions = item.repetitions;
    let newEaseFactor = item.ease_factor;
    let newNextReview: Date;

    // Minimum interval days
    const minInterval = 1;

    if (quality >= 3) {
      // Response was correct
      newRepetitions += 1;

      if (newRepetitions === 1) {
        newInterval = 1;
      } else if (newRepetitions === 2) {
        newInterval = 6;
      } else {
        newInterval = Math.round(item.interval_days * newEaseFactor);
      }

      // Update ease factor
      newEaseFactor = newEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

      // Ensure ease factor doesn't go below 1.3
      newEaseFactor = Math.max(1.3, newEaseFactor);
    } else {
      // Response was incorrect - start over
      newRepetitions = 0;
      newInterval = minInterval;
      newEaseFactor = item.ease_factor; // Keep ease factor unchanged
    }

    // Calculate next review date
    newNextReview = new Date();
    newNextReview.setDate(newNextReview.getDate() + newInterval);

    return {
      sentence_id: item.sentence_id,
      next_review: newNextReview,
      interval_days: newInterval,
      ease_factor: newEaseFactor,
      repetitions: newRepetitions,
      last_quality: quality,
    };
  }

  /**
   * Schedule a new sentence for review
   * @param sentenceId - Sentence ID
   * @param quality - Initial quality (typically 5 for new sentences)
   */
  static async scheduleNewSentence(
    sentenceId: number,
    quality: number = 5
  ): Promise<void> {
    const item: EbbinghausItem = {
      sentence_id: sentenceId,
      ease_factor: 2.5, // Starting ease factor
      repetitions: 0,
      interval_days: 1, // Review tomorrow
      last_quality: quality,
      next_review: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    };

    const schedule = this.calculateNextReview(item, quality);
    await addReviewSchedule(schedule);
  }

  /**
   * Update review schedule based on performance
   * @param scheduleId - Review schedule ID
   * @param quality - Quality of recall (0-5)
   */
  static async updateReview(
    scheduleId: number,
    quality: number
  ): Promise<void> {
    // Get current schedule
    // This is a simplified version - in a real app, you'd fetch from database first
    const currentSchedule: EbbinghausItem = {
      sentence_id: 1, // This would come from database
      ease_factor: 2.5,
      repetitions: 1,
      interval_days: 1,
      last_quality: quality,
      next_review: new Date(),
    };

    const newSchedule = this.calculateNextReview(currentSchedule, quality);

    // Update in database
    await updateReviewSchedule(scheduleId, newSchedule);
  }

  /**
   * Get optimal review times for today
   * @returns Array of sentence IDs to review
   */
  static getTodaysReviews(): number[] {
    // In a real implementation, this would query the database
    // For now, return empty array
    return [];
  }

  /**
   * Check if a sentence needs review today
   * @param sentenceId - Sentence ID
   * @returns Boolean indicating if review is needed
   */
  static async needsReview(sentenceId: number): Promise<boolean> {
    // In a real implementation, this would check the database
    // For now, return false
    return false;
  }

  /**
   * Get review priority score for prioritization
   * @param item - Review item
   * @returns Priority score (higher = more urgent)
   */
  static getReviewPriority(item: EbbinghausItem): number {
    const now = new Date();
    const daysOverdue = Math.max(0,
      (now.getTime() - new Date(item.next_review).getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calculate priority based on:
    // 1. How overdue it is (weighted heavily)
    // 2. Ease factor (lower priority for easier items)
    // 3. Number of repetitions (higher priority for items with more repetitions)
    const overdueWeight = daysOverdue * 10;
    const easeWeight = (3 - item.ease_factor) * 2; // Lower ease = higher priority
    const repetitionWeight = item.repetitions * 0.5;

    return overdueWeight + easeWeight + repetitionWeight;
  }

  /**
   * Batch update review schedules
   * @param reviews - Array of review updates
   */
  static async batchUpdateReviews(reviews: Array<{
    scheduleId: number;
    quality: number;
  }>): Promise<void> {
    await Promise.all(
      reviews.map(({ scheduleId, quality }) =>
        this.updateReview(scheduleId, quality)
      )
    );
  }

  /**
   * Reset review schedule for a sentence (useful when restarting)
   * @param sentenceId - Sentence ID
   */
  static async resetReviewSchedule(sentenceId: number): Promise<void> {
    await this.scheduleNewSentence(sentenceId, 5);
  }
}

// Helper functions for quality scoring
export const scoreQuality = (feedback: string): number => {
  // Map feedback to quality scores
  const scoreMap: { [key: string]: number } = {
    'perfect': 5,
    'easy': 4,
    'good': 3,
    'hard': 2,
    'forgot': 1,
    'wrong': 0,
  };

  return scoreMap[feedback.toLowerCase()] || 3;
};

// Convert SM-2 quality score to user-friendly feedback
export const qualityToFeedback = (quality: number): string => {
  if (quality >= 4) return '太棒了！';
  if (quality >= 3) return '不错！';
  if (quality >= 2) return '再试试';
  if (quality >= 1) return '需要更多练习';
  return '需要重新学习';
};

// Review intervals for different quality scores
export const getReviewIntervals = (quality: number): number[] => {
  return [
    1,   // Quality 0 - Wrong
    1,   // Quality 1 - Forgot
    1,   // Quality 2 - Hard
    6,   // Quality 3 - Good
    14,  // Quality 4 - Easy
    30,  // Quality 5 - Perfect
  ][quality] || 1;
};