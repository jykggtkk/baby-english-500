module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@types': './src/types',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
          '@contexts': './src/contexts',
          '@data': './src/data',
        },
      },
    ],
  ],
};