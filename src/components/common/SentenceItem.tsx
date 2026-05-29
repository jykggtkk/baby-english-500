import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Icon } from 'react-native-vector-icons';
import { Sentence, LearningProgress } from '@types';
import { theme } from '@types';

interface SentenceItemProps {
  sentence: Sentence;
  progress?: LearningProgress;
  onPress: () => void;
  showProgress?: boolean;
  style?: ViewStyle;
}

export const SentenceItem: React.FC<SentenceItemProps> = ({
  sentence,
  progress,
  onPress,
  showProgress = true,
  style,
}) => {
  const getStatus = () => {
    if (!progress) return 'new';
    return progress.status;
  };

  const getStatusColor = () => {
    const status = getStatus();
    switch (status) {
      case 'mastered':
        return theme.success;
      case 'learning':
        return theme.warning;
      case 'new':
      default:
        return theme.primary;
    }
  };

  const getStatusIcon = () => {
    const status = getStatus();
    switch (status) {
      case 'mastered':
        return 'check-circle';
      case 'learning':
        return 'clock';
      case 'new':
      default:
        return 'circle';
    }
  };

  const getStatusText = () => {
    const status = getStatus();
    switch (status) {
      case 'mastered':
        return '已掌握';
      case 'learning':
        return '学习中';
      case 'new':
      default:
        return '未学习';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={styles.leftSection}>
        <Icon
          name={getStatusIcon()}
          size={24}
          color={getStatusColor()}
          style={styles.statusIcon}
        />
        <View style={styles.textSection}>
          <Text style={styles.englishText}>{sentence.english}</Text>
          {showProgress && (
            <Text style={styles.chineseText}>{sentence.chinese}</Text>
          )}
        </View>
      </View>

      {showProgress && (
        <View style={styles.rightSection}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor() }
          ]}>
            {getStatusText()}
          </Text>
          <Text style={styles.difficultyText}>
            难度: {sentence.difficulty}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.surface,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    marginRight: 15,
  },
  textSection: {
    flex: 1,
  },
  englishText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  chineseText: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  difficultyText: {
    fontSize: 12,
    color: theme.textSecondary,
  },
});