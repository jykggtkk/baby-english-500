import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LearningScreen,
  AnimationScreen,
  PracticeScreen,
  GameScreen,
} from '@screens';
import { theme } from '@types';

const Stack = createNativeStackNavigator();

export const LearningNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="LearningMain" component={LearningScreen} />
      <Stack.Screen
        name="Animation"
        component={AnimationScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{
          animation: 'slide_from_left',
        }}
      />
    </Stack.Navigator>
  );
};