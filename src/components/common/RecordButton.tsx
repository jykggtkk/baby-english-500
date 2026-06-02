import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '@types';

interface RecordButtonProps {
  isRecording: boolean;
  onPress: () => void;
  size?: number;
  style?: any;
}

export const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  onPress,
  size = 80,
  style,
}) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      style={[
        styles.container,
        style,
        {
          width: size + 40,
          height: size + 40,
        }
      ]}
    >
      <Animated.View
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          isRecording ? styles.recording : styles.normal,
          {
            transform: [{ scale: scale }],
          }
        ]}
      >
        <Ionicons
          name="mic"
          size={size * 0.5}
          color={isRecording ? '#FFFFFF' : theme.primary}
        />
      </Animated.View>

      {/* Recording animation */}
      {isRecording && (
        <View style={styles.waveContainer}>
          {[1, 2, 3].map((i) => (
            <Animated.View
              key={i}
              style={[
                styles.wave,
                {
                  animation: 'pulse 1.5s infinite',
                  animationDelay: `${i * 0.1}s`,
                  height: 4 + i * 6,
                }
              ]}
            />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  normal: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: theme.primary,
  },
  recording: {
    backgroundColor: theme.error,
    borderWidth: 3,
    borderColor: theme.error,
  },
  waveContainer: {
    position: 'absolute',
    bottom: -20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  wave: {
    width: 4,
    backgroundColor: theme.error,
    borderRadius: 2,
    marginHorizontal: 2,
    transformOrigin: 'bottom center',
  },
});