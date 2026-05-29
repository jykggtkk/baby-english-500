# 3岁幼儿英语学习APP开发计划

## 项目概述
开发一款让3岁幼儿无痛玩学，12个月系统掌握500句高频生活化英文短句的纯客户端手机应用。采用React Native开发，零服务端架构，所有数据本地存储。

## 开发阶段

### 第一阶段：项目基础搭建（4周）

**任务1：项目初始化**
- [ ] 创建React Native TypeScript项目
- [ ] 配置开发环境（Android Studio, Xcode）
- [ ] 安装必要依赖（React Navigation, SQLite, Lottie等）
- [ ] 配置ESLint和Prettier

**任务2：数据库设计**
- [ ] 设计SQLite数据库schema
- [ ] 创建数据库迁移脚本
- [ ] 实现数据库初始化和版本管理
- [ ] 编写数据库操作工具类

**任务3：基础UI组件库**
- [ ] 实现Container, SafeAreaContainer等布局组件
- [ ] 实现BigButton, IconButton等交互组件
- [ ] 实现ProgressBar, CircleProgress等数据展示组件
- [ ] 实现TigerAnimation等动画组件

**任务4：导航架构**
- [ ] 配置React Navigation
- [ ] 创建主要路由结构
- [ ] 实现导航守卫（家长模式密码）
- [ ] 配置页面转场动画

### 第二阶段：核心功能开发（6周）

**任务1：首页模块**
- [ ] 实现老虎宠物角色系统
- [ ] 实现学习进度显示
- [ ] 实现今日任务提示
- [ ] 实现勋章系统
- [ ] 实现家长入口（长按3秒）

**任务2：学习流程模块**
- [ ] 实现情景动画页面
- [ ] 实现语音播放功能
- [ ] 实现跟读练习页面
- [ ] 实现游戏巩固页面（4种游戏）
- [ ] 实现学习流程的状态管理

**任务3：复习系统**
- [ ] 实现艾宾浩斯复习算法
- [ ] 实现复习提醒系统
- [ ] 实现复习列表页面
- [ ] 实现手动复习功能
- [ ] 实现复习进度跟踪

**任务4：音频系统**
- [ ] 集成React Native Sound
- [ ] 实现本地音频播放
- [ ] 实现录音功能
- [ ] 实现音频缓存管理
- [ ] 实现音频下载功能

### 第三阶段：辅助功能开发（4周）

**任务1：家长管理中心**
- [ ] 实现学习数据统计
- [ ] 实现PDF导出功能
- [ ] 实现时间限制设置
- [ ] 实现护眼模式设置
- [ ] 实现学习趋势图表

**任务2：贴纸收集系统**
- [ ] 实现贴纸展示页面
- [ ] 实现贴纸获得逻辑
- [ ] 实现贴纸分类系统
- [ ] 实现贴纸动画效果
- [ ] 实现贴纸分享功能

**任务3：睡前音频**
- [ ] 实现音频播放列表
- [ ] 实现定时关闭功能
- [ ] 实现音量渐弱
- [ ] 实现睡眠模式UI

**任务4：网络功能**
- [ ] 实现HTTP联网查词
- [ ] 实现发音查询
- [ ] 实现释义查询
- [ ] 实现网络状态检测

### 第四阶段：内容管理（3周）

**任务1：500句数据库创建**
- [ ] 创建第一阶段120句数据（1-3月）
- [ ] 创建第二阶段220句数据（4-8月）
- [ ] 创建第三阶段160句数据（9-12月）
- [ ] 为每个句子添加配图路径
- [ ] 为每个句子添加音频路径

**任务2：动画资源管理**
- [ ] 创建句子动画映射表
- [ ] 设计场景动画分镜
- [ ] 创建动画资源管理工具
- [ ] 实现动画加载优化

**任务3：游戏资源**
- [ ] 创建游戏图片资源
- [ ] 设计游戏UI元素
- [ ] 创建游戏音效资源
- [ ] 实现资源打包策略

### 第五阶段：测试与优化（3周）

**任务1：单元测试**
- [ ] 测试Ebbinghaus算法逻辑
- [ ] 测试数据库操作
- [ ] 测试音频播放功能
- [ ] 测试游戏逻辑
- [ ] 达到80%代码覆盖率

**任务2：集成测试**
- [ ] 测试学习流程各环节衔接
- [ ] 测试数据持久化
- [ ] 测试音频与游戏交互
- [ ] 测试复习系统自动化

**任务3：E2E测试**
- [ ] 测试完整学习流程
- [ ] 测试家长管理功能
- [ ] 测试复习提醒功能
- [ ] 使用Detox进行自动化测试

**任务4：性能优化**
- [ ] 优化启动时间（<3秒）
- [ ] 优化内存使用（<100MB）
- [ ] 优化动画帧率（>30fps）
- [ ] 优化音频延迟（<200ms）

### 第六阶段：发布准备（1周）

**任务1：构建配置**
- [ ] 配置iOS构建脚本
- [ ] 配置Android构建脚本
- [ ] 配置代码签名
- [ ] 准备应用图标和启动页

**任务2：App Store准备**
- [ ] 创建应用截图
- [ ] 制作应用预览视频
- [ ] 编写应用描述
- [ ] 准备隐私政策
- [ ] 配置年龄分级

**任务3：最终测试**
- [ ] 多设备真机测试
- [ ] 流量消耗测试
- [ ] 电池消耗测试
- [ ] 崩溃收集和修复

## 技术栈

- **前端框架**: React Native 0.72+
- **语言**: TypeScript
- **状态管理**: Zustand
- **导航**: React Navigation 6
- **数据库**: SQLite (react-native-sqlite-storage)
- **动画**: Lottie
- **音频**: react-native-sound
- **语音识别**: react-native-voice
- **PDF生成**: react-native-pdf
- **测试**: Jest, Detox

## 数据库设计

### 主要表结构

```sql
-- 句子表
CREATE TABLE sentences (
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

-- 学习进度表
CREATE TABLE learning_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sentence_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'new', -- new, learning, mastered
  learned_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sentence_id) REFERENCES sentences(id)
);

-- 复习计划表
CREATE TABLE review_schedule (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sentence_id INTEGER NOT NULL,
  next_review TIMESTAMP NOT NULL,
  interval_days INTEGER NOT NULL,
  ease_factor REAL DEFAULT 1.3,
  repetitions INTEGER DEFAULT 0,
  last_quality INTEGER DEFAULT 0, -- 0-5
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sentence_id) REFERENCES sentences(id)
);

-- 家长设置表
CREATE TABLE parent_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  daily_limit INTEGER DEFAULT 15, -- 分钟
  eye_protection BOOLEAN DEFAULT TRUE,
  sound_enabled BOOLEAN DEFAULT TRUE,
  reminder_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 贴纸收集表
CREATE TABLE sticker_collection (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sticker_id TEXT NOT NULL,
  category TEXT NOT NULL,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sticker_id) REFERENCES stickers(id)
);

-- 贴纸表
CREATE TABLE stickers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT
);
```

## 验收标准

1. **功能验收**
   - [ ] 完整的学习流程：动画→跟读→游戏
   - [ ] 老虎宠物系统正常工作
   - [ ] 复习算法准确运行
   - [ ] 家长管理功能完整
   - [ ] PDF导出功能正常

2. **性能验收**
   - [ ] 启动时间 < 3秒
   - [ ] 内存使用 < 100MB
   - [ ] 动画帧率 > 30fps
   - [ ] 音频延迟 < 200ms
   - [ ] 首次打开 < 5秒

3. **质量验收**
   - [ ] 单元测试覆盖率 > 80%
   - [ ] E2E测试通过核心流程
   - [ ] 代码符合ESLint规范
   - [ ] 无内存泄漏
   - [ ] 崩溃率 < 0.1%

4. **用户体验验收**
   - [ ] 3岁幼儿可独立操作
   - [ ] 无复杂交互步骤
   - [ ] 视觉效果吸引儿童
   - [ ] 音频清晰易懂
   - [ ] 家长操作简便

## 风险评估

### 高风险项
1. **动画性能问题**
   - 缓解：使用Lottie动画，优化加载策略
   - 应对：准备备选静态图片方案

2. **音频同步问题**
   - 缓解：使用专业音频处理工具
   - 应对：实现音频重试机制

3. **存储空间占用**
   - 缓解：实现资源按需加载
   - 应对：提供清理缓存功能

### 中风险项
1. **语音识别准确率**
   - 缓解：使用宽容的识别算法
   - 应对：提供重试选项

2. **多设备兼容性**
   - 缓解：广泛测试不同设备
   - 应对：准备降级方案

## 后续规划

### 版本1.1（发布后1个月）
- 添加更多互动游戏
- 优化动画效果
- 增加家长报告详细度

### 版本1.2（发布后3个月）
- 支持离线下载完整资源
- 添加多语言支持
- 优化AI个性化推荐

### 版本2.0（发布后6个月）
- 增加社交分享功能
- 添加亲子互动模块
- 引入AI智能教学助手

---

开发周期：21周
开发团队：1-2人（React Native开发 + UI设计）
预计发布时间：6个月后