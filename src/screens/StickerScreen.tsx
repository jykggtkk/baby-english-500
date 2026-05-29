import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { Container } from '@components/common/Container';
import { TigerAnimation } from '@components/common/TigerAnimation';
import { theme } from '@types';
import { useDatabase } from '@contexts/DatabaseContext';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 3;

interface StickerDisplay {
  id: string;
  name: string;
  category: string;
  collected: boolean;
  earnedAt?: string;
}

export const StickerScreen: React.FC = () => {
  const [stickers, setStickers] = useState<StickerDisplay[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const { getStickers, getCollectedStickers } = useDatabase();

  const categories = ['全部', '动物', '水果', '食物', '玩具', '学习', '奖励'];

  useEffect(() => {
    loadStickers();
  }, [selectedCategory]);

  const loadStickers = async () => {
    try {
      const allStickers = selectedCategory === '全部'
        ? await getStickers()
        : await getStickers(selectedCategory);
      const collected = await getCollectedStickers();
      const collectedIds = new Set(collected.map((s: any) => s.sticker_id));

      const displayData: StickerDisplay[] = allStickers.map((s: any) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        collected: collectedIds.has(s.id),
        earnedAt: collected.find((c: any) => c.sticker_id === s.id)?.earned_at,
      }));

      setStickers(displayData);
    } catch (error) {
      console.error('Error loading stickers:', error);
    }
  };

  const handleStickerPress = (sticker: StickerDisplay) => {
    if (sticker.collected) {
      Alert.alert(
        sticker.name,
        `获得时间: ${sticker.earnedAt || '未知'}\n分类: ${sticker.category}`
      );
    }
  };

  const renderSticker = ({ item }: { item: StickerDisplay }) => (
    <TouchableOpacity
      style={[
        styles.stickerItem,
        !item.collected && styles.stickerItemInactive,
      ]}
      onPress={() => handleStickerPress(item)}
    >
      <View style={[
        styles.stickerIcon,
        item.collected && styles.stickerIconCollected,
      ]}>
        <Text style={styles.stickerEmoji}>
          {item.collected ? '⭐' : '❓'}
        </Text>
      </View>
      <Text style={[
        styles.stickerName,
        !item.collected && styles.stickerNameInactive,
      ]}>
        {item.collected ? item.name : '???'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>我的贴纸册</Text>
        <Text style={styles.subtitle}>
          已收集: {stickers.filter(s => s.collected).length}/{stickers.length}
        </Text>

        <View style={styles.categoryRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={stickers}
          renderItem={renderSticker}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <TigerAnimation state="sleepy" size={120} />
              <Text style={styles.emptyText}>暂无贴纸</Text>
            </View>
          }
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.textSecondary + '30',
  },
  categoryButtonActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  categoryText: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  grid: {
    paddingBottom: 20,
  },
  stickerItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  stickerItemInactive: {
    opacity: 0.4,
  },
  stickerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stickerIconCollected: {
    backgroundColor: '#FFD700',
  },
  stickerEmoji: {
    fontSize: 28,
  },
  stickerName: {
    fontSize: 12,
    color: theme.text,
    textAlign: 'center',
  },
  stickerNameInactive: {
    color: theme.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: theme.textSecondary,
    marginTop: 20,
  },
});
