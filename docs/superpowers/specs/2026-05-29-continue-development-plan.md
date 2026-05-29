# 继续推进开发计划

## 项目当前状态
项目已完成约40%：核心组件库、导航架构、音频系统、数据库层、艾宾浩斯算法及大部分屏幕（首页、学习流、复习、家长管理、设置）均已实现。缺失的部分主要是句子数据不完整（仅~133/500句）、少量代码Bug、贴纸收集/睡前音频等辅助功能未实现、测试覆盖率低。

## 阶段1 — 修复现有代码Bug

### 1.1 HomeScreen 变量修复
**问题**：`HomeScreen.tsx` 中 `totalSentences`、`masteredSentences`、`tigerState` 作为独立变量引用，但实际定义在 `state` 对象中。
**修复**：从 `state` 对象解构取值，清理重复 import 和重复的 StyleSheet 键。

### 1.2 ParentScreen 死代码修复
**问题**：
- `handleExportReport` 中 `Alert.alert` 后有不可达的 `Alert.alert('导出成功'...)` 语句
- 调用了未定义的 `handleExportPDF` 方法
- `statsRow`、`toggleBackground`、`toggleKnob` 用 `StyleSheet.flatten` 定义在模块级，但在 JSX 中作为内联样式引用
**修复**：删除死代码、补充/重命名方法、将 flatten 常量改为正确的 StyleSheet 引用。

### 1.3 双重 NavigationContainer
**问题**：`App.tsx` 已包裹 `<NavigationContainer>`，`AppNavigator.tsx` 内部又包了一层。
**修复**：去除 `AppNavigator.tsx` 内部嵌套的 `<NavigationContainer>`。

### 1.4 数据库初始化统一
**问题**：`DatabaseContext.tsx` 有自己的 `createTables`，又引入 `databaseInitializer.ts`（也含建表逻辑），两套数据不一致（`sentences.ts` 是完整结构，`databaseInitializer.ts` 是84句简易版）。
**修复**：`DatabaseContext.tsx` 不再引入 `databaseInitializer.ts`，直接使用自己的 `createTables` + 从 `sentences.ts` 读取数据。

## 阶段2 — 补全500句数据

### 2.1 补全 Phase 2（第4-8月，220句，id 128-347）
场景：动物植物、玩具游戏、日常动作、衣食住行、天气自然、简单社交、物品认知、洗漱穿搭。
句型特点：小幅加长，高频句型（I like / I can / It's / Let's 等）。

### 2.2 补全 Phase 3（第9-12月，160句，id 348-507）
场景：日常问答、场景对话、需求表达、作息规律、情绪表达、亲子互动、户外场景、简单评价。
句型特点：包含一问一答句式，可用于真实亲子沟通。

## 阶段3 — 新增功能

### 3.1 贴纸收集页面 (StickerScreen)
- 网格布局展示贴纸（3列）
- 已获得贴纸高亮显示，未获得显示灰色轮廓
- 完成学习任务后弹出贴纸获得动画
- 贴纸分类：动物、水果、食物、玩具、学习、奖励

### 3.2 睡前音频模块 (SleepScreen)
- 已学句子循环播放列表
- 10/20/30分钟定时关闭
- 音量渐弱至停止
- 轻柔UI风格，老虎睡觉动画

### 3.3 每周情景小剧场 (TheaterScreen)
- 每周新学10句组成连贯动画剧情
- 自动播放模式
- 可跳过/重播

## 阶段4 — 单元测试

### 4.1 艾宾浩斯算法测试
- `calculateNextReview` 方法在不同 quality 下的行为
- 间隔计算正确性
- ease factor 边界情况

### 4.2 数据库操作测试
- CRUD 操作
- 初始化逻辑
- 查询过滤

### 4.3 组件渲染测试
- 主要屏幕组件的渲染测试
- Snapshot 测试

## 依赖关系
- 阶段1 → 阶段2 → 阶段3 → 阶段4（各阶段独立可并行，但推荐顺序执行以保证基底稳定）
