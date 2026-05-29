import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '@types';

interface BigButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const BigButton: React.FC<BigButtonProps> = ({
  title,
  onPress,
  color = theme.primary,
  disabled = false,
  style,
  textStyle
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? theme.textSecondary : color,
          transform: isPressed ? [{ scale: 0.95 }] : []
        },
        style
      ]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.primary,
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
    minWidth: 200,
  },
  text: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});