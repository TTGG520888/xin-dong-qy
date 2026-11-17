// 成就系统数据
window.GAME_ACHIEVEMENTS = [
  { id: "first_chat", name: "初次心动", icon: "💬", desc: "发出第一条消息", check: function (s) { return s.msgCount >= 1; } },
  { id: "sprout", name: "心动萌芽", icon: "🌱", desc: "好感度达到 30", check: function (s) { return s.bf.affection >= 30; } },
  { id: "together", name: "两情相悦", icon: "💞", desc: "好感度达到 70", check: function (s) { return s.bf.affection >= 70; } },
  { id: "forever", name: "挚爱契约", icon: "💍", desc: "好感度达到 100", check: function (s) { return s.bf.affection >= 100; } },
  { id: "chatter", name: "话痨恋人", icon: "🗨️", desc: "累计发送 30 条消息", check: function (s) { return s.msgCount >= 30; } },
  { id: "night_owl", name: "深夜电台", icon: "🌙", desc: "在 23 点后聊天", check: function (s) { return s.nightChat; } },
  { id: "gifter", name: "送礼达人", icon: "🎁", desc: "送出 5 份礼物", check: function (s) { return s.giftCount >= 5; } },
  { id: "caller", name: "电话情缘", icon: "📞", desc: "与他通话一次", check: function (s) { return s.callCount >= 1; } },
  { id: "dater", name: "约会初体验", icon: "🍰", desc: "完成 1 段约会剧情", check: function (s) { return s.scenarioCount >= 1; } },
  { id: "storyteller", name: "故事收藏家", icon: "📖", desc: "解锁全部 6 段剧情", check: function (s) { return s.scenarioCount >= 6; } },
  { id: "signin_streak", name: "签到狂魔", icon: "📅", desc: "连续签到 7 天", check: function (s) { return s.signin && s.signin.streak >= 7; } },
  { id: "task_champ", name: "任务达人", icon: "✅", desc: "累计领取 10 次任务奖励", check: function (s) { return (s.tasksClaimedTotal || 0) >= 10; } },
  { id: "moment_like", name: "朋友圈常客", icon: "📱", desc: "累计点赞 10 条动态", check: function (s) { return (s.likesTotal || 0) >= 10; } }
];
