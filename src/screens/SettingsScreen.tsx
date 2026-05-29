import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar
} from 'react-native';
import { Container } from '@components/common/Container';
import { theme } from '@types';

const { width } = Dimensions.get('window');

export const SettingsScreen: React.FC = () => {
  const handleBack = () => {
    // Navigate back to main tabs
    console.log('Navigate back');
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>设置</Text>
        </View>

        <ScrollView style={styles.content}>
          {/* Sound Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>声音设置</Text>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>主音量</Text>
              <View style={styles.volumeSlider}>
                <View style={styles.volumeProgress} />
              </View>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>语音速度</Text>
              <View style={styles.speedOptions}>
                <TouchableOpacity style={styles.speedButton}>
                  <Text style={styles.speedText}>慢速</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.speedButton, styles.speedButtonActive]}>
                  <Text style={[styles.speedText, styles.speedTextActive]}>正常</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.speedButton}>
                  <Text style={styles.speedText}>快速</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Display Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>显示设置</Text>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>文字大小</Text>
              <View style={styles.fontSizeOptions}>
                <TouchableOpacity style={styles.fontSizeButton}>
                  <Text style={styles.fontSizeText}>小</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.fontSizeButton, styles.fontSizeButtonActive]}>
                  <Text style={[styles.fontSizeText, styles.fontSizeTextActive]}>中</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fontSizeButton}>
                  <Text style={styles.fontSizeText}>大</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>主题颜色</Text>
              <View style={styles.colorOptions}>
                {['#4ECDC4', '#FFB366', '#90EE90', '#FF6B6B'].map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[styles.colorButton, { backgroundColor: color }]}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Data Management */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>数据管理</Text>

            <View style={styles.settingItem}>
              <TouchableOpacity style={styles.dataButton}>
                <Text style={styles.dataButtonText}>清理缓存</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <TouchableOpacity style={styles.dataButton}>
                <Text style={styles.dataButtonText}>重置学习进度</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <TouchableOpacity style={styles.dataButton}>
                <Text style={styles.dataButtonText}>导出数据</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>关于</Text>

            <View style={styles.settingItem}>
              <Text style={styles.infoText}>版本</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.infoText}>开发者</Text>
              <Text style={styles.infoValue}>宝宝英语团队</Text>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.infoText}>联系方式</Text>
              <Text style={styles.infoValue}>support@babyenglish.com</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.textSecondary + '20',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonIcon: {
    fontSize: 24,
    color: theme.text,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.textSecondary + '20',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 15,
  },
  settingItem: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 10,
  },
  volumeSlider: {
    width: '100%',
    height: 6,
    backgroundColor: theme.textSecondary + '30',
    borderRadius: 3,
  },
  volumeProgress: {
    width: '70%',
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: 3,
  },
  speedOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speedButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: theme.surface,
    alignItems: 'center',
  },
  speedButtonActive: {
    backgroundColor: theme.primary,
  },
  speedText: {
    color: theme.textSecondary,
  },
  speedTextActive: {
    color: '#FFFFFF',
  },
  fontSizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontSizeButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: theme.surface,
    alignItems: 'center',
  },
  fontSizeButtonActive: {
    backgroundColor: theme.primary,
  },
  fontSizeText: {
    color: theme.textSecondary,
  },
  fontSizeTextActive: {
    color: '#FFFFFF',
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  dataButton: {
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.textSecondary + '30',
  },
  dataButtonText: {
    color: theme.text,
    fontSize: 16,
  },
  infoText: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: theme.text,
    fontWeight: 'bold',
  },
});