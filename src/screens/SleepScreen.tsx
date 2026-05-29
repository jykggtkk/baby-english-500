import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { Container } from '@components/common/Container';
import { TigerAnimation } from '@components/common/TigerAnimation';
import { theme } from '@types';
import { useDatabase } from '@contexts/DatabaseContext';
import { useAudio } from '@contexts/AudioContext';

const { width } = Dimensions.get('window');
const TIMER_OPTIONS = [10, 20, 30];

export const SleepScreen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(10);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);
  const { sentences, learningProgress } = useDatabase();
  const { playSound, stopSound } = useAudio();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const masteredSentences = sentences.filter(s =>
    learningProgress.some(p => p.sentence_id === s.id && p.status === 'mastered')
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSound();
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeRemaining(selectedTimer * 60);
    startPlayback();
    startTimer();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setTimeRemaining(0);
    setCurrentSentenceIndex(-1);
    if (timerRef.current) clearInterval(timerRef.current);
    stopSound();
  };

  const startPlayback = () => {
    if (masteredSentences.length === 0) return;
    playNextSentence(0);
  };

  const playNextSentence = (index: number) => {
    if (index >= masteredSentences.length) {
      setCurrentSentenceIndex(0);
      playNextSentence(0);
      return;
    }
    setCurrentSentenceIndex(index);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      if (masteredSentences[index]?.audio_url) {
        playSound(masteredSentences[index].audio_url).then(() => {
          setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              playNextSentence(index + 1);
            });
          }, 3000);
        });
      } else {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            playNextSentence(index + 1);
          });
        }, 3000);
      }
    });
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleStop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number): string => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>晚安音频</Text>
        <View style={styles.tigerContainer}>
          <TigerAnimation state={isPlaying ? 'sleepy' : 'idle'} size={150} />
          <Text style={styles.tigerLabel}>
            {isPlaying ? '正在播放...' : '准备睡觉'}
          </Text>
        </View>

        {isPlaying && currentSentenceIndex >= 0 && (
          <Animated.View style={[styles.sentenceDisplay, { opacity: fadeAnim }]}>
            <Text style={styles.sentenceText}>
              {masteredSentences[currentSentenceIndex]?.english}
            </Text>
            <Text style={styles.sentenceChinese}>
              {masteredSentences[currentSentenceIndex]?.chinese}
            </Text>
          </Animated.View>
        )}

        {!isPlaying && (
          <View style={styles.timerSection}>
            <Text style={styles.timerLabel}>定时关闭</Text>
            <View style={styles.timerOptions}>
              {TIMER_OPTIONS.map(min => (
                <TouchableOpacity
                  key={min}
                  style={[
                    styles.timerButton,
                    selectedTimer === min && styles.timerButtonActive,
                  ]}
                  onPress={() => setSelectedTimer(min)}
                >
                  <Text style={[
                    styles.timerButtonText,
                    selectedTimer === min && styles.timerButtonTextActive,
                  ]}>
                    {min}分钟
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {isPlaying && (
          <Text style={styles.timeRemaining}>{formatTime(timeRemaining)}</Text>
        )}

        <View style={styles.controls}>
          {!isPlaying ? (
            <TouchableOpacity
              style={[styles.playButton, masteredSentences.length === 0 && styles.playButtonDisabled]}
              onPress={handlePlay}
              disabled={masteredSentences.length === 0}
            >
              <Text style={styles.playButtonText}>▶ 开始播放</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
              <Text style={styles.stopButtonText}>■ 停止</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.sentenceCount}>
          {masteredSentences.length > 0
            ? `${masteredSentences.length} 个已学句子`
            : '还没有已学句子'}
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.text, textAlign: 'center', marginVertical: 20 },
  tigerContainer: { alignItems: 'center', marginVertical: 30 },
  tigerLabel: { fontSize: 16, color: theme.textSecondary, marginTop: 10 },
  sentenceDisplay: {
    backgroundColor: theme.surface, borderRadius: 20, padding: 30,
    marginVertical: 20, alignItems: 'center', elevation: 3, width: width * 0.8,
  },
  sentenceText: { fontSize: 28, fontWeight: 'bold', color: theme.text, textAlign: 'center', marginBottom: 10 },
  sentenceChinese: { fontSize: 18, color: theme.textSecondary, textAlign: 'center' },
  timerSection: { alignItems: 'center', marginVertical: 20 },
  timerLabel: { fontSize: 18, color: theme.text, marginBottom: 15 },
  timerOptions: { flexDirection: 'row', justifyContent: 'center', gap: 15 },
  timerButton: {
    paddingHorizontal: 25, paddingVertical: 12, borderRadius: 25,
    backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.textSecondary + '30',
  },
  timerButtonActive: { backgroundColor: theme.secondary, borderColor: theme.primary },
  timerButtonText: { fontSize: 16, color: theme.textSecondary },
  timerButtonTextActive: { color: theme.text, fontWeight: 'bold' },
  timeRemaining: { fontSize: 24, color: theme.primary, fontWeight: 'bold', marginVertical: 20 },
  controls: { marginVertical: 30 },
  playButton: {
    backgroundColor: theme.primary, paddingHorizontal: 60, paddingVertical: 18,
    borderRadius: 30, elevation: 5,
  },
  playButtonDisabled: { backgroundColor: theme.textSecondary + '50' },
  playButtonText: { fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' },
  stopButton: {
    backgroundColor: theme.error, paddingHorizontal: 60, paddingVertical: 18,
    borderRadius: 30, elevation: 5,
  },
  stopButtonText: { fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' },
  sentenceCount: { fontSize: 14, color: theme.textSecondary, marginTop: 10 },
});
