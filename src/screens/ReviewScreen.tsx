import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar
} from 'react-native';
import { Container } from '@components/common/Container';
import { TigerAnimation } from '@components/common/TigerAnimation';
import { theme } from '@types';
import { useDatabase, useAppState } from '@contexts';
import { EbbinghausScheduler, qualityToFeedback } from '@utils/ebbinghaus';
import { BigButton } from '@components/common/BigButton';

const { width } = Dimensions.get('window');

interface ReviewItem {
  id: number;
  english: string;
  chinese: string;
  nextReview: string;
  status: 'immediate' | 'scheduled' | 'mastered';
}

export const ReviewScreen: React.FC = () => {
  const { reviewSchedule, sentences, updateReviewSchedule } = useDatabase();
  const { state } = useAppState();
  const [reviewItems, setReviewItems] = React.useState<ReviewItem[]>([]);
  const [selectedReview, setSelectedReview] = React.useState<ReviewItem | null>(null);
  const [showReviewFlow, setShowReviewFlow] = React.useState(false);

  React.useEffect(() => {
    // Map review schedule to review items
    const items: ReviewItem[] = reviewSchedule.map(schedule => {
      const sentence = sentences.find(s => s.id === schedule.sentence_id);
      if (!sentence) return null;

      const now = new Date();
      const nextReview = new Date(schedule.next_review);

      let status: ReviewItem['status'] = 'scheduled';
      if (sentence && schedule.status === 'mastered') {
        status = 'mastered';
      } else if (nextReview <= now) {
        status = 'immediate';
      }

      return {
        id: schedule.id,
        english: sentence.english,
        chinese: sentence.chinese,
        nextReview: formatDate(nextReview),
        status,
      };
    }).filter(Boolean) as ReviewItem[];

    setReviewItems(items);
  }, [reviewSchedule, sentences]);

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '明天';
    if (diffDays < 7) return `${diffDays}天后`;
    return `${Math.floor(diffDays / 7)}周后`;
  };

  const getStatusColor = (status: ReviewItem['status']) => {
    switch (status) {
      case 'immediate': return theme.error;
      case 'scheduled': return theme.warning;
      case 'mastered': return theme.success;
      default: return theme.textSecondary;
    }
  };

  const getStatusText = (status: ReviewItem['status']) => {
    switch (status) {
      case 'immediate': return '需要复习';
      case 'scheduled': return '按计划复习';
      case 'mastered': return '已掌握';
      default: return '';
    }
  };

  const handleStartReview = (item: ReviewItem) => {
    setSelectedReview(item);
    setShowReviewFlow(true);
  };

  const handleReviewComplete = (quality: number) => {
    if (!selectedReview) return;

    // Update the review schedule in database
    updateReviewSchedule(selectedReview.id, {
      last_quality: quality,
    });

    // Close review flow and refresh
    setShowReviewFlow(false);
    setSelectedReview(null);
  };

  const renderReviewItem = ({ item }: { item: ReviewItem }) => (
    <TouchableOpacity
      style={styles.reviewItem}
      onPress={() => handleStartReview(item)}
    >
      <View style={styles.reviewItemContent}>
        <View style={styles.reviewItemLeft}>
          <View style={[
            styles.statusDot,
            { backgroundColor: getStatusColor(item.status) }
          ]} />
          <View>
            <Text style={styles.englishText}>{item.english}</Text>
            <Text style={styles.chineseText}>{item.chinese}</Text>
          </View>
        </View>
        <View style={styles.reviewItemRight}>
          <Text style={[
            statusTextStyle,
            { color: getStatusColor(item.status) }
          ]}>
            {getStatusText(item.status)}
          </Text>
          <Text style={styles.nextReviewText}>{item.nextReview}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Review Flow Component
  const ReviewFlow: React.FC<{ item: ReviewItem; onComplete: (quality: number) => void }> = ({ item, onComplete }) => {
    const [currentStep, setCurrentStep] = React.useState<'animation' | 'practice' | 'feedback'>('animation');
    const [selectedQuality, setSelectedQuality] = React.useState<number | null>(null);

    const handleNext = () => {
      if (currentStep === 'animation') {
        setCurrentStep('practice');
      } else if (currentStep === 'practice') {
        setCurrentStep('feedback');
      }
    };

    return (
      <View style={styles.reviewFlow}>
        {currentStep === 'animation' && (
          <View style={styles.reviewStep}>
            <Text style={styles.reviewTitle}>复习句子</Text>
            <View style={styles.animationContainer}>
              <View style={styles.animationPlaceholder}>
                <Text style={styles.animationText}>🎬 {item.english}</Text>
              </View>
              <BigButton onPress={handleNext} title="下一步" />
            </View>
          </View>
        )}

        {currentStep === 'practice' && (
          <View style={styles.reviewStep}>
            <Text style={styles.reviewTitle}>跟读练习</Text>
            <View style={styles.practiceContainer}>
              <Text style={styles.practiceText}>{item.english}</Text>
              <Text style={styles.practiceTextChinese}>{item.chinese}</Text>
              <BigButton onPress={handleNext} title="完成了，我来评分" />
            </View>
          </View>
        )}

        {currentStep === 'feedback' && (
          <View style={styles.reviewStep}>
            <Text style={styles.reviewTitle}>告诉我你记得多少</Text>
            <View style={styles.feedbackContainer}>
              {[0, 1, 2, 3, 4, 5].map(quality => (
                <TouchableOpacity
                  key={quality}
                  style={[
                    styles.qualityButton,
                    selectedQuality === quality && styles.qualitySelected
                  ]}
                  onPress={() => setSelectedQuality(quality)}
                >
                  <Text style={styles.qualityText}>
                    {quality === 5 ? '太棒了！' :
                     quality === 4 ? '很容易' :
                     quality === 3 ? '不错' :
                     quality === 2 ? '有点难' :
                     quality === 1 ? '不太记得' : '完全忘了'}
                  </Text>
                </TouchableOpacity>
              ))}
              <BigButton
                onPress={() => selectedQuality !== null && onComplete(selectedQuality)}
                title="确认"
                disabled={selectedQuality === null}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      {showReviewFlow && selectedReview && (
        <ReviewFlow
          item={selectedReview}
          onComplete={handleReviewComplete}
        />
      )}

      {!showReviewFlow && (
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>复习计划</Text>
          <Text style={styles.subtitle}>今日需要复习 {reviewItems.filter(i => i.status === 'immediate').length} 个句子</Text>
        </View>

        <FlatList
          data={reviewItems}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />

        {reviewItems.length === 0 && (
          <View style={styles.emptyState}>
            <TigerAnimation state="happy" size={150} />
            <Text style={styles.emptyText}>太棒了！暂时没有需要复习的句子</Text>
          </View>
        )}
      </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  list: {
    flexGrow: 1,
  },
  reviewItem: {
    backgroundColor: theme.surface,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  reviewItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  englishText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 2,
  },
  chineseText: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  reviewItemRight: {
    alignItems: 'flex-end',
  },
  nextReviewText: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 2,
  },
  statusTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: theme.text,
    textAlign: 'center',
    marginTop: 20,
  },
  reviewFlow: {
    flex: 1,
    padding: 20,
  },
  reviewStep: {
    flex: 1,
    justifyContent: 'space-between',
  },
  reviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationPlaceholder: {
    backgroundColor: theme.surface,
    borderRadius: 20,
    padding: 40,
    marginBottom: 30,
    elevation: 3,
  },
  animationText: {
    fontSize: 24,
    color: theme.text,
    textAlign: 'center',
  },
  practiceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  practiceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  practiceTextChinese: {
    fontSize: 20,
    color: theme.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  feedbackContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  qualityButton: {
    backgroundColor: theme.surface,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  qualitySelected: {
    borderColor: theme.primary,
    backgroundColor: theme.primary + '20',
  },
  qualityText: {
    fontSize: 16,
    color: theme.text,
    textAlign: 'center',
    fontWeight: '500',
  },
});