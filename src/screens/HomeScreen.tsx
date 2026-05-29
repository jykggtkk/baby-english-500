import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Container } from '@components/common/Container';
import { TigerAnimation } from '@components/common/TigerAnimation';
import { BigButton } from '@components/common/BigButton';
import { ProgressBar } from '@components/common/ProgressBar';
import { theme } from '@types';
import { useAppState } from '@contexts/StateContext';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen: React.FC = () => {
  const { state, dispatch, setTigerState } = useAppState();
  const { totalSentences, masteredSentences, tigerState } = state;
  const navigation = useNavigation();

  // Tiger name - can be customized later
  const tigerName = "小虎";

  useEffect(() => {
    // Set tiger state based on time of day
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setTigerState('happy');
    } else if (hour >= 12 && hour < 18) {
      setTigerState('happy');
    } else {
      setTigerState('sleepy');
    }
  }, []);

  const progress = totalSentences > 0 ? (masteredSentences / totalSentences) * 100 : 0;
  const todayTask = 3; // TODO: Get from daily plan

  const handleStartLearning = () => {
    // Start learning mode and navigate to learning screen
    dispatch({ type: 'SET_LEARNING_STATUS', payload: true });
    navigation.navigate('Learning');
  };

  const handleParentMode = () => {
    // Navigate to parent screen with navigation guard
    navigation.navigate('Parent');
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* App Title */}
        <Text style={styles.title}>宝宝英语短句乐园</Text>

        {/* Tiger Animation */}
        <View style={styles.tigerContainer}>
          <TigerAnimation state={tigerState} size={200} />
          <Text style={styles.tigerName}>{tigerName}</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            已学习 {masteredSentences}/{totalSentences} 句
          </Text>
          <ProgressBar progress={progress} />
        </View>

        {/* Today's Task */}
        <View style={styles.taskContainer}>
          <Text style={styles.taskText}>今天：{todayTask}个新句子</Text>
        </View>

        {/* Start Button */}
        <View style={styles.buttonContainer}>
          <BigButton onPress={handleStartLearning} title="开始学习" />
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.achievementsTitle}>本周勋章</Text>
          <View style={styles.achievements}>
            <Text style={styles.achievement}>🏆</Text>
            <Text style={styles.achievement}>🎯</Text>
            <Text style={styles.achievement}>💎</Text>
          </View>
        </View>

        {/* Parent Entry */}
        <TouchableOpacity
          onPress={handleParentMode}
          style={styles.parentEntry}
        >
          <Text style={styles.parentText}>👨‍👩‍👧 家长模式</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 20,
  },
  tigerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  tigerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
    marginTop: 10,
  },
  progressContainer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 20,
  },
  progressText: {
    fontSize: 18,
    marginBottom: 10,
    color: theme.text,
  },
  taskContainer: {
    backgroundColor: theme.secondary + '40',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 20,
  },
  taskText: {
    fontSize: 16,
    color: theme.text,
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 20,
  },
  achievementsContainer: {
    marginVertical: 20,
  },
  achievementsTitle: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: 10,
  },
  achievements: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  achievement: {
    fontSize: 30,
  },
  parentEntry: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: theme.surface,
    padding: 10,
    borderRadius: 20,
    elevation: 3,
  },
  parentText: {
    fontSize: 14,
    color: theme.textSecondary,
  },
});