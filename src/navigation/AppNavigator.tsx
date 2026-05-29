import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import {
  HomeScreen,
  LearningScreen,
  ReviewScreen,
  ParentScreen,
  SettingsScreen
} from '@screens';
import { StickerScreen } from '../screens/StickerScreen';
import { SleepScreen } from '../screens/SleepScreen';
import { TheaterScreen } from '../screens/TheaterScreen';
import { theme } from '@types';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          ),
        }}
      />
      <Tab.Screen
        name="Learning"
        component={LearningScreen}
        options={{
          tabBarLabel: '学习',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="book" />
          ),
        }}
      />
      <Tab.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          tabBarLabel: '复习',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="refresh" />
          ),
        }}
      />
      <Tab.Screen
        name="Parent"
        component={ParentScreen}
        options={{
          tabBarLabel: '家长',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings" />
          ),
        }}
      />
      <Tab.Screen
        name="Stickers"
        component={StickerScreen}
        options={{
          tabBarLabel: '贴纸',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="star" />
          ),
        }}
      />
      <Tab.Screen
        name="Sleep"
        component={SleepScreen}
        options={{
          tabBarLabel: '睡前',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="moon" />
          ),
        }}
      />
      <Tab.Screen
        name="Theater"
        component={TheaterScreen}
        options={{
          tabBarLabel: '剧场',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="theater" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

interface TabBarIconProps {
  focused: boolean;
  name: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, name }) => {
  // TODO: Implement actual icons
  return (
    <View style={{
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{
        color: focused ? theme.primary : theme.textSecondary,
        fontSize: 20,
      }}>
        {name === 'home' ? '🏠' :
         name === 'book' ? '📚' :
         name === 'refresh' ? '🔄' :
         name === 'star' ? '⭐' :
         name === 'moon' ? '🌙' :
         name === 'theater' ? '🎬' :
         '⚙️'}
      </Text>
    </View>
  );
};

// Parent Auth Guard Component
const ParentAuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [pin, setPin] = React.useState('');
  const [showPinPad, setShowPinPad] = React.useState(true);

  const parentPin = '1234'; // Default parent PIN

  const handlePinSubmit = () => {
    if (pin === parentPin) {
      setIsAuthenticated(true);
      setShowPinPad(false);
    } else {
      Alert.alert('错误', '密码错误，请重试');
      setPin('');
    }
  };

  if (showPinPad) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 24,
          marginBottom: 30,
          color: theme.text,
        }}>
          家长模式
        </Text>
        <Text style={{
          fontSize: 16,
          marginBottom: 20,
          color: theme.textSecondary,
        }}>
          请输入密码
        </Text>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '80%',
          marginBottom: 20,
        }}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
            <TouchableOpacity
              key={num}
              style={{
                width: 60,
                height: 60,
                margin: 5,
                backgroundColor: theme.surface,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setPin(prev => prev + num)}
            >
              <Text style={{ fontSize: 24, color: theme.text }}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%' }}>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              margin: 5,
              backgroundColor: theme.error,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setPin('')}
          >
            <Text style={{ fontSize: 24, color: '#FFFFFF' }}>⌫</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              margin: 5,
              backgroundColor: theme.primary,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handlePinSubmit}
          >
            <Text style={{ fontSize: 24, color: '#FFFFFF' }}>✓</Text>
          </TouchableOpacity>
        </View>
        {pin.length > 0 && (
          <Text style={{
            fontSize: 20,
            marginTop: 20,
            color: theme.textSecondary,
          }}>
            {pin.split('').map(() => '*').join('')}
          </Text>
        )}
      </View>
    );
  }

  return <>{children}</>;
};

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen
          name="Parent"
          component={() => (
            <ParentAuthGuard>
              <ParentScreen />
            </ParentAuthGuard>
          )}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
  );
};