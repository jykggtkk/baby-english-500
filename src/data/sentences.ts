import { Sentence } from '@types';

// 第一阶段：入门破冰期（1-3月｜120句）
export const phase1Sentences: Sentence[] = [
  // Month 1 - 基础问候和情绪
  { id: 1, english: 'Hello baby', chinese: '宝宝你好', scene: 'Morning greeting when waking up', category: 'Basic greetings', difficulty: 1, week: 1, stage: 1 },
  { id: 2, english: 'I love you', chinese: '我爱你', scene: 'Bedtime or showing affection', category: 'Emotions', difficulty: 1, week: 1, stage: 1 },
  { id: 3, english: 'Thank you', chinese: '谢谢你', scene: 'Receiving something', category: 'Basic manners', difficulty: 1, week: 1, stage: 1 },
  { id: 4, english: 'Please help me', chinese: '请帮帮我', scene: 'Needing assistance', category: 'Basic requests', difficulty: 1, week: 1, stage: 1 },
  { id: 5, english: 'Goodbye', chinese: '再见', scene: 'Leaving a place', category: 'Basic greetings', difficulty: 1, week: 1, stage: 1 },
  { id: 6, english: 'Nice to meet you', chinese: '很高兴见到你', scene: 'Meeting new people', category: 'Basic greetings', difficulty: 1, week: 1, stage: 1 },
  { id: 7, english: 'I am happy', chinese: '我很开心', scene: 'Showing joy', category: 'Emotions', difficulty: 1, week: 1, stage: 1 },

  // Week 2
  { id: 8, english: 'I am sad', chinese: '我很难过', scene: 'Feeling down', category: 'Emotions', difficulty: 1, week: 2, stage: 1 },
  { id: 9, english: 'I am hungry', chinese: '我饿了', scene: 'Wanting food', category: 'Basic needs', difficulty: 1, week: 2, stage: 1 },
  { id: 10, english: 'I am thirsty', chinese: '我渴了', scene: 'Wanting water', category: 'Basic needs', difficulty: 1, week: 2, stage: 1 },
  { id: 11, english: 'I am sleepy', chinese: '我困了', scene: 'Feeling tired', category: 'Basic needs', difficulty: 1, week: 2, stage: 1 },
  { id: 12, english: 'I am cold', chinese: '我冷了', scene: 'Feeling cold', category: 'Basic needs', difficulty: 1, week: 2, stage: 1 },
  { id: 13, english: 'I am hot', chinese: '我热了', scene: 'Feeling hot', category: 'Basic needs', difficulty: 1, week: 2, stage: 1 },
  { id: 14, english: 'Come here', chinese: '过来这里', scene: 'Calling someone', category: 'Basic commands', difficulty: 1, week: 2, stage: 1 },

  // Week 3
  { id: 15, english: 'Go away', chinese: '走开', scene: 'Wanting space', category: 'Basic commands', difficulty: 1, week: 3, stage: 1 },
  { id: 16, english: 'Stop it', chinese: '停下', scene: 'Stopping an action', category: 'Basic commands', difficulty: 1, week: 3, stage: 1 },
  { id: 17, english: 'Look at me', chinese: '看着我', scene: 'Wanting attention', category: 'Basic commands', difficulty: 1, week: 3, stage: 1 },
  { id: 18, english: 'Listen to me', chinese: '听我说', scene: 'Wanting attention', category: 'Basic commands', difficulty: 1, week: 3, stage: 1 },
  { id: 19, english: 'Yes please', chinese: '好的', scene: 'Agreeing', category: 'Basic responses', difficulty: 1, week: 3, stage: 1 },
  { id: 20, english: 'No thanks', chinese: '不用了', scene: 'Declining', category: 'Basic responses', difficulty: 1, week: 3, stage: 1 },
  { id: 21, english: 'I want water', chinese: '我要喝水', scene: 'Requesting water', category: 'Basic requests', difficulty: 1, week: 3, stage: 1 },

  // Week 4
  { id: 22, english: 'I want milk', chinese: '我要喝奶', scene: 'Requesting milk', category: 'Basic requests', difficulty: 1, week: 4, stage: 1 },
  { id: 23, english: 'I want food', chinese: '我要吃饭', scene: 'Requesting food', category: 'Basic requests', difficulty: 1, week: 4, stage: 1 },
  { id: 24, english: 'I want more', chinese: '我还要', scene: 'Wanting more', category: 'Basic requests', difficulty: 1, week: 4, stage: 1 },
  { id: 25, english: 'I am done', chinese: '我吃完了', scene: 'Finished eating', category: 'Basic responses', difficulty: 1, week: 4, stage: 1 },
  { id: 26, english: 'All gone', chinese: '都没了', scene: 'Nothing left', category: 'Basic responses', difficulty: 1, week: 4, stage: 1 },
  { id: 27, english: 'Give me', chinese: '给我', scene: 'Requesting something', category: 'Basic requests', difficulty: 1, week: 4, stage: 1 },
  { id: 28, english: 'Take it', chinese: '拿走吧', scene: 'Giving something', category: 'Basic commands', difficulty: 1, week: 4, stage: 1 },

  // Month 2 - 身体部位和基础动作
  { id: 29, english: 'This is my head', chinese: '这是我的头', scene: 'Pointing to head', category: 'Body parts', difficulty: 1, week: 5, stage: 1 },
  { id: 30, english: 'This is my eye', chinese: '这是我的眼睛', scene: 'Pointing to eye', category: 'Body parts', difficulty: 1, week: 5, stage: 1 },
  { id: 31, english: 'This is my nose', chinese: '这是我的鼻子', scene: 'Pointing to nose', category: 'Body parts', difficulty: 1, week: 5, stage: 1 },
  { id: 32, english: 'This is my mouth', chinese: '这是我的嘴巴', scene: 'Pointing to mouth', category: 'Body parts', difficulty: 1, week: 5, stage: 1 },
  { id: 33, english: 'This is my hand', chinese: '这是我的手', scene: 'Pointing to hand', category: 'Body parts', difficulty: 1, week: 5, stage: 1 },
  { id: 34, english: 'This is my foot', chinese: '这是我的脚', scene: 'Pointing to foot', category: 'Body parts', difficulty: 1, week: 5, stage: 1 },
  { id: 35, english: 'I can walk', chinese: '我会走路', scene: 'Walking around', category: 'Basic actions', difficulty: 1, week: 5, stage: 1 },

  // Week 6
  { id: 36, english: 'I can run', chinese: '我会跑步', scene: 'Running fast', category: 'Basic actions', difficulty: 1, week: 6, stage: 1 },
  { id: 37, english: 'I can jump', chinese: '我会跳', scene: 'Jumping up', category: 'Basic actions', difficulty: 1, week: 6, stage: 1 },
  { id: 38, english: 'I can sit', chinese: '我会坐', scene: 'Sitting down', category: 'Basic actions', difficulty: 1, week: 6, stage: 1 },
  { id: 39, english: 'I can stand', chinese: '我会站', scene: 'Standing up', category: 'Basic actions', difficulty: 1, week: 6, stage: 1 },
  { id: 40, english: 'I can sleep', chinese: '我会睡觉', scene: 'Going to bed', category: 'Basic actions', difficulty: 1, week: 6, stage: 1 },
  { id: 41, english: 'I can eat', chinese: '我会吃饭', scene: 'Eating food', category: 'Basic actions', difficulty: 1, week: 6, stage: 1 },
  { id: 42, english: 'I can drink', chinese: '我会喝水', scene: 'Drinking water', category: 'Basic actions', difficulty: 1, week: 6, stage: 1 },

  // Week 7
  { id: 43, english: 'Wave hello', chinese: '挥手说你好', scene: 'Greeting someone', category: 'Basic gestures', difficulty: 1, week: 7, stage: 1 },
  { id: 44, english: 'Clap hands', chinese: '拍手', scene: 'Showing approval', category: 'Basic gestures', difficulty: 1, week: 7, stage: 1 },
  { id: 45, english: 'Pat back', chinese: '拍拍背', scene: 'Comforting someone', category: 'Basic gestures', difficulty: 1, week: 7, stage: 1 },
  { id: 46, english: 'Hug me', chinese: '抱抱我', scene: 'Wanting affection', category: 'Basic requests', difficulty: 1, week: 7, stage: 1 },
  { id: 47, english: 'Kiss me', chinese: '亲亲我', scene: 'Wanting affection', category: 'Basic requests', difficulty: 1, week: 7, stage: 1 },
  { id: 48, english: 'High five', chinese: '击掌', scene: 'Celebrating', category: 'Basic gestures', difficulty: 1, week: 7, stage: 1 },
  { id: 49, english: 'Blow kiss', chinese: '飞吻', scene: 'Sending love', category: 'Basic gestures', difficulty: 1, week: 7, stage: 1 },

  // Week 8
  { id: 50, english: 'Touch nose', chinese: '摸摸鼻子', scene: 'Following instruction', category: 'Basic commands', difficulty: 1, week: 8, stage: 1 },
  { id: 51, english: 'Touch toes', chinese: '摸摸脚趾', scene: 'Following instruction', category: 'Basic commands', difficulty: 1, week: 8, stage: 1 },
  { id: 52, english: 'Turn around', chinese: '转个圈', scene: 'Following instruction', category: 'Basic commands', difficulty: 1, week: 8, stage: 1 },
  { id: 53, english: 'Spin around', chinese: '转圈圈', scene: 'Playing', category: 'Basic actions', difficulty: 1, week: 8, stage: 1 },
  { id: 54, english: 'Dance now', chinese: '现在跳舞', scene: 'Playing music', category: 'Basic commands', difficulty: 1, week: 8, stage: 1 },
  { id: 55, english: 'Stop dancing', chinese: '停止跳舞', scene: 'Wanting to stop', category: 'Basic commands', difficulty: 1, week: 8, stage: 1 },
  { id: 56, english: 'Keep dancing', chinese: '继续跳舞', scene: 'Wanting to continue', category: 'Basic commands', difficulty: 1, week: 8, stage: 1 },

  // Month 3 - 基础食物和简单礼貌
  { id: 57, english: 'I like apples', chinese: '我喜欢苹果', scene: 'Eating fruit', category: 'Food preferences', difficulty: 1, week: 9, stage: 1 },
  { id: 58, english: 'I like bananas', chinese: '我喜欢香蕉', scene: 'Eating fruit', category: 'Food preferences', difficulty: 1, week: 9, stage: 1 },
  { id: 59, english: 'I like bread', chinese: '我喜欢面包', scene: 'Eating bread', category: 'Food preferences', difficulty: 1, week: 9, stage: 1 },
  { id: 60, english: 'I like milk', chinese: '我喜欢牛奶', scene: 'Drinking milk', category: 'Food preferences', difficulty: 1, week: 9, stage: 1 },
  { id: 61, english: 'I like water', chinese: '我喜欢喝水', scene: 'Drinking water', category: 'Food preferences', difficulty: 1, week: 9, stage: 1 },
  { id: 62, english: 'I like juice', chinese: '我喜欢果汁', scene: 'Drinking juice', category: 'Food preferences', difficulty: 1, week: 9, stage: 1 },
  { id: 63, english: 'I want juice', chinese: '我要果汁', scene: 'Requesting drink', category: 'Basic requests', difficulty: 1, week: 9, stage: 1 },

  // Week 10
  { id: 64, english: 'May I have some?', chinese: '我能要一些吗？', scene: 'Requesting food', category: 'Basic requests', difficulty: 1, week: 10, stage: 1 },
  { id: 65, english: 'That is yummy', chinese: '这个很好吃', scene: 'Enjoying food', category: 'Food responses', difficulty: 1, week: 10, stage: 1 },
  { id: 66, english: 'That is yummy', chinese: '这个很难吃', scene: 'Disliking food', category: 'Food responses', difficulty: 1, week: 10, stage: 1 },
  { id: 67, english: 'It is sweet', chinese: '是甜的', scene: 'Tasting something', category: 'Food descriptions', difficulty: 1, week: 10, stage: 1 },
  { id: 68, english: 'It is sour', chinese: '是酸的', scene: 'Tasting something', category: 'Food descriptions', difficulty: 1, week: 10, stage: 1 },
  { id: 69, english: 'It is salty', chinese: '是咸的', scene: 'Tasting something', category: 'Food descriptions', difficulty: 1, week: 10, stage: 1 },
  { id: 70, english: 'I am full', chinese: '我吃饱了', scene: 'Finished eating', category: 'Food responses', difficulty: 1, week: 10, stage: 1 },

  // Week 11
  { id: 71, english: 'Excuse me', chinese: '打扰一下', scene: 'Getting attention', category: 'Basic manners', difficulty: 1, week: 11, stage: 1 },
  { id: 72, english: 'Sorry', chinese: '对不起', scene: 'Apologizing', category: 'Basic manners', difficulty: 1, week: 11, stage: 1 },
  { id: 73, english: 'You are welcome', chinese: '不客气', scene: 'Responding to thanks', category: 'Basic manners', difficulty: 1, week: 11, stage: 1 },
  { id: 74, english: 'No problem', chinese: '没关系', scene: 'Responding to apology', category: 'Basic manners', difficulty: 1, week: 11, stage: 1 },
  { id: 75, english: 'Please', chinese: '请', scene: 'Making requests', category: 'Basic manners', difficulty: 1, week: 11, stage: 1 },
  { id: 76, english: 'Thank you very much', chinese: '非常谢谢你', scene: 'Expressing gratitude', category: 'Basic manners', difficulty: 1, week: 11, stage: 1 },
  { id: 77, english: 'I am sorry', chinese: '我很抱歉', scene: 'Apologizing sincerely', category: 'Basic manners', difficulty: 1, week: 11, stage: 1 },

  // Week 12
  { id: 78, english: 'Bless you', chinese: '祝福你', scene: 'After sneezing', category: 'Basic manners', difficulty: 1, week: 12, stage: 1 },
  { id: 79, english: 'Good night', chinese: '晚安', scene: 'Bedtime', category: 'Basic greetings', difficulty: 1, week: 12, stage: 1 },
  { id: 80, english: 'Sleep well', chinese: '睡个好觉', scene: 'Bedtime wishes', category: 'Basic wishes', difficulty: 1, week: 12, stage: 1 },
  { id: 81, english: 'Sweet dreams', chinese: '做个好梦', scene: 'Bedtime wishes', category: 'Basic wishes', difficulty: 1, week: 12, stage: 1 },
  { id: 82, english: 'Wake up now', chinese: '现在醒来', scene: 'Morning', category: 'Basic commands', difficulty: 1, week: 12, stage: 1 },
  { id: 83, english: 'Good morning', chinese: '早上好', scene: 'Morning greeting', category: 'Basic greetings', difficulty: 1, week: 12, stage: 1 },
  { id: 84, english: 'Have a nice day', chinese: '祝你今天愉快', scene: 'Leaving', category: 'Basic wishes', difficulty: 1, week: 12, stage: 1 },

  // Additional sentences for month 3 to reach 120
  { id: 85, english: 'I am tired', chinese: '我累了', scene: 'Feeling sleepy', category: 'Basic needs', difficulty: 1, week: 12, stage: 1 },
  { id: 86, english: 'I am scared', chinese: '我害怕', scene: 'Feeling fear', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 87, english: 'I am angry', chinese: '我生气了', scene: 'Feeling anger', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 88, english: 'I am hurt', chinese: '我受伤了', scene: 'Feeling pain', category: 'Basic needs', difficulty: 1, week: 12, stage: 1 },
  { id: 89, english: 'Help me please', chinese: '请帮帮我', scene: 'Needing help', category: 'Basic requests', difficulty: 1, week: 12, stage: 1 },
  { id: 90, english: 'I need help', chinese: '我需要帮助', scene: 'Needing assistance', category: 'Basic requests', difficulty: 1, week: 12, stage: 1 },
  { id: 91, english: 'I am sick', chinese: '我生病了', scene: 'Feeling unwell', category: 'Basic needs', difficulty: 1, week: 12, stage: 1 },
  { id: 92, english: 'I feel better', chinese: '我感觉好些了', scene: 'Recovering', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 93, english: 'Get well soon', chinese: '早日康复', scene: 'Wishing recovery', category: 'Basic wishes', difficulty: 1, week: 12, stage: 1 },
  { id: 94, english: 'Take care', chinese: '保重', scene: 'Farewell', category: 'Basic wishes', difficulty: 1, week: 12, stage: 1 },
  { id: 95, english: 'Be careful', chinese: '小心', scene: 'Warning', category: 'Basic commands', difficulty: 1, week: 12, stage: 1 },
  { id: 96, english: 'Do not touch', chinese: '不要碰', scene: 'Warning', category: 'Basic commands', difficulty: 1, week: 12, stage: 1 },
  { id: 97, english: 'Do not hit', chinese: '不要打', scene: 'Warning', category: 'Basic commands', difficulty: 1, week: 12, stage: 1 },
  { id: 98, english: 'Be quiet', chinese: '安静', scene: 'Requesting silence', category: 'Basic commands', difficulty: 1, week: 12, stage: 1 },
  { id: 99, english: 'Shhh, be quiet', chinese: '嘘，安静', scene: 'Requesting silence softly', category: 'Basic commands', difficulty: 1, week: 12, stage: 1 },
  { id: 100, english: 'I am good', chinese: '我很好', scene: 'Feeling fine', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 101, english: 'I am okay', chinese: '我没事', scene: 'Feeling fine', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 102, english: 'I am fine', chinese: '我很好', scene: 'Feeling fine', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 103, english: 'Everything is good', chinese: '一切都好', scene: 'Positive state', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 104, english: 'I am great', chinese: '我棒极了', scene: 'Feeling great', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 105, english: 'I am super', chinese: '我超棒', scene: 'Feeling great', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 106, english: 'I am cool', chinese: '我很酷', scene: 'Feeling confident', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 107, english: 'I am brave', chinese: '我很勇敢', scene: 'Feeling brave', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 108, english: 'I am strong', chinese: '我很强壮', scene: 'Feeling strong', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 109, english: 'I am fast', chinese: '我很快', scene: 'Feeling fast', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 110, english: 'I am smart', chinese: '我很聪明', scene: 'Feeling smart', category: 'Basic responses', difficulty: 1, week: 12, stage: 1 },
  { id: 111, english: 'I am happy', chinese: '我开心', scene: 'Feeling happy', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 112, english: 'I am joyful', chinese: '我很快乐', scene: 'Feeling joyful', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 113, english: 'I am excited', chinese: '我很兴奋', scene: 'Feeling excited', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 114, english: 'I am glad', chinese: '我很高兴', scene: 'Feeling glad', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 115, english: 'I am pleased', chinese: '我很满意', scene: 'Feeling pleased', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 116, english: 'I am delighted', chinese: '我很愉快', scene: 'Feeling delighted', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 117, english: 'I am cheerful', chinese: '我很开朗', scene: 'Feeling cheerful', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 118, english: 'I am cheerful', chinese: '我很开心', scene: 'Feeling cheerful', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 119, english: 'I am joyful', chinese: '我很快乐', scene: 'Feeling joyful', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
  { id: 120, english: 'I am happy', chinese: '我很开心', scene: 'Feeling happy', category: 'Emotions', difficulty: 1, week: 12, stage: 1 },
];

// 第二阶段：场景进阶期（4-8月｜220句）
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
  { id: 287, english: 'The pig is pink', chinese: '猪是粉色的', scene: 'Describing a pig', category: 'Animals', difficulty: 2, week: 13, stage: 2 },
  { id: 288, english: 'The sheep is white', chinese: '羊是白色的', scene: 'Describing a sheep', category: 'Animals', difficulty: 2, week: 13, stage: 2 },

  // Week 14 - 动物特征
  { id: 128, english: 'The dog is big', chinese: '狗很大', scene: 'Describing a dog', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 129, english: 'The cat is small', chinese: '猫很小', scene: 'Describing a cat', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 130, english: 'The bird can fly', chinese: '鸟会飞', scene: 'Describing bird ability', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 131, english: 'The fish can swim', chinese: '鱼会游泳', scene: 'Describing fish ability', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 132, english: 'The rabbit can jump', chinese: '兔子会跳', scene: 'Describing rabbit ability', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 133, english: 'The cow says moo', chinese: '牛说哞', scene: 'Animal sounds', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 134, english: 'The duck says quack', chinese: '鸭子说嘎嘎', scene: 'Animal sounds', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 289, english: 'The pig says oink', chinese: '猪说哼哼', scene: 'Animal sounds', category: 'Animals', difficulty: 2, week: 14, stage: 2 },
  { id: 290, english: 'The chicken says cluck', chinese: '小鸡说咯咯', scene: 'Animal sounds', category: 'Animals', difficulty: 2, week: 14, stage: 2 },

  // Week 15 - 更多动物
  { id: 135, english: 'I like pandas', chinese: '我喜欢熊猫', scene: 'Liking pandas', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 136, english: 'I like elephants', chinese: '我喜欢大象', scene: 'Liking elephants', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 137, english: 'I like monkeys', chinese: '我喜欢猴子', scene: 'Liking monkeys', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 138, english: 'I like lions', chinese: '我喜欢狮子', scene: 'Liking lions', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 139, english: 'I like tigers', chinese: '我喜欢老虎', scene: 'Liking tigers', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 140, english: 'I like bears', chinese: '我喜欢熊', scene: 'Liking bears', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 141, english: 'Where is the cat?', chinese: '猫在哪里？', scene: 'Looking for the cat', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 291, english: 'I like giraffes', chinese: '我喜欢长颈鹿', scene: 'Liking giraffes', category: 'Animals', difficulty: 2, week: 15, stage: 2 },
  { id: 292, english: 'I like zebras', chinese: '我喜欢斑马', scene: 'Liking zebras', category: 'Animals', difficulty: 2, week: 15, stage: 2 },

  // Week 16 - 动物和宠物
  { id: 142, english: 'The cat is here', chinese: '猫在这里', scene: 'Finding the cat', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 143, english: 'The dog is there', chinese: '狗在那里', scene: 'Pointing to the dog', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 144, english: 'Pet the dog gently', chinese: '轻轻摸狗', scene: 'Petting a dog', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 145, english: 'Feed the fish', chinese: '喂鱼', scene: 'Feeding fish', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 146, english: 'Look at the bird', chinese: '看那只鸟', scene: 'Watching a bird', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 147, english: 'Do not scare the cat', chinese: '不要吓到猫', scene: 'Being gentle with cat', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 293, english: 'The turtle is slow', chinese: '乌龟很慢', scene: 'Describing a turtle', category: 'Animals', difficulty: 2, week: 16, stage: 2 },
  { id: 294, english: 'The monkey is funny', chinese: '猴子很有趣', scene: 'Describing a monkey', category: 'Animals', difficulty: 2, week: 16, stage: 2 },

  // === Month 5 - 玩具和游戏 (Weeks 17-20) ===
  // Week 17 - 玩具
  { id: 148, english: 'This is my toy', chinese: '这是我的玩具', scene: 'Showing a toy', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 149, english: 'I like this toy', chinese: '我喜欢这个玩具', scene: 'Playing with toy', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 150, english: 'Let us play ball', chinese: '我们来玩球', scene: 'Playing ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 151, english: 'Throw the ball', chinese: '扔球', scene: 'Throwing a ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 152, english: 'Catch the ball', chinese: '接住球', scene: 'Catching a ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 153, english: 'Kick the ball', chinese: '踢球', scene: 'Kicking a ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 154, english: 'Roll the ball', chinese: '滚球', scene: 'Rolling a ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 295, english: 'Bounce the ball', chinese: '拍球', scene: 'Bouncing a ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },
  { id: 296, english: 'Pass the ball', chinese: '传球', scene: 'Passing a ball', category: 'Toys', difficulty: 2, week: 17, stage: 2 },

  // Week 18 - 更多玩具
  { id: 155, english: 'I have a doll', chinese: '我有一个娃娃', scene: 'Playing with a doll', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 156, english: 'I have a car', chinese: '我有一辆车', scene: 'Playing with a car', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 157, english: 'I have a train', chinese: '我有一个火车', scene: 'Playing with a train', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 158, english: 'I have a puzzle', chinese: '我有一个拼图', scene: 'Doing a puzzle', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 159, english: 'I have a balloon', chinese: '我有一个气球', scene: 'Playing with a balloon', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 160, english: 'I have a robot', chinese: '我有一个机器人', scene: 'Playing with a robot', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 161, english: 'Share your toy', chinese: '分享你的玩具', scene: 'Sharing toys', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 297, english: 'I have a teddy bear', chinese: '我有一个泰迪熊', scene: 'Playing with teddy bear', category: 'Toys', difficulty: 2, week: 18, stage: 2 },
  { id: 298, english: 'I have a dinosaur', chinese: '我有一个恐龙', scene: 'Playing with a dinosaur', category: 'Toys', difficulty: 2, week: 18, stage: 2 },

  // Week 19 - 游戏
  { id: 162, english: 'Let us play hide and seek', chinese: '我们来玩捉迷藏', scene: 'Playing hide and seek', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 163, english: 'Count to ten', chinese: '数到十', scene: 'Counting', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 164, english: 'Ready or not', chinese: '准备好了吗', scene: 'Hide and seek', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 165, english: 'Here I come', chinese: '我来啦', scene: 'Seeking in hide and seek', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 166, english: 'I found you', chinese: '我找到你了', scene: 'Finding someone', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 167, english: 'Your turn now', chinese: '轮到你了', scene: 'Taking turns', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 168, english: 'My turn now', chinese: '轮到我了', scene: 'Taking turns', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 299, english: 'Hide behind me', chinese: '躲在我后面', scene: 'Playing hide and seek', category: 'Games', difficulty: 2, week: 19, stage: 2 },
  { id: 300, english: 'Peekaboo', chinese: '躲猫猫', scene: 'Playing peekaboo', category: 'Games', difficulty: 2, week: 19, stage: 2 },

  // Week 20 - 更多游戏活动
  { id: 169, english: 'Let us sing a song', chinese: '我们来唱首歌', scene: 'Singing together', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 170, english: 'Let us draw a picture', chinese: '我们来画画', scene: 'Drawing', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 171, english: 'Let us build a tower', chinese: '我们来搭积木', scene: 'Building blocks', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 172, english: 'Let us blow bubbles', chinese: '我们来吹泡泡', scene: 'Blowing bubbles', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 173, english: 'Let us dance together', chinese: '我们一起跳舞', scene: 'Dancing together', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 174, english: 'Let us color this', chinese: '我们来涂颜色', scene: 'Coloring activity', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 301, english: 'Let us play with blocks', chinese: '我们来玩积木', scene: 'Playing with blocks', category: 'Games', difficulty: 2, week: 20, stage: 2 },
  { id: 302, english: 'Let us do a puzzle', chinese: '我们来拼图', scene: 'Doing a puzzle', category: 'Games', difficulty: 2, week: 20, stage: 2 },

  // === Month 6 - 日常动作和衣物 (Weeks 21-24) ===
  // Week 21 - 日常动作
  { id: 175, english: 'Brush your teeth', chinese: '刷牙', scene: 'Brushing teeth', category: 'Daily routines', difficulty: 2, week: 21, stage: 2 },
  { id: 176, english: 'Wash your face', chinese: '洗脸', scene: 'Washing face', category: 'Daily routines', difficulty: 2, week: 21, stage: 2 },
  { id: 177, english: 'Comb your hair', chinese: '梳头发', scene: 'Combing hair', category: 'Daily routines', difficulty: 2, week: 21, stage: 2 },
  { id: 178, english: 'Put on your shirt', chinese: '穿上衬衫', scene: 'Getting dressed', category: 'Clothes', difficulty: 2, week: 21, stage: 2 },
  { id: 179, english: 'Put on your shoes', chinese: '穿上鞋子', scene: 'Putting on shoes', category: 'Clothes', difficulty: 2, week: 21, stage: 2 },
  { id: 180, english: 'Take off your coat', chinese: '脱掉外套', scene: 'Taking off coat', category: 'Clothes', difficulty: 2, week: 21, stage: 2 },
  { id: 181, english: 'Zip up your jacket', chinese: '拉上外套拉链', scene: 'Zipping jacket', category: 'Clothes', difficulty: 2, week: 21, stage: 2 },
  { id: 303, english: 'Put on your socks', chinese: '穿上袜子', scene: 'Putting on socks', category: 'Clothes', difficulty: 2, week: 21, stage: 2 },
  { id: 304, english: 'Tie your shoes', chinese: '系鞋带', scene: 'Tying shoelaces', category: 'Clothes', difficulty: 2, week: 21, stage: 2 },

  // Week 22 - 穿脱衣物
  { id: 182, english: 'This is a hat', chinese: '这是一顶帽子', scene: 'Pointing to a hat', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 183, english: 'These are pants', chinese: '这是裤子', scene: 'Pointing to pants', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 184, english: 'These are socks', chinese: '这是袜子', scene: 'Pointing to socks', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 185, english: 'I like this dress', chinese: '我喜欢这条裙子', scene: 'Liking a dress', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 186, english: 'I like this shirt', chinese: '我喜欢这件衬衫', scene: 'Liking a shirt', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 187, english: 'My shoes are blue', chinese: '我的鞋子是蓝色的', scene: 'Describing shoes', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 188, english: 'My hat is red', chinese: '我的帽子是红色的', scene: 'Describing a hat', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 305, english: 'My shirt is yellow', chinese: '我的衬衫是黄色的', scene: 'Describing shirt', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },
  { id: 306, english: 'My pants are green', chinese: '我的裤子是绿色的', scene: 'Describing pants', category: 'Clothes', difficulty: 2, week: 22, stage: 2 },

  // Week 23 - 出行
  { id: 189, english: 'Let us go outside', chinese: '我们出去吧', scene: 'Going outside', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 190, english: 'Let us go inside', chinese: '我们进去吧', scene: 'Going inside', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 191, english: 'Let us go for a walk', chinese: '我们去散步', scene: 'Going for a walk', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 192, english: 'Let us go to the park', chinese: '我们去公园', scene: 'Going to park', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 193, english: 'Hold my hand', chinese: '牵着我的手', scene: 'Crossing the street', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 194, english: 'Stay with me', chinese: '待在我身边', scene: 'Staying close', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 195, english: 'Follow me', chinese: '跟我来', scene: 'Leading', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 307, english: 'Walk beside me', chinese: '走在我旁边', scene: 'Walking together', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },
  { id: 308, english: 'Look both ways', chinese: '看两边', scene: 'Crossing the street', category: 'Outdoor', difficulty: 2, week: 23, stage: 2 },

  // Week 24 - 户外活动
  { id: 196, english: 'Slide down', chinese: '滑下来', scene: 'Playing at the playground', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 197, english: 'Swing high', chinese: '荡高一点', scene: 'Swinging', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 198, english: 'Climb up', chinese: '爬上去', scene: 'Climbing', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 199, english: 'Jump down', chinese: '跳下来', scene: 'Jumping', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 200, english: 'Run fast', chinese: '快跑', scene: 'Running', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 201, english: 'Walk slowly', chinese: '慢慢走', scene: 'Walking slowly', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 202, english: 'Stop running', chinese: '停止跑步', scene: 'Stopping', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 309, english: 'Go down the slide', chinese: '滑滑梯', scene: 'Using slide', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },
  { id: 310, english: 'Play on the swings', chinese: '荡秋千', scene: 'Playing on swings', category: 'Outdoor', difficulty: 2, week: 24, stage: 2 },

  // === Month 7 - 食物和天气 (Weeks 25-28) ===
  // Week 25 - 更多食物
  { id: 203, english: 'I want an apple', chinese: '我想要一个苹果', scene: 'Wanting an apple', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 204, english: 'I want a cookie', chinese: '我想要一块饼干', scene: 'Wanting a cookie', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 205, english: 'I want some candy', chinese: '我想要一些糖果', scene: 'Wanting candy', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 206, english: 'Eat your vegetables', chinese: '吃你的蔬菜', scene: 'Eating vegetables', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 207, english: 'Drink your milk', chinese: '喝你的牛奶', scene: 'Drinking milk', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 208, english: 'Finish your food', chinese: '吃完你的食物', scene: 'Finishing food', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 209, english: 'Yummy yummy', chinese: '好吃好吃', scene: 'Enjoying food', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 311, english: 'I want some bread', chinese: '我想要一些面包', scene: 'Wanting bread', category: 'Food', difficulty: 2, week: 25, stage: 2 },
  { id: 312, english: 'I want some rice', chinese: '我想要一些米饭', scene: 'Wanting rice', category: 'Food', difficulty: 2, week: 25, stage: 2 },

  // Week 26 - 食物味道
  { id: 210, english: 'The soup is hot', chinese: '汤是热的', scene: 'Hot soup', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 211, english: 'The ice cream is cold', chinese: '冰淇淋是冷的', scene: 'Cold ice cream', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 212, english: 'The lemon is sour', chinese: '柠檬是酸的', scene: 'Sour lemon', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 213, english: 'The candy is sweet', chinese: '糖果是甜的', scene: 'Sweet candy', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 214, english: 'The cake is delicious', chinese: '蛋糕很好吃', scene: 'Eating cake', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 215, english: 'Do you like it?', chinese: '你喜欢吗？', scene: 'Asking about food', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 216, english: 'It tastes good', chinese: '味道很好', scene: 'Tasting food', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 313, english: 'The pizza is yummy', chinese: '披萨很好吃', scene: 'Eating pizza', category: 'Food', difficulty: 2, week: 26, stage: 2 },
  { id: 314, english: 'The noodles are hot', chinese: '面条是热的', scene: 'Eating noodles', category: 'Food', difficulty: 2, week: 26, stage: 2 },

  // Week 27 - 天气
  { id: 217, english: 'It is sunny today', chinese: '今天是晴天', scene: 'Sunny weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 218, english: 'It is rainy today', chinese: '今天下雨', scene: 'Rainy weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 219, english: 'It is windy today', chinese: '今天刮风', scene: 'Windy weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 220, english: 'It is cloudy today', chinese: '今天是阴天', scene: 'Cloudy weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 221, english: 'It is snowing', chinese: '下雪了', scene: 'Snowy weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 222, english: 'It is raining', chinese: '下雨了', scene: 'Rain', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 223, english: 'Open the umbrella', chinese: '打开雨伞', scene: 'Using umbrella', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 315, english: 'It is foggy today', chinese: '今天有雾', scene: 'Foggy weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },
  { id: 316, english: 'It is hot today', chinese: '今天很热', scene: 'Hot weather', category: 'Weather', difficulty: 2, week: 27, stage: 2 },

  // Week 28 - 天气相关
  { id: 224, english: 'I like sunny days', chinese: '我喜欢晴天', scene: 'Liking weather', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 225, english: 'I like the rain', chinese: '我喜欢下雨', scene: 'Liking rain', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 226, english: 'I like the snow', chinese: '我喜欢下雪', scene: 'Liking snow', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 227, english: 'Look at the rainbow', chinese: '看那彩虹', scene: 'Seeing a rainbow', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 228, english: 'Put on your raincoat', chinese: '穿上雨衣', scene: 'Rainy day clothing', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 229, english: 'Wear your boots', chinese: '穿上靴子', scene: 'Rainy day', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 230, english: 'It is dark now', chinese: '天黑了', scene: 'Night time', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 317, english: 'Jump in puddles', chinese: '跳进水坑', scene: 'Playing in rain', category: 'Weather', difficulty: 2, week: 28, stage: 2 },
  { id: 318, english: 'Catch snowflakes', chinese: '接雪花', scene: 'Playing in snow', category: 'Weather', difficulty: 2, week: 28, stage: 2 },

  // === Month 8 - 社交和物品认知 (Weeks 29-32) ===
  // Week 29 - 简单社交
  { id: 231, english: 'Hello, my friend', chinese: '你好，我的朋友', scene: 'Greeting a friend', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 232, english: 'How are you today?', chinese: '你今天好吗？', scene: 'Asking about feeling', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 233, english: 'I am fine, thank you', chinese: '我很好，谢谢你', scene: 'Responding to greeting', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 234, english: 'What is your name?', chinese: '你叫什么名字？', scene: 'Asking name', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 235, english: 'My name is ...', chinese: '我的名字是...', scene: 'Saying name', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 236, english: 'Can I play?', chinese: '我能玩吗？', scene: 'Asking to play', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 237, english: 'Do you want to play?', chinese: '你想玩吗？', scene: 'Inviting to play', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 319, english: 'Let us be friends', chinese: '我们做朋友吧', scene: 'Making friends', category: 'Social', difficulty: 2, week: 29, stage: 2 },
  { id: 320, english: 'I like to share', chinese: '我喜欢分享', scene: 'Sharing with friends', category: 'Social', difficulty: 2, week: 29, stage: 2 },

  // Week 30 - 物品认知
  { id: 238, english: 'What is this?', chinese: '这是什么？', scene: 'Pointing to an object', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 239, english: 'This is a table', chinese: '这是一张桌子', scene: 'Pointing to a table', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 240, english: 'This is a chair', chinese: '这是一把椅子', scene: 'Pointing to a chair', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 241, english: 'This is a door', chinese: '这是一扇门', scene: 'Pointing to a door', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 242, english: 'This is a window', chinese: '这是一扇窗', scene: 'Pointing to a window', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 243, english: 'This is a bed', chinese: '这是一张床', scene: 'Pointing to a bed', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 244, english: 'This is a book', chinese: '这是一本书', scene: 'Pointing to a book', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 321, english: 'What is that?', chinese: '那是什么？', scene: 'Pointing at something', category: 'Objects', difficulty: 2, week: 30, stage: 2 },
  { id: 322, english: 'That is a lamp', chinese: '那是一盏灯', scene: 'Pointing to a lamp', category: 'Objects', difficulty: 2, week: 30, stage: 2 },

  // Week 31 - 更多物品
  { id: 245, english: 'Where is my toy?', chinese: '我的玩具在哪里？', scene: 'Looking for a toy', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 246, english: 'It is on the table', chinese: '它在桌子上', scene: 'Finding object on table', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 247, english: 'It is under the chair', chinese: '它在椅子下面', scene: 'Finding under chair', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 248, english: 'It is in the box', chinese: '它在盒子里', scene: 'Finding in box', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 249, english: 'Put it away', chinese: '把它收起来', scene: 'Cleaning up', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 250, english: 'Pick it up', chinese: '捡起来', scene: 'Picking up something', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 251, english: 'Clean up now', chinese: '现在收拾', scene: 'Cleaning time', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 323, english: 'Put it in the box', chinese: '把它放进盒子里', scene: 'Putting away toys', category: 'Objects', difficulty: 2, week: 31, stage: 2 },
  { id: 324, english: 'Take it out', chinese: '把它拿出来', scene: 'Taking out items', category: 'Objects', difficulty: 2, week: 31, stage: 2 },

  // Week 32 - 洗漱与打理
  { id: 252, english: 'Wash your hands', chinese: '洗手', scene: 'Washing hands before meal', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 253, english: 'Dry your hands', chinese: '擦干手', scene: 'Drying hands', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 254, english: 'Turn on the water', chinese: '打开水龙头', scene: 'Turning on tap', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 255, english: 'Turn off the water', chinese: '关掉水龙头', scene: 'Turning off tap', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 256, english: 'Use the soap', chinese: '用肥皂', scene: 'Using soap', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 257, english: 'Blow your nose', chinese: '擤鼻涕', scene: 'Blowing nose', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 258, english: 'Cough in your elbow', chinese: '用手肘挡着咳嗽', scene: 'Covering cough', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 325, english: 'Flush the toilet', chinese: '冲马桶', scene: 'After using toilet', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },
  { id: 326, english: 'Wipe your mouth', chinese: '擦嘴', scene: 'After eating', category: 'Hygiene', difficulty: 2, week: 32, stage: 2 },

  // === Additional weeks (Weeks 33-36) ===
  // Week 33 - 我能自己做
  { id: 259, english: 'I can open the door', chinese: '我会开门', scene: 'Opening a door', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 260, english: 'I can close the door', chinese: '我会关门', scene: 'Closing a door', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 261, english: 'I can turn on the light', chinese: '我会开灯', scene: 'Turning on light', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 262, english: 'I can turn off the light', chinese: '我会关灯', scene: 'Turning off light', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 263, english: 'I can wash my hands', chinese: '我会洗手', scene: 'Washing hands', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 264, english: 'I can brush my teeth', chinese: '我会刷牙', scene: 'Brushing teeth', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 265, english: 'I can get dressed', chinese: '我会穿衣服', scene: 'Getting dressed', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 327, english: 'I can set the table', chinese: '我会摆桌子', scene: 'Setting the table', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 328, english: 'I can clean my room', chinese: '我会打扫房间', scene: 'Cleaning room', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },
  { id: 329, english: 'I can put away toys', chinese: '我会收拾玩具', scene: 'Putting away toys', category: 'Daily routines', difficulty: 2, week: 33, stage: 2 },

  // Week 34 - 自然观察
  { id: 266, english: 'The flower is pretty', chinese: '花很漂亮', scene: 'Looking at flowers', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 267, english: 'The tree is tall', chinese: '树很高', scene: 'Looking at trees', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 268, english: 'The grass is green', chinese: '草是绿色的', scene: 'Looking at grass', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 269, english: 'The sky is blue', chinese: '天空是蓝色的', scene: 'Looking at sky', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 270, english: 'The sun is bright', chinese: '太阳很亮', scene: 'Looking at sun', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 271, english: 'The moon is big', chinese: '月亮很大', scene: 'Looking at moon', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 272, english: 'The stars twinkle', chinese: '星星闪烁', scene: 'Looking at stars', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 330, english: 'The cloud is fluffy', chinese: '云朵毛茸茸的', scene: 'Looking at clouds', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 331, english: 'The river is long', chinese: '河流很长', scene: 'Looking at river', category: 'Nature', difficulty: 2, week: 34, stage: 2 },
  { id: 332, english: 'The mountain is high', chinese: '山很高', scene: 'Looking at mountains', category: 'Nature', difficulty: 2, week: 34, stage: 2 },

  // Week 35 - 颜色和数字
  { id: 273, english: 'I can count', chinese: '我会数数', scene: 'Counting numbers', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 274, english: 'One two three', chinese: '一二三', scene: 'Learning to count', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 275, english: 'How many?', chinese: '有多少？', scene: 'Asking quantity', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 276, english: 'I know this color', chinese: '我知道这个颜色', scene: 'Identifying color', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 277, english: 'What color is this?', chinese: '这是什么颜色？', scene: 'Asking color', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 278, english: 'It is red', chinese: '是红色的', scene: 'Identifying color', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 279, english: 'It is blue', chinese: '是蓝色的', scene: 'Identifying color', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 333, english: 'It is green', chinese: '是绿色的', scene: 'Identifying green', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 334, english: 'It is yellow', chinese: '是黄色的', scene: 'Identifying yellow', category: 'Learning', difficulty: 2, week: 35, stage: 2 },
  { id: 335, english: 'It is purple', chinese: '是紫色的', scene: 'Identifying purple', category: 'Learning', difficulty: 2, week: 35, stage: 2 },

  // Week 36 - 反义词
  { id: 280, english: 'Big and small', chinese: '大和小', scene: 'Comparing sizes', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 281, english: 'Long and short', chinese: '长和短', scene: 'Comparing lengths', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 282, english: 'Fast and slow', chinese: '快和慢', scene: 'Comparing speeds', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 283, english: 'Up and down', chinese: '上和下', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 284, english: 'In and out', chinese: '里和外', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 285, english: 'Open and close', chinese: '开和关', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 286, english: 'Push and pull', chinese: '推和拉', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 336, english: 'Hot and cold', chinese: '热和冷', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 337, english: 'Wet and dry', chinese: '湿和干', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 338, english: 'Clean and dirty', chinese: '干净和脏', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 339, english: 'Day and night', chinese: '白天和黑夜', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
  { id: 340, english: 'Yes and no', chinese: '是和不是', scene: 'Learning opposites', category: 'Learning', difficulty: 2, week: 36, stage: 2 },
];

// 第三阶段：综合巩固期（9-12月｜160句）
export const phase3Sentences: Sentence[] = [
  // === Month 9 - 问答互动 (Weeks 37-40) ===
  // Week 37 - 日常问答
  { id: 341, english: 'What is your name?', chinese: '你叫什么名字？', scene: 'Introducing oneself', category: 'Q&A', difficulty: 3, week: 37, stage: 3 },
  { id: 342, english: 'My name is Tom', chinese: '我叫汤姆', scene: 'Answering name', category: 'Q&A', difficulty: 3, week: 37, stage: 3 },
  { id: 343, english: 'How old are you?', chinese: '你几岁了？', scene: 'Asking age', category: 'Q&A', difficulty: 3, week: 37, stage: 3 },
  { id: 344, english: 'I am three years old', chinese: '我三岁了', scene: 'Answering age', category: 'Q&A', difficulty: 3, week: 37, stage: 3 },
  { id: 345, english: 'Where do you live?', chinese: '你住在哪里？', scene: 'Asking about home', category: 'Q&A', difficulty: 3, week: 37, stage: 3 },
  { id: 346, english: 'I live in a house', chinese: '我住在房子里', scene: 'Answering about home', category: 'Q&A', difficulty: 3, week: 37, stage: 3 },
  { id: 347, english: 'Do you like it?', chinese: '你喜欢吗？', scene: 'Asking preference', category: 'Q&A', difficulty: 3, week: 37, stage: 3 },
  { id: 348, english: 'Yes I like it', chinese: '是的我喜欢', scene: 'Answering preference', category: 'Q&A', difficulty: 3, week: 37, stage: 3 },
  { id: 349, english: 'What do you see?', chinese: '你看见了什么？', scene: 'Asking about surroundings', category: 'Q&A', difficulty: 3, week: 37, stage: 3 },
  { id: 350, english: 'I see a car', chinese: '我看见一辆车', scene: 'Answering what you see', category: 'Q&A', difficulty: 3, week: 37, stage: 3 },

  // Week 38 - 更多问答
  { id: 351, english: 'What do you want?', chinese: '你想要什么？', scene: 'Asking desire', category: 'Q&A', difficulty: 3, week: 38, stage: 3 },
  { id: 352, english: 'I want a cookie', chinese: '我想要一块饼干', scene: 'Answering desire', category: 'Q&A', difficulty: 3, week: 38, stage: 3 },
  { id: 353, english: 'Where are you?', chinese: '你在哪里？', scene: 'Asking location', category: 'Q&A', difficulty: 3, week: 38, stage: 3 },
  { id: 354, english: 'I am in my room', chinese: '我在我的房间里', scene: 'Answering location', category: 'Q&A', difficulty: 3, week: 38, stage: 3 },
  { id: 355, english: 'Where is mommy?', chinese: '妈妈在哪里？', scene: 'Asking about family', category: 'Q&A', difficulty: 3, week: 38, stage: 3 },
  { id: 356, english: 'Mommy is in the kitchen', chinese: '妈妈在厨房里', scene: 'Answering about family', category: 'Q&A', difficulty: 3, week: 38, stage: 3 },
  { id: 357, english: 'Is this yours?', chinese: '这是你的吗？', scene: 'Asking ownership', category: 'Q&A', difficulty: 3, week: 38, stage: 3 },
  { id: 358, english: 'This is mine', chinese: '这是我的', scene: 'Claiming ownership', category: 'Q&A', difficulty: 3, week: 38, stage: 3 },
  { id: 359, english: 'Can you help me?', chinese: '你能帮我吗？', scene: 'Asking for help', category: 'Q&A', difficulty: 3, week: 38, stage: 3 },
  { id: 360, english: 'Sure I can help', chinese: '当然我能帮你', scene: 'Agreeing to help', category: 'Q&A', difficulty: 3, week: 38, stage: 3 },

  // Week 39 - 场景对话
  { id: 361, english: 'May I come in?', chinese: '我可以进来吗？', scene: 'Knocking on door', category: 'Scene dialogues', difficulty: 3, week: 39, stage: 3 },
  { id: 362, english: 'Please come in', chinese: '请进来', scene: 'Inviting in', category: 'Scene dialogues', difficulty: 3, week: 39, stage: 3 },
  { id: 363, english: 'Can I go out?', chinese: '我能出去吗？', scene: 'Asking permission', category: 'Scene dialogues', difficulty: 3, week: 39, stage: 3 },
  { id: 364, english: 'May I have some?', chinese: '我能要一些吗？', scene: 'Asking for food', category: 'Scene dialogues', difficulty: 3, week: 39, stage: 3 },
  { id: 365, english: 'Let me try please', chinese: '请让我试试', scene: 'Trying something new', category: 'Scene dialogues', difficulty: 3, week: 39, stage: 3 },
  { id: 366, english: 'I want to see', chinese: '我想看看', scene: 'Curious about something', category: 'Scene dialogues', difficulty: 3, week: 39, stage: 3 },
  { id: 367, english: 'Come with me', chinese: '跟我来', scene: 'Leading someone', category: 'Scene dialogues', difficulty: 3, week: 39, stage: 3 },
  { id: 368, english: 'Wait for me', chinese: '等等我', scene: 'Telling someone to wait', category: 'Scene dialogues', difficulty: 3, week: 39, stage: 3 },
  { id: 369, english: 'I am coming', chinese: '我来了', scene: 'Responding to call', category: 'Scene dialogues', difficulty: 3, week: 39, stage: 3 },
  { id: 370, english: 'Are you ready?', chinese: '你准备好了吗？', scene: 'Checking readiness', category: 'Scene dialogues', difficulty: 3, week: 39, stage: 3 },

  // Week 40 - 继续场景对话
  { id: 371, english: 'I am ready', chinese: '我准备好了', scene: 'Telling readiness', category: 'Scene dialogues', difficulty: 3, week: 40, stage: 3 },
  { id: 372, english: 'Let us go now', chinese: '我们现在走吧', scene: 'Starting to go', category: 'Scene dialogues', difficulty: 3, week: 40, stage: 3 },
  { id: 373, english: 'Hurry up please', chinese: '请快一点', scene: 'Urging someone', category: 'Scene dialogues', difficulty: 3, week: 40, stage: 3 },
  { id: 374, english: 'Take your time', chinese: '慢慢来', scene: 'Telling not to rush', category: 'Scene dialogues', difficulty: 3, week: 40, stage: 3 },
  { id: 375, english: 'What is wrong?', chinese: '怎么了？', scene: 'Asking about problem', category: 'Scene dialogues', difficulty: 3, week: 40, stage: 3 },
  { id: 376, english: 'Nothing is wrong', chinese: '没什么', scene: 'Reassuring', category: 'Scene dialogues', difficulty: 3, week: 40, stage: 3 },
  { id: 377, english: 'Is everything okay?', chinese: '一切都好吗？', scene: 'Checking well-being', category: 'Scene dialogues', difficulty: 3, week: 40, stage: 3 },
  { id: 378, english: 'Everything is fine', chinese: '一切都好', scene: 'Reassuring', category: 'Scene dialogues', difficulty: 3, week: 40, stage: 3 },
  { id: 379, english: 'Let me see', chinese: '让我看看', scene: 'Looking at something', category: 'Scene dialogues', difficulty: 3, week: 40, stage: 3 },
  { id: 380, english: 'Show me please', chinese: '请给我看看', scene: 'Asking to show', category: 'Scene dialogues', difficulty: 3, week: 40, stage: 3 },

  // === Month 10 - 需求表达和作息规律 (Weeks 41-44) ===
  // Week 41 - 需求表达
  { id: 381, english: 'I need to pee', chinese: '我想尿尿', scene: 'Needing bathroom', category: 'Expressing needs', difficulty: 3, week: 41, stage: 3 },
  { id: 382, english: 'I need to poop', chinese: '我想拉臭臭', scene: 'Needing bathroom', category: 'Expressing needs', difficulty: 3, week: 41, stage: 3 },
  { id: 383, english: 'I want to wash', chinese: '我想洗一洗', scene: 'Wanting to clean', category: 'Expressing needs', difficulty: 3, week: 41, stage: 3 },
  { id: 384, english: 'I need a tissue', chinese: '我需要一张纸巾', scene: 'Needing tissue', category: 'Expressing needs', difficulty: 3, week: 41, stage: 3 },
  { id: 385, english: 'I want to drink', chinese: '我想喝水', scene: 'Expressing thirst', category: 'Expressing needs', difficulty: 3, week: 41, stage: 3 },
  { id: 386, english: 'I want to eat', chinese: '我想吃饭', scene: 'Expressing hunger', category: 'Expressing needs', difficulty: 3, week: 41, stage: 3 },
  { id: 387, english: 'I need a hug', chinese: '我需要一个拥抱', scene: 'Wanting comfort', category: 'Expressing needs', difficulty: 3, week: 41, stage: 3 },
  { id: 388, english: 'I want my mommy', chinese: '我要妈妈', scene: 'Missing mom', category: 'Expressing needs', difficulty: 3, week: 41, stage: 3 },
  { id: 389, english: 'I want my daddy', chinese: '我要爸爸', scene: 'Missing dad', category: 'Expressing needs', difficulty: 3, week: 41, stage: 3 },
  { id: 390, english: 'I need a break', chinese: '我需要休息一下', scene: 'Wanting rest', category: 'Expressing needs', difficulty: 3, week: 41, stage: 3 },

  // Week 42 - 继续需求表达
  { id: 391, english: 'I want to sit', chinese: '我想坐下', scene: 'Wanting to sit', category: 'Expressing needs', difficulty: 3, week: 42, stage: 3 },
  { id: 392, english: 'I want to lie down', chinese: '我想躺下', scene: 'Wanting to lie down', category: 'Expressing needs', difficulty: 3, week: 42, stage: 3 },
  { id: 393, english: 'I want to play outside', chinese: '我想出去玩', scene: 'Wanting outdoor play', category: 'Expressing needs', difficulty: 3, week: 42, stage: 3 },
  { id: 394, english: 'I do not want to', chinese: '我不想', scene: 'Refusing', category: 'Expressing needs', difficulty: 3, week: 42, stage: 3 },
  { id: 395, english: 'Let me do it', chinese: '让我来做', scene: 'Wanting independence', category: 'Expressing needs', difficulty: 3, week: 42, stage: 3 },
  { id: 396, english: 'I can do it myself', chinese: '我自己能做', scene: 'Showing independence', category: 'Expressing needs', difficulty: 3, week: 42, stage: 3 },
  { id: 397, english: 'I need help please', chinese: '我需要帮助请', scene: 'Asking for help', category: 'Expressing needs', difficulty: 3, week: 42, stage: 3 },
  { id: 398, english: 'Wait a moment', chinese: '等一下', scene: 'Asking to wait', category: 'Expressing needs', difficulty: 3, week: 42, stage: 3 },
  { id: 399, english: 'Not yet', chinese: '还没有', scene: 'Not ready yet', category: 'Expressing needs', difficulty: 3, week: 42, stage: 3 },
  { id: 400, english: 'Almost done', chinese: '快好了', scene: 'Almost finished', category: 'Expressing needs', difficulty: 3, week: 42, stage: 3 },

  // Week 43 - 作息规律
  { id: 401, english: 'Time to wake up', chinese: '起床时间到了', scene: 'Morning wake up', category: 'Daily routines', difficulty: 3, week: 43, stage: 3 },
  { id: 402, english: 'Time for breakfast', chinese: '早餐时间到了', scene: 'Breakfast time', category: 'Daily routines', difficulty: 3, week: 43, stage: 3 },
  { id: 403, english: 'Time for lunch', chinese: '午餐时间到了', scene: 'Lunch time', category: 'Daily routines', difficulty: 3, week: 43, stage: 3 },
  { id: 404, english: 'Time for dinner', chinese: '晚餐时间到了', scene: 'Dinner time', category: 'Daily routines', difficulty: 3, week: 43, stage: 3 },
  { id: 405, english: 'Time for a nap', chinese: '午睡时间到了', scene: 'Nap time', category: 'Daily routines', difficulty: 3, week: 43, stage: 3 },
  { id: 406, english: 'Time for a bath', chinese: '洗澡时间到了', scene: 'Bath time', category: 'Daily routines', difficulty: 3, week: 43, stage: 3 },
  { id: 407, english: 'Time for bed', chinese: '睡觉时间到了', scene: 'Bed time', category: 'Daily routines', difficulty: 3, week: 43, stage: 3 },
  { id: 408, english: 'Time to go home', chinese: '该回家了', scene: 'Going home', category: 'Daily routines', difficulty: 3, week: 43, stage: 3 },
  { id: 409, english: 'Time to say goodbye', chinese: '该说再见了', scene: 'Saying goodbye', category: 'Daily routines', difficulty: 3, week: 43, stage: 3 },
  { id: 410, english: 'Time to clean up', chinese: '该收拾了', scene: 'Cleaning up time', category: 'Daily routines', difficulty: 3, week: 43, stage: 3 },

  // Week 44 - 继续作息规律
  { id: 411, english: 'Breakfast is ready', chinese: '早餐准备好了', scene: 'Meal ready', category: 'Daily routines', difficulty: 3, week: 44, stage: 3 },
  { id: 412, english: 'Wash up before eating', chinese: '饭前洗手', scene: 'Before meal', category: 'Daily routines', difficulty: 3, week: 44, stage: 3 },
  { id: 413, english: 'Sit at the table', chinese: '坐在桌子旁', scene: 'At meal time', category: 'Daily routines', difficulty: 3, week: 44, stage: 3 },
  { id: 414, english: 'Use your spoon', chinese: '用你的勺子', scene: 'Eating with spoon', category: 'Daily routines', difficulty: 3, week: 44, stage: 3 },
  { id: 415, english: 'Drink from your cup', chinese: '用你的杯子喝', scene: 'Drinking from cup', category: 'Daily routines', difficulty: 3, week: 44, stage: 3 },
  { id: 416, english: 'Chew your food well', chinese: '好好嚼食物', scene: 'Chewing food', category: 'Daily routines', difficulty: 3, week: 44, stage: 3 },
  { id: 417, english: 'No playing at the table', chinese: '不要在桌上玩', scene: 'Table manners', category: 'Daily routines', difficulty: 3, week: 44, stage: 3 },
  { id: 418, english: 'Put your plate away', chinese: '把你的盘子收走', scene: 'After meal', category: 'Daily routines', difficulty: 3, week: 44, stage: 3 },
  { id: 419, english: 'Say thank you', chinese: '说谢谢', scene: 'After meal', category: 'Daily routines', difficulty: 3, week: 44, stage: 3 },
  { id: 420, english: 'All done eating', chinese: '吃完了', scene: 'Finished meal', category: 'Daily routines', difficulty: 3, week: 44, stage: 3 },

  // === Month 11 - 情绪表达和亲子互动 (Weeks 45-48) ===
  // Week 45 - 情绪表达
  { id: 421, english: 'I feel happy today', chinese: '我今天很开心', scene: 'Expressing happiness', category: 'Emotions', difficulty: 3, week: 45, stage: 3 },
  { id: 422, english: 'I feel sad today', chinese: '我今天很难过', scene: 'Expressing sadness', category: 'Emotions', difficulty: 3, week: 45, stage: 3 },
  { id: 423, english: 'I feel angry', chinese: '我感到生气', scene: 'Expressing anger', category: 'Emotions', difficulty: 3, week: 45, stage: 3 },
  { id: 424, english: 'I feel scared', chinese: '我感到害怕', scene: 'Expressing fear', category: 'Emotions', difficulty: 3, week: 45, stage: 3 },
  { id: 425, english: 'I feel sleepy', chinese: '我感到困了', scene: 'Expressing sleepiness', category: 'Emotions', difficulty: 3, week: 45, stage: 3 },
  { id: 426, english: 'I feel shy', chinese: '我感到害羞', scene: 'Feeling shy', category: 'Emotions', difficulty: 3, week: 45, stage: 3 },
  { id: 427, english: 'I feel lonely', chinese: '我感到孤单', scene: 'Feeling lonely', category: 'Emotions', difficulty: 3, week: 45, stage: 3 },
  { id: 428, english: 'I feel proud', chinese: '我感到自豪', scene: 'Feeling proud', category: 'Emotions', difficulty: 3, week: 45, stage: 3 },
  { id: 429, english: 'I feel loved', chinese: '我感到被爱', scene: 'Feeling loved', category: 'Emotions', difficulty: 3, week: 45, stage: 3 },
  { id: 430, english: 'I feel surprised', chinese: '我感到惊讶', scene: 'Feeling surprised', category: 'Emotions', difficulty: 3, week: 45, stage: 3 },

  // Week 46 - 继续情绪表达
  { id: 431, english: 'I am having fun', chinese: '我玩得很开心', scene: 'Having fun', category: 'Emotions', difficulty: 3, week: 46, stage: 3 },
  { id: 432, english: 'This is boring', chinese: '这很无聊', scene: 'Feeling bored', category: 'Emotions', difficulty: 3, week: 46, stage: 3 },
  { id: 433, english: 'This is interesting', chinese: '这很有趣', scene: 'Feeling interested', category: 'Emotions', difficulty: 3, week: 46, stage: 3 },
  { id: 434, english: 'That is funny', chinese: '那很好笑', scene: 'Finding something funny', category: 'Emotions', difficulty: 3, week: 46, stage: 3 },
  { id: 435, english: 'That is not fair', chinese: '那不公平', scene: 'Perceiving unfairness', category: 'Emotions', difficulty: 3, week: 46, stage: 3 },
  { id: 436, english: 'I am worried', chinese: '我很担心', scene: 'Feeling worried', category: 'Emotions', difficulty: 3, week: 46, stage: 3 },
  { id: 437, english: 'Do not worry', chinese: '别担心', scene: 'Comforting', category: 'Emotions', difficulty: 3, week: 46, stage: 3 },
  { id: 438, english: 'It is okay', chinese: '没关系', scene: 'Comforting', category: 'Emotions', difficulty: 3, week: 46, stage: 3 },
  { id: 439, english: 'Do not cry', chinese: '不要哭', scene: 'Comforting', category: 'Emotions', difficulty: 3, week: 46, stage: 3 },
  { id: 440, english: 'Everything will be okay', chinese: '一切都会好的', scene: 'Reassuring', category: 'Emotions', difficulty: 3, week: 46, stage: 3 },

  // Week 47 - 亲子互动
  { id: 441, english: 'I love you mommy', chinese: '我爱你妈妈', scene: 'Telling mom love', category: 'Parent-child', difficulty: 3, week: 47, stage: 3 },
  { id: 442, english: 'I love you daddy', chinese: '我爱你爸爸', scene: 'Telling dad love', category: 'Parent-child', difficulty: 3, week: 47, stage: 3 },
  { id: 443, english: 'Give me a kiss', chinese: '给我一个吻', scene: 'Asking for kiss', category: 'Parent-child', difficulty: 3, week: 47, stage: 3 },
  { id: 444, english: 'Give me a hug', chinese: '给我一个拥抱', scene: 'Asking for hug', category: 'Parent-child', difficulty: 3, week: 47, stage: 3 },
  { id: 445, english: 'Sit on my lap', chinese: '坐在我腿上', scene: 'Sitting together', category: 'Parent-child', difficulty: 3, week: 47, stage: 3 },
  { id: 446, english: 'Carry me please', chinese: '请抱抱我', scene: 'Wanting to be carried', category: 'Parent-child', difficulty: 3, week: 47, stage: 3 },
  { id: 447, english: 'Read me a story', chinese: '给我读个故事', scene: 'Story time', category: 'Parent-child', difficulty: 3, week: 47, stage: 3 },
  { id: 448, english: 'Sing me a song', chinese: '给我唱首歌', scene: 'Singing time', category: 'Parent-child', difficulty: 3, week: 47, stage: 3 },
  { id: 449, english: 'Play with me', chinese: '和我一起玩', scene: 'Asking to play', category: 'Parent-child', difficulty: 3, week: 47, stage: 3 },
  { id: 450, english: 'Stay with me please', chinese: '请陪着我', scene: 'Wanting company', category: 'Parent-child', difficulty: 3, week: 47, stage: 3 },

  // Week 48 - 继续亲子互动
  { id: 451, english: 'Tell me a story', chinese: '给我讲个故事', scene: 'Story time request', category: 'Parent-child', difficulty: 3, week: 48, stage: 3 },
  { id: 452, english: 'I want a story', chinese: '我想听故事', scene: 'Wanting story', category: 'Parent-child', difficulty: 3, week: 48, stage: 3 },
  { id: 453, english: 'Read this book', chinese: '读这本书', scene: 'Choosing a book', category: 'Parent-child', difficulty: 3, week: 48, stage: 3 },
  { id: 454, english: 'Look at the picture', chinese: '看这张图片', scene: 'Looking at illustrations', category: 'Parent-child', difficulty: 3, week: 48, stage: 3 },
  { id: 455, english: 'What happens next?', chinese: '接下来发生了什么？', scene: 'Story engagement', category: 'Parent-child', difficulty: 3, week: 48, stage: 3 },
  { id: 456, english: 'That is my favorite', chinese: '那是我最喜欢的', scene: 'Expressing preference', category: 'Parent-child', difficulty: 3, week: 48, stage: 3 },
  { id: 457, english: 'Let me choose', chinese: '让我选', scene: 'Making choices', category: 'Parent-child', difficulty: 3, week: 48, stage: 3 },
  { id: 458, english: 'I pick this one', chinese: '我选这个', scene: 'Choosing', category: 'Parent-child', difficulty: 3, week: 48, stage: 3 },
  { id: 459, english: 'You are the best', chinese: '你是最好的', scene: 'Showing appreciation', category: 'Parent-child', difficulty: 3, week: 48, stage: 3 },
  { id: 460, english: 'I am so lucky', chinese: '我太幸运了', scene: 'Feeling grateful', category: 'Parent-child', difficulty: 3, week: 48, stage: 3 },

  // === Month 12 - 户外和评价 (Weeks 49-52) ===
  // Week 49 - 户外场景
  { id: 461, english: 'Let us go to the zoo', chinese: '我们去动物园吧', scene: 'Going to zoo', category: 'Outdoor', difficulty: 3, week: 49, stage: 3 },
  { id: 462, english: 'Let us go to the beach', chinese: '我们去海滩吧', scene: 'Going to beach', category: 'Outdoor', difficulty: 3, week: 49, stage: 3 },
  { id: 463, english: 'Let us go to the store', chinese: '我们去商店吧', scene: 'Going shopping', category: 'Outdoor', difficulty: 3, week: 49, stage: 3 },
  { id: 464, english: 'Let us ride a bike', chinese: '我们骑自行车吧', scene: 'Riding bike', category: 'Outdoor', difficulty: 3, week: 49, stage: 3 },
  { id: 465, english: 'Let us fly a kite', chinese: '我们放风筝吧', scene: 'Flying a kite', category: 'Outdoor', difficulty: 3, week: 49, stage: 3 },
  { id: 466, english: 'Catch me if you can', chinese: '来抓我呀', scene: 'Playing tag', category: 'Outdoor', difficulty: 3, week: 49, stage: 3 },
  { id: 467, english: 'I am running fast', chinese: '我跑得很快', scene: 'Running', category: 'Outdoor', difficulty: 3, week: 49, stage: 3 },
  { id: 468, english: 'Look at the butterfly', chinese: '看那只蝴蝶', scene: 'Seeing butterfly', category: 'Outdoor', difficulty: 3, week: 49, stage: 3 },
  { id: 469, english: 'Pick up the leaves', chinese: '捡起树叶', scene: 'Playing with leaves', category: 'Outdoor', difficulty: 3, week: 49, stage: 3 },
  { id: 470, english: 'Blow the dandelion', chinese: '吹蒲公英', scene: 'Playing with dandelion', category: 'Outdoor', difficulty: 3, week: 49, stage: 3 },

  // Week 50 - 继续户外场景
  { id: 471, english: 'The sun is warm', chinese: '太阳很温暖', scene: 'Feeling the sun', category: 'Outdoor', difficulty: 3, week: 50, stage: 3 },
  { id: 472, english: 'The wind is cool', chinese: '风很凉爽', scene: 'Feeling the wind', category: 'Outdoor', difficulty: 3, week: 50, stage: 3 },
  { id: 473, english: 'I like the park', chinese: '我喜欢公园', scene: 'Liking the park', category: 'Outdoor', difficulty: 3, week: 50, stage: 3 },
  { id: 474, english: 'The playground is fun', chinese: '游乐场很好玩', scene: 'At playground', category: 'Outdoor', difficulty: 3, week: 50, stage: 3 },
  { id: 475, english: 'Watch out for the car', chinese: '小心汽车', scene: 'Street safety', category: 'Outdoor', difficulty: 3, week: 50, stage: 3 },
  { id: 476, english: 'Stay on the sidewalk', chinese: '待在步道上', scene: 'Walking safely', category: 'Outdoor', difficulty: 3, week: 50, stage: 3 },
  { id: 477, english: 'Do not go too far', chinese: '不要走太远', scene: 'Staying close', category: 'Outdoor', difficulty: 3, week: 50, stage: 3 },
  { id: 478, english: 'I want to go home', chinese: '我想回家', scene: 'Wanting to go home', category: 'Outdoor', difficulty: 3, week: 50, stage: 3 },
  { id: 479, english: 'I am tired now', chinese: '我现在累了', scene: 'Getting tired', category: 'Outdoor', difficulty: 3, week: 50, stage: 3 },
  { id: 480, english: 'Carry me home', chinese: '抱我回家', scene: 'Asking to be carried', category: 'Outdoor', difficulty: 3, week: 50, stage: 3 },

  // Week 51 - 简单评价
  { id: 481, english: 'This is beautiful', chinese: '这个很漂亮', scene: 'Admiring something', category: 'Simple evaluations', difficulty: 3, week: 51, stage: 3 },
  { id: 482, english: 'This is amazing', chinese: '这个太棒了', scene: 'Amazed at something', category: 'Simple evaluations', difficulty: 3, week: 51, stage: 3 },
  { id: 483, english: 'This is wonderful', chinese: '这个太精彩了', scene: 'Impressed', category: 'Simple evaluations', difficulty: 3, week: 51, stage: 3 },
  { id: 484, english: 'This is too hard', chinese: '这个太难了', scene: 'Finding something difficult', category: 'Simple evaluations', difficulty: 3, week: 51, stage: 3 },
  { id: 485, english: 'This is too easy', chinese: '这个太简单了', scene: 'Finding something easy', category: 'Simple evaluations', difficulty: 3, week: 51, stage: 3 },
  { id: 486, english: 'That is very nice', chinese: '那非常好', scene: 'Giving compliment', category: 'Simple evaluations', difficulty: 3, week: 51, stage: 3 },
  { id: 487, english: 'That looks great', chinese: '那看起来很棒', scene: 'Appreciating', category: 'Simple evaluations', difficulty: 3, week: 51, stage: 3 },
  { id: 488, english: 'That sounds good', chinese: '那听起来不错', scene: 'Agreeing to suggestion', category: 'Simple evaluations', difficulty: 3, week: 51, stage: 3 },
  { id: 489, english: 'I did it hooray', chinese: '我做到了好耶', scene: 'Celebrating success', category: 'Simple evaluations', difficulty: 3, week: 51, stage: 3 },
  { id: 490, english: 'I like this game', chinese: '我喜欢这个游戏', scene: 'Liking an activity', category: 'Simple evaluations', difficulty: 3, week: 51, stage: 3 },

  // Week 52 - 综合回顾
  { id: 491, english: 'I can speak English', chinese: '我会说英语', scene: 'Proud of learning', category: 'Comprehensive review', difficulty: 3, week: 52, stage: 3 },
  { id: 492, english: 'I have learned a lot', chinese: '我学了很多', scene: 'Reflecting on learning', category: 'Comprehensive review', difficulty: 3, week: 52, stage: 3 },
  { id: 493, english: 'What did we learn?', chinese: '我们学了什么？', scene: 'Reviewing', category: 'Comprehensive review', difficulty: 3, week: 52, stage: 3 },
  { id: 494, english: 'Let me think', chinese: '让我想想', scene: 'Thinking', category: 'Comprehensive review', difficulty: 3, week: 52, stage: 3 },
  { id: 495, english: 'I remember this', chinese: '我记得这个', scene: 'Remembering', category: 'Comprehensive review', difficulty: 3, week: 52, stage: 3 },
  { id: 496, english: 'I forgot', chinese: '我忘了', scene: 'Forgetting', category: 'Comprehensive review', difficulty: 3, week: 52, stage: 3 },
  { id: 497, english: 'Teach me please', chinese: '请教教我', scene: 'Wanting to learn', category: 'Comprehensive review', difficulty: 3, week: 52, stage: 3 },
  { id: 498, english: 'I want to learn more', chinese: '我想学更多', scene: 'Wanting more learning', category: 'Comprehensive review', difficulty: 3, week: 52, stage: 3 },
  { id: 499, english: 'Learning is fun', chinese: '学习很有趣', scene: 'Enjoying learning', category: 'Comprehensive review', difficulty: 3, week: 52, stage: 3 },
  { id: 500, english: 'I am a star', chinese: '我是一颗星星', scene: 'Feeling accomplished', category: 'Comprehensive review', difficulty: 3, week: 52, stage: 3 },
];

// All sentences combined
export const allSentences: Sentence[] = [
  ...phase1Sentences,
  ...phase2Sentences,
  ...phase3Sentences,
];

// Get sentences by week
export const getSentencesByWeek = (week: number): Sentence[] => {
  return allSentences.filter(sentence => sentence.week === week);
};

// Get sentences by stage
export const getSentencesByStage = (stage: number): Sentence[] => {
  return allSentences.filter(sentence => sentence.stage === stage);
};

// Get sentences by category
export const getSentencesByCategory = (category: string): Sentence[] => {
  return allSentences.filter(sentence => sentence.category === category);
};