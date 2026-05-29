# 宝宝英语短句乐园 — 安装使用说明

## 项目简介

让3岁幼儿无痛玩学，12个月系统掌握500句高频生活化英文短句的纯客户端手机应用。

- **技术栈**: React Native 0.72 + TypeScript
- **架构**: 纯客户端，零服务端，所有数据本地存储 (SQLite)
- **目标用户**: 3岁幼儿（家长辅助设置）

---

## 环境要求

| 工具 | 版本要求 |
|------|---------|
| Node.js | >= 16.0 |
| npm | >= 8.0 |
| JDK | >= 11（Android 构建） |
| Android Studio | 最新版（Android 构建） |
| Xcode | 最新版（iOS 构建，仅 macOS） |
| CocoaPods | 最新版（iOS 构建，仅 macOS） |

---

## 安装步骤

### 1. 克隆项目

```bash
git clone <repo-url>
cd newEnglish500
```

### 2. 安装依赖

```bash
npm install --legacy-peer-deps
```

> 注意：部分 React Native 原生包需要编译环境（NDK / Xcode）。
> 如遇安装失败，可尝试 `npm install --legacy-peer-deps --ignore-scripts` 然后手动处理原生依赖。

### 3. iOS 额外配置（仅 macOS）

```bash
cd ios && pod install && cd ..
```

### 4. 运行测试

```bash
npm test
```

预期输出：
```
PASS tests/ebbinghaus.test.ts
PASS tests/database.test.ts
PASS src/data/databaseInitializer.test.ts

Tests:       19 passed, 19 total
```

---

## 运行应用

### Android

```bash
npm run android
```

或在 Android Studio 中打开 `android/` 目录，构建并运行。

### iOS

```bash
npm run ios
```

或在 Xcode 中打开 `ios/BabyEnglish.xcworkspace`，构建并运行。

---

## 项目结构

```
newEnglish500/
├── src/
│   ├── App.tsx                    # 应用入口
│   ├── index.tsx                  # AppRegistry 注册
│   ├── navigation/
│   │   └── AppNavigator.tsx       # 导航配置（Tab + Stack）
│   ├── screens/
│   │   ├── HomeScreen.tsx         # 首页（老虎宠物、进度、入口）
│   │   ├── LearningScreen.tsx     # 学习流（动画→跟读→游戏）
│   │   ├── AnimationScreen.tsx    # 情景动画
│   │   ├── PracticeScreen.tsx     # 跟读练习
│   │   ├── GameScreen.tsx         # 游戏巩固
│   │   ├── ReviewScreen.tsx       # 复习系统
│   │   ├── ParentScreen.tsx       # 家长管理
│   │   ├── SettingsScreen.tsx     # 设置
│   │   ├── StickerScreen.tsx      # 贴纸收集 ★ 新增
│   │   ├── SleepScreen.tsx        # 睡前音频 ★ 新增
│   │   └── TheaterScreen.tsx      # 情景小剧场 ★ 新增
│   ├── components/common/
│   │   ├── Container.tsx          # 布局容器
│   │   ├── BigButton.tsx          # 大按钮
│   │   ├── ProgressBar.tsx        # 进度条
│   │   ├── CircleProgress.tsx     # 圆形进度
│   │   ├── TigerAnimation.tsx     # 老虎Lottie动画
│   │   ├── IconButton.tsx         # 图标按钮
│   │   ├── RecordButton.tsx       # 录音按钮
│   │   └── SentenceItem.tsx       # 句子列表项
│   ├── contexts/
│   │   ├── StateContext.tsx        # 全局状态管理
│   │   ├── DatabaseContext.tsx     # SQLite 数据库
│   │   └── AudioContext.tsx        # 音频播放
│   ├── data/
│   │   ├── sentences.ts           # 500句完整库！
│   │   └── databaseInitializer.ts # 数据库初始化
│   ├── utils/
│   │   ├── ebbinghaus.ts          # 艾宾浩斯 SM-2 算法
│   │   ├── database.ts            # 数据库 CRUD 操作
│   │   └── sound.ts              # 音频管理
│   └── types/
│       └── index.ts               # 类型定义
├── assets/
│   └── tiger-*.json               # 老虎 Lottie 动画文件
├── tests/
│   ├── setup.ts                   # Jest 配置
│   ├── ebbinghaus.test.ts         # 艾宾浩斯算法测试
│   ├── database.test.ts           # 500句数据完整性测试
│   └── __mocks__/
│       └── emptyModule.js         # 原生模块 Mock
└── docs/
    ├── ui-design.md               # UI 设计文档
    ├── ui-wireframes.md           # 线框图
    └── ui-components.md           # 组件库文档
```

---

## 内容体系

| 阶段 | 周期 | 句数 | ID 范围 | 主题 |
|------|------|------|---------|------|
| Phase 1: 入门破冰 | 第1-3月 | 120句 | 1-120 | 问候、情绪、身体、食物、礼貌 |
| Phase 2: 场景进阶 | 第4-8月 | 220句 | 121-340 | 动物、玩具、衣物、天气、社交 |
| Phase 3: 综合巩固 | 第9-12月 | 160句 | 341-500 | 问答、场景对话、需求表达、亲子互动 |

**500 句总数，52 周全覆盖！**

---

## 常用命令

| 命令 | 用途 |
|------|------|
| `npm start` | 启动 Metro 打包器 |
| `npm run android` | 构建并运行 Android |
| `npm run ios` | 构建并运行 iOS |
| `npm test` | 运行全部测试 |
| `npm run test:watch` | 监听模式运行测试 |
| `npm run test:coverage` | 生成测试覆盖率报告 |
| `npm run lint` | ESLint 代码检查 |
| `npm run type-check` | TypeScript 类型检查 |

---

## 数据库架构

使用 SQLite 本地存储，主要表：

- **sentences** — 500句完整数据（英文、中文、场景、分类、周、阶段）
- **learning_progress** — 学习进度（句子ID、状态、学习时间）
- **review_schedule** — 复习计划（下次复习时间、间隔天数、SM-2参数）
- **parent_settings** — 家长设置（每日限制、护眼模式）
- **stickers** / **sticker_collection** — 贴纸系统

---

## 关键功能入口

| 功能 | 入口 | 说明 |
|------|------|------|
| 开始学习 | 首页 → [开始学习] 按钮 | 动画→跟读→游戏三步流 |
| 复习 | 底部 Tab → [复习] | 艾宾浩斯智能排期 |
| 家长管理 | 首页 → [家长模式] | 密码 1234 |
| 贴纸收集 | 底部 Tab → [贴纸] | 分类浏览贴纸册 |
| 睡前音频 | 底部 Tab → [睡前] | 已学句子循环播放 + 定时 |
| 情景剧场 | 底部 Tab → [剧场] | 每周剧情连播 |

---

## 常见问题

**Q: npm install 报错怎么办？**
A: 尝试 `npm install --legacy-peer-deps --ignore-scripts`。原生模块需要在有 NDK/Xcode 的环境中编译。

**Q: 500 句数据在哪？**
A: `src/data/sentences.ts`，按 3 个阶段 52 周编排。

**Q: 如何添加更多句子？**
A: 在 `sentences.ts` 中向对应 phase 数组添加新条目，确保 `id`、`week`、`stage` 正确。

**Q: 如何自定义老虎动画？**
A: 替换 `assets/tiger-*.json` 文件（Lottie 格式），文件名对应 `TigerAnimation.tsx` 中的状态名称。

**Q: 测试覆盖率怎么查？**
A: 运行 `npm run test:coverage`，查看 `coverage/` 目录生成的 HTML 报告。
