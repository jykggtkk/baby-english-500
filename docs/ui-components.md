# UI组件库详细设计

## 组件架构说明

本组件库专为3岁幼儿英语学习APP设计，遵循以下原则：
1. 简单直观：每个组件功能单一
2. 视觉友好：色彩鲜艳，形状圆润
3. 交互安全：误操作不会导致退出
4. 性能优化：轻量级，动画流畅

## 1. 布局组件

### Container
```typescript
// 基础容器组件
export const Container: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
}> = ({ children, style, safeArea = true }) => {
  return (
    <View style={[
      styles.container,
      safeArea && styles.safeArea,
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  safeArea: {
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    paddingBottom: Platform.OS === 'ios' ? 34 : 0,
  },
});
```

### SafeAreaContainer
```typescript
// 处理刘海屏等特殊屏幕
export const SafeAreaContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
};
```

## 2. 文本组件

### TitleText
```typescript
// 大标题文本
export const TitleText: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({ children, color = '#333333' }) => {
  return (
    <Text style={[
      styles.titleText,
      { color }
    ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
```

### SentenceText
```typescript
// 句子显示文本
export const SentenceText: React.FC<{
  text: string;
  color?: string;
  size?: 'large' | 'medium' | 'small';
}> = ({ text, color = '#333333', size = 'large' }) => {
  const fontSizeMap = {
    large: 32,
    medium: 24,
    small: 20,
  };
  
  return (
    <Text style={[
      styles.sentenceText,
      {
        fontSize: fontSizeMap[size],
        color,
      }
    ]}>
      {text}
    </Text>
  );
};
```

## 3. 按钮组件

### BigButton
```typescript
// 大按钮组件
export const BigButton: React.FC<{
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}> = ({ 
  title, 
  onPress, 
  color = '#4ECDC4',
  disabled = false,
  icon 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.bigButton,
        { 
          backgroundColor: disabled ? '#CCCCCC' : color,
          transform: isPressed ? [{ scale: 0.95 }] : []
        }
      ]}
    >
      {icon && <View style={styles.buttonIcon}>{icon}</View>}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
```

### IconButton
```typescript
// 图标按钮组件
export const IconButton: React.FC<{
  icon: React.ReactNode;
  onPress: () => void;
  size?: number;
  color?: string;
}> = ({ icon, onPress, size = 60, color = '#4ECDC4' }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.8}
      style={[
        styles.iconButton,
        {
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
        }
      ]}
    >
      <View style={[
        styles.iconButtonInner,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        }
      ]}>
        {icon}
      </View>
    </TouchableOpacity>
  );
};
```

### RecordButton
```typescript
// 录音按钮组件
export const RecordButton: React.FC<{
  isRecording: boolean;
  onPress: () => void;
}> = ({ isRecording, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.recordButton,
        isRecording && styles.recordButtonActive
      ]}
    >
      <Icon 
        name="microphone" 
        size={40} 
        color={isRecording ? '#FFFFFF' : '#FFFFFF'} 
      />
      {isRecording && (
        <View style={styles.recordWave}>
          {[1, 2, 3].map((i) => (
            <View 
              key={i}
              style={[
                styles.waveBar,
                {
                  height: 10 + i * 10,
                  animation: 'pulse 1s infinite',
                  animationDelay: `${i * 0.1}s`,
                }
              ]}
            />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};
```

## 4. 进度组件

### ProgressBar
```typescript
// 进度条组件
export const ProgressBar: React.FC<{
  progress: number; // 0-100
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
}> = ({ 
  progress, 
  color = '#4ECDC4',
  backgroundColor = '#E0E0E0',
  showPercentage = true 
}) => {
  return (
    <View style={[
      styles.progressBarContainer,
      { backgroundColor }
    ]}>
      <View 
        style={[
          styles.progressBar,
          { 
            width: `${progress}%`,
            backgroundColor: color
          }
        ]}
      />
      {showPercentage && (
        <Text style={styles.progressText}>
          {Math.round(progress)}%
        </Text>
      )}
    </View>
  );
};
```

### CircleProgress
```typescript
// 圆形进度组件
export const CircleProgress: React.FC<{
  progress: number;
  size?: number;
  color?: string;
  backgroundColor?: string;
}> = ({ 
  progress, 
  size = 120,
  color = '#4ECDC4',
  backgroundColor = '#E0E0E0' 
}) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* 背景圆 */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={10}
          fill="none"
        />
        {/* 进度圆 */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={10}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* 中心文字 */}
        <Text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dy=".3em"
          fontSize={24}
          fontWeight="bold"
          fill="#333333"
        >
          {Math.round(progress)}%
        </Text>
      </Svg>
    </View>
  );
};
```

## 5. 动画组件

### TigerAnimation
```typescript
// 老虎动画组件
export const TigerAnimation: React.FC<{
  state: 'idle' | 'happy' | 'sleepy' | 'excited' | 'learning';
  size?: number;
}> = ({ state, size = 200 }) => {
  const animations = {
    idle: require('assets/tiger/idle.gif'),
    happy: require('assets/tiger/happy.gif'),
    sleepy: require('assets/tiger/sleepy.gif'),
    excited: require('assets/tiger/excited.gif'),
    learning: require('assets/tiger/learning.gif')
  };
  
  return (
    <View style={{ width: size, height: size }}>
      <LottieView
        source={animations[state]}
        autoPlay
        loop
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  );
};
```

### PulseAnimation
```typescript
// 脉冲动画组件
export const PulseAnimation: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <View style={styles.pulseContainer}>
      <Animated.View style={[
        styles.pulseRing,
        {
          transform: [
            {
              scale: pulseScale.value,
            },
          ],
        },
      ]} />
      {children}
    </View>
  );
};

const usePulseAnimation = () => {
  const pulseScale = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseScale, {
        toValue: 1.1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(pulseScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);
    
    const pulseLoop = Animated.loop(pulse);
    pulseLoop.start();
    
    return () => pulseLoop.stop();
  }, []);
  
  return pulseScale;
};
```

## 6. 列表组件

### SentenceList
```typescript
// 句子列表组件
export const SentenceList: React.FC<{
  sentences: Sentence[];
  onPress: (sentence: Sentence) => void;
  showProgress?: boolean;
}> = ({ sentences, onPress, showProgress = true }) => {
  return (
    <FlatList
      data={sentences}
      renderItem={({ item }) => (
        <SentenceItem
          sentence={item}
          onPress={() => onPress(item)}
          showProgress={showProgress}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const SentenceItem: React.FC<{
  sentence: Sentence;
  onPress: () => void;
  showProgress: boolean;
}> = ({ sentence, onPress, showProgress }) => {
  const getStatusColor = () => {
    if (sentence.mastered) return '#4CAF50';
    if (sentence.reviewNeeded) return '#FF9800';
    return '#2196F3';
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.sentenceItem}
    >
      <View style={styles.sentenceItemLeft}>
        <View style={[
          styles.statusDot,
          { backgroundColor: getStatusColor() }
        ]} />
        <Text style={styles.sentenceText}>
          {sentence.english}
        </Text>
      </View>
      {showProgress && (
        <Text style={styles.sentenceChinese}>
          {sentence.chinese}
        </Text>
      )}
    </TouchableOpacity>
  );
};
```

### AchievementGrid
```typescript
// 成就网格组件
export const AchievementGrid: React.FC<{
  achievements: Achievement[];
  onAchievementPress?: (achievement: Achievement) => void;
}> = ({ achievements, onAchievementPress }) => {
  return (
    <FlatList
      data={achievements}
      renderItem={({ item }) => (
        <AchievementItem
          achievement={item}
          onPress={() => onAchievementPress?.(item)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      contentContainerStyle={styles.achievementGrid}
      showsVerticalScrollIndicator={false}
    />
  );
};

const AchievementItem: React.FC<{
  achievement: Achievement;
  onPress: () => void;
}> = ({ achievement, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.achievementItem}
    >
      <View style={[
        styles.achievementIcon,
        achievement.unlocked && styles.achievementIconUnlocked
      ]}>
        <Icon 
          name={achievement.icon} 
          size={40} 
          color={achievement.unlocked ? '#FFD700' : '#CCCCCC'} 
        />
      </View>
      <Text style={[
        styles.achievementText,
        achievement.unlocked && styles.achievementTextUnlocked
      ]}>
        {achievement.title}
      </Text>
    </TouchableOpacity>
  );
};
```

## 7. 游戏组件

### FindImageGame
```typescript
// 找图片游戏组件
export const FindImageGame: React.FC<{
  sentence: Sentence;
  options: ImageOption[];
  onCorrect: () => void;
  onWrong: () => void;
}> = ({ sentence, options, onCorrect, onWrong }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleSelect = (index: number) => {
    if (isAnimating || selectedOption !== null) return;
    
    setIsAnimating(true);
    setSelectedOption(index);
    
    if (options[index].isCorrect) {
      // 正确答案
      onCorrect();
    } else {
      // 错误答案
      onWrong();
    }
    
    // 动画结束后重置
    setTimeout(() => {
      setSelectedOption(null);
      setIsAnimating(false);
    }, 1000);
  };
  
  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameTitle}>
        {sentence.english}
      </Text>
      
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(index)}
            style={[
              styles.optionItem,
              selectedOption === index && styles.optionSelected,
              option.isCorrect && selectedOption === index && styles.optionCorrect,
              !option.isCorrect && selectedOption === index && styles.optionWrong,
              isAnimating && styles.optionDisabled
            ]}
          >
            <Image 
              source={option.image} 
              style={styles.optionImage} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
```

### SelectSentenceGame
```typescript
// 选句子游戏组件
export const SelectSentenceGame: React.FC<{
  image: ImageSourcePropType;
  sentences: SentenceOption[];
  correctIndex: number;
  onSelect: (index: number) => void;
}> = ({ image, sentences, correctIndex, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    setShowResult(true);
    onSelect(index);
    
    // 2秒后重置
    setTimeout(() => {
      setSelectedOption(null);
      setShowResult(false);
    }, 2000);
  };
  
  return (
    <View style={styles.gameContainer}>
      <Image source={image} style={styles.gameImage} />
      
      <View style={styles.sentencesContainer}>
        {sentences.map((sentence, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(index)}
            style={[
              styles.sentenceOption,
              selectedOption === index && styles.sentenceOptionSelected,
              index === correctIndex && showResult && styles.sentenceOptionCorrect,
              index !== correctIndex && selectedOption === index && showResult && styles.sentenceOptionWrong
            ]}
          >
            <Text style={styles.sentenceOptionText}>
              {sentence.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
```

## 8. 音频组件

### AudioPlayer
```typescript
// 音频播放组件
export const AudioPlayer: React.FC<{
  source: string;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
}> = ({ source, onPlay, onPause, onStop }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const soundRef = useRef<Sound | null>(null);
  
  useEffect(() => {
    // 初始化音频
    soundRef.current = new Sound(source, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
    });
    
    // 清理
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, [source]);
  
  const handlePlay = () => {
    if (soundRef.current) {
      soundRef.current.play((success) => {
        if (success) {
          setIsPlaying(false);
          onStop?.();
        }
      });
      setIsPlaying(true);
      onPlay?.();
    }
  };
  
  const handlePause = () => {
    if (soundRef.current) {
      soundRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    }
  };
  
  return (
    <View style={styles.audioPlayer}>
      <TouchableOpacity
        onPress={isPlaying ? handlePause : handlePlay}
        style={styles.playButton}
      >
        <Icon 
          name={isPlaying ? 'pause' : 'play'} 
          size={30} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>
      
      <View style={styles.progressContainer}>
        <View style={[
          styles.progressBar,
          { width: `${progress}%` }
        ]} />
      </View>
    </View>
  );
};
```

## 9. 动画样式

```typescript
// 全局动画样式
const styles = StyleSheet.create({
  // 按钮样式
  bigButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
  buttonIcon: {
    marginRight: 10,
  },
  
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  // 录音按钮样式
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  
  recordButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  
  recordWave: {
    position: 'absolute',
    bottom: -20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  
  waveBar: {
    width: 4,
    backgroundColor: '#FF6B6B',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  
  // 游戏样式
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  gameTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  
  optionItem: {
    width: 100,
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    transform: [{ scale: 1 }],
  },
  
  optionSelected: {
    transform: [{ scale: 1.1 }],
    elevation: 5,
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
    width: '100%',
    height: '100%',
  },
  
  // 成就样式
  achievementGrid: {
    padding: 10,
  },
  
  achievementItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  
  achievementIconUnlocked: {
    backgroundColor: '#FFD700',
  },
  
  achievementText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  
  achievementTextUnlocked: {
    color: '#333333',
    fontWeight: 'bold',
  },
});
```

## 组件使用示例

### 完整的学习流程组件组合

```typescript
// 学习流程组件组合
const LearningFlow: React.FC<{
  sentence: Sentence;
  onComplete: () => void;
}> = ({ sentence, onComplete }) => {
  const [step, setStep] = useState<'animation' | 'practice' | 'game'>('animation');
  
  return (
    <Container>
      {step === 'animation' && (
        <AnimationScreen
          sentence={sentence}
          onNext={() => setStep('practice')}
        />
      )}
      
      {step === 'practice' && (
        <PracticeScreen
          sentence={sentence}
          onNext={() => setStep('game')}
        />
      )}
      
      {step === 'game' && (
        <FindImageGame
          sentence={sentence}
          options={getGameOptions(sentence)}
          onCorrect={onComplete}
          onWrong={() => {}}
        />
      )}
    </Container>
  );
};
```

这个组件库提供了所有基础UI组件，可以根据具体需求组合使用。每个组件都针对3岁幼儿的使用习惯进行了优化，确保简单易用且视觉友好。