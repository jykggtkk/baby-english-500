import React, { useState, useEffect } from 'react';
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
import { TigerAnimation } from '@components/common/TigerAnimation';
import { RecordButton } from '@components/common/RecordButton';
import { BigButton } from '@components/common/BigButton';
import { Sentence } from '@types';
import { playSound } from '@utils/sound';

const { width, height } = Dimensions.get('window');

interface PracticeScreenProps {
  sentence: Sentence;
  onNext: () => void;
  onPlayAudio?: () => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  sentence,
  onNext,
  onPlayAudio,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  const handleRecordPress = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setRecordingTime(0);
      setShowSuccess(true);

      // Show success message
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);

      // Simulate recording timer
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 3) {
            clearInterval(timer);
            return 3;
          }
          return prev + 0.1;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(timer);
        setIsRecording(false);
        setRecordingTime(0);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }, 3000);
    }
  };

  const handlePlayAudio = async () => {
    try {
      if (sentence.audio_url) {
        await playSound(sentence.audio_url);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const getRecordingStyle = () => {
    return {
      transform: [
        {
          scale: pulseAnim,
        },
      ],
    };
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>跟我一起说</Text>

        {/* Tiger Animation */}
        <View style={styles.tigerContainer}>
          <TigerAnimation
            state={isRecording ? 'excited' : 'learning'}
            size={150}
            style={getRecordingStyle()}
          />
        </View>

        {/* Sentence Display */}
        <View style={styles.sentenceContainer}>
          <Text style={styles.englishText}>{sentence.english}</Text>
          <Text style={styles.chineseText}>{sentence.chinese}</Text>
        </View>

        {/* Recording Area */}
        <View style={styles.recordingContainer}>
          <TouchableOpacity
            onPress={handleRecordPress}
            style={[
              styles.recordButton,
              isRecording && styles.recordButtonActive,
            ]}
          >
            <RecordButton
              isRecording={isRecording}
              onPress={handleRecordPress}
              size={80}
            />
          </TouchableOpacity>

          {/* Recording Timer */}
          {isRecording && (
            <Text style={styles.timerText}>
              {Math.floor(recordingTime)}秒
            </Text>
          )}

          {/* Success Animation */}
          {showSuccess && (
            <Animated.View style={styles.successContainer}>
              <Text style={styles.successText}>说得真好！✅</Text>
            </Animated.View>
          )}
        </View>

        {/* Audio Controls */}
        <View style={styles.audioControls}>
          <TouchableOpacity onPress={handlePlayAudio} style={styles.playButton}>
            <Text style={styles.playButtonText}>🎵 听发音</Text>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          onPress={onNext}
          style={styles.nextButton}
          disabled={isRecording}
        >
          <Text style={styles.nextButtonText}>下一步</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  tigerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  sentenceContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  englishText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  chineseText: {
    fontSize: 20,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  recordingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  recordButton: {
    marginBottom: 20,
  },
  recordButtonActive: {
    transform: [{ scale: 1.1 }],
  },
  timerText: {
    fontSize: 16,
    color: '#FF6B6B',
    marginTop: 10,
  },
  successContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  successText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  audioControls: {
    alignItems: 'center',
    marginVertical: 10,
  },
  playButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});