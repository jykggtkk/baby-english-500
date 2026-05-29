import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ReviewScreen,
  ReviewDetailScreen,
  ReviewCompleteScreen,
} from '@screens';
import { theme } from '@types';

const Stack = createNativeStackNavigator();

export const ReviewNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="ReviewMain" component={ReviewScreen} />
      <Stack.Screen
        name="ReviewDetail"
        component={ReviewDetailScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ReviewComplete"
        component={ReviewCompleteScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};