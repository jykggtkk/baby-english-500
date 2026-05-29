import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert
} from 'react-native';
import { Container } from '@components/common/Container';
import { TigerAnimation } from '@components/common/TigerAnimation';
import { theme } from '@types';
import { useAppState } from '@contexts/StateContext';
import { AnimationScreen } from './AnimationScreen';
import { PracticeScreen } from './PracticeScreen';
import { GameScreen } from './GameScreen';
import { useDatabase } from '@contexts/DatabaseContext';
import { BigButton } from '@components/common/BigButton';

const { width, height } = Dimensions.get('window');

export const LearningScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'animation' | 'practice' | 'game'>('animation');
  const [currentSentence, setCurrentSentence] = useState<any>(null);
  const [isLearning, setIsLearning] = useState(false);
  const { sentences, learningProgress } = useDatabase();
  const { state, dispatch } = useAppState();

  const handleNextStep = () => {
    if (currentStep === 'animation') {
      setCurrentStep('practice');
    } else if (currentStep === 'practice') {
      setCurrentStep('game');
    }
  };

  const handleComplete = () => {
    // Mark sentence as learned and navigate back
    console.log('Learning complete!');

    // Update progress in database
    if (currentSentence) {
      dispatch({ type: 'UPDATE_PROGRESS', payload: {
        id: Date.now(),
        sentence_id: currentSentence.id,
        status: 'mastered',
        learned_at: new Date(),
        created_at: new Date(),
      }});
    }

    // Reset state and go back to home
    setIsLearning(false);
    setCurrentStep('animation');
    setCurrentSentence(null);
  };

  const startNewLesson = () => {
    // Get a new sentence that hasn't been mastered yet
    const newSentences = sentences.filter(s =>
      !learningProgress.some(p => p.sentence_id === s.id && p.status === 'mastered')
    );

    if (newSentences.length > 0) {
      const randomIndex = Math.floor(Math.random() * newSentences.length);
      setCurrentSentence(newSentences[randomIndex]);
      setCurrentStep('animation');
      setIsLearning(true);
    } else {
      // All sentences mastered
      Alert.alert('恭喜！', '你已经学会了所有的句子！');
    }
  };

  useEffect(() => {
    // Check if we should start learning from state
    if (state.isLearning && !currentSentence) {
      startNewLesson();
    }
  }, [state.isLearning, currentSentence]);

  // If no sentence selected and not in learning mode, show start button
  if (!currentSentence && !isLearning) {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerContainer}>
          <TigerAnimation state="happy" size={200} />
          <Text style={styles.title}>开始学习新句子</Text>
          <Text style={styles.subtitle}>每次学习3个步骤：看动画、跟读、玩游戏</Text>
          <BigButton
            onPress={startNewLesson}
            title="开始学习"
            style={styles.startButton}
          />
        </View>
      </Container>
    );
  }

  const renderStep = () => {
    if (!currentSentence) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      );
    }

    switch (currentStep) {
      case 'animation':
        return (
          <AnimationScreen
            sentence={currentSentence}
            onNext={handleNextStep}
          />
        );
      case 'practice':
        return (
          <PracticeScreen
            sentence={currentSentence}
            onNext={handleNextStep}
          />
        );
      case 'game':
        return (
          <GameScreen
            sentence={currentSentence}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      {renderStep()}
    </Container>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 20,
    color: theme.text,
  },
  startButton: {
    marginTop: 20,
    width: 200,
  },
});