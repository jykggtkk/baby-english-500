import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { Container } from '@components/common/Container';
import { BigButton } from '@components/common/BigButton';
import { useAudio } from '@contexts/AudioContext';
import { Sentence } from '@types';
import { playSound } from '@utils/sound';

const { width, height } = Dimensions.get('window');

interface AnimationScreenProps {
  sentence: Sentence;
  onNext: () => void;
  onPlayAudio?: () => void;
}

export const AnimationScreen: React.FC<AnimationScreenProps> = ({
  sentence,
  onNext,
  onPlayAudio,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Auto play animation after fade in
    const timer = setTimeout(() => {
      playAnimation();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const playAnimation = async () => {
    setIsPlaying(true);
    setProgress(0);

    // Simulate animation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Play audio
    try {
      if (sentence.audio_url) {
        await playSound(sentence.audio_url);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }

    setTimeout(() => {
      clearInterval(interval);
      setIsPlaying(false);
    }, 3000);
  };

  const handlePlayAgain = () => {
    playAnimation();
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Title */}
          <Text style={styles.title}>情景动画</Text>

          {/* Animation area */}
          <View style={styles.animationContainer}>
            <View style={styles.animationPlaceholder}>
              <Text style={styles.animationText}>
                {sentence.english}
              </Text>
              <Text style={styles.chineseText}>
                {sentence.chinese}
              </Text>
              <Text style={styles.sceneText}>
                场景：{sentence.scene}
              </Text>
            </View>

            {/* Progress indicator */}
            {isPlaying && (
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progress}%` }
                  ]}
                />
              </View>
            )}

            {/* Animation visualization */}
            <View style={styles.animationVisual}>
              <Text style={styles.animationEmoji}>
                🎬 {isPlaying ? '播放中...' : '准备播放'}
              </Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <BigButton
              title="再听一遍"
              onPress={handlePlayAgain}
              color={isPlaying ? theme.textSecondary : theme.accent}
            />
          </View>

          {/* Next button */}
          <TouchableOpacity
            onPress={onNext}
            style={[
              styles.nextButton,
              isPlaying && styles.nextButtonDisabled
            ]}
            disabled={isPlaying}
          >
            <Text style={styles.nextButtonText}>下一步</Text>
          </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationPlaceholder: {
    width: width * 0.8,
    height: height * 0.4,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  animationText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  chineseText: {
    fontSize: 20,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 10,
  },
  sceneText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
  },
  animationVisual: {
    marginTop: 30,
    alignItems: 'center',
  },
  animationEmoji: {
    fontSize: 24,
    color: '#4ECDC4',
  },
  controls: {
    marginVertical: 30,
  },
  nextButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});