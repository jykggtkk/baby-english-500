import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppNavigator } from './navigation/AppNavigator';
import { useTheme } from './utils/hooks/useTheme';
import { DatabaseProvider } from './contexts/DatabaseContext';
import { AudioProvider } from './contexts/AudioContext';
import { StateProvider } from './contexts/StateContext';

export default function App() {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StateProvider>
          <DatabaseProvider>
            <AudioProvider>
              <NavigationContainer theme={theme}>
                <StatusBar
                  style="auto"
                />
                <AppNavigator />
              </NavigationContainer>
            </AudioProvider>
          </DatabaseProvider>
        </StateProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}