import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

interface TigerAnimationProps {
  state: 'idle' | 'happy' | 'sleepy' | 'excited' | 'learning';
  size?: number;
}

export const TigerAnimation: React.FC<TigerAnimationProps> = ({
  state,
  size = 200
}) => {
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    // Reset animation when state changes
    lottieRef.current?.reset();
  }, [state]);

  const getAnimationSource = () => {
    // TODO: Replace with actual animation files
    switch (state) {
      case 'idle':
        return require('@assets/tiger-idle.json');
      case 'happy':
        return require('@assets/tiger-happy.json');
      case 'sleepy':
        return require('@assets/tiger-sleepy.json');
      case 'excited':
        return require('@assets/tiger-excited.json');
      case 'learning':
        return require('@assets/tiger-learning.json');
      default:
        return require('@assets/tiger-idle.json');
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <LottieView
        ref={lottieRef}
        source={getAnimationSource()}
        autoPlay
        loop
        style={[
          styles.animation,
          { width: size * 0.9, height: size * 0.9 }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    position: 'absolute',
  },
});