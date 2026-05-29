import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from './Container';

interface SafeAreaContainerProps {
  children: React.ReactNode;
  style?: any;
}

export const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  style
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <Container style={style}>
        {children}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});