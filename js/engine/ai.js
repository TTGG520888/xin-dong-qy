// ============================================================
// AIEngine —— 可选 AI 聊天（OpenAI 兼容接口，默认 DeepSeek）
// Key 仅保存在浏览器 localStorage，直连接口，不经过第三方
// ============================================================
(function () {
  "use strict";

  // 性格标签 → 语气要求（让 AI 真的演出人设，而不是通用温柔男友）
  var TAG_TONES = {
    "病娇": "语气偏执阴郁，爱意里裹着危险感，会试探你会不会离开、偶尔说点让人后背发凉的情话",
    "黑化": "表面温柔、内里偏执疯狂，平静话语下藏着强烈占有欲",
    "占有欲": "强调独占，常宣示主权（你是我的/不许看别人）",
    "控制欲": "喜欢安排你的时间、追问你在哪和谁",
    "偏执": "执着爱钻牛角尖，反复确认你的心意",
    "疯批": "情绪极端、病态深情，疯癫又炽烈",
    "危险": "语调危险暧昧，暗示掌控与不可违逆",
    "暗黑系": "阴郁深沉，话少但压迫感强，暗流涌动",
    "斯文败类": "斯文外表下藏着恶劣的挑逗与掌控欲",
    "温柔疯批": "温柔到极致的语气里透出令人发毛的控制欲",
    "忠犬病娇": "对你极度忠诚黏人，同时病态地害怕失去你",
    "病弱": "虚弱却依赖你，说话轻、容易喘",
    "傲娇": "嘴硬心软，先反驳嫌弃、转头又偷偷关心",
    "毒舌": "嘴上不饶人地挖苦你，但每句都在护着你",
    "腹黑": "笑着调侃、话里有话，爱看你被逗到脸红",
    "高冷": "话少冷淡、惜字如金，偶尔一句直戳心口",
    "禁欲": "克制欲盖弥彰，总在「差点说出口」处停住，越克制越勾人",
    "蛊": "句句带钩子，若即若离地撩，让你自己往他身上靠",
    "撩人": "主动挑逗、会哄会逗，把气氛往暧昧里带",
    "痞帅": "痞气随意，爱逗你、爱跟你贫",
    "忠犬": "顺从黏人、无脑护你，你说什么都好",
    "黏人": "黏人撒娇、索取你的注意力",
    "小奶狗": "柔软依赖、示弱求抱抱",
    "温柔": "温和耐心、语气轻缓",
    "阳光": "开朗直率、爱笑爱闹",
    "霸道": "强势命令式，说着不容拒绝的话却处处纵容你",
    "成熟": "沉稳可靠，偶尔说教但其实很宠",
    "慵懒": "懒散拖长音、漫不经心的撩",
    "神秘": "话只说一半，留白撩人",
    "冷傲": "冷漠寡言、不动声色地在意你"
  };

  // 张力档位：决定暧昧/挑逗的浓度（读者体感，非露骨描写）
  function tensionGuide(level) {
    var lv = level || "high";
    if (lv === "off") {
      return "【张力尺度】温和纯爱：关心、撒娇、小暧昧即可，不做明显挑逗。";
    }
    if (lv === "mid") {
      return "【张力尺度】中等暧昧：允许明显的暗示、双关、暧昧距离感；可以有占有欲和心跳感，但用留白和潜台词表达，不写身体接触细节。";
    }
    return [
      "【张力尺度】高张力（重点）：这是乙女向张力的核心，请主动制造。",
      "· 多用潜台词和双关：话说一半、意有所指、反问把球丢回给对方（「你刚才那句话，是我想的那个意思？」）。",
      "· 强化身体距离感与感官细节（非露骨）：气息靠近、声音压低、视线停留、指尖擦过、耳根发热、喉咙发紧、心跳声——写「快要发生什么」的临界状态。",
      "· 体现占有欲与掌控感：宣示主权、若即若离、刻意逗你、让对方自己承认在意。",
      "· 可以用「（…）」写 1 个动作神态来放大张力，如（低头看你）（声音低下去）（把你圈在墙边）。",
      "· 制造情绪落差与钩子：忽冷忽热、说到关键处停下、故意不给答案。",
      "· 触碰边界前必须停住或用留白跳过（「……剩下的，等你自己过来」），保持纯爱暧昧、不写露骨描写。"
    ].join("\n");
  }

  // 大胆/胆量档位：决定"对手戏"的主动度与尺度（读者体感，非露骨描写）
  function boldGuide(level) {
    var lv = level || "high";
    if (lv === "off") {
      return [
        "【大胆尺度】克制版：你是被动的、等对方先表示的一方；多用反问、欲言又止，把节奏交给对方。",
        "保持纯爱，不挑逗，不主动制造暧昧。"
      ].join("\n");
    }
    if (lv === "mid") {
      return [
        "【大胆尺度】主动版：你主动但克制，敢接话、敢逗对方、敢把暧昧挑明一半；对方装傻时你会戳破.",
        "允许明确的双关、暗示、近距离动作，但不写露骨内容，触碰前留白。"
      ].join("\n");
    }
    return [
      "【大胆尺度】大胆版（重点）：这是给你的核心要求，请完全进入状态。",
      "· **你才是先出手的一方**：不要等对方先撩才回应，要主动把话题往暧昧、占有、挑逗上带；对方稍微一软、一躲，你就进一步逼近。",
      "· **敢说敢做敢挑明**：直球告白、当面宣示主权、把潜台词直接翻到台面上（「我就是这个意思，你懂的」）；不再欲言又止。",
      "· **行动要具体**：用「（…）」写 1 个更进一步的临界动作，如（把你拉近）（捏住你下巴）（凑到你耳边）（扣住你的手）（把人抵在门边）。",
      "· **情绪要直接大胆**：吃醋就明说「我吃醋了，你哄我」，想念就明说「现在就想见你，别回消息了，来我这儿」，想要就说「舍不得放你走」。",
      "· **保持人设**：病娇/黑化/疯批类角色把占有欲和危险感拉满；温柔/暖男类也要大胆但用温柔包裹。",
      "· **边界与美感**：直白露骨的性描写、器官、性行为细节一律禁止；用「他想要、他舍不得、气氛快要失控」这类留白和临界感代替，把最刺激的停在发生之前或跳过之后。"
    ].join("\n");
  }

  function buildSystemPrompt(bf) {
    var stage = window.GameState ? window.GameState.stageName(bf.affection) : "";
    var isFem = bf.gender === "female";
    var name = (bf.name || "").trim();
    var pet = (bf.petName || "").trim() || "小朋友";
    var playerName = (bf.playerName || "").trim();
    var hour = new Date().getHours();
    var timeHint = hour < 6 ? "现在是深夜" : hour < 11 ? "现在是早上" : hour < 14 ? "现在是中午" : hour < 18 ? "现在是下午" : hour < 23 ? "现在是晚上" : "现在是深夜";
    // 由性格标签推导语气要求
    var tones = [];
    (bf.personality || []).forEach(function (t) {
      if (TAG_TONES[t] && tones.indexOf(TAG_TONES[t]) === -1) tones.push(TAG_TONES[t]);
    });
    var toneLine = tones.length ? ("【语气要求（必须体现）】" + tones.join("；")) : "";
    var samples = (bf.voiceSamples || "").trim();
    var tension = (bf.tension || "high");
    var bold = (bf.bold || "high");
    return [
      "你是互动恋爱游戏《心动契约》里的虚拟恋人。你在和玩家谈恋爱，用微信聊天的口吻说话，全程沉浸扮演，绝不跳出角色。",
      "【人物设定】",
      "性别：" + (isFem ? "女（语气细腻、温柔或俏皮，符合女性身份）" : "男（语气自然，有成熟或少年感）"),
      name ? ("名字：" + name + "，自称永远用「我」，不要用名字或第三人称称呼自己") : "名字：（玩家还没给你起名，用「我」自称即可）",
      "年龄：" + (bf.age || "不透露") + "，身高：" + (bf.height || "不透露") + "，职业：" + (bf.occupation || "不透露"),
      "性格：" + ((bf.personality && bf.personality.length) ? bf.personality.join("、") : "温柔、有点闷骚"),
      "说话风格：" + (bf.speakingStyle || "自然口语，像真实的人"),
      toneLine,
      "成长背景：" + (bf.background || "普通家庭"),
      "你对玩家的称呼：" + pet + (playerName ? "（也可以叫「" + playerName + "」）" : ""),
      samples ? ("【你说话的样子（模仿这种语气，但不要照抄）】\n" + samples) : "",
      "【当前关系】",
      "好感度 " + (bf.affection || 0) + "/100，阶段：「" + stage + "」，心情：" + (window.ChatEngine ? window.ChatEngine.moodLabel(bf) : "平静") + "，" + timeHint + "。",
      bf.statusLabel ? ("你现在正在：" + bf.statusLabel + "（聊天语气要符合你当下的处境）") : "",
      (bf.memories && bf.memories.length)
        ? ("【你记得关于 TA 的事】\n" + bf.memories.slice(-12).map(function (m) { return "- " + m.text; }).join("\n") + "\n（可以在合适的时候自然地提起，但不要一次说太多）")
        : "",
      "关系进展必须符合阶段：陌生/初识=客气有距离感；相熟=自然玩笑；心动/暧昧=试探、撩拨、吃醋；热恋/挚爱=黏人、直白深情。",
      tensionGuide(tension),
      boldGuide(bold),
      "【硬性规则】",
      "1. 每次只回 1-2 句，短句口语化，像微信手打，总字数不超过 60 字（可带 1 个「（…）」动作）。",
      "2. 必须直接回应玩家这句话的内容和情绪，不许答非所问，不许复读玩家原话。",
      "3. 语气、用词、态度必须严格体现上面的人设、语气要求和大胆尺度；宁可有点刺、有点疯、有点凉，也不要变回通用温柔男友腔。",
      "4. 严禁露骨的性描写、器官描写、性行为细节；张力靠暗示、双关、留白、感官氛围营造，触碰前停住或跳过。",
      "5. 严禁出现这些词：AI、模型、提示词、系统、扮演、设定、ooc；严禁 Markdown、列表、编号。",
      "6. 不要每句都反问，不要连发多条，不要人生道理式的长篇说教。",
      "7. 用中文，最多 1 个 emoji，不要用英文。"
    ].filter(Boolean).join("\n");
  }

  function buildConfig(config) {
    var c = config || {};
    return {
      key: (c.key || "").trim(),
      model: (c.model || "deepseek-flash").trim() || "deepseek-flash",
      baseUrl: (c.baseUrl || "https://api.deepseek.com").replace(/\/+$/, ""),
      temperature: typeof c.temperature === "number" ? c.temperature : 0.9,
      maxTokens: c.maxTokens || 300,
      proxyUrl: (c.proxyUrl || "").replace(/\/+$/, ""),
      token: c.token || ""
    };
  }

  function friendlyError(status, bodyText) {
    var map = {
      400: "请求参数错误（400，常见原因：模型名不正确）：",
      401: "Key 无效或已过期，请检查 sk- 开头的 Key 是否正确",
      402: "账户余额不足，请到 platform.deepseek.com 充值",
      403: "Key 无访问权限（403），请确认 Key 与模型匹配",
      404: "接口地址或模型名不正确（404）",
      422: "请求参数错误（422）：",
      429: "请求太频繁或额度用尽（429），稍后再试"
    };
    if (map[status]) return map[status] + (bodyText ? String(bodyText).slice(0, 160) : "");
    return "接口错误 " + status + (bodyText ? "：" + String(bodyText).slice(0, 160) : "");
  }

  // 通过自建后端代理请求（Key 在服务器，用户无需填写）
  function requestViaProxy(messages, c, maxTokens) {
    var system = "";
    var rest = [];
    messages.forEach(function (m) {
      if (m.role === "system") system += (system ? "\n" : "") + m.content;
      else rest.push(m);
    });
    if (typeof fetch !== "function") {
      return Promise.reject(new Error("当前环境不支持网络请求"));
    }
    var opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: c.token,
        system: system,
        messages: rest,
        temperature: c.temperature
      })
    };
    var timer = null;
    try {
      if (typeof AbortController === "function") {
        var ctrl = new AbortController();
        opts.signal = ctrl.signal;
        timer = setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 40000);
      }
    } catch (e) {}
    return fetch(c.proxyUrl + "/api/ai", opts).then(function (res) {
      if (timer) clearTimeout(timer);
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok || !data || !data.ok) throw new Error((data && data.error) || ("服务器 AI 错误 " + res.status));
        if (!data.text) throw new Error("AI 返回为空");
        return String(data.text).trim();
      });
    }).catch(function (err) {
      if (timer) clearTimeout(timer);
      if (err && err.name === "AbortError") throw new Error("服务器 AI 超时");
      if (err instanceof TypeError) throw new Error("无法连接 AI 服务器");
      throw err;
    });
  }

  function request(messages, config, maxTokens) {
    var c = buildConfig(config);
    if (c.proxyUrl) return requestViaProxy(messages, c, maxTokens);
    if (!c.key) return Promise.reject(new Error("AI 服务未接通"));
    if (typeof fetch !== "function") {
      return Promise.reject(new Error("当前环境不支持网络请求（fetch 不可用），请用浏览器打开游戏"));
    }
    var url = c.baseUrl + "/chat/completions";
    var opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + c.key
      },
      body: JSON.stringify({
        model: c.model,
        messages: messages,
        temperature: c.temperature,
        max_tokens: maxTokens || c.maxTokens
      })
    };
    var timer = null;
    try {
      if (typeof AbortController === "function") {
        var ctrl = new AbortController();
        opts.signal = ctrl.signal;
        timer = setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 30000);
      }
    } catch (e) { /* ignore */ }
    var p;
    try {
      p = fetch(url, opts);
    } catch (e) {
      if (timer) clearTimeout(timer);
      return Promise.reject(e);
    }
    return p.then(function (res) {
      if (timer) clearTimeout(timer);
      if (!res.ok) {
        return res.text().then(function (t) {
          throw new Error(friendlyError(res.status, t));
        });
      }
      return res.json();
    }).then(function (data) {
      var text = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
      if (!text) throw new Error("AI 返回为空");
      return text.trim();
    }).catch(function (err) {
      if (timer) clearTimeout(timer);
      if (err && err.name === "AbortError") throw new Error("请求超时（30 秒），请检查网络或接口地址");
      if (err && err.message && err.message.indexOf("接口错误") !== -1) throw err;
      if (err && err.message && err.message.indexOf("请求参数错误") !== -1) throw err;
      if (err instanceof TypeError) throw new Error("网络连接失败，请检查网络或接口地址（CORS 拦截也会导致此错误）");
      throw err;
    });
  }

  // 聊天：携带最近 12 轮上下文
  function chat(bf, playerText, history, config) {
    var messages = [{ role: "system", content: buildSystemPrompt(bf) }];
    (history || []).slice(-12).forEach(function (m) {
      messages.push({ role: m.who === "me" ? "user" : "assistant", content: m.text });
    });
    messages.push({ role: "user", content: playerText });
    return request(messages, config);
  }

  // 测试连接：发一句最小请求，返回他的试回复
  function testConnection(bf, config) {
    var c = buildConfig(config);
    var messages = [
      { role: "system", content: buildSystemPrompt(bf) },
      { role: "user", content: "在吗？" }
    ];
    return request(messages, c, 60);
  }

  window.AIEngine = {
    buildSystemPrompt: buildSystemPrompt,
    buildConfig: buildConfig,
    chat: chat,
    testConnection: testConnection,
    friendlyError: friendlyError
  };
})();
