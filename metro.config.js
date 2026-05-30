const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: ['lottie', 'mp3', 'mp4', 'ttf', 'woff', 'png', 'jpg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
