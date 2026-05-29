# 🐯 宝宝英语短句乐园

> **让3岁幼儿无痛玩学，12个月系统掌握500句高频生活化英文短句**

[![Test Status](https://github.com/jykggtkk/baby-english-500/actions/workflows/test.yml/badge.svg)](https://github.com/jykggtkk/baby-english-500/actions)
![React Native](https://img.shields.io/badge/React_Native-0.72-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🌟 核心特色

| 特色 | 说明 |
|------|------|
| 🎯 **零学习压力** | 无错题惩罚、无批评提示、全程鼓励式反馈 |
| 👶 **极简操作** | 仅支持点击/滑动，3岁幼儿可独立操作 |
| 🎬 **视听优先** | 动画 + 语音为主，文字极度精简 |
| ⏱ **短时高频** | 单次5分钟，每日10-15分钟 |
| 🧠 **科学复习** | 艾宾浩斯 SM-2 算法，对抗幼儿遗忘 |
| 🐯 **老虎伙伴** | Lottie 动画宠物，全程陪伴激励 |
| 📊 **家长管理** | 学习报告、时长管控、护眼模式 |
| 🔒 **纯客户端** | 零服务端、零上传，数据本地存储 |

---

## 📚 学习内容体系

```
500句 · 3阶段 · 52周 · 全覆盖
```

| 阶段 | 周期 | 句数 | ID | 主题 |
|------|------|------|----|------|
| 🌱 **入门破冰期** | 第1-3月 | **120句** | 1-120 | 问候、情绪、身体部位、食物、礼貌用语 |
| 🌿 **场景进阶期** | 第4-8月 | **220句** | 121-340 | 动物、玩具、衣物、天气、社交、物品认知 |
| 🌳 **综合巩固期** | 第9-12月 | **160句** | 341-500 | 日常问答、场景对话、亲子互动、需求表达 |

所有句子均为 **3-8个单词** 的日常口语，无复杂语法，适配幼儿发音。

---

## 📱 功能概览

### 🏠 成长首页
- 老虎宠物动画（根据时间不同状态）
- 学习进度条 + 今日任务提示
- 勋章展示区
- 长按进入家长模式

### 🎬 学习主流程（三步闭环）
1. **情景动画** — 10-15秒动画 + 双语发音
2. **跟读练习** — 轻量化录音，开口即奖励
3. **游戏巩固** — 听句找图 / 看图选句轮替

### 🔄 智能复习系统
- 艾宾浩斯 SM-2 算法自动排期
- 复习节点：当日2次 → 第2天 → 第4天 → 第7天 → 第15天
- 自由复习区：手动选择任意周期句子

### 👨‍👩‍👧 家长管理中心
- 学习数据统计（日/周/月）
- 学习趋势图表
- 每日时长限制
- 护眼模式

### ⭐ 更多趣味功能
| 功能 | 位置 | 说明 |
|------|------|------|
| 📒 贴纸收集 | 底部 Tab | 完成学习收集贴纸 |
| 🌙 睡前音频 | 底部 Tab | 已学句子循环播放 + 定时关闭 |
| 🎭 情景小剧场 | 底部 Tab | 每周新学句子整合连播 |

---

## 🚀 快速开始

### 环境要求

| 工具 | 版本 |
|------|------|
| Node.js | >= 16 |
| npm | >= 8 |
| JDK | >= 11 (Android) |
| Android Studio / Xcode | 最新版 |

### 安装

```bash
# 克隆
git clone https://github.com/jykggtkk/baby-english-500.git
cd baby-english-500

# 安装依赖
npm install --legacy-peer-deps

# iOS 额外步骤（macOS）
cd ios && pod install && cd ..
```

### 运行

```bash
# Android
npm run android

# iOS
npm run ios

# 运行测试
npm test
```

---

## 🧪 测试

```bash
npm test              # 运行全部测试
npm run test:watch    # 监听模式
npm run test:coverage # 覆盖率报告
```

当前测试：**19/19 通过** ✅

```
PASS tests/ebbinghaus.test.ts   — 艾宾浩斯算法测试
PASS tests/database.test.ts     — 500句数据完整性测试
PASS src/data/databaseInitializer.test.ts — 数据库初始化测试
```

---

## 🏗 项目结构

```
src/
├── App.tsx                    # 应用入口
├── navigation/                # 导航配置
├── screens/                   # 页面（11个）
│   ├── HomeScreen.tsx         # 首页
│   ├── LearningScreen.tsx     # 学习流
│   ├── AnimationScreen.tsx    # 情景动画
│   ├── PracticeScreen.tsx     # 跟读练习
│   ├── GameScreen.tsx         # 游戏巩固
│   ├── ReviewScreen.tsx       # 复习系统
│   ├── ParentScreen.tsx       # 家长管理
│   ├── StickerScreen.tsx      # 贴纸收集
│   ├── SleepScreen.tsx        # 睡前音频
│   └── TheaterScreen.tsx      # 情景剧场
├── components/common/         # 通用组件（8个）
├── contexts/                  # 状态管理
├── data/
│   └── sentences.ts           # 500句完整数据
├── utils/
│   ├── ebbinghaus.ts          # 艾宾浩斯算法
│   └── sound.ts               # 音频管理
└── types/                     # 类型定义
```

---

## 🗄 技术栈

| 技术 | 用途 |
|------|------|
| React Native 0.72 | 跨平台框架 |
| TypeScript | 类型安全 |
| React Navigation 6 | 页面路由 |
| Zustand | 状态管理 |
| SQLite | 本地数据库 |
| Lottie | 动画引擎 |
| Jest | 单元测试 |

---

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing`)
3. 提交改动 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing`)
5. 提交 Pull Request

---

## 📄 许可

[MIT License](LICENSE)

---

## 📬 联系

- 项目地址: https://github.com/jykggtkk/baby-english-500
- 问题反馈: [Issues](https://github.com/jykggtkk/baby-english-500/issues)

---

<p align="center">
  🐯 <strong>不背单词、不学语法、无枯燥学习</strong> 🐯<br>
  让英语启蒙像玩游戏一样简单
</p>
