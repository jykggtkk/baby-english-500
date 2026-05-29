import { useNavigation } from '@react-navigation/native';
import { theme } from '@types';

export const useTheme = () => {
  const navigation = useNavigation();

  // Return a mock navigation theme for now
  // In a real app, this would return the actual navigation theme
  return {
    ...theme,
    colors: {
      ...theme,
    },
    dark: false,
    mode: 'light',
  };
};