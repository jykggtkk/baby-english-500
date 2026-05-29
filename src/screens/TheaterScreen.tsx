import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  Animated,
} from 'react-native';
import { Container } from '@components/common/Container';
import { TigerAnimation } from '@components/common/TigerAnimation';
import { BigButton } from '@components/common/BigButton';
import { theme } from '@types';
import { useDatabase } from '@contexts/DatabaseContext';

const { width } = Dimensions.get('window');

export const TheaterScreen: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const { sentences } = useDatabase();
  const [fadeAnim] = useState(() => new Animated.Value(1));

  const weekSentences = sentences.filter(s => s.week === currentWeek);
  const totalWeeks = Math.max(...sentences.map(s => s.week), 52);

  useEffect(() => {
    return () => {
      setIsPlaying(false);
      setCurrentSentenceIndex(0);
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentSentenceIndex(0);
    playSentence(0);
  };

  const playSentence = (index: number) => {
    if (index >= weekSentences.length) {
      setTimeout(() => {
        setIsPlaying(false);
        setCurrentSentenceIndex(0);
      }, 2000);
      return;
    }
    setCurrentSentenceIndex(index);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        playSentence(index + 1);
      }, 4000);
    });
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>🎬 情景小剧场</Text>
        <Text style={styles.subtitle}>第 {currentWeek} 周</Text>

        <View style={styles.stage}>
          {!isPlaying ? (
            <View style={styles.stageContent}>
              <TigerAnimation state="happy" size={200} />
              <Text style={styles.stageTitle}>第 {currentWeek} 周情景剧</Text>
              <Text style={styles.stageSentences}>{weekSentences.length} 个句子</Text>
            </View>
          ) : (
            <Animated.View style={[styles.playContent, { opacity: fadeAnim }]}>
              <Text style={styles.sceneLabel}>
                场景 {currentSentenceIndex + 1}/{weekSentences.length}
              </Text>
              <View style={styles.sceneCard}>
                <Text style={styles.englishText}>
                  {weekSentences[currentSentenceIndex]?.english}
                </Text>
                <Text style={styles.chineseText}>
                  {weekSentences[currentSentenceIndex]?.chinese}
                </Text>
              </View>
              <View style={styles.sceneIndicator}>
                {weekSentences.map((_, idx) => (
                  <View key={idx} style={[styles.dot, idx === currentSentenceIndex && styles.dotActive]} />
                ))}
              </View>
            </Animated.View>
          )}
        </View>

        {!isPlaying && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekSelector}>
            {Array.from({ length: totalWeeks }, (_, i) => i + 1).map(week => (
              <TouchableOpacity
                key={week}
                style={[styles.weekButton, currentWeek === week && styles.weekButtonActive]}
                onPress={() => setCurrentWeek(week)}
              >
                <Text style={[styles.weekButtonText, currentWeek === week && styles.weekButtonTextActive]}>
                  第{week}周
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={styles.controls}>
          {!isPlaying ? (
            <BigButton title="▶ 开始播放" onPress={handlePlay} disabled={weekSentences.length === 0} />
          ) : (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => { setIsPlaying(false); setCurrentSentenceIndex(0); }}
            >
              <Text style={styles.skipButtonText}>跳过</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.text, textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 16, color: theme.textSecondary, textAlign: 'center', marginBottom: 20 },
  stage: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: theme.surface, borderRadius: 20, marginVertical: 20,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  stageContent: { alignItems: 'center', padding: 30 },
  stageTitle: { fontSize: 22, fontWeight: 'bold', color: theme.text, marginTop: 20 },
  stageSentences: { fontSize: 16, color: theme.textSecondary, marginTop: 10 },
  playContent: { alignItems: 'center', padding: 30, width: '100%' },
  sceneLabel: { fontSize: 14, color: theme.textSecondary, marginBottom: 20 },
  sceneCard: {
    backgroundColor: theme.secondary + '30', borderRadius: 15, padding: 30,
    width: width * 0.7, alignItems: 'center',
  },
  englishText: { fontSize: 28, fontWeight: 'bold', color: theme.text, textAlign: 'center', marginBottom: 10 },
  chineseText: { fontSize: 18, color: theme.textSecondary, textAlign: 'center' },
  sceneIndicator: { flexDirection: 'row', marginTop: 30, gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.textSecondary + '30' },
  dotActive: { backgroundColor: theme.primary, width: 12, height: 8, borderRadius: 4 },
  weekSelector: { maxHeight: 50, marginVertical: 10 },
  weekButton: {
    paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20,
    backgroundColor: theme.surface, marginHorizontal: 4,
    borderWidth: 1, borderColor: theme.textSecondary + '20',
  },
  weekButtonActive: { backgroundColor: theme.primary, borderColor: theme.primary },
  weekButtonText: { fontSize: 14, color: theme.textSecondary },
  weekButtonTextActive: { color: '#FFFFFF', fontWeight: 'bold' },
  controls: { alignItems: 'center', marginVertical: 20 },
  skipButton: {
    backgroundColor: theme.textSecondary + '30', paddingHorizontal: 40,
    paddingVertical: 12, borderRadius: 25,
  },
  skipButtonText: { fontSize: 16, color: theme.textSecondary },
});
