// ============================================================
// ChatEngine —— 离线对话引擎：意图识别 + 台词抽取 + 好感度/心情
// ============================================================
(function () {
  "use strict";

  // ---- 意图关键词表（顺序即优先级，更具体的放前面） ----
  var INTENTS = [
    ["jealous", ["吃醋", "别的女生", "别的女人", "前女友", "前女友是谁", "谁给你发消息", "暧昧对象", "女同事"]],
    ["love", ["喜欢你", "我爱你", "爱你", "在一起", "做我男朋友", "当我男朋友", "恋爱", "喜欢上你", "表白"]],
    ["miss", ["想见你", "好想你", "想你", "见不到你", "思念", "想死你"]],
    ["flirt", ["亲亲", "亲一下", "亲我", "抱抱", "抱一个", "抱我", "摸摸头", "捏脸", "啵", "亲一个", "要亲亲"]],
    ["sleep", ["晚安", "睡觉", "睡了", "困了", "去睡"]],
    ["morning", ["早安", "早上好", "起床", "起床了吗", "早啊"]],
    ["date", ["约会", "见面", "出去玩", "一起吃饭", "逛街", "看电影去", "见一面", "带我去玩", "有空吗", "有空的", "今晚有空", "明天有空", "约吗", "约不约", "出来玩", "出来吗", "见个面", "来找我", "陪我", "陪我吗", "一起吗", "一起去"]],
    ["sick", ["生病", "感冒", "发烧", "头疼", "头痛", "肚子疼", "不舒服", "吃药", "咳嗽"]],
    ["food", ["吃饭", "好饿", "饿了", "火锅", "奶茶", "烧烤", "好吃", "夜宵", "喝的", "吃什么"]],
    ["music", ["听歌", "音乐", "唱歌", "唱首", "歌单", "歌词"]],
    ["movie", ["追剧", "电影", "电视剧", "综艺", "看剧"]],
    ["weather", ["下雨", "天气", "好冷", "好热", "下雪", "打雷"]],
    ["joke", ["笑话", "搞笑", "段子", "逗我", "幽默", "讲个笑"]],
    ["praise", ["好帅", "帅死", "好棒", "厉害", "优秀", "真棒", "怎么这么帅", "好强"]],
    ["sad", ["难过", "伤心", "不开心", "委屈", "哭了", "想哭", "心情不好", "emo", "沮丧", "好难受"]],
    ["happy", ["开心", "高兴", "太好了", "开心死", "快乐", "好耶", "哈哈"]],
    ["tired", ["好累", "累死", "疲惫", "加班", "好困", "没力气"]],
    ["work", ["工作", "上班", "开会", "同事", "老板", "项目"]],
    ["angry", ["生气", "烦死", "气死", "好烦", "讨厌死"]],
    ["lonely", ["无聊", "好无聊", "孤单", "寂寞", "没人陪", "一个人好"]],
    ["story", ["讲故事", "你的事", "你的过去", "小时候", "你的经历", "说说你"]],
    ["dream", ["梦想", "未来", "以后", "结婚", "我们的以后", "以后的事"]],
    ["howareyou", ["在干嘛", "在干什么", "干嘛呢", "忙吗", "忙不忙", "吃了吗", "吃饭了吗", "下班了吗", "累不累", "今天怎么样", "做什么"]],
    ["bye", ["再见", "拜拜", "走了", "下次聊", "先去忙", "下线"]],
    ["greet", ["在吗", "在不在", "在么", "嗨", "hi", "hello", "你好", "哈喽", "早", "嗨嗨", "在不在呀"]]
  ];

  // ---- 各意图的基础好感度增减 ----
  var DELTAS = {
    greet: 1, howareyou: 1, lonely: 1, sad: 1, happy: 1, angry: 1, tired: 1,
    sick: 2, love: 3, miss: 3, jealous: 2, praise: 2, flirt: 2, date: 2,
    food: 1, music: 1, movie: 1, sleep: 2, morning: 1, story: 1, work: 1,
    dream: 2, joke: 1, weather: 1, bye: 0, fallback: 0
  };

  // ---- 心情状态（影响主动消息语气） ----
  var MOODS = {
    normal: { label: "今天心情平静", lines: ["在吗，{{player}}。", "忙不忙？想找你说话。"] },
    happy: { label: "今天心情很好", lines: ["{{player}}！猜我今天遇到什么好事了。", "突然好想见你，现在就想。"] },
    tsundere: { label: "有点傲娇", lines: ["我才没有想你。……好吧，有一点。", "过来，陪我说话。不许拒绝。"] },
    pout: { label: "有点小吃醋", lines: ["你今天还没理我。", "听说你夸别人帅了？嗯？"] },
    soft: { label: "想你想得不行", lines: ["{{player}}，我刚刚差点给你打电话。", "没别的事，就是……想听听你的声音。"] },
    tired: { label: "今天有点累", lines: ["今天好累。说句话哄哄我。", "忙完了，只想和你说说话。"] }
  };

  var MOOD_ROLL = [
    { from: "normal", to: "happy", line: "（他今天看起来心情很好 ✨）" },
    { from: "normal", to: "tsundere", line: "（他今天有点傲娇，逗逗他？）" },
    { from: "happy", to: "soft", line: "（他开始黏着你了 🥰）" },
    { from: "normal", to: "tired", line: "（他今天好像很累，多关心他一下吧）" },
    { from: "tsundere", to: "normal", line: "（他的傲娇劲儿过去啦）" },
    { from: "normal", to: "pout", line: "（他今天有点小吃醋，快去哄哄）" },
    { from: "soft", to: "happy", line: "（他还想再黏你一会儿 🥺）" },
    { from: "pout", to: "normal", line: "（哄好了，他不醋了）" },
    { from: "tired", to: "normal", line: "（他恢复精神了）" },
    { from: "happy", to: "normal", line: "（他的心情平复下来，更想和你认真说话了）" }
  ];

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // 从意图键池中选一条（支持 {low, high} 双阶段池；支持去重）
  function pickLine(roleId, intentKey, affection, lastReply) {
    var lib = (window.RESPONSES && window.RESPONSES[roleId]) ? window.RESPONSES[roleId] : window.RESP_GENERIC;
    var raw = lib[intentKey];
    if (!raw) {
      raw = lib.fallback;
      intentKey = "fallback";
    }
    var pool;
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      // 双阶段池
      pool = affection >= 50 ? (raw.high || raw.low) : (raw.low || raw.high);
    } else {
      pool = raw;
    }
    if (!pool || !pool.length) pool = ["……嗯。", "然后呢？我在听。"];
    var candidates = pool.filter(function (l) { return l !== lastReply; });
    if (!candidates.length) candidates = pool;
    return pick(candidates);
  }

  // 意图识别
  function detectIntent(text) {
    var t = String(text || "").toLowerCase().replace(/\s+/g, "");
    for (var i = 0; i < INTENTS.length; i++) {
      var entry = INTENTS[i];
      for (var j = 0; j < entry[1].length; j++) {
        if (t.indexOf(entry[1][j]) !== -1) return entry[0];
      }
    }
    return "fallback";
  }

  // 占位符替换
  function fillTokens(line, bf) {
    return String(line)
      .replace(/\{\{pet\}\}/g, bf.petName || "小朋友")
      .replace(/\{\{player\}\}/g, (bf.playerName && bf.playerName.trim()) ? bf.playerName.trim() : "你")
      .replace(/\{\{bf\}\}/g, bf.name || "我");
  }

// 主动消息升级：结合上次对话、时间、工作收入事件（替换旧 proactiveMessage）
  // ---- 主动消息：有上下文、接得上话 ----
  var FOLLOWUPS = [
    { test: /加班|忙|工作|会议|开会|项目/, lines: [
      "你说的加班结束了吗？",
      "还在忙？忙完跟我说一声，我等你。",
      "别熬太晚，忙完早点睡。",
      "忙完了记得回我，我一直在。"
    ]},
    { test: /累|疲惫|困|熬夜/, lines: [
      "刚才说累，现在好点了吗？",
      "去躺着吧，我陪你说话。",
      "别硬撑，难受就跟我说。"
    ]},
    { test: /饿|吃|饭|夜宵|奶茶/, lines: [
      "刚才说饿，吃上了吗？",
      "记得吃饭，别糊弄自己。",
      "想吃什么？我请你。"
    ]},
    { test: /晚安|睡了|睡觉/, lines: [
      "说晚安了，其实我还没睡。",
      "睡不着就找我。",
      "好好睡，梦里也不许跑掉。"
    ]},
    { test: /想你|想见|见面|见你/, lines: [
      "你刚才那句「想你」，我看了好几遍。",
      "我也想见你，比你更想。",
      "那就见吧，说个时间。"
    ]},
    { test: /生气|烦|难过|委屈|哭|不开心/, lines: [
      "还在生气吗？气我就好，别气你自己。",
      "刚才没说完的话，其实我在意你。",
      "别一个人闷着，跟我说说。"
    ]},
    { test: /病|感冒|发烧|疼|难受|吃药/, lines: [
      "药吃了吗？现在感觉怎么样。",
      "不舒服就歇着，别硬撑。",
      "我去查了注意事项，一会儿发你。"
    ]},
    { test: /无聊|孤单|寂寞/, lines: [
      "无聊了就找我，我这边随时有空。",
      "说点你想听的，我陪你熬过去。"
    ]},
    { test: /下班|到家|回家了/, lines: [
      "下班了？现在有空理我一下吗。",
      "到家就好。今天辛苦了。",
      "回来了就好好休息，别碰工作。"
    ]}
  ];

  function followUpLine(lastUser, bf) {
    for (var i = 0; i < FOLLOWUPS.length; i++) {
      if (FOLLOWUPS[i].test.test(lastUser)) return pick(FOLLOWUPS[i].lines);
    }
    return pick([
      "你刚才说的话，我还在想。",
      "忙完了吗？想听你说说话。",
      "突然想起你刚才那个语气。",
      "在干嘛？别装忙。"
    ]);
  }

  // 工作/入账事件台词（让主动消息有"由头"）
  function incomeLine(bf, ev) {
    var amt = ev && ev.amount ? ("¥" + Math.round(ev.amount).toLocaleString()) : "";
    var templates = [
      "今天工作上有个结果，" + (ev.label || "收入") + "到账了" + (amt ? "（" + amt + "）" : "") + "。",
      (ev.label || "一笔收入") + "刚到手" + (amt ? "，" + amt : "") + "。心情不错，想请你吃顿饭。",
      "忙到现在才结束，" + (ev.label || "项目") + "搞定了。第一个想告诉的人是你。",
      "刚签完一个单子，突然很想找你说话。"
    ];
    return pick(templates);
  }

  function proactiveMessage(bf, opts) {
    opts = opts || {};
    var hour = new Date().getHours();
    var period = hour < 6 ? "night" : hour < 11 ? "morning" : hour < 14 ? "afternoon" : hour < 18 ? "afternoon" : hour < 23 ? "evening" : "night";
    var lastUser = String(opts.lastUserText || "");
    var line = null;

    // 1) 先试着接上次的话题（最像真人）
    if (lastUser && Math.random() < 0.72) {
      line = followUpLine(lastUser, bf);
    }
    // 2) 工作/入账事件（有由头）
    if (!line && opts.income && Math.random() < 0.75) {
      line = incomeLine(bf, opts.income);
    }
    // 3) 时段问候
    if (!line) {
      var g = bf.greeting || {};
      if (Math.random() < 0.55 && g[period]) line = g[period];
    }
    // 4) 心情兜底
    if (!line) line = pick((MOODS[bf.mood || "normal"] || MOODS.normal).lines);
    return fillTokens(line, bf);
  }

  // 心情流转
  function maybeRollMood(bf) {
    var candidates = MOOD_ROLL.filter(function (r) { return r.from === (bf.mood || "normal"); });
    if (!candidates.length) return null;
    var roll = pick(candidates);
    // 概率降低：只在偶尔出现心情提示，避免刷屏跳戏
    if (Math.random() < 0.15) {
      bf.mood = roll.to;
      return fillTokens(roll.line, bf);
    }
    return null;
  }

  // 来电台词
  var CALL_SCRIPTS = [
    [
      "喂……是我。",
      "怎么，听到我的声音说不出话了？",
      "今天有点想听听你的声音，就拨过来了。",
      "你那边安静吗？……我都能听见你的呼吸声。",
      "没什么大事，就是想问你，今天有没有想我。",
      "好了，不逗你了。挂电话之前，说句晚安。",
      "……晚安，{{pet}}。"
    ],
    [
      "（电话接通，他的声音有点低）……{{player}}。",
      "别紧张，是我。",
      "我猜你现在一定笑得像个傻瓜。",
      "我今天路过一家店，玻璃橱窗里摆着你喜欢的东西。",
      "下次见面，我送给你。",
      "行了，去休息吧。梦里见。"
    ]
  ];

  function getCallScript(bf) {
    var s = pick(CALL_SCRIPTS);
    return s.map(function (l) { return fillTokens(l, bf); });
  }

  // 摸摸头互动台词
  var PET_LINES = [
    "……别摸头，头发要乱了。（却没有躲开）",
    "（耳根有点红）……就这一次，下不为例。",
    "你手好软。再摸一下。",
    "（把头往你手心蹭了蹭）嗯……继续。",
    "再摸下去，我可要当真了。",
    "别以为这样就能哄好我。……手感还行。",
    "（被摸得眯起眼睛）你今天，很温柔。",
    "摸头杀？我记下了，下次还给你。"
  ];

  // 对外 API
  window.ChatEngine = {
    detectIntent: detectIntent,
    pickLine: pickLine,
    deltaFor: function (intent) { return DELTAS[intent] != null ? DELTAS[intent] : 0; },
    fillTokens: fillTokens,
    proactiveMessage: proactiveMessage,
    maybeRollMood: maybeRollMood,
    getCallScript: getCallScript,
    petLine: function (bf) { return fillTokens(pick(PET_LINES), bf); },
    moodLabel: function (bf) {
      var m = MOODS[bf.mood || "normal"] || MOODS.normal;
      return m.label;
    },
    randInt: randInt,
    pick: pick
  };
})();
