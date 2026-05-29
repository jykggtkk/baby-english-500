import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { theme } from '@types';

interface CircleProgressProps {
  progress: number; // 0-100
  size?: number;
  color?: string;
  backgroundColor?: string;
  strokeWidth?: number;
  showPercentage?: boolean;
  style?: any;
}

export const CircleProgress: React.FC<CircleProgressProps> = ({
  progress,
  size = 120,
  color = theme.primary,
  backgroundColor = theme.textSecondary + '30',
  strokeWidth = 10,
  showPercentage = true,
  style,
}) => {
  const normalizedRadius = (size - strokeWidth) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Center text */}
      {showPercentage && (
        <View style={styles.centerText}>
          <Animated.Text style={[
            styles.percentageText,
            {
              color: theme.text,
              fontSize: size * 0.2,
            }
          ]}>
            {Math.round(progress)}%
          </Animated.Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontWeight: 'bold',
  },
});