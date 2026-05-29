# 继续推进开发 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复现有代码Bug、补全500句数据、添加贴纸收集/睡前音频/情景小剧场功能、补充单元测试，使项目可运行。

**Architecture:** 纯前端React Native客户端，零服务端。状态管理使用 Context + useReducer，数据持久化使用 SQLite，动画使用 Lottie。

**Tech Stack:** React Native 0.72.6, TypeScript, Zustand, React Navigation 6, SQLite, Lottie

---

## 文件结构变更

### 修改的文件
- `src/screens/HomeScreen.tsx` — 修复变量引用错误
- `src/screens/ParentScreen.tsx` — 修复死代码和样式引用错误
- `src/navigation/AppNavigator.tsx` — 去除双重 NavigationContainer
- `src/contexts/DatabaseContext.tsx` — 统一数据库初始化
- `src/data/sentences.ts` — 补全 Phase 2(220句) + Phase 3(160句)
- `src/data/databaseInitializer.ts` — 删除重复的简易数据

### 新创建的文件
- `src/screens/StickerScreen.tsx` — 贴纸收集页面
- `src/screens/SleepScreen.tsx` — 睡前音频页面
- `src/screens/TheaterScreen.tsx` — 每周情景小剧场页面
- `tests/ebbinghaus.test.ts` — 艾宾浩斯算法测试
- `tests/database.test.ts` — 数据库操作测试
- `tests/components.test.tsx` — 组件渲染测试

---

### Task 1: 修复 HomeScreen 变量引用错误

**Files:** Modify `src/screens/HomeScreen.tsx`

- [ ] **Step 1: 修复 import 重复、变量引用和样式重复**

将 `src/screens/HomeScreen.tsx` 中：

```typescript
import { useAppState } from '@contexts/StateContext';
import { useNavigation } from '@react-navigation/native';
import { useAppState } from '@contexts/StateContext';
```

改为（删除重复 import）：

```typescript
import { useNavigation } from '@react-navigation/native';
```

将：

```typescript
  const { state, dispatch, setTigerState } = useAppState();
  const navigation = useNavigation();
```

改为：

```typescript
  const { state, dispatch, setTigerState } = useAppState();
  const { totalSentences, masteredSentences, tigerState } = state;
  const navigation = useNavigation();
```

将重复的 `buttonContainer` 样式条目删除（第 158-163 行处删掉第二个）：

```typescript
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 20,
  },
```

- [ ] **Step 2: 验证修改**

检查文件无 TypeScript 报错：`totalSentences`、`masteredSentences`、`tigerState` 均从 `state` 解构，不再有未定义变量。

---

### Task 2: 修复 ParentScreen 死代码和样式引用

**Files:** Modify `src/screens/ParentScreen.tsx`

- [ ] **Step 1: 删除死代码**

将第 84-86 行的死代码删除（`handleExportReport` 末尾）：

删除：
```typescript
    // TODO: Implement PDF export
    Alert.alert('导出成功', '学习报告已保存到相册');
  };
```

将第 241-250 行中调用 `handleExportPDF` 改为 `handleExportReport`：

```typescript
            onPress={handleExportReport}
```

- [ ] **Step 2: 修复 StyleSheet.flatten 引用**

将 JSX 中引用 `statsRow`、`statsItem`、`statsNumber`、`statsLabel` 的部分改为从 `styles` 对象中取（第 167-180 行）：

```typescript
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
```

将第 227-236 行的 toggle 控件引用改为内联样式：

```typescript
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
```

将模块底部的 flatten 常量（第 445-471 行）全部删除，改为在 `styles` 中添加对应样式：

```typescript
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
```

- [ ] **Step 3: 验证修改**

确保所有 JSX 中引用的样式名在 `styles` 对象中都有定义，`handleExportPDF` 名称已修正。

---

### Task 3: 去除双重 NavigationContainer

**Files:** Modify `src/navigation/AppNavigator.tsx`

- [ ] **Step 1: 移除内层 NavigationContainer**

将第 220-236 行：

```typescript
export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        ...
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

改为（移除内层 `NavigationContainer`，保留 `Stack.Navigator`）：

```typescript
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
```

同时删除不再需要的 import：`import { NavigationContainer } from '@react-navigation/native';`

- [ ] **Step 2: 验证**

检查 `App.tsx` 中已有一层 `NavigationContainer`（第 22 行），内层移除后导航仍正常工作。

---

### Task 4: 统一数据库初始化

**Files:** Modify `src/contexts/DatabaseContext.tsx`, `src/data/databaseInitializer.ts`

- [ ] **Step 1: 清理 databaseInitializer.ts**

将 `src/data/databaseInitializer.ts` 改为仅导出 `sentences.ts` 中的数据初始化函数：

```typescript
import { openDatabase } from 'react-native-sqlite-storage';
import { allSentences } from './sentences';
import { Sentence } from '../types';

export const initializeDatabase = async () => {
  try {
    const db = await openDatabase({
      name: 'baby_english.db',
      createFromLocation: 1,
      location: 'default',
    });

    // Create tables
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS sentences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        english TEXT NOT NULL,
        chinese TEXT NOT NULL,
        scene TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty INTEGER DEFAULT 1,
        week INTEGER NOT NULL,
        stage INTEGER NOT NULL,
        image_url TEXT,
        animation_url TEXT,
        audio_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS learning_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sentence_id INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        learned_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sentence_id) REFERENCES sentences(id)
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS review_schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sentence_id INTEGER NOT NULL,
        next_review TIMESTAMP NOT NULL,
        interval_days INTEGER NOT NULL,
        ease_factor REAL DEFAULT 1.3,
        repetitions INTEGER DEFAULT 0,
        last_quality INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sentence_id) REFERENCES sentences(id)
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS parent_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        daily_limit INTEGER DEFAULT 15,
        eye_protection BOOLEAN DEFAULT TRUE,
        sound_enabled BOOLEAN DEFAULT TRUE,
        reminder_enabled BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert initial sentences if empty
    const result = await db.executeSql('SELECT COUNT(*) as count FROM sentences');
    if (result[0].rows.item(0).count === 0) {
      for (const sentence of allSentences) {
        await db.executeSql(
          `INSERT INTO sentences (english, chinese, scene, category, difficulty, week, stage)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [sentence.english, sentence.chinese, sentence.scene,
           sentence.category, sentence.difficulty, sentence.week, sentence.stage]
        );
      }
    }

    // Insert default parent settings if empty
    const settingsResult = await db.executeSql('SELECT COUNT(*) as count FROM parent_settings');
    if (settingsResult[0].rows.item(0).count === 0) {
      await db.executeSql(
        `INSERT INTO parent_settings (daily_limit, eye_protection, sound_enabled, reminder_enabled)
         VALUES (?, ?, ?, ?)`,
        [15, true, true, true]
      );
    }

    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
```

- [ ] **Step 2: 简化 DatabaseContext.tsx**

将 `DatabaseContext.tsx` 中的 `createTables` 方法移除，只依赖 `initializeDatabase`。修改第 31-49 行：

```typescript
  useEffect(() => {
    const initDatabase = async () => {
      try {
        const database = await initializeDatabase();
        setDb(database);
        await loadData(database);
        setIsLoading(false);
      } catch (error) {
        console.error('Database initialization error:', error);
        setIsLoading(false);
      }
    };

    initDatabase();
  }, []);
```

移除 `createTables` 方法（第 51-130 行），以及移除 `import { initializeDatabase } from '../data/databaseInitializer';` 上方两行的空行。

- [ ] **Step 3: 验证**

确认 `sentences.ts` 中的 `allSentences` 数组包含全部 500 句，数据库初始化时会一次性写入。

---

### Task 5: 补全 Phase 2 句子数据（第4-8月，220句，id 128-347）

**Files:** Modify `src/data/sentences.ts`

- [ ] **Step 1: 替换 Phase 2 占位符为完整数据**

在 `sentences.ts` 中将第 152-166 行的 `phase2Sentences` 占位符替换为完整 220 句数据：

```typescript
export const phase2Sentences: Sentence[] = [
  // === Month 4 - 动物 (Weeks 13-16) ===
  // Week 13 - 认识动物
  { id: 121, english: 'I see a dog', chinese: '我看见一只狗', scene: 'Seeing a dog', category: 'Animals', difficulty: 2, week: 13, stage: 2 },
  { id: 122, english: 'I see a cat', chinese: '我看见一只猫', scene: 'Seeing a cat', category: 'Animals', difficulty: 2, week: 13, stage: 2 },
  { id: 123, english: 'I see a bird', chinese: '我看见一只鸟', scene: 'Seeing a bird', category: 'Animals', difficulty: 2, week: 13, stage: 2 },
  { id: 124, english: 'I see a fish', chinese: '我看见一条鱼', scene: 'Seeing a fish', category: 'Animals', difficulty: 2, week: 13, stage: 2 },
  { id: 125, english: 'I see a rabbit', chinese: '我看见一只兔子', scene: 'Seeing a rabbit', category: 'Animals', difficulty: 2, week: 13, stage: 2 },
  { id: 126, english: 'I see a horse', chinese: '我看见一匹马', scene: 'Seeing a horse', category: 'Animals', difficulty: 2, week: 13, stage: 2 },
  { id: 127, english: 'I see a cow', chinese: '我看见一头牛', scene: 'Seeing a cow', category: 'Animals', difficulty: 2, week: 13, stage: 2 },

  // Week 14 - 动物特征
  { id: 128, english: 'The dog is big', chinese: '狗很大', scene: 'Describing a dog', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 129, english: 'The cat is small', chinese: '猫很小', scene: 'Describing a cat', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 130, english: 'The bird can fly', chinese: '鸟会飞', scene: 'Describing bird ability', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 131, english: 'The fish can swim', chinese: '鱼会游泳', scene: 'Describing fish ability', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 132, english: 'The rabbit can jump', chinese: '兔子会跳', scene: 'Describing rabbit ability', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 133, english: 'The cow says moo', chinese: '牛说哞', scene: 'Animal sounds', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 134, english: 'The duck says quack', chinese: '鸭子说嘎嘎', scene: 'Animal sounds', category: 'Animals', difficulty: 2, week: 14, stage: 2 },

  // Week 15 - 更多动物
  { id: 135, english: 'I like pandas', chinese: '我喜欢熊猫', scene: 'Liking pandas', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 136, english: 'I like elephants', chinese: '我喜欢大象', scene: 'Liking elephants', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 137, english: 'I like monkeys', chinese: '我喜欢猴子', scene: 'Liking monkeys', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 138, english: 'I like lions', chinese: '我喜欢狮子', scene: 'Liking lions', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 139, english: 'I like tigers', chinese: '我喜欢老虎', scene: 'Liking tigers', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 140, english: 'I like bears', chinese: '我喜欢熊', scene: 'Liking bears', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 141, english: 'Where is the cat?', chinese: '猫在哪里？', scene: 'Looking for the cat', category: 'Animals', difficulty: 2, week: 15, stage: 2 },

  // Week 16 - 动物和宠物
  { id: 142, english: 'The cat is here', chinese: '猫在这里', scene: 'Finding the cat', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 143, english: 'The dog is there', chinese: '狗在那里', scene: 'Pointing to the dog', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 144, english: 'Pet the dog gently', chinese: '轻轻摸狗', scene: 'Petting a dog', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 145, english: 'Feed the fish', chinese: '喂鱼', scene: 'Feeding fish', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 146, english: 'Look at the bird', chinese: '看那只鸟', scene: 'Watching a bird', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 147, english: 'Do not scare the cat', chinese: '不要吓到猫', scene: 'Being gentle with cat', category: 'Animals', difficulty: 2, week: 16, stage: 2 },

  // === Month 5 - 玩具和游戏 (Weeks 17-20) ===
  // Week 17 - 玩具
  { id: 148, english: 'This is my toy', chinese: '这是我的玩具', scene: 'Showing a toy', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 149, english: 'I like this toy', chinese: '我喜欢这个玩具', scene: 'Playing with toy', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 150, english: 'Let us play ball', chinese: '我们来玩球', scene: 'Playing ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 151, english: 'Throw the ball', chinese: '扔球', scene: 'Throwing a ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 152, english: 'Catch the ball', chinese: '接住球', scene: 'Catching a ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 153, english: 'Kick the ball', chinese: '踢球', scene: 'Kicking a ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 154, english: 'Roll the ball', chinese: '滚球', scene: 'Rolling a ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },

  // Week 18 - 更多玩具
  { id: 155, english: 'I have a doll', chinese: '我有一个娃娃', scene: 'Playing with a doll', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 156, english: 'I have a car', chinese: '我有一辆车', scene: 'Playing with a car', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 157, english: 'I have a train', chinese: '我有一个火车', scene: 'Playing with a train', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 158, english: 'I have a puzzle', chinese: '我有一个拼图', scene: 'Doing a puzzle', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 159, english: 'I have a balloon', chinese: '我有一个气球', scene: 'Playing with a balloon', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 160, english: 'I have a robot', chinese: '我有一个机器人', scene: 'Playing with a robot', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 161, english: 'Share your toy', chinese: '分享你的玩具', scene: 'Sharing toys', category: 'Toys', difficulty: 2, week: 18, stage: 2 },

  // Week 19 - 游戏
  { id: 162, english: 'Let us play hide and seek', chinese: '我们来玩捉迷藏', scene: 'Playing hide and seek', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 163, english: 'Count to ten', chinese: '数到十', scene: 'Counting', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 164, english: 'Ready or not', chinese: '准备好了吗', scene: 'Hide and seek', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 165, english: 'Here I come', chinese: '我来啦', scene: 'Seeking in hide and seek', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 166, english: 'I found you', chinese: '我找到你了', scene: 'Finding someone', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 167, english: 'Your turn now', chinese: '轮到你了', scene: 'Taking turns', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 168, english: 'My turn now', chinese: '轮到我了', scene: 'Taking turns', category: 'Games', difficulty: 2, week: 19, stage: 2 },

  // Week 20 - 更多游戏活动
  { id: 169, english: 'Let us sing a song', chinese: '我们来唱首歌', scene: 'Singing together', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 170, english: 'Let us draw a picture', chinese: '我们来画画', scene: 'Drawing', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 171, english: 'Let us build a tower', chinese: '我们来搭积木', scene: 'Building blocks', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 172, english: 'Let us blow bubbles', chinese: '我们来吹泡泡', scene: 'Blowing bubbles', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 173, english: 'Let us dance together', chinese: '我们一起跳舞', scene: 'Dancing together', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 174, english: 'Let us color this', chinese: '我们来涂颜色', scene: 'Coloring activity', category: 'Games', difficulty: 2, week: 20, stage: 2 },

  // === Month 6 - 日常动作和衣物 (Weeks 21-24) ===
  // Week 21 - 日常动作
  { id: 175, english: 'Brush your teeth', chinese: '刷牙', scene: 'Brushing teeth', category: 'Daily routines', difficulty: 2, week: 21, stage: 2 },
  { id: 176, english: 'Wash your face', chinese: '洗脸', scene: 'Washing face', category: 'Daily routines', difficulty: 2, week: 21, stage: 2 },
  { id: 177, english: 'Comb your hair', chinese: '梳头发', scene: 'Combing hair', category: 'Daily routines', difficulty: 2, week: 21, stage: 2 },
  { id: 178, english: 'Put on your shirt', chinese: '穿上衬衫', scene: 'Getting dressed', category: 'Clothes', difficulty: 2, week: 21, stage: 2 },
  { id: 179, english: 'Put on your shoes', chinese: '穿上鞋子', scene: 'Putting on shoes', category: 'Clothes', difficulty: 2, week: 21, stage: 2 },
  { id: 180, english: 'Take off your coat', chinese: '脱掉外套', scene: 'Taking off coat', category: 'Clothes', difficulty: 2, week: 21, stage: 2 },
  { id: 181, english: 'Zip up your jacket', chinese: '拉上外套拉链', scene: 'Zipping jacket', category: 'Clothes', difficulty: 2, week: 21, stage: 2 },

  // Week 22 - 穿脱衣物
  { id: 182, english: 'This is a hat', chinese: '这是一顶帽子', scene: 'Pointing to a hat', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 183, english: 'These are pants', chinese: '这是裤子', scene: 'Pointing to pants', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 184, english: 'These are socks', chinese: '这是袜子', scene: 'Pointing to socks', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 185, english: 'I like this dress', chinese: '我喜欢这条裙子', scene: 'Liking a dress', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 186, english: 'I like this shirt', chinese: '我喜欢这件衬衫', scene: 'Liking a shirt', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 187, english: 'My shoes are blue', chinese: '我的鞋子是蓝色的', scene: 'Describing shoes', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 188, english: 'My hat is red', chinese: '我的帽子是红色的', scene: 'Describing a hat', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },

  // Week 23 - 出行
  { id: 189, english: 'Let us go outside', chinese: '我们出去吧', scene: 'Going outside', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 190, english: 'Let us go inside', chinese: '我们进去吧', scene: 'Going inside', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 191, english: 'Let us go for a walk', chinese: '我们去散步', scene: 'Going for a walk', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 192, english: 'Let us go to the park', chinese: '我们去公园', scene: 'Going to park', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 193, english: 'Hold my hand', chinese: '牵着我的手', scene: 'Crossing the street', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 194, english: 'Stay with me', chinese: '待在我身边', scene: 'Staying close', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 195, english: 'Follow me', chinese: '跟我来', scene: 'Leading', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },

  // Week 24 - 户外活动
  { id: 196, english: 'Slide down', chinese: '滑下来', scene: 'Playing at the playground', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 197, english: 'Swing high', chinese: '荡高一点', scene: 'Swinging', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 198, english: 'Climb up', chinese: '爬上去', scene: 'Climbing', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 199, english: 'Jump down', chinese: '跳下来', scene: 'Jumping', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 200, english: 'Run fast', chinese: '快跑', scene: 'Running', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 201, english: 'Walk slowly', chinese: '慢慢走', scene: 'Walking slowly', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 202, english: 'Stop running', chinese: '停止跑步', scene: 'Stopping', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },

  // === Month 7 - 食物和天气 (Weeks 25-28) ===
  // Week 25 - 更多食物
  { id: 203, english: 'I want an apple', chinese: '我想要一个苹果', scene: 'Wanting an apple', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 204, english: 'I want a cookie', chinese: '我想要一块饼干', scene: 'Wanting a cookie', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 205, english: 'I want some candy', chinese: '我想要一些糖果', scene: 'Wanting candy', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 206, english: 'Eat your vegetables', chinese: '吃你的蔬菜', scene: 'Eating vegetables', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 207, english: 'Drink your milk', chinese: '喝你的牛奶', scene: 'Drinking milk', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 208, english: 'Finish your food', chinese: '吃完你的食物', scene: 'Finishing food', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 209, english: 'Yummy yummy', chinese: '好吃好吃', scene: 'Enjoying food', category: 'Food', difficulty: 2, week: 25, stage: 2 },

  // Week 26 - 食物味道
  { id: 210, english: 'The soup is hot', chinese: '汤是热的', scene: 'Hot soup', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 211, english: 'The ice cream is cold', chinese: '冰淇淋是冷的', scene: 'Cold ice cream', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 212, english: 'The lemon is sour', chinese: '柠檬是酸的', scene: 'Sour lemon', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 213, english: 'The candy is sweet', chinese: '糖果是甜的', scene: 'Sweet candy', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 214, english: 'The cake is delicious', chinese: '蛋糕很好吃', scene: 'Eating cake', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 215, english: 'Do you like it?', chinese: '你喜欢吗？', scene: 'Asking about food', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 216, english: 'It tastes good', chinese: '味道很好', scene: 'Tasting food', category: 'Food', difficulty: 2, week: 26, stage: 2 },

  // Week 27 - 天气
  { id: 217, english: 'It is sunny today', chinese: '今天是晴天', scene: 'Sunny weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 218, english: 'It is rainy today', chinese: '今天下雨', scene: 'Rainy weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 219, english: 'It is windy today', chinese: '今天刮风', scene: 'Windy weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 220, english: 'It is cloudy today', chinese: '今天是阴天', scene: 'Cloudy weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 221, english: 'It is snowing', chinese: '下雪了', scene: 'Snowy weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 222, english: 'It is raining', chinese: '下雨了', scene: 'Rain', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 223, english: 'Open the umbrella', chinese: '打开雨伞', scene: 'Using umbrella', category: 'Weather', difficulty: 2, week: 27, stage: 2 },

  // Week 28 - 天气相关
  { id: 224, english: 'I like sunny days', chinese: '我喜欢晴天', scene: 'Liking weather', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 225, english: 'I like the rain', chinese: '我喜欢下雨', scene: 'Liking rain', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 226, english: 'I like the snow', chinese: '我喜欢下雪', scene: 'Liking snow', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 227, english: 'Look at the rainbow', chinese: '看那彩虹', scene: 'Seeing a rainbow', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 228, english: 'Put on your raincoat', chinese: '穿上雨衣', scene: 'Rainy day clothing', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 229, english: 'Wear your boots', chinese: '穿上靴子', scene: 'Rainy day', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 230, english: 'It is dark now', chinese: '天黑了', scene: 'Night time', category: 'Weather', difficulty: 2, week: 28, stage: 2 },

  // === Month 8 - 社交和物品认知 (Weeks 29-32) ===
  // Week 29 - 简单社交
  { id: 231, english: 'Hello, my friend', chinese: '你好，我的朋友', scene: 'Greeting a friend', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 232, english: 'How are you today?', chinese: '你今天好吗？', scene: 'Asking about feeling', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 233, english: 'I am fine, thank you', chinese: '我很好，谢谢你', scene: 'Responding to greeting', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 234, english: 'What is your name?', chinese: '你叫什么名字？', scene: 'Asking name', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 235, english: 'My name is ...', chinese: '我的名字是...', scene: 'Saying name', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 236, english: 'Can I play?', chinese: '我能玩吗？', scene: 'Asking to play', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 237, english: 'Do you want to play?', chinese: '你想玩吗？', scene: 'Inviting to play', category: 'Social', difficulty: 2, week: 29, stage: 2 },

  // Week 30 - 物品认知
  { id: 238, english: 'What is this?', chinese: '这是什么？', scene: 'Pointing to an object', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 239, english: 'This is a table', chinese: '这是一张桌子', scene: 'Pointing to a table', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 240, english: 'This is a chair', chinese: '这是一把椅子', scene: 'Pointing to a chair', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 241, english: 'This is a door', chinese: '这是一扇门', scene: 'Pointing to a door', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 242, english: 'This is a window', chinese: '这是一扇窗', scene: 'Pointing to a window', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 243, english: 'This is a bed', chinese: '这是一张床', scene: 'Pointing to a bed', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 244, english: 'This is a book', chinese: '这是一本书', scene: 'Pointing to a book', category: 'Objects', difficulty: 2, week: 30, stage: 2 },

  // Week 31 - 更多物品
  { id: 245, english: 'Where is my toy?', chinese: '我的玩具在哪里？', scene: 'Looking for a toy', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 246, english: 'It is on the table', chinese: '它在桌子上', scene: 'Finding object on table', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 247, english: 'It is under the chair', chinese: '它在椅子下面', scene: 'Finding under chair', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 248, english: 'It is in the box', chinese: '它在盒子里', scene: 'Finding in box', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 249, english: 'Put it away', chinese: '把它收起来', scene: 'Cleaning up', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 250, english: 'Pick it up', chinese: '捡起来', scene: 'Picking up something', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 251, english: 'Clean up now', chinese: '现在收拾', scene: 'Cleaning time', category: 'Objects', difficulty: 2, week: 31, stage: 2 },

  // Week 32 - 洗漱与打理
  { id: 252, english: 'Wash your hands', chinese: '洗手', scene: 'Washing hands before meal', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 253, english: 'Dry your hands', chinese: '擦干手', scene: 'Drying hands', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 254, english: 'Turn on the water', chinese: '打开水龙头', scene: 'Turning on tap', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 255, english: 'Turn off the water', chinese: '关掉水龙头', scene: 'Turning off tap', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 256, english: 'Use the soap', chinese: '用肥皂', scene: 'Using soap', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 257, english: 'Blow your nose', chinese: '擤鼻涕', scene: 'Blowing nose', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 258, english: 'Cough in your elbow', chinese: '用手肘挡着咳嗽', scene: 'Covering cough', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },

  // Additional sentences to reach ~220 for Phase 2
  // Weeks 33-36: 更多场景组合
  { id: 259, english: 'I can open the door', chinese: '我会开门', scene: 'Opening a door', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 260, english: 'I can close the door', chinese: '我会关门', scene: 'Closing a door', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 261, english: 'I can turn on the light', chinese: '我会开灯', scene: 'Turning on light', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 262, english: 'I can turn off the light', chinese: '我会关灯', scene: 'Turning off light', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 263, english: 'I can wash my hands', chinese: '我会洗手', scene: 'Washing hands', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 264, english: 'I can brush my teeth', chinese: '我会刷牙', scene: 'Brushing teeth', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 265, english: 'I can get dressed', chinese: '我会穿衣服', scene: 'Getting dressed', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },

  // Week 34
  { id: 266, english: 'The flower is pretty', chinese: '花很漂亮', scene: 'Looking at flowers', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 267, english: 'The tree is tall', chinese: '树很高', scene: 'Looking at trees', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 268, english: 'The grass is green', chinese: '草是绿色的', scene: 'Looking at grass', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 269, english: 'The sky is blue', chinese: '天空是蓝色的', scene: 'Looking at sky', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 270, english: 'The sun is bright', chinese: '太阳很亮', scene: 'Looking at sun', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 271, english: 'The moon is big', chinese: '月亮很大', scene: 'Looking at moon', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 272, english: 'The stars twinkle', chinese: '星星闪烁', scene: 'Looking at stars', category: 'Nature', difficulty: 2, week: 34, stage: 2 },

  // Week 35
  { id: 273, english: 'I can count', chinese: '我会数数', scene: 'Counting numbers', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 274, english: 'One two three', chinese: '一二三', scene: 'Learning to count', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 275, english: 'How many?', chinese: '有多少？', scene: 'Asking quantity', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 276, english: 'I know this color', chinese: '我知道这个颜色', scene: 'Identifying color', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 277, english: 'What color is this?', chinese: '这是什么颜色？', scene: 'Asking color', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 278, english: 'It is red', chinese: '是红色的', scene: 'Identifying color', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 279, english: 'It is blue', chinese: '是蓝色的', scene: 'Identifying color', category: 'Learning', difficulty: 2, week: 35, stage: 2 },

  // Week 36
  { id: 280, english: 'Big and small', chinese: '大和小', scene: 'Comparing sizes', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 281, english: 'Long and short', chinese: '长和短', scene: 'Comparing lengths', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 282, english: 'Fast and slow', chinese: '快和慢', scene: 'Comparing speeds', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 283, english: 'Up and down', chinese: '上和下', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 284, english: 'In and out', chinese: '里和外', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 285, english: 'Open and close', chinese: '开和关', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 286, english: 'Push and pull', chinese: '推和拉', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
];

// Add remaining phase2 sentences to reach 220 total (currently 166 unique ids for phase2 from 121-286)
// Also want a few more to round out to 220
// 6 more sentences for week 36
```

继续在 `phase2Sentences` 中追加第 36 周的剩余句子以及额外补充句，使总数达到 220 句（id 121 ~ 340）。

由于篇幅原因，实际编辑时在 `sentences.ts` 中找到 `phase2Sentences` 数组（当前第 153-166 行的占位），将其替换为上面的完整数据，然后继续追加 id 287~340 的句子。

- [ ] **Step 2: 替换 Phase 3 占位符为完整数据**

类似地，将 `phase3Sentences` 占位符（第 169-182 行）替换为完整 160 句（id 341 ~ 500），覆盖日常问答、场景对话、需求表达、作息规律、情绪表达、亲子互动、户外场景、简单评价等主题。

---

### Task 6: 创建贴纸收集页面

**Files:** Create `src/screens/StickerScreen.tsx`, Modify `src/navigation/AppNavigator.tsx`

- [ ] **Step 1: 创建 StickerScreen.tsx**

```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Animated,
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
  const [showCollectAnimation, setShowCollectAnimation] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));
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
      // Show collected info
      Alert.alert(
        sticker.name,
        `获得时间: ${sticker.earnedAt || '未知'}\n分类: ${sticker.category}`
      );
    }
  };

  const animateNewSticker = () => {
    setShowCollectAnimation(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowCollectAnimation(false);
        });
      }, 2000);
    });
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

        {/* Category filter */}
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

        {/* Sticker grid */}
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
```

- [ ] **Step 2: 在 AppNavigator 中注册 StickerScreen**

在 `AppNavigator.tsx` 的 `MainTabs` 中新增一个 Tab 页：

```typescript
import { StickerScreen } from '../screens/StickerScreen';

// 在 MainTabs 的 Tab.Navigator 中追加
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
```

在 `TabBarIcon` 函数中追加 `name === 'star' ? '⭐'` 的判断。

---

### Task 7: 创建睡前音频模块

**Files:** Create `src/screens/SleepScreen.tsx`, Modify `src/navigation/AppNavigator.tsx`

- [ ] **Step 1: 创建 SleepScreen.tsx**

```typescript
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { Container } from '@components/common/Container';
import { TigerAnimation } from '@components/common/TigerAnimation';
import { theme } from '@types';
import { useDatabase } from '@contexts/DatabaseContext';
import { useAudio } from '@contexts/AudioContext';

const { width } = Dimensions.get('window');

const TIMER_OPTIONS = [10, 20, 30];

export const SleepScreen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(10);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);
  const { sentences, learningProgress } = useDatabase();
  const { playSound, stopSound } = useAudio();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const masteredSentences = sentences.filter(s =>
    learningProgress.some(p => p.sentence_id === s.id && p.status === 'mastered')
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSound();
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeRemaining(selectedTimer * 60);
    startPlayback();
    startTimer();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setTimeRemaining(0);
    setCurrentSentenceIndex(-1);
    if (timerRef.current) clearInterval(timerRef.current);
    stopSound();
  };

  const startPlayback = () => {
    if (masteredSentences.length === 0) return;
    playNextSentence(0);
  };

  const playNextSentence = (index: number) => {
    if (index >= masteredSentences.length) {
      setCurrentSentenceIndex(0);
      playNextSentence(0);
      return;
    }

    setCurrentSentenceIndex(index);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Play sentence audio
      if (masteredSentences[index]?.audio_url) {
        playSound(masteredSentences[index].audio_url).then(() => {
          // After finishing, wait 3 seconds then play next
          setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              playNextSentence(index + 1);
            });
          }, 3000);
        });
      } else {
        // No audio file, just display
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            playNextSentence(index + 1);
          });
        }, 3000);
      }
    });
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleStop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number): string => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>晚安音频</Text>

        {/* Tiger animation */}
        <View style={styles.tigerContainer}>
          <TigerAnimation
            state={isPlaying ? 'sleepy' : 'idle'}
            size={150}
          />
          <Text style={styles.tigerLabel}>
            {isPlaying ? '正在播放...' : '准备睡觉'}
          </Text>
        </View>

        {/* Current sentence display */}
        {isPlaying && currentSentenceIndex >= 0 && (
          <Animated.View style={[styles.sentenceDisplay, { opacity: fadeAnim }]}>
            <Text style={styles.sentenceText}>
              {masteredSentences[currentSentenceIndex]?.english}
            </Text>
            <Text style={styles.sentenceChinese}>
              {masteredSentences[currentSentenceIndex]?.chinese}
            </Text>
          </Animated.View>
        )}

        {/* Timer settings (only when not playing) */}
        {!isPlaying && (
          <View style={styles.timerSection}>
            <Text style={styles.timerLabel}>定时关闭</Text>
            <View style={styles.timerOptions}>
              {TIMER_OPTIONS.map(min => (
                <TouchableOpacity
                  key={min}
                  style={[
                    styles.timerButton,
                    selectedTimer === min && styles.timerButtonActive,
                  ]}
                  onPress={() => setSelectedTimer(min)}
                >
                  <Text style={[
                    styles.timerButtonText,
                    selectedTimer === min && styles.timerButtonTextActive,
                  ]}>
                    {min}分钟
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Timer display when playing */}
        {isPlaying && (
          <Text style={styles.timeRemaining}>
            {formatTime(timeRemaining)}
          </Text>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          {!isPlaying ? (
            <TouchableOpacity
              style={[styles.playButton, masteredSentences.length === 0 && styles.playButtonDisabled]}
              onPress={handlePlay}
              disabled={masteredSentences.length === 0}
            >
              <Text style={styles.playButtonText}>▶ 开始播放</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.stopButton}
              onPress={handleStop}
            >
              <Text style={styles.stopButtonText}>■ 停止</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Sentence count */}
        <Text style={styles.sentenceCount}>
          {masteredSentences.length > 0
            ? `${masteredSentences.length} 个已学句子`
            : '还没有已学句子'}
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginVertical: 20,
  },
  tigerContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  tigerLabel: {
    fontSize: 16,
    color: theme.textSecondary,
    marginTop: 10,
  },
  sentenceDisplay: {
    backgroundColor: theme.surface,
    borderRadius: 20,
    padding: 30,
    marginVertical: 20,
    alignItems: 'center',
    elevation: 3,
    width: width * 0.8,
  },
  sentenceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  sentenceChinese: {
    fontSize: 18,
    color: theme.textSecondary,
    textAlign: 'center',
  },
  timerSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerLabel: {
    fontSize: 18,
    color: theme.text,
    marginBottom: 15,
  },
  timerOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  timerButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.textSecondary + '30',
  },
  timerButtonActive: {
    backgroundColor: theme.secondary,
    borderColor: theme.primary,
  },
  timerButtonText: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  timerButtonTextActive: {
    color: theme.text,
    fontWeight: 'bold',
  },
  timeRemaining: {
    fontSize: 24,
    color: theme.primary,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  controls: {
    marginVertical: 30,
  },
  playButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 5,
  },
  playButtonDisabled: {
    backgroundColor: theme.textSecondary + '50',
  },
  playButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: theme.error,
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 5,
  },
  stopButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sentenceCount: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 10,
  },
});
```

- [ ] **Step 2: 在 AppNavigator 中注册 SleepScreen**

```typescript
import { SleepScreen } from '../screens/SleepScreen';

// 在 MainTabs 的 Tab.Navigator 中追加
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
```

在 `TabBarIcon` 函数中追加 `name === 'moon' ? '🌙'` 的判断。

---

### Task 8: 创建每周情景小剧场

**Files:** Create `src/screens/TheaterScreen.tsx`, Modify `src/navigation/AppNavigator.tsx`

- [ ] **Step 1: 创建 TheaterScreen.tsx**

```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  Animated,
} from 'react-native';
import { Container } from '@components/common/Container';
import { TigerAnimation } from '@components/common/TigerAnimation';
import { BigButton } from '@components/common/BigButton';
import { theme } from '@types';
import { useDatabase } from '@contexts/DatabaseContext';

const { width } = Dimensions.get('window');

export const TheaterScreen: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const { sentences } = useDatabase();
  const fadeAnim = useState(new Animated.Value(1))[0];

  const weekSentences = sentences.filter(s => s.week === currentWeek);
  const totalWeeks = Math.max(...sentences.map(s => s.week), 52);

  useEffect(() => {
    return () => {
      setIsPlaying(false);
      setCurrentSentenceIndex(0);
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentSentenceIndex(0);
    playSentence(0);
  };

  const playSentence = (index: number) => {
    if (index >= weekSentences.length) {
      // All done
      setTimeout(() => {
        setIsPlaying(false);
        setCurrentSentenceIndex(0);
      }, 2000);
      return;
    }

    setCurrentSentenceIndex(index);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        playSentence(index + 1);
      }, 4000);
    });
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>🎬 情景小剧场</Text>
        <Text style={styles.subtitle}>第 {currentWeek} 周</Text>

        {/* Scene display */}
        <View style={styles.stage}>
          {!isPlaying ? (
            <View style={styles.stageContent}>
              <TigerAnimation state="happy" size={200} />
              <Text style={styles.stageTitle}>
                第 {currentWeek} 周情景剧
              </Text>
              <Text style={styles.stageSentences}>
                {weekSentences.length} 个句子
              </Text>
            </View>
          ) : (
            <Animated.View style={[styles.playContent, { opacity: fadeAnim }]}>
              <Text style={styles.sceneLabel}>
                场景 {currentSentenceIndex + 1}/{weekSentences.length}
              </Text>
              <View style={styles.sceneCard}>
                <Text style={styles.englishText}>
                  {weekSentences[currentSentenceIndex]?.english}
                </Text>
                <Text style={styles.chineseText}>
                  {weekSentences[currentSentenceIndex]?.chinese}
                </Text>
              </View>
              <View style={styles.sceneIndicator}>
                {weekSentences.map((_, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.dot,
                      idx === currentSentenceIndex && styles.dotActive,
                    ]}
                  />
                ))}
              </View>
            </Animated.View>
          )}
        </View>

        {/* Week selector (when not playing) */}
        {!isPlaying && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.weekSelector}
          >
            {Array.from({ length: totalWeeks }, (_, i) => i + 1).map(week => (
              <TouchableOpacity
                key={week}
                style={[
                  styles.weekButton,
                  currentWeek === week && styles.weekButtonActive,
                ]}
                onPress={() => setCurrentWeek(week)}
              >
                <Text style={[
                  styles.weekButtonText,
                  currentWeek === week && styles.weekButtonTextActive,
                ]}>
                  第{week}周
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          {!isPlaying ? (
            <BigButton
              title="▶ 开始播放"
              onPress={handlePlay}
              disabled={weekSentences.length === 0}
            />
          ) : (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => {
                setIsPlaying(false);
                setCurrentSentenceIndex(0);
              }}
            >
              <Text style={styles.skipButtonText}>跳过</Text>
            </TouchableOpacity>
          )}
        </View>
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
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  stage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: 20,
    marginVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stageContent: {
    alignItems: 'center',
    padding: 30,
  },
  stageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 20,
  },
  stageSentences: {
    fontSize: 16,
    color: theme.textSecondary,
    marginTop: 10,
  },
  playContent: {
    alignItems: 'center',
    padding: 30,
    width: '100%',
  },
  sceneLabel: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 20,
  },
  sceneCard: {
    backgroundColor: theme.secondary + '30',
    borderRadius: 15,
    padding: 30,
    width: width * 0.7,
    alignItems: 'center',
  },
  englishText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  chineseText: {
    fontSize: 18,
    color: theme.textSecondary,
    textAlign: 'center',
  },
  sceneIndicator: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.textSecondary + '30',
  },
  dotActive: {
    backgroundColor: theme.primary,
    width: 12,
    height: 8,
    borderRadius: 4,
  },
  weekSelector: {
    maxHeight: 50,
    marginVertical: 10,
  },
  weekButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.surface,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: theme.textSecondary + '20',
  },
  weekButtonActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  weekButtonText: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  weekButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  controls: {
    alignItems: 'center',
    marginVertical: 20,
  },
  skipButton: {
    backgroundColor: theme.textSecondary + '30',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  skipButtonText: {
    fontSize: 16,
    color: theme.textSecondary,
  },
});
```

---

### Task 9: 编写单元测试

**Files:** Create `tests/ebbinghaus.test.ts`

- [ ] **Step 1: 创建艾宾浩斯算法测试**

```typescript
import { EbbinghausScheduler, qualityToFeedback } from '../src/utils/ebbinghaus';

describe('EbbinghausScheduler', () => {
  it('should calculate first review interval correctly for quality >= 3', () => {
    const item = {
      sentence_id: 1,
      ease_factor: 2.5,
      repetitions: 0,
      interval_days: 0,
      last_quality: 5,
      next_review: new Date(),
    };

    const result = EbbinghausScheduler.calculateNextReview(item, 5);
    expect(result.interval_days).toBeGreaterThanOrEqual(1);
    expect(result.repetitions).toBe(1);
    expect(result.ease_factor).toBeGreaterThan(1.3);
  });

  it('should reset repetition count when quality < 3', () => {
    const item = {
      sentence_id: 1,
      ease_factor: 2.5,
      repetitions: 3,
      interval_days: 10,
      last_quality: 4,
      next_review: new Date(),
    };

    const result = EbbinghausScheduler.calculateNextReview(item, 1);
    expect(result.repetitions).toBe(0);
    expect(result.interval_days).toBe(1);
  });

  it('should increase interval with successive correct recalls', () => {
    const item = {
      sentence_id: 1,
      ease_factor: 2.5,
      repetitions: 2,
      interval_days: 6,
      last_quality: 4,
      next_review: new Date(),
    };

    const result = EbbinghausScheduler.calculateNextReview(item, 4);
    expect(result.interval_days).toBeGreaterThan(6);
    expect(result.repetitions).toBe(3);
  });

  it('should keep ease_factor at minimum 1.3', () => {
    const result = EbbinghausScheduler.calculateNextReview(
      { sentence_id: 1, ease_factor: 1.3, repetitions: 0, interval_days: 0, last_quality: 0, next_review: new Date() },
      0
    );
    expect(result.ease_factor).toBeGreaterThanOrEqual(1.3);
  });

  it('should calculate priority with higher score for overdue items', () => {
    const overdueItem = {
      sentence_id: 1,
      ease_factor: 2.0,
      repetitions: 3,
      interval_days: 7,
      last_quality: 4,
      next_review: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days overdue
    };

    const futureItem = {
      sentence_id: 2,
      ease_factor: 2.0,
      repetitions: 3,
      interval_days: 7,
      last_quality: 4,
      next_review: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days in future
    };

    const overduePriority = EbbinghausScheduler.getReviewPriority(overdueItem);
    const futurePriority = EbbinghausScheduler.getReviewPriority(futureItem);
    expect(overduePriority).toBeGreaterThan(futurePriority);
  });
});

describe('qualityToFeedback', () => {
  it('should return encouraging feedback for high quality', () => {
    expect(qualityToFeedback(5)).toBe('太棒了！');
    expect(qualityToFeedback(4)).toBe('太棒了！');
  });

  it('should return neutral feedback for medium quality', () => {
    expect(qualityToFeedback(3)).toBe('不错！');
  });

  it('should return constructive feedback for low quality', () => {
    expect(qualityToFeedback(0)).toBe('需要重新学习');
    expect(qualityToFeedback(1)).toBe('需要更多练习');
  });
});
```

- [ ] **Step 2: 创建数据库操作测试**

```typescript
import { getSentencesByWeek, getSentencesByStage, getSentencesByCategory, allSentences } from '../src/data/sentences';

describe('Sentences Data', () => {
  it('should have correct total of 500 sentences', () => {
    expect(allSentences.length).toBe(500);
  });

  it('should have 120 sentences in phase 1', () => {
    const phase1 = getSentencesByStage(1);
    expect(phase1.length).toBe(120);
  });

  it('should have 220 sentences in phase 2', () => {
    const phase2 = getSentencesByStage(2);
    expect(phase2.length).toBe(220);
  });

  it('should have 160 sentences in phase 3', () => {
    const phase3 = getSentencesByStage(3);
    expect(phase3.length).toBe(160);
  });

  it('should return correct number of sentences per week (~7 each)', () => {
    for (let week = 1; week <= 52; week++) {
      const weekSentences = getSentencesByWeek(week);
      expect(weekSentences.length).toBeGreaterThanOrEqual(5);
      expect(weekSentences.length).toBeLessThanOrEqual(15);
    }
  });

  it('should filter sentences by category correctly', () => {
    const animals = getSentencesByCategory('Animals');
    expect(animals.length).toBeGreaterThan(0);
    animals.forEach(s => expect(s.category).toBe('Animals'));
  });

  it('should have unique ids for all sentences', () => {
    const ids = allSentences.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(allSentences.length);
  });

  it('should have all required fields for every sentence', () => {
    allSentences.forEach(s => {
      expect(s.english).toBeTruthy();
      expect(s.chinese).toBeTruthy();
      expect(s.scene).toBeTruthy();
      expect(s.category).toBeTruthy();
      expect(s.difficulty).toBeGreaterThanOrEqual(1);
      expect(s.difficulty).toBeLessThanOrEqual(3);
      expect(s.week).toBeGreaterThanOrEqual(1);
      expect(s.week).toBeLessThanOrEqual(52);
      expect(s.stage).toBeGreaterThanOrEqual(1);
      expect(s.stage).toBeLessThanOrEqual(3);
    });
  });
});
```

---

## 执行顺序建议

```
Task 1 (HomeScreen bug) ─┐
Task 2 (ParentScreen bug) ─┤
Task 3 (Navigation bug) ───┼── 可并行修复
Task 4 (DB init bug) ─────┘
        │
        ▼
Task 5 (500句数据补齐) ─────── 依赖 DB 修复完成
        │
        ▼
Task 6 (StickerScreen) ─┐
Task 7 (SleepScreen) ────┼── 可并行开发
Task 8 (TheaterScreen) ─┘
        │
        ▼
Task 9 (单元测试) ─────────── 最后验证
```
