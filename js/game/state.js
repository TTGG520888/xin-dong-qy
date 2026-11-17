// ============================================================
// GameState —— 存档/读档、好感度阶段、成就判定
// ============================================================
(function () {
  "use strict";
  var SAVE_KEY = "xin_dong_qy_save_v1";
  var SETTINGS_KEY = "xin_dong_qy_settings_v1"; // 设置单独镜像存储（API Key 等不随角色档丢失）

  var STAGES = [
    { min: 0, name: "陌生", emoji: "🤍", desc: "他还没有把你放在眼里" },
    { min: 10, name: "初识", emoji: "💙", desc: "他开始记住你的名字" },
    { min: 30, name: "相熟", emoji: "💜", desc: "他愿意和你多聊几句" },
    { min: 50, name: "心动", emoji: "💗", desc: "他开始在意你了" },
    { min: 70, name: "暧昧", emoji: "💖", desc: "只差一句告白" },
    { min: 90, name: "热恋", emoji: "❤️", desc: "他的世界只有你" },
    { min: 100, name: "挚爱", emoji: "💍", desc: "此心契约，至死不渝" }
  ];

  function stageOf(affection) {
    var s = STAGES[0];
    for (var i = 0; i < STAGES.length; i++) {
      if (affection >= STAGES[i].min) s = STAGES[i];
    }
    return s;
  }

  function nowStr() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function todayStr() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  function defaultState() {
    return {
      version: 1,
      createdAt: nowStr(),
      bf: {
        roleId: "custom",
        resp: "custom",
        gender: "male",        // male | female
        name: "",
        archetype: "完全自定义",
        age: "",
        height: "",
        occupation: "",
        emoji: "🩵",
        gradient: ["#a78bfa", "#f472b6"],
        accent: "#f472b6",
        avatar: null,          // 人物建模配置（旧版自绘立绘，仅作兜底）
        portrait: null,        // 角色立绘素材路径（assets/portraits/*.svg）
        personality: [],
        speakingStyle: "",
        voiceSamples: "",   // 经典台词/语气示例（让 AI 更像人设）
        tension: "high",    // 张力尺度：off | mid | high
        bold: "high",       // 大胆尺度：off | mid | high（主动度/挑明程度）
        background: "",
        petName: "",
        playerName: "",
        catchphrases: [],
        openingLine: "",
        greeting: { morning: "", afternoon: "", evening: "", night: "" },
        affection: 5,
        mood: "normal",
        lastReply: ""
      },
      msgCount: 0,
      contractShown: false, // 是否已展示"签订契约"系统提示
      nightChat: false,
      giftCount: 0,
      callCount: 0,
      scenarioCount: 0,
      scenarioDone: {},   // id -> true
      album: [],          // { icon, title, text, time }
      achievements: {},   // id -> true
      history: [],        // 最近聊天记录 {who, text}
      coins: 3,            // 心印币（聊天消耗）
      cash: 5000,          // ¥ 现金（打工赚、送礼花）
      chatCount: 0,        // 聊天计数（每 5 条扣 1 心印币）
      coinsMigrated: false, // 旧版心印币是否已折算成现金
      chatLog: [],        // 完整聊天记录（最多 300 条，用于云同步/记忆）
      cloud: { url: "", token: "", userId: "", lastSync: 0 },
      signin: { lastDate: "", streak: 0, total: 0 },
      daily: { date: "", chat: 0, pet: 0, gift: 0, like: 0, claimed: {} },
      momentsSeen: 0,     // 已浏览朋友圈动态数（轮换用）
      momentsReadAt: "",  // 最近打开朋友圈的日期（红点用）
      albumSeenCount: 0,  // 已查看的回忆条数（红点用）
      likesTotal: 0,      // 累计点赞
      unreadMsgs: 0,      // 未读主动消息数（聊天红点）
      lastMsgAt: "",      // 最近一条消息时间（微信式列表显示）
      assetsSpent: 0,     // 花掉他的钱（¥）
      transferDate: "",   // 上次"撒娇要零花"的日期
      friendRequests: [], // 待处理的好友申请 [{id,name,portrait,intro,time}]
      npcContacts: [],    // 已添加的 NPC 联系人 [{id,name,portrait,intro,history,lastAt,unread}]
      npcSeenAt: "",      // 上次收到新好友申请的时间戳
      encNextAt: 0,       // 下次偶遇事件的时间戳（毫秒）
      encCount: 0,        // 已触发偶遇次数
      blockedNames: [],   // 已拉黑的人（不会再申请加你）
      pendingSince: 0,    // 他发出消息后你还没回的时间戳
      followupLevel: 0,   // 未读追问等级 0~3
      memories: [],       // 他记住的关于你的事 [{text, at}]
      statusDay: "",      // 当前日程对应的日期
      statusKey: "",      // 今天的工作状态（加班/出差/休息…）
      festivalDone: {},   // 已过的节日 {yyyy-mm-dd: true}
      coldUntil: 0,       // 冷战结束时间戳
      coldMsgCount: 0,    // 冷战中你哄他的条数
      earn: { lastWorkAt: 0, sideJobDueAt: 0, sideJobReady: false,
              investAmount: 0, investDueAt: 0, earnedToday: 0, earnDate: "" },
      assetsExtra: 0,     // 后续入账累计（¥）
      assetsLog: [],      // 入账流水 [{label, amount, time}]
      incomeAt: 0,        // 下次入账时间戳
      tasksClaimedTotal: 0, // 累计领取任务奖励次数
      settings: { ai: "off", key: "", model: "deepseek-flash", baseUrl: "", temperature: 0.9, sound: "on", strict: "on", voice: "on", proactive: "on", proactiveFreq: "normal", encFreq: "low", aiLastError: "" }
    };
  }

  function save(state) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("存档失败", e);
    }
    // 设置单独存一份：换角色/新游戏/主档损坏时 API Key 也不会丢
    try {
      if (state && state.settings) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
      }
    } catch (e) {
      console.warn("设置保存失败", e);
    }
  }

  function loadSettingsMirror() {
    try {
      var raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      return (s && typeof s === "object") ? s : null;
    } catch (e) {
      return null;
    }
  }

  function load() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      // 合并缺省字段，兼容旧档
      var base = defaultState();
      function merge(dst, src) {
        for (var k in src) {
          if (src[k] && typeof src[k] === "object" && !Array.isArray(src[k])) {
            if (!dst[k]) dst[k] = {};
            merge(dst[k], src[k]);
          } else if (src[k] !== undefined) {
            dst[k] = src[k];
          }
        }
        return dst;
      }
      s = merge(base, s);
      // 合并设置镜像（镜像中的设置优先，保证 API Key 等不丢）
      var mirror = loadSettingsMirror();
      if (mirror) {
        for (var mk in mirror) {
          if (mirror[mk] !== undefined) s.settings[mk] = mirror[mk];
        }
      }
      // 旧模型名迁移：deepseek-chat / deepseek-v4-flash / deepseek-v4.1-flash → deepseek-flash
      var legacy = { "deepseek-chat": 1, "deepseek-v4-flash": 1, "deepseek-v4.1-flash": 1, "deepseek-chat-v3-0324": 1 };
      if (legacy[s.settings.model]) s.settings.model = "deepseek-flash";
      if (!s.settings.model) s.settings.model = "deepseek-flash";
      // 心印币改版迁移：旧版心印币（送礼货币）按 1:100 折算成现金，心印币统一归 3 枚
      if (!s.coinsMigrated) {
        var oldCoins = (typeof s.coins === "number") ? s.coins : 0;
        if (oldCoins > 3) {
          s.cash = (s.cash || 0) + (oldCoins - 3) * 100;
          s.coins = 3;
        }
        s.coinsMigrated = true;
      }
      return s;
    } catch (e) {
      return null;
    }
  }

  function wipe() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  }

  function hasSave() {
    try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
  }

  function addAffection(state, delta) {
    var before = state.bf.affection;
    var after = Math.max(0, Math.min(100, before + delta));
    state.bf.affection = after;
    var stageBefore = stageOf(before), stageAfter = stageOf(after);
    var leveled = stageAfter.min > stageBefore.min;
    return { delta: after - before, leveled: leveled, stage: stageAfter };
  }

  function addAlbum(state, icon, title, text) {
    state.album.unshift({ icon: icon, title: title, text: text, time: nowStr() });
    if (state.album.length > 60) state.album.length = 60;
  }

  function addHistory(state, who, text, type) {
    state.history.push({ who: who, text: text, type: type || "text" });
    if (state.history.length > 40) state.history.shift();
  }

  function checkAchievements(state) {
    var unlocked = [];
    (window.GAME_ACHIEVEMENTS || []).forEach(function (a) {
      if (!state.achievements[a.id] && a.check(state)) {
        state.achievements[a.id] = true;
        unlocked.push(a);
      }
    });
    return unlocked;
  }

  window.GameState = {
    SAVE_KEY: SAVE_KEY,
    SETTINGS_KEY: SETTINGS_KEY,
    loadSettingsMirror: loadSettingsMirror,
    STAGES: STAGES,
    stageOf: stageOf,
    stageName: function (aff) { return stageOf(aff).name; },
    nowStr: nowStr,
    todayStr: todayStr,
    defaultState: defaultState,
    save: save,
    load: load,
    wipe: wipe,
    hasSave: hasSave,
    addAffection: addAffection,
    addAlbum: addAlbum,
    addHistory: addHistory,
    checkAchievements: checkAchievements
  };
})();
