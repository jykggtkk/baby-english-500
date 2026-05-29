import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Icon } from 'react-native-vector-icons';
import { theme } from '@types';

interface IconButtonProps {
  name: string;
  size?: number;
  color?: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  backgroundColor?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  name,
  size = 24,
  color = theme.text,
  onPress,
  style,
  disabled = false,
  backgroundColor = 'transparent',
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.container,
        style,
        disabled && styles.disabled,
      ]}
    >
      <View style={[
        styles.button,
        {
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
        },
        { backgroundColor },
        isPressed && styles.pressed,
      ]}>
        <Icon
          name={name}
          size={size}
          color={disabled ? theme.textSecondary : color}
        />
      </View>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  pressed: {
    transform: [{ scale: 0.95 }],
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});