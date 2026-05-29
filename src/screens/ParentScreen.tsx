import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
  Switch,
  TextInput
} from 'react-native';
import { Container } from '@components/common/Container';
import { ProgressBar } from '@components/common/ProgressBar';
import { BigButton } from '@components/common/BigButton';
import { theme } from '@types';
import { useDatabase, useAppState } from '@contexts';
import { PDFDocument } from 'react-native-pdf-lib'; // Note: This might need a different library

const { width } = Dimensions.get('window');

export const ParentScreen: React.FC = () => {
  const { sentences, learningProgress, parentSettings, updateParentSettings } = useDatabase();
  const { state } = useAppState();
  const [isParentMode, setIsParentMode] = useState(true); // Always true when reached

  // Calculate statistics
  const totalSentences = sentences.length;
  const masteredSentences = learningProgress.filter(p => p.status === 'mastered').length;
  const learningCount = learningProgress.filter(p => p.status === 'learning').length;
  const dailyLimit = parentSettings?.dailyLimit || 15;

  // Mock data for charts
  const weeklyData = [
    { day: '周一', count: 3 },
    { day: '周二', count: 5 },
    { day: '周三', count: 2 },
    { day: '周四', count: 4 },
    { day: '周五', count: 6 },
    { day: '周六', count: 8 },
    { day: '周日', count: 5 },
  ];

  // Settings state
  const [settings, setSettings] = useState({
    dailyLimit: parentSettings?.dailyLimit || 15,
    eyeProtection: parentSettings?.eyeProtection ?? true,
    soundEnabled: parentSettings?.soundEnabled ?? true,
    reminderEnabled: parentSettings?.reminderEnabled ?? true,
  });

  const handleSaveSettings = () => {
    updateParentSettings({
      ...settings,
      id: parentSettings?.id || Date.now(),
      created_at: parentSettings?.created_at || new Date(),
    });
    Alert.alert('成功', '设置已保存');
  };

  const handleExportReport = async () => {
    // Generate learning report
    const report = {
      generatedAt: new Date().toLocaleString(),
      totalSentences,
      masteredSentences,
      learningCount,
      masteryRate: ((masteredSentences / totalSentences) * 100).toFixed(1) + '%',
      weeklyData,
    };

    // For now, just show the report in an alert
    // In a real app, you would generate a PDF
    Alert.alert(
      '学习报告',
      `生成时间: ${report.generatedAt}\n\n` +
      `总句子数: ${report.totalSentences}\n` +
      `已掌握: ${report.masteredSentences}\n` +
      `学习中: ${report.learningCount}\n` +
      `掌握率: ${report.masteryRate}`
    );
  };

  const handleTimeLimitChange = (limit: number) => {
    if (parentSettings) {
      const updatedSettings = {
        ...parentSettings,
        dailyLimit: limit,
      };
      updateParentSettings(updatedSettings);
    }
  };

  const handleEyeProtectionToggle = () => {
    if (parentSettings) {
      const updatedSettings = {
        ...parentSettings,
        eye_protection: !parentSettings.eye_protection,
      };
      updateParentSettings(updatedSettings);
    }
  };

  const renderChart = () => {
    const maxValue = Math.max(...weeklyData.map(d => d.count));

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>本周学习趋势</Text>
        <View style={styles.chart}>
          {weeklyData.map((item, index) => (
            <View key={index} style={styles.chartItem}>
              <View style={styles.chartBarContainer}>
                <View
                  style={[
                    styles.chartBar,
                    { height: (item.count / maxValue) * 100 }
                  ]}
                />
              </View>
              <Text style={styles.chartLabel}>{item.day}</Text>
              <Text style={styles.chartValue}>{item.count}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  if (!isParentMode) {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Text style={styles.title}>家长模式</Text>
          <Text style={styles.subtitle}>长按3秒进入家长管理</Text>

          <TouchableOpacity
            onPress={handleParentMode}
            style={styles.parentButton}
            onLongPress={handleParentMode}
          >
            <Text style={styles.parentButtonText}>长按进入家长模式</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>家长管理中心</Text>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>学习统计</Text>

          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <Text style={styles.statsNumber}>{totalSentences}</Text>
              <Text style={styles.statsLabel}>总句子数</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsNumber}>{masteredSentences}</Text>
              <Text style={styles.statsLabel}>已掌握</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsNumber}>{learningCount}</Text>
              <Text style={styles.statsLabel}>学习中</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>学习进度</Text>
            <ProgressBar
              progress={(masteredSentences / totalSentences) * 100}
              height={20}
            />
          </View>
        </View>

        {/* Chart */}
        {renderChart()}

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>设置</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>每日学习时长限制</Text>
            <View style={styles.timeLimitContainer}>
              {[5, 10, 15, 20, 30].map((limit) => (
                <TouchableOpacity
                  key={limit}
                  style={[
                    styles.timeLimitButton,
                    dailyLimit === limit && styles.timeLimitButtonActive
                  ]}
                  onPress={() => handleTimeLimitChange(limit)}
                >
                  <Text style={[
                    styles.timeLimitText,
                    dailyLimit === limit && styles.timeLimitTextActive
                  ]}>
                    {limit}分钟
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>护眼模式</Text>
            <TouchableOpacity
              style={styles.toggle}
              onPress={handleEyeProtectionToggle}
            >
              <View style={[
                styles.toggleBackground,
                parentSettings?.eye_protection && styles.toggleBackgroundActive
              ]}>
                <View style={[
                  styles.toggleKnob,
                  parentSettings?.eye_protection && styles.toggleKnobActive
                ]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Export */}
        <View style={styles.exportSection}>
          <Text style={styles.sectionTitle}>导出功能</Text>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExportReport}
          >
            <Text style={styles.exportButtonText}>导出学习报告</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.textSecondary + '20',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    marginTop: 5,
  },
  parentButton: {
    backgroundColor: theme.primary,
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  parentButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statsSection: {
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.primary,
  },
  statsLabel: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 5,
  },
  progressSection: {
    marginTop: 15,
  },
  progressTitle: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 10,
  },
  chartContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.textSecondary + '20',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 15,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingHorizontal: 10,
  },
  chartItem: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarContainer: {
    width: 30,
    height: 100,
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: 30,
    backgroundColor: theme.primary,
    borderRadius: 5,
  },
  chartLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 5,
  },
  chartValue: {
    fontSize: 12,
    color: theme.text,
    fontWeight: 'bold',
    marginTop: 2,
  },
  settingsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.textSecondary + '20',
  },
  settingItem: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 10,
  },
  timeLimitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLimitButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.textSecondary + '50',
    minWidth: 70,
    alignItems: 'center',
  },
  timeLimitButtonActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  timeLimitText: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  timeLimitTextActive: {
    color: '#FFFFFF',
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  toggleBackground: {
    width: 50,
    height: 26,
    backgroundColor: theme.textSecondary + '30',
    borderRadius: 13,
    marginRight: 10,
  },
  toggleBackgroundActive: {
    backgroundColor: theme.primary,
  },
  toggleKnob: {
    width: 22,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    marginTop: 2,
  },
  toggleKnobActive: {
    marginLeft: 22,
  },
  exportSection: {
    padding: 20,
  },
  exportButton: {
    backgroundColor: theme.accent,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});