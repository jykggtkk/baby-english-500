import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform, ViewStyle } from 'react-native';
import { theme } from '@types';

interface ContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  safeArea = true
}) => {
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
    backgroundColor: theme.background,
  },
  safeArea: {
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    paddingBottom: Platform.OS === 'ios' ? 34 : 0,
  },
});