import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  FlatList,
} from 'react-native';
import { Container } from '@components/common/Container';
import { TigerAnimation } from '@components/common/TigerAnimation';
import { BigButton } from '@components/common/BigButton';
import { Sentence } from '@types';
import { playSound } from '@utils/sound';

const { width, height } = Dimensions.get('window');

interface GameOption {
  id: number;
  image: string;
  label: string;
  isCorrect: boolean;
}

interface GameScreenProps {
  sentence: Sentence;
  onComplete: () => void;
  type?: 'find-image' | 'select-sentence';
}

export const GameScreen: React.FC<GameScreenProps> = ({
  sentence,
  onComplete,
  type = 'find-image',
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [gameOptions, setGameOptions] = useState<GameOption[]>([]);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Generate game options
    generateGameOptions();
  }, []);

  const generateGameOptions = () => {
    // This is a simplified version - in a real app, you'd fetch from database
    const allOptions: GameOption[] = [
      { id: 1, image: '👶🏻', label: '宝宝', isCorrect: true },
      { id: 2, image: '🍎', label: '苹果', isCorrect: false },
      { id: 3, image: '🐶', label: '小狗', isCorrect: false },
      { id: 4, image: '🏠', label: '房子', isCorrect: false },
      { id: 5, image: '🚗', label: '汽车', isCorrect: false },
      { id: 6, image: '🌞', label: '太阳', isCorrect: false },
    ];

    // Shuffle options and select 3
    const shuffled = [...allOptions].sort(() => Math.random() - 0.5);
    setGameOptions(shuffled.slice(0, 3));
  };

  const handleSelectOption = (optionId: number) => {
    if (selectedOption !== null) return; // Already selected

    setSelectedOption(optionId);
    const option = gameOptions.find(opt => opt.id === optionId);
    const correct = option?.isCorrect || false;
    setIsCorrect(correct);

    // Play feedback sound
    if (correct) {
      // Play success sound
      playSound('assets/sounds/success.mp3');
    } else {
      // Play error sound and shake
      playSound('assets/sounds/error.mp3');
      shakeAnimation();
    }

    // Complete after delay
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderOption = ({ item }: { item: GameOption }) => (
    <TouchableOpacity
      onPress={() => handleSelectOption(item.id)}
      style={[
        styles.optionButton,
        selectedOption === item.id && styles.optionSelected,
        isCorrect !== null && item.isCorrect && styles.optionCorrect,
        isCorrect !== null && !item.isCorrect && selectedOption === item.id && styles.optionWrong,
      ]}
      disabled={selectedOption !== null}
    >
      <Text style={styles.optionImage}>{item.image}</Text>
      <Text style={styles.optionLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Title */}
          <Text style={styles.title}>
            {type === 'find-image' ? '听句子，找图片' : '看图片，选句子'}
          </Text>

          {/* Tiger Animation */}
          <View style={styles.tigerContainer}>
            <TigerAnimation
              state={isCorrect === true ? 'happy' : isCorrect === false ? 'sleepy' : 'learning'}
              size={120}
            />
          </View>

          {/* Audio/Text Display */}
          {type === 'find-image' ? (
            <Text style={styles.audioText}>
              🔊 {sentence.english}
            </Text>
          ) : (
            <View style={styles.imageContainer}>
              <Text style={styles.gameImage}>
                🏠
              </Text>
              <Text style={styles.sceneText}>
                场景：{sentence.scene}
              </Text>
            </View>
          )}

          {/* Options */}
          <View style={styles.optionsContainer}>
            <FlatList
              data={gameOptions}
              renderItem={renderOption}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.optionsList}
            />
          </View>

          {/* Result Feedback */}
          {isCorrect !== null && (
            <Animated.View style={[
              styles.resultContainer,
              {
                transform: [{ translateX: shakeAnim }],
              }
            ]}>
              <Text style={[
                styles.resultText,
                isCorrect ? styles.correctText : styles.wrongText
              ]}>
                {isCorrect ? '✅ 答对了！' : '❌ 再试试'}
              </Text>
            </Animated.View>
          )}

          {/* Progress */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              完成 {gameOptions.length}/{gameOptions.length} 题
            </Text>
          </View>
        </Animated.View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  tigerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  audioText: {
    fontSize: 24,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  gameImage: {
    fontSize: 80,
    marginBottom: 10,
  },
  sceneText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  optionsContainer: {
    marginVertical: 20,
  },
  optionsList: {
    paddingHorizontal: 20,
  },
  optionButton: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionSelected: {
    borderWidth: 3,
    borderColor: '#4ECDC4',
    transform: [{ scale: 1.05 }],
  },
  optionCorrect: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  optionWrong: {
    borderWidth: 3,
    borderColor: '#F44336',
  },
  optionImage: {
    fontSize: 40,
    marginBottom: 5,
  },
  optionLabel: {
    fontSize: 14,
    color: '#333333',
  },
  resultContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  correctText: {
    color: '#4CAF50',
  },
  wrongText: {
    color: '#F44336',
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  progressText: {
    fontSize: 16,
    color: '#666666',
  },
});