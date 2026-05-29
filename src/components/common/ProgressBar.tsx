import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { theme } from '@types';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  style?: ViewStyle;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = theme.primary,
  backgroundColor = theme.textSecondary + '30',
  showPercentage = true,
  style,
  height = 30
}) => {
  return (
    <View style={[
      styles.container,
      { height },
      style
    ]}>
      <View
        style={[
          styles.background,
          { backgroundColor, height }
        ]}
      >
        <View
          style={[
            styles.progress,
            {
              width: `${Math.min(100, Math.max(0, progress))}%`,
              backgroundColor: color,
              height
            }
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.text}>
          {Math.round(progress)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    marginBottom: 10,
  },
  background: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 15,
  },
  text: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    zIndex: 1,
  },
});