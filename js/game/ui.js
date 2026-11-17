// ============================================================
// UI —— 界面渲染与全部交互
// ============================================================
(function () {
  "use strict";

  // ---------- 小工具 ----------
  function $(id) { return document.getElementById(id); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function S() { return window.GameState.current; }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // ---------- SVG 线性图标 ----------
  var ICON_SVG_START = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var APP_VERSION = "v1.0.0";

  var ICONS = {
    chat: ICON_SVG_START + '<path d="M4 5h16v10H8l-4 4V5z"/><circle cx="8.5" cy="10" r="0.9" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r="0.9" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10" r="0.9" fill="currentColor" stroke="none"/></svg>',
    gift: ICON_SVG_START + '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8v13"/><path d="M12 8c-2.5 0-4-1-4-2.5S9.5 3 12 8zM12 8c2.5 0 4-1 4-2.5S14.5 3 12 8z"/></svg>',
    pet: ICON_SVG_START + '<path d="M12 20c-5-4.5-8-7.5-8-11C4 6 6 4 8.5 4c2 0 3 .8 3.5 1.8C12.5 4.8 13.5 4 15.5 4 18 4 20 6 20 9c0 3.5-3 6.5-8 11z"/></svg>',
    dress: ICON_SVG_START + '<path d="M12 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/><path d="M12 7l8.5 6H3.5L12 7z"/><path d="M9 20h6"/></svg>',
    call: ICON_SVG_START + '<path d="M4.5 4h3l1.5 4-2 1.5c1 2 2.5 3.5 4.5 4.5l1.5-2 4 1.5v3c0 1-.8 2-2 2C8 18.5 5.5 16 5.5 10 5.5 8.8 6.5 4 4.5 4z"/></svg>',
    date: ICON_SVG_START + '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M3 8l15-4 1 4M9 8v12M14.5 8v12"/></svg>',
    moments: ICON_SVG_START + '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M12 10.5c-1.4-1.3-1.4-3 0-3.5.8.2.8.9.8.9s0-.7.8-.9c1.4.5 1.4 2.2 0 3.5-.6.5-1.2.9-1.6 1.2-.4-.3-1-.7-1.6-1.2z"/></svg>',
    album: ICON_SVG_START + '<rect x="3" y="6" width="18" height="14" rx="2.5"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l1.5-2.5h5L16 6"/></svg>',
    card: ICON_SVG_START + '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 16c.5-2 5-2 6 0M14.5 10h4M14.5 13h4M14.5 16h3"/></svg>',
    gear: ICON_SVG_START + '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/></svg>',
    coin: ICON_SVG_START + '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 8.5h5M12 8.5v7M10 11.5h4"/></svg>',
    calendar: ICON_SVG_START + '<rect x="4" y="5" width="16" height="15.5" rx="2.5"/><path d="M8 3v4M16 3v4M4 10h16"/><path d="M9.5 14l2 2 3.5-3.5"/></svg>',
    back: ICON_SVG_START + '<path d="M15 5l-7 7 7 7"/><path d="M8 12h12"/></svg>',
    compass: ICON_SVG_START + '<circle cx="12" cy="12" r="8.5"/><path d="M15.2 8.8l-2 5.2-4.4 1.6 1.9-5.1 4.5-1.7z"/></svg>',
    heart: ICON_SVG_START + '<path d="M12 20c-4.8-4.3-7.5-7.2-7.5-10.2C4.5 6.6 6.4 4.6 9 4.6c1.8 0 2.7.7 3 1.4.3-.7 1.2-1.4 3-1.4 2.6 0 4.5 2 4.5 5.2C19.5 12.8 16.8 15.7 12 20z"/></svg>',
    task: ICON_SVG_START + '<rect x="4" y="4" width="16" height="17" rx="2.5"/><path d="M8 4V2.5M16 4V2.5M7.5 10.5l1.8 1.8 3.2-3.4M7.5 16h5M15 16h2"/></svg>',
    encounter: ICON_SVG_START + '<circle cx="9.5" cy="7.5" r="3"/><path d="M4 20c0-3.3 2.6-6 5.9-6"/><path d="M17.5 11.5l1 2.2 2.4.35-1.75 1.7.42 2.4-2.12-1.12-2.12 1.12.42-2.4-1.75-1.7 2.4-.35z"/></svg>'
  };

  function injectIcons() {
    $$("[data-icon]").forEach(function (node) {
      var name = node.getAttribute("data-icon");
      if (ICONS[name]) node.innerHTML = ICONS[name];
    });
  }

  var toastTimer = null;
  function toast(text, ms) {
    // 去掉开头的 emoji/符号，保持界面克制
    text = String(text == null ? "" : text).replace(/^[^\w\u4e00-\u9fa5\d]+/, "");
    var t = $("toast");
    t.textContent = text;
    t.classList.remove("hidden");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.add("hidden"); }, ms || 2200);
  }

  // ---------- 音效 / 震动 ----------
  var audioCtx = null;
  function playDing() {
    if (!S() || S().settings.sound !== "on") return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var ctx = audioCtx;
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(880, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);
      g.gain.setValueAtTime(0.08, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.4);
    } catch (e) { /* 忽略音频错误 */ }
  }
  function vibrate(pattern) {
    try {
      if (navigator.vibrate) navigator.vibrate(pattern || 40);
    } catch (e) {}
  }

  // ---------- 界面切换 ----------
  function showScreen(name) {
    $$(".screen").forEach(function (s) { s.classList.add("hidden"); });
    $("screen-" + name).classList.remove("hidden");
  }

  // ---------- 创建流程 ----------
  var EMOJIS = ["🕴️", "🧑‍⚕️", "🧛", "🛡️", "🎓", "🌟", "🐉", "🍸", "😼", "🦊", "🐺", "🌙", "🔥", "⚔️", "🎩", "🤴", "💜", "🖤"];
  var COLOR_PAIRS = [
    ["#a78bfa", "#f472b6"], ["#60a5fa", "#a78bfa"], ["#34d399", "#60a5fa"],
    ["#f87171", "#fb923c"], ["#f472b6", "#f87171"], ["#818cf8", "#22d3ee"],
    ["#e879f9", "#818cf8"], ["#475569", "#1e293b"], ["#fbbf24", "#f472b6"],
    ["#4ade80", "#fbbf24"]
  ];
  var TRAITS = [
    // 温柔 / 阳光系
    "温柔", "暖男", "阳光", "少年感", "细腻", "小奶狗",
    // 傲娇 / 毒舌系
    "傲娇", "毒舌", "腹黑", "天然黑", "白切黑", "反差萌",
    // 高冷 / 禁欲系
    "冷傲", "禁欲", "神秘", "高冷", "克制", "成熟",
    // 忠犬 / 黏人系
    "忠犬", "黏人", "痴情", "黏人精", "粘人",
    // 暗黑系（病娇/黑化等）
    "病娇", "黑化", "占有欲", "控制欲", "偏执", "疯批", "危险", "暗黑系",
    "阴郁", "孤独", "冷血", "无情", "斯文败类", "温柔疯批", "忠犬病娇", "病弱",
    // 其它
    "霸道", "痞帅", "慵懒", "玩世不恭", "玩咖", "暴躁", "易怒", "多疑", "嗜睡", "佛系"
  ];
  var traitsExpanded = false;

  var createDraft = null; // 当前编辑中的角色草稿
  var rosterRole = null;  // 当前正在选人的原型
  var createGender = "male"; // male | female
  var createOrigin = "start"; // start | home（决定创建页返回去向）
  var mascStyles = ["short", "slick", "messy", "wolf", "curly", "bun"];
  var femStyles = ["long", "twin", "hime", "bun", "pony", "curly", "short", "wolf"];
  var mascOutfits = ["suit_dark", "suit_light", "coat_doctor", "cape_vamp", "armor", "uniform", "stage", "robe", "vest", "hoodie", "shirt", "turtleneck"];
  var femOutfits = ["dress", "jk", "cheongsam", "lolita", "blouse", "gown", "hoodie", "shirt", "turtleneck", "uniform"];

  // ---------- 立绘素材 ----------
  function portraitDef(id) {
    var P = window.GAME_PORTRAITS || {};
    var map = P.characters || {};
    if (id && map[id]) return map[id];
    if (typeof id === "string" && id.indexOf("assets/") === 0) return { full: id, face: id };
    return null;
  }

  function portraitList(gender) {
    var P = window.GAME_PORTRAITS || {};
    var list = (gender === "female" ? P.female : P.male) || [];
    if (!list.length) list = P.anime || [];
    return list.slice();
  }

  function portraitSrc(id, big) {
    var d = portraitDef(id);
    if (!d) return null;
    return big ? (d.full || d.face) : (d.face || d.full);
  }

  function portraitImg(id, big) {
    var src = portraitSrc(id, big);
    if (!src) return "";
    return '<img class="avatar-img" src="' + src + '" alt="角色立绘" draggable="false">';
  }

  function hashStr(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  }

  function defaultPortraitFor(charLike, gender) {
    var list = portraitList(gender);
    if (!list.length) return null;
    var key = (charLike && (charLike.id || charLike.name)) || "custom";
    return list[hashStr(String(key)) % list.length];
  }

  // 角色头像/立绘标记：优先素材立绘，其次旧版矢量，最后 emoji
  function avatarMarkupFor(charLike, gradient, gender, big) {
    var g = gender || charLike.gender || "male";
    var id = charLike.portrait || defaultPortraitFor(charLike, g);
    var markup = portraitImg(id, big);
    if (markup) return markup;
    var preset = window.AVATAR_PRESETS || {};
    var cfg = charLike.avatar || preset[charLike.id] || preset.custom || null;
    if (cfg && window.AvatarEngine) {
      return window.AvatarEngine.avatarSVG(cfg, gradient || ["#a78bfa", "#f472b6"]);
    }
    return null;
  }

  function renderRoleGrid() {
    // 纯自定义流程：不再展示原型模板
    var grid = $("role-grid");
    if (!grid) return;
    grid.innerHTML = "";
  }

  function selectRole(role) {
    rosterRole = role;
    renderRoster(role);
  }

  function renderRoster(role) {
    var box = $("create-roster");
    box.innerHTML = "";
    box.classList.remove("hidden");
    $("role-grid").classList.add("hidden");
    var chars = [role].concat(role.alts || []);
    var head = el("div", "roster-head");
    head.appendChild(el("span", "roster-title", "「" + role.archetype + "」阵容"));
    head.appendChild(el("span", "roster-hint", "选一位心动的他，选定后仍可修改全部资料"));
    box.appendChild(head);
    var grid = el("div", "roster-grid");
    chars.forEach(function (c) {
      var card = el("div", "roster-card");
      var av = el("div", "avatar roster-avatar");
      var grad = c.gradient || role.gradient || ["#a78bfa", "#f472b6"];
      var markup = avatarMarkupFor(c, grad, "male");
      if (markup) av.innerHTML = markup;
      else {
        av.textContent = c.emoji || role.emoji || "🩵";
        av.style.background = "linear-gradient(135deg," + grad[0] + "," + grad[1] + ")";
      }
      var name = el("div", "roster-name", c.name);
      var meta = el("div", "roster-meta", (c.age != null ? c.age : "?") + "岁 · " + (c.height || "?") + " · " + (c.occupation || "?"));
      var desc = el("div", "roster-desc", ((c.background || role.background || "").slice(0, 42)) + "……");
      var btn = el("button", "btn btn-primary roster-pick", "选择他");
      card.appendChild(av);
      card.appendChild(name);
      card.appendChild(meta);
      card.appendChild(desc);
      card.appendChild(btn);
      btn.addEventListener("click", function () {
        buildDraftFromChar(role, c);
        goStep2();
      });
      grid.appendChild(card);
    });
    box.appendChild(grid);
    var back = el("button", "btn btn-ghost roster-back", "← 换一个原型");
    back.addEventListener("click", function () {
      box.classList.add("hidden");
      $("role-grid").classList.remove("hidden");
      $$(".role-card").forEach(function (c) { c.classList.remove("selected"); });
    });
    box.appendChild(back);
    box.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function buildDraftFromChar(role, char) {
    var preset = window.AVATAR_PRESETS || {};
    createDraft = {
      roleId: role.id,
      resp: role.resp || role.id,
      gender: "male",
      portrait: defaultPortraitFor(char, "male"),
      name: char.name || role.name,
      archetype: role.archetype,
      age: char.age != null ? char.age : role.age,
      height: char.height || role.height,
      occupation: char.occupation || role.occupation,
      emoji: char.emoji || role.emoji,
      gradient: (char.gradient || role.gradient || ["#a78bfa", "#f472b6"]).slice(),
      accent: char.accent || role.accent,
      avatar: Object.assign({}, (char.avatar || preset[role.id] || preset.custom)),
      personality: (char.personality || role.personality).slice(),
      speakingStyle: char.speakingStyle || role.speakingStyle,
      background: char.background || role.background,
      petName: char.petName || role.petName,
      catchphrases: (char.catchphrases || role.catchphrases || []).slice(),
      openingLine: char.openingLine || role.openingLine || "",
      greeting: char.greeting || role.greeting || null,
      gifts: role.gifts || null
    };
  }

  function blankCustom() {
    var preset = window.AVATAR_PRESETS || {};
    var female = createGender === "female";
    var list = portraitList(createGender);
    createDraft = {
      roleId: "custom", resp: "custom", gender: createGender,
      portrait: list.length ? list[Math.floor(Math.random() * list.length)] : null,
      name: "", archetype: female ? "自定义小姐姐" : "完全自定义", age: "", height: "",
      occupation: "", emoji: female ? "👩" : "🩵", gradient: female ? ["#e8a0b8", "#a78bfa"] : ["#a78bfa", "#f472b6"], accent: female ? "#e8a0b8" : "#f472b6",
      avatar: Object.assign({}, female ? (preset.female || preset.custom) : preset.custom),
      personality: [], speakingStyle: "温柔、细腻、偶尔俏皮",
      background: "", petName: female ? "笨蛋" : "小朋友", catchphrases: [], openingLine: "",
      greeting: null, gifts: null
    };
    goStep2();
  }

  function goStep2() {
    $("create-step1").classList.add("hidden");
    $("create-step2").classList.remove("hidden");
    $("create-step").textContent = "2/2";
    fillForm(createDraft);
    renderTraitPicker();
    buildPortraitPicker($("create-avatar-builder"), createDraft.portrait, createDraft.gender, function (p) { createDraft.portrait = p; }, updatePreview);
    updatePreview();
  }

  function fillForm(d) {
    $("in-name").value = d.name || "";
    $("in-age").value = d.age || "";
    $("in-height").value = d.height || "";
    $("in-job").value = d.occupation || "";
    $("in-style").value = d.speakingStyle || "";
    if ($("in-voice")) $("in-voice").value = d.voiceSamples || "";
    if ($("in-tension")) $("in-tension").value = d.tension || "high";
    if ($("in-bold")) $("in-bold").value = d.bold || "high";
    $("in-background").value = d.background || "";
    $("in-pet").value = d.petName || "";
    if ($("in-player")) $("in-player").value = d.playerName || "";
  }

  function renderEmojiPicker() {
    var box = $("emoji-picker");
    box.innerHTML = "";
    EMOJIS.forEach(function (e) {
      var b = el("button", "emoji-btn" + (e === createDraft.emoji ? " selected" : ""), e);
      b.addEventListener("click", function () {
        createDraft.emoji = e;
        $$(".emoji-btn").forEach(function (x) { x.classList.remove("selected"); });
        b.classList.add("selected");
        updatePreview();
      });
      box.appendChild(b);
    });
  }

  function renderColorPicker() {
    var box = $("color-picker");
    box.innerHTML = "";
    COLOR_PAIRS.forEach(function (pair, i) {
      var b = el("button", "swatch" + (pair[0] === createDraft.gradient[0] ? " selected" : ""), "");
      b.style.background = "linear-gradient(135deg," + pair[0] + "," + pair[1] + ")";
      b.addEventListener("click", function () {
        createDraft.gradient = pair.slice();
        createDraft.accent = pair[1];
        $$(".swatch").forEach(function (x) { x.classList.remove("selected"); });
        b.classList.add("selected");
        updatePreview();
      });
      box.appendChild(b);
    });
  }

  function renderTraitPicker() {
    var box = $("trait-picker");
    box.innerHTML = "";
    var COLLAPSED = 16;
    var visible = traitsExpanded ? TRAITS : TRAITS.slice(0, COLLAPSED);
    // 收起时把已选中的标签也显示出来（不影响后续编辑）
    if (!traitsExpanded) {
      createDraft.personality.forEach(function (t) {
        if (visible.indexOf(t) === -1 && TRAITS.indexOf(t) !== -1) visible.push(t);
      });
    }
    visible.forEach(function (t) {
      var on = createDraft.personality.indexOf(t) !== -1;
      var b = el("button", "chip" + (on ? " selected" : ""), t);
      b.addEventListener("click", function () {
        var idx = createDraft.personality.indexOf(t);
        if (idx === -1) {
          if (createDraft.personality.length >= 6) { toast("最多选 6 个性格标签"); return; }
          createDraft.personality.push(t);
          b.classList.add("selected");
        } else {
          createDraft.personality.splice(idx, 1);
          b.classList.remove("selected");
        }
      });
      box.appendChild(b);
    });
    if (TRAITS.length > COLLAPSED) {
      var toggle = el("button", "chip chip-toggle", traitsExpanded ? "收起 ▲" : "展开全部 " + TRAITS.length + " 个标签 ▼");
      toggle.addEventListener("click", function () {
        traitsExpanded = !traitsExpanded;
        renderTraitPicker();
      });
      box.appendChild(toggle);
    }
  }

  function updatePreview() {
    var avNode = $("preview-avatar");
    if (createDraft.portrait) {
      avNode.innerHTML = portraitImg(createDraft.portrait, false);
      avNode.style.background = "";
    } else if (createDraft.avatar && window.AvatarEngine) {
      avNode.innerHTML = window.AvatarEngine.avatarSVG(createDraft.avatar, createDraft.gradient);
      avNode.style.background = "";
    } else {
      avNode.textContent = createDraft.emoji || "🩵";
      avNode.style.background = "linear-gradient(135deg," + createDraft.gradient[0] + "," + createDraft.gradient[1] + ")";
    }
    $("preview-name").textContent = $("in-name").value.trim() || "他的名字";
    var tags = $("preview-tags");
    tags.innerHTML = "";
    var show = createDraft.personality.slice(0, 3);
    show.forEach(function (t) { tags.appendChild(el("span", "mini-tag", t)); });
  }

  // ---------- 角色头像选择（素材） ----------
  var ACC_EMOJI = { none: "🚫", glasses: "👓", earring: "💎", headphones: "🎧", scarf: "🧣", crown: "👑", hairpin: "🎀" };

  function buildPortraitPicker(container, current, gender, setter, onChange) {
    if (!container) return;
    gender = gender || "male";
    var list = portraitList(gender);
    container.innerHTML = "";
    if (!list.length) return;
    var wrap = el("div", "creator-grid");
    var left = el("div", "creator-preview");
    var charBox = el("div", "creator-char");
    function renderPreview() {
      // 预览用方形头像裁切（不用全身立绘）
      charBox.innerHTML = current ? portraitImg(current, false) : "";
      if (onChange) onChange();
    }
    renderPreview();
    left.appendChild(charBox);
    var randBtn = el("button", "btn btn-gen creator-rand", "🎲 随机头像");
    randBtn.addEventListener("click", function () {
      current = list[Math.floor(Math.random() * list.length)];
      if (setter) setter(current);
      renderOptions();
      renderPreview();
    });
    left.appendChild(randBtn);

    var right = el("div", "creator-panel");
    var title = el("div", "creator-tabs");
    title.appendChild(el("span", "portrait-title", (gender === "female" ? "女生" : "男生") + "头像（" + list.length + " 款）"));
    var grid = el("div", "portrait-gallery");
    function renderOptions() {
      grid.innerHTML = "";
      list.forEach(function (p) {
        var b = el("button", "portrait-item" + (p === current ? " selected" : ""), "");
        b.innerHTML = portraitImg(p);
        b.addEventListener("click", function () {
          current = p;
          if (setter) setter(p);
          grid.querySelectorAll(".portrait-item").forEach(function (x) { x.classList.remove("selected"); });
          b.classList.add("selected");
          renderPreview();
        });
        grid.appendChild(b);
      });
    }
    renderOptions();
    right.appendChild(title);
    right.appendChild(grid);
    wrap.appendChild(left);
    wrap.appendChild(right);
    container.appendChild(wrap);
  }

  // ---------- 一键生成资料 ----------
  function quickGen(full) {
    if (!createDraft || !window.ProfileGenerator) return;
    var key = createDraft.resp || createDraft.roleId;
    var g = window.ProfileGenerator.generate(key);
    if (full) {
      if (g.name) createDraft.name = g.name;
      if (g.age) createDraft.age = g.age;
      if (g.height) createDraft.height = g.height;
      if (g.occupation) createDraft.occupation = g.occupation;
      if (g.background) createDraft.background = g.background;
      if (createDraft.roleId === "custom") {
        var list = portraitList(createDraft.gender);
        if (list.length) createDraft.portrait = list[Math.floor(Math.random() * list.length)];
        buildPortraitPicker($("create-avatar-builder"), createDraft.portrait, createDraft.gender, function (p) { createDraft.portrait = p; }, updatePreview);
      }
    }
    if (g.personality && g.personality.length) createDraft.personality = g.personality.slice();
    if (g.speakingStyle) createDraft.speakingStyle = g.speakingStyle;
    if (g.petName) createDraft.petName = g.petName;
    fillForm(createDraft);
    renderTraitPicker();
    updatePreview();
  }

  function readFormIntoDraft() {
    createDraft.name = $("in-name").value.trim();
    createDraft.age = $("in-age").value.trim();
    createDraft.height = $("in-height").value.trim();
    createDraft.occupation = $("in-job").value.trim();
    createDraft.speakingStyle = $("in-style").value.trim();
    createDraft.voiceSamples = ($("in-voice") ? $("in-voice").value.trim() : "");
    createDraft.tension = ($("in-tension") ? $("in-tension").value : "high");
    createDraft.bold = ($("in-bold") ? $("in-bold").value : "high");
    createDraft.background = $("in-background").value.trim();
    createDraft.petName = $("in-pet").value.trim();
    createDraft.playerName = $("in-player").value.trim();
  }

  // 校验角色资料是否填写完整（必填项）
  function validateDraft(d) {
    var errors = [];
    function need(cond, fieldId, label) {
      if (!cond) errors.push({ id: fieldId, label: label });
    }
    need(d.name && d.name.length >= 1, "in-name", "TA 的名字");
    need(d.age && String(d.age).length >= 1, "in-age", "年龄");
    need(d.occupation && d.occupation.length >= 1, "in-job", "职业");
    need(d.personality && d.personality.length >= 1, "trait-picker", "至少 1 个性格标签");
    need(d.speakingStyle && d.speakingStyle.length >= 2, "in-style", "说话风格");
    need(d.background && d.background.length >= 15, "in-background", "背景故事（至少 15 字）");
    return errors;
  }

  function clearInvalidMarks() {
    $$(".field.invalid").forEach(function (f) { f.classList.remove("invalid"); });
  }

  function markInvalid(fieldId) {
    var node = $(fieldId);
    if (!node) return;
    var field = node.closest ? node.closest(".field") : null;
    if (!field) field = node.parentNode;
    if (field) field.classList.add("invalid");
  }

  // 校验失败时高亮缺失项并提示
  function enforceDraftComplete(d) {
    clearInvalidMarks();
    var errors = validateDraft(d);
    if (!errors.length) return true;
    errors.forEach(function (e) { markInvalid(e.id); });
    var first = $(errors[0].id);
    if (first) {
      try { first.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {}
      try { if (first.focus) first.focus(); } catch (e) {}
    }
    toast("⚠️ 资料没填完：" + errors.map(function (e) { return e.label; }).join("、"), 4200);
    return false;
  }

  function startNewGame() {
    readFormIntoDraft();
    // 强制：资料必须填完整才能开始
    if (!enforceDraftComplete(createDraft)) return;
    var st = window.GameState.defaultState();
    // 设置（API Key 等）属于全局偏好，换角色 / 新游戏也保留
    if (window.GameState.current && window.GameState.current.settings) {
      st.settings = Object.assign({}, st.settings, window.GameState.current.settings);
    }
    var d = createDraft;
    st.bf = {
      roleId: d.roleId, resp: d.resp || d.roleId, gender: d.gender || "male",
      name: d.name || (d.gender === "female" ? "她" : "他"), archetype: d.archetype,
      age: d.age, height: d.height, occupation: d.occupation,
      emoji: d.emoji, gradient: d.gradient, accent: d.accent,
      avatar: d.avatar ? Object.assign({}, d.avatar) : null,
      portrait: d.portrait || defaultPortraitFor(d, d.gender || "male"),
      personality: d.personality.slice(), speakingStyle: d.speakingStyle, voiceSamples: d.voiceSamples, tension: d.tension || "high", bold: d.bold || "high",
      background: d.background, petName: d.petName || "小朋友",
      playerName: d.playerName,
      catchphrases: d.catchphrases || [], openingLine: d.openingLine || "",
      greeting: d.greeting || null,
      gifts: d.gifts || null,
      affection: 5, mood: "normal", lastReply: ""
    };
    window.GameState.current = st;
    GameState.addAlbum(st, "💌", "契约签订", "你和「" + st.bf.name + "」的故事，从这一句开始了");
    // 开场白直接进历史：主动消息/首次打开聊天都能按顺序还原
    GameState.addHistory(st, "him", getOpeningLine(st.bf));
    GameState.save(st);
    // 清空上一局残留的界面状态
    var msgList = $("msg-list");
    if (msgList) msgList.innerHTML = "";
    typingOn = false;
    $("msg-input").value = "";
    if (homeSpeechTimer) { clearTimeout(homeSpeechTimer); homeSpeechTimer = null; }
    $("home-speech").classList.add("hidden");
    showScreen("phone");
    renderPhone();
    renderHome();
    refreshStartAccount();
    autoEnter();
    scheduleProactive(true);
    try {
      if (!localStorage.getItem("xin_dong_qy_notice_v1")) {
        localStorage.setItem("xin_dong_qy_notice_v1", "1");
        if ($("notice-modal")) $("notice-modal").classList.remove("hidden");
      }
    } catch (e) {}
    scheduleEncounter(true);
    st.incomeAt = Date.now() + (8 * 60 + Math.random() * 12 * 60) * 1000;
    toast("💞 契约签订完成，TA 正在等你互动");
  }

  // ---------- 虚拟恋人主界面（微信式消息列表） ----------
  var homeSpeechTimer = null;

  // 渲染会话列表里"和 TA 的那一行"（头像 + 名字 + 最近消息 + 未读）
  function renderHomeChatList(st, bf) {
    var box = $("home-chatlist");
    if (!box) return;
    box.innerHTML = "";
    renderNewFriendsRow(box);
    var row = el("div", "chat-row");
    row.id = "home-chat-row";

    var av = el("div", "chat-row-avatar");
    av.id = "home-chat-avatar";
    var markup = avatarMarkupFor(bf, bf.gradient, bf.gender || "male", false);
    if (markup) av.innerHTML = markup;
    else av.textContent = bf.emoji || "🩵";
    // 点头像 → 打开人物资料页（不进入聊天）
    av.addEventListener("click", function (e) {
      e.stopPropagation();
      openProfile();
    });
    row.appendChild(av);

    var body = el("div", "chat-row-body");
    var top = el("div", "chat-row-top");
    top.appendChild(el("span", "chat-row-name", bf.name || "TA"));
    top.appendChild(el("span", "chat-row-time", st.lastMsgAt || ""));
    body.appendChild(top);

    var bottom = el("div", "chat-row-bottom");
    var last = st.history.length ? st.history[st.history.length - 1] : null;
    var preview = last
      ? ((last.who === "me" ? "我：" : "") + last.text)
      : "还没有聊天记录，点进去和 TA 说句话吧";
    bottom.appendChild(el("span", "chat-row-preview", preview));
    if (st.unreadMsgs > 0) {
      bottom.appendChild(el("span", "chat-row-badge", String(Math.min(st.unreadMsgs, 99))));
    }
    body.appendChild(bottom);
    row.appendChild(body);
    row.addEventListener("click", openChatFromHome);
    box.appendChild(row);
    renderNpcRows(box);
  }

  // ---------- 人物资料页（微信式：点头像看资料/头像大图） ----------
  function renderProfile() {
    var st = S();
    if (!st || !st.bf) return;
    var bf = st.bf;
    var av = $("profile-avatar");
    if (av) {
      var markup = avatarMarkupFor(bf, bf.gradient, bf.gender || "male", false);
      av.innerHTML = markup || "";
      if (!markup) av.textContent = bf.emoji || "🩵";
    }
    if ($("profile-name")) $("profile-name").textContent = bf.name || "TA";
    var sub = [];
    if (bf.age) sub.push(bf.age + " 岁");
    if (bf.height) sub.push(bf.height);
    if (bf.occupation) sub.push(bf.occupation);
    if ($("profile-sub")) $("profile-sub").textContent = sub.length ? sub.join(" · ") : "还未填写资料";
    if ($("profile-mood")) {
      $("profile-mood").textContent = ChatEngine.moodLabel(bf) + " · " + GameState.stageName(bf.affection) + "阶段 · 好感 " + bf.affection;
    }
    var tags = $("profile-tags");
    if (tags) {
      tags.innerHTML = "";
      (bf.personality || []).slice(0, 8).forEach(function (t) {
        tags.appendChild(el("span", "mini-tag", t));
      });
    }
    renderAssets();
    renderMemories();
  }

  function openProfile() {
    tickIncome(false);
    renderProfile();
    $("profile-sheet").classList.remove("hidden");
  }

  function closeProfile() {
    $("profile-sheet").classList.add("hidden");
  }

  // 头像大图（微信式点击查看）——支持 TA 和 NPC
  function openAvatarViewer(who) {
    var st = S();
    if (!st) return;
    var img = $("avatar-viewer-img");
    var name = "";
    if (who && who.name) {
      if (img) {
        img.innerHTML = portraitImg(who.portrait, false) || "";
        if (!img.innerHTML) img.textContent = "🙂";
      }
      name = who.name;
    } else {
      if (img) {
        var markup = avatarMarkupFor(st.bf, st.bf.gradient, st.bf.gender || "male", false);
        img.innerHTML = markup || "";
        if (!markup) img.textContent = st.bf.emoji || "🩵";
      }
      name = st.bf.name || "TA";
    }
    if ($("avatar-viewer-name")) $("avatar-viewer-name").textContent = name;
    $("avatar-viewer").classList.remove("hidden");
  }

  function closeAvatarViewer() {
    $("avatar-viewer").classList.add("hidden");
  }

  // ---------- 新的朋友：NPC 主动加你微信 ----------
  var NPC_NAMES = ["顾言", "沈墨白", "陆星野", "江予夺", "程亦辰", "周野", "宋清晏", "林知夏"];
  var NPC_INTROS = [
    "你好，在附近偶遇过你几次，能认识一下吗？",
    "你的头像很好看，忍不住加一下。",
    "朋友说你很有趣，想认识你。",
    "刚搬到附近，人生地不熟，可以交个朋友吗？",
    "昨天在咖啡店见过你，想请你喝一杯。",
    "冒昧打扰，你的朋友圈我看了很多遍。",
    "你好，我是{M}，看到你感觉很有眼缘。"
  ];
  var NPC_LINES = [
    "你好呀，我是{M}。",
    "其实我留意你很久了，今天终于鼓起勇气。",
    "晚上有空吗？想请你吃个饭。",
    "你今天看起来心情不错。",
    "要不要一起吃个宵夜？我知道一家很好吃的。",
    "别误会，我不是随便加人的。",
    "你笑起来应该很好看。",
    "今天有点想你，虽然我们才刚认识。",
    "在忙吗？忙完记得回我。",
    "晚安，记得早点睡。"
  ];
  var npcCurrent = null;

  function npcPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function npcPortrait() {
    var list = portraitList("male");
    return list.length ? list[Math.floor(Math.random() * list.length)] : null;
  }

  // 生成一条好友申请
  function generateFriendRequest() {
    var st = S();
    if (!st) return null;
    var used = {};
    (st.friendRequests || []).forEach(function (r) { used[r.name] = 1; });
    (st.npcContacts || []).forEach(function (c) { used[c.name] = 1; });
    var blocked = st.blockedNames || [];
    var free = NPC_NAMES.filter(function (n) { return !used[n] && blocked.indexOf(n) === -1; });
    if (!free.length) return null;
    var name = npcPick(free);
    var intro = npcPick(NPC_INTROS).replace(/\{M\}/g, name);
    var req = {
      id: "fr_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      name: name,
      portrait: npcPortrait(),
      intro: intro,
      time: nowHM()
    };
    st.friendRequests = st.friendRequests || [];
    st.friendRequests.push(req);
    GameState.save(st);
    return req;
  }

  // 进入首页一段时间后，可能有人加你
  var friendTimer = null;
  function scheduleFriendRequest(delay) {
    if (friendTimer) clearTimeout(friendTimer);
    var wait = typeof delay === "number" ? delay : 20000 + Math.random() * 30000;
    friendTimer = setTimeout(function () {
      var st = S();
      if (!st) return;
      if ($("screen-home").classList.contains("hidden") && $("screen-chat").classList.contains("hidden")) {
        scheduleFriendRequest(20000);
        return;
      }
      if ((st.friendRequests || []).length >= 2) return;
      if ((st.npcContacts || []).length >= 5) return;
      var req = generateFriendRequest();
      if (req) {
        renderHome();
        toast("🙋 有人想加你微信：" + req.name, 3600);
        playDing();
      }
    }, wait);
  }

  // 会话列表里的「新的朋友」行
  function renderNewFriendsRow(box) {
    var st = S();
    var pending = (st.friendRequests || []).length;
    var row = el("div", "chat-row friends-row");
    var av = el("div", "chat-row-avatar friends-avatar", "＋");
    av.addEventListener("click", function (e) {
      e.stopPropagation();
      openFriendsModal();
    });
    row.appendChild(av);
    var body = el("div", "chat-row-body");
    var top = el("div", "chat-row-top");
    top.appendChild(el("span", "chat-row-name", "新的朋友"));
    if (pending) top.appendChild(el("span", "chat-row-time", pending + " 个申请"));
    body.appendChild(top);
    var bottom = el("div", "chat-row-bottom");
    bottom.appendChild(el("span", "chat-row-preview", pending ? "有人想认识你，快去看看吧" : "暂无新的好友申请"));
    if (pending) bottom.appendChild(el("span", "chat-row-badge", String(pending)));
    body.appendChild(bottom);
    row.appendChild(body);
    row.addEventListener("click", openFriendsModal);
    box.appendChild(row);
  }

  function renderNpcRows(box) {
    var st = S();
    (st.npcContacts || []).forEach(function (c) {
      var row = el("div", "chat-row");
      var av = el("div", "chat-row-avatar");
      av.innerHTML = portraitImg(c.portrait, false) || "";
      if (!av.innerHTML) av.textContent = "🙂";
      av.addEventListener("click", function (e) {
        e.stopPropagation();
        openNpcProfile(c.id);
      });
      row.appendChild(av);
      var body = el("div", "chat-row-body");
      var top = el("div", "chat-row-top");
      top.appendChild(el("span", "chat-row-name", c.name));
      top.appendChild(el("span", "chat-row-time", c.lastAt || ""));
      body.appendChild(top);
      var bottom = el("div", "chat-row-bottom");
      var last = c.history && c.history.length ? c.history[c.history.length - 1] : null;
      var preview = last ? ((last.who === "me" ? "我：" : "") + last.text) : "已添加好友，打个招呼吧";
      bottom.appendChild(el("span", "chat-row-preview", preview));
      if (c.unread) bottom.appendChild(el("span", "chat-row-badge", String(Math.min(c.unread, 99))));
      body.appendChild(bottom);
      row.appendChild(body);
      row.addEventListener("click", function () { openNpcChat(c.id); });
      box.appendChild(row);
    });
  }

  // ---------- 新的朋友弹窗 ----------
  function openFriendsModal() {
    var st = S();
    var list = $("friends-list");
    if (!list) return;
    list.innerHTML = "";
    var reqs = st.friendRequests || [];
    if (!reqs.length) {
      list.appendChild(el("p", "friends-empty", "暂时没有人加你，等一下看看～"));
    }
    reqs.forEach(function (r) {
      var item = el("div", "friend-item");
      var av = el("div", "friend-avatar");
      av.innerHTML = portraitImg(r.portrait, false) || "";
      if (!av.innerHTML) av.textContent = "🙂";
      item.appendChild(av);
      var mid = el("div", "friend-mid");
      mid.appendChild(el("div", "friend-name", r.name));
      mid.appendChild(el("div", "friend-intro", r.intro));
      mid.appendChild(el("div", "friend-time", r.time || ""));
      item.appendChild(mid);
      var btns = el("div", "friend-btns");
      var acc = el("button", "friend-acc", "同意");
      acc.addEventListener("click", function () { acceptFriend(r.id); });
      var rej = el("button", "friend-rej", "拒绝");
      rej.addEventListener("click", function () { rejectFriend(r.id); });
      btns.appendChild(acc);
      btns.appendChild(rej);
      item.appendChild(btns);
      list.appendChild(item);
    });
    $("friends-modal").classList.remove("hidden");
  }

  function acceptFriend(reqId) {
    var st = S();
    var idx = (st.friendRequests || []).findIndex(function (x) { return x.id === reqId; });
    if (idx === -1) return;
    var req = st.friendRequests.splice(idx, 1)[0];
    st.npcContacts = st.npcContacts || [];
    st.npcContacts.push({
      id: "npc_" + Date.now(),
      name: req.name,
      portrait: req.portrait,
      intro: req.intro,
      history: [{ who: "him", text: "通过了！我是" + req.name + "，" + req.intro }],
      lastAt: nowHM(),
      unread: 1
    });
    GameState.save(st);
    $("friends-modal").classList.add("hidden");
    renderHome();
    toast("✅ 已通过「" + req.name + "」的好友申请", 2600);
    playDing();
  }

  function rejectFriend(reqId) {
    var st = S();
    var before = (st.friendRequests || []).length;
    st.friendRequests = (st.friendRequests || []).filter(function (x) { return x.id !== reqId; });
    GameState.save(st);
    if (st.friendRequests.length !== before) toast("已忽略这条申请");
    openFriendsModal();
    renderHome();
  }

  // ---------- NPC 独立聊天 ----------
  function findNpc(id) {
    var st = S();
    return (st.npcContacts || []).filter(function (c) { return c.id === id; })[0] || null;
  }

  function openNpcChat(id) {
    var st = S();
    var npc = findNpc(id);
    if (!npc) return;
    npcCurrent = id;
    npc.unread = 0;
    GameState.save(st);
    if ($("npc-avatar")) $("npc-avatar").innerHTML = portraitImg(npc.portrait, false) || "";
    if ($("npc-name")) $("npc-name").textContent = npc.name;
    if ($("npc-sub")) $("npc-sub").textContent = "来自「附近的人」· 已通过好友";
    renderNpcChat();
    $("npc-chat").classList.remove("hidden");
  }

  function renderNpcChat() {
    var st = S();
    var list = $("npc-msg-list");
    if (!list) return;
    list.innerHTML = "";
    var npc = findNpc(npcCurrent);
    if (!npc) return;
    (npc.history || []).forEach(function (m) {
      var row = el("div", "msg msg-" + (m.who === "me" ? "me" : "him"));
      buildBubble(row, m.text, m.type);
      row.appendChild(el("div", "msg-time", ""));
      list.appendChild(row);
    });
    list.scrollTop = list.scrollHeight;
  }

  function sendNpcMessage() {
    var st = S();
    var npc = findNpc(npcCurrent);
    if (!npc) return;
    var input = $("npc-input");
    var t = String(input.value || "").trim();
    if (!t) return;
    input.value = "";
    npc.history = npc.history || [];
    npc.history.push({ who: "me", text: t });
    npc.lastAt = nowHM();
    renderNpcChat();
    GameState.save(st);
    // 对方回复
    setTimeout(function () {
      var line = npcPick(NPC_LINES).replace(/\{M\}/g, npc.name);
      npc.history.push({ who: "him", text: line, type: "text" });
      npc.lastAt = nowHM();
      GameState.save(st);
      if (npcCurrent === npc.id && !$("npc-chat").classList.contains("hidden")) {
        renderNpcChat();
        playDing();
      }
    }, 900 + Math.random() * 900);
  }

  function closeNpcChat() {
    $("npc-chat").classList.add("hidden");
    npcCurrent = null;
    renderHome();
  }

  // ---------- NPC 资料页：删除好友 / 拉黑 ----------
  var npcProfileId = null;

  function openNpcProfile(id) {
    var npc = findNpc(id);
    if (!npc) return;
    npcProfileId = id;
    var av = $("npc-profile-avatar");
    if (av) {
      av.innerHTML = portraitImg(npc.portrait, false) || "";
      if (!av.innerHTML) av.textContent = "🙂";
    }
    if ($("npc-profile-name")) $("npc-profile-name").textContent = npc.name;
    if ($("npc-profile-sub")) $("npc-profile-sub").textContent = "来自「附近的人」 · 已通过好友";
    if ($("npc-profile-intro")) $("npc-profile-intro").textContent = "「" + (npc.intro || "") + "」";
    $("npc-profile").classList.remove("hidden");
  }

  function closeNpcProfile() {
    $("npc-profile").classList.add("hidden");
    npcProfileId = null;
  }

  function deleteNpcContact(id, block) {
    var st = S();
    var npc = findNpc(id);
    if (!npc) return;
    st.npcContacts = (st.npcContacts || []).filter(function (x) { return x.id !== id; });
    if (block) {
      st.blockedNames = st.blockedNames || [];
      if (st.blockedNames.indexOf(npc.name) === -1) st.blockedNames.push(npc.name);
    }
    GameState.save(st);
    closeNpcProfile();
    renderHome();
    toast(block ? "🚫 已拉黑「" + npc.name + "」，TA 不会再找你" : "已删除好友「" + npc.name + "」");
  }

  // ---------- 偶遇事件（好友来源） ----------
  var ENCOUNTERS = [
    {
      icon: "🏪", title: "深夜便利店", place: "凌晨一点，便利店只剩你们两个人",
      narr: "关东煮只剩最后一串，他先伸手，又收回去看了你一眼：「你先拿？」",
      choices: [
        { text: "推给他：“你看起来更需要”", add: true, reply: "他愣了一下笑出来：“那我加你个微信，下次请你吃更好的。”" },
        { text: "分他一半", add: true, reply: "他低头看你递过来的那半串，声音低了些：“……你这个人挺有意思的。”" },
        { text: "拿着就走", add: false, reply: "你推门出去，玻璃门上映出他还站在原地的样子。" }
      ]
    },
    {
      icon: "🌧️", title: "雨天公交站", place: "晚上九点，雨下得很大",
      narr: "你没带伞，站在站牌下躲雨。旁边撑黑伞的男人看了你几秒，把伞往你这边偏了偏。",
      choices: [
        { text: "说声谢谢，往他那边靠近一点", add: true, reply: "“靠这么近，”他低头看你，“加个微信，下次我送你。”" },
        { text: "把伞推回去：“你自己别淋着”", add: true, reply: "他没接伞，只是笑：“那加个微信，我确认你有没有淋湿。”" },
        { text: "摇头，冲进雨里", add: false, reply: "你在雨里跑远，回头时那把黑伞还停在原地。" }
      ]
    },
    {
      icon: "☕", title: "咖啡店拼桌", place: "下午三点，店里满座",
      narr: "他端着咖啡站在你桌边：“介意拼一下桌吗？我保证很安静。”",
      choices: [
        { text: "点头，把东西挪一挪", add: true, reply: "他坐下后先推过来一块方糖：“差点忘了自我介绍，我叫{M}。”" },
        { text: "开玩笑：“安静是有多安静？”", add: true, reply: "他被逗笑，眼睛弯起来：“这样呢？加个微信，我保证只发一句。”" },
        { text: "说这里有人了", add: false, reply: "他礼貌地点点头，转身去找别的位子。" }
      ]
    },
    {
      icon: "📚", title: "书店同一本书", place: "周末下午，书店二层",
      narr: "你和他的手同时伸向书架上同一本书。他先撤手，把书让给你：“你先。”",
      choices: [
        { text: "“一起看？”把书翻到中间", add: true, reply: "他靠过来一点：“看完记得还我，加个微信方便催。”" },
        { text: "和他聊起这本书", add: true, reply: "“你也喜欢这段？”他眼里亮了，“那必须加个微信，改天换着看。”" },
        { text: "拿书就走", add: false, reply: "你抱着书离开，他在原地翻起了另一本。" }
      ]
    },
    {
      icon: "🚇", title: "地铁末班车", place: "末班地铁，车厢挤得站不稳",
      narr: "急刹车，你撞进一个人的怀里。他扶住你的手臂，等你站稳才松开。",
      choices: [
        { text: "红着脸道歉", add: true, reply: "“不用道歉，”他没松开手，“这么不稳，加个微信，到站叫我。”" },
        { text: "抬头看他一眼", add: true, reply: "他低头和你对视两秒，喉结动了一下：“……我们是不是该认识了？”" },
        { text: "往旁边挪开", add: false, reply: "你挤到门口，只在玻璃反光里看见他始终没移开视线。" }
      ]
    },
    {
      icon: "🏋️", title: "健身房", place: "晚上八点，器械区",
      narr: "他在你旁边练了很久，忽然把水递给你：“你的水没了，喝我的吧。”",
      choices: [
        { text: "接过来，道谢", add: true, reply: "“下次一起练？”他擦了下汗，“我有好多动作想教你。”" },
        { text: "“你怎么知道我水没了？”", add: true, reply: "他愣了一下，耳根有点红：“……因为我一直在看你。”" },
        { text: "婉拒", add: false, reply: "他收回手，继续练自己的，只是后来没再往这边看。" }
      ]
    }
  ];
  var encCurrent = null;
  var encPendingId = null;

  function encPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function openEncounter() {
    var enc = encPick(ENCOUNTERS);
    encCurrent = enc;
    encPendingId = null;
    if ($("enc-icon")) $("enc-icon").textContent = enc.icon;
    if ($("enc-title")) $("enc-title").textContent = enc.title;
    if ($("enc-narr")) $("enc-narr").textContent = enc.place + "。" + enc.narr;
    if ($("enc-result")) $("enc-result").classList.add("hidden");
    var box = $("enc-choices");
    if (box) {
      box.innerHTML = "";
      box.classList.remove("hidden");
      enc.choices.forEach(function (c, i) {
        var b = el("button", "enc-choice", c.text);
        b.addEventListener("click", function () { chooseEncounter(i); });
        box.appendChild(b);
      });
    }
    $("encounter-modal").classList.remove("hidden");
  }

  function chooseEncounter(idx) {
    var enc = encCurrent;
    if (!enc) return;
    var c = enc.choices[idx];
    var box = $("enc-choices");
    if (box) box.classList.add("hidden");
    var res = $("enc-result");
    if (res) res.classList.remove("hidden");
    var line = $("enc-line");
    var acceptBtn = $("btn-enc-accept");
    if (c.add) {
      var req = generateFriendRequest();
      if (req) {
        encPendingId = req.id;
        var av = $("enc-avatar");
        if (av) {
          av.innerHTML = portraitImg(req.portrait, false) || "";
          if (!av.innerHTML) av.textContent = "🙂";
        }
        if ($('enc-name')) $('enc-name').textContent = req.name;
        if ($('enc-sub')) $('enc-sub').textContent = enc.title + " · 刚刚偶遇";
        if (line) line.textContent = String(c.reply).replace(/\{M\}/g, req.name);
        if (acceptBtn) acceptBtn.classList.remove("hidden");
        renderHome();
      } else {
        if ($("enc-avatar")) $("enc-avatar").innerHTML = "";
        if ($("enc-name")) $("enc-name").textContent = "";
        if ($("enc-sub")) $("enc-sub").textContent = "";
        if (line) line.textContent = "他没有留下联系方式，你们就此错过。";
        if (acceptBtn) acceptBtn.classList.add("hidden");
      }
    } else {
      if ($("enc-avatar")) $("enc-avatar").innerHTML = "";
      if ($("enc-name")) $("enc-name").textContent = "";
      if ($("enc-sub")) $("enc-sub").textContent = "";
      if (line) line.textContent = c.reply;
      if (acceptBtn) acceptBtn.classList.add("hidden");
    }
  }

  function closeEncounter() {
    $("encounter-modal").classList.add("hidden");
  }

  // 偶遇自动触发：按"天"节奏（首次 3 分钟让你体验，之后默认 1~2 天一次）
  var ENC_DELAYS = {
    low: [3 * 24 * 3600, 7 * 24 * 3600], // 3~7 天（默认，很慢）
    normal: [24 * 3600, 48 * 3600],      // 1~2 天
    high: [8 * 3600, 16 * 3600]          // 8~16 小时
  };

  function scheduleEncounter(first) {
    var st = S();
    if (!st) return;
    var waitSec;
    if (first && !st.encCount) {
      waitSec = 15 * 60 + Math.random() * 15 * 60; // 首次 15~30 分钟，慢慢来
    } else {
      var freq = (st.settings && st.settings.encFreq) || "low";
      var r = ENC_DELAYS[freq] || ENC_DELAYS.low;
      waitSec = r[0] + Math.random() * (r[1] - r[0]);
    }
    st.encNextAt = Date.now() + Math.round(waitSec * 1000);
    GameState.save(st);
  }

  function tickEncounter(homeVisible) {
    if (!homeVisible) return;
    if (!$("encounter-modal").classList.contains("hidden")) return;
    if ($("profile-sheet") && !$("profile-sheet").classList.contains("hidden")) return;
    if ($("npc-chat") && !$("npc-chat").classList.contains("hidden")) return;
    if (document.querySelector(".modal:not(.hidden)")) return;
    var st = S();
    if (!st) return;
    if (!st.encNextAt) { scheduleEncounter(true); return; }
    if (Date.now() < st.encNextAt) return;
    if ((st.friendRequests || []).length >= 3) { scheduleEncounter(false); return; }
    if ((st.npcContacts || []).length >= 6) return;
    st.encCount = (st.encCount || 0) + 1;
    scheduleEncounter(false);
    openEncounter();
    playDing();
  }

  // ---------- 我的资产 / 赚钱 ----------
  var COIN_TO_YUAN_PLAYER = 100;
  var earnTimer = null;

  function todayEarn(st) {
    st.earn = st.earn || {};
    var today = GameState.todayStr();
    if (st.earn.earnDate !== today) {
      st.earn.earnDate = today;
      st.earn.earnedToday = 0;
    }
    return st.earn;
  }

  function addEarn(amount, label) {
    var st = S();
    if (!st) return;
    var e = todayEarn(st);
    e.earnedToday = (e.earnedToday || 0) + amount;
    addCoins(amount);
    GameState.save(st);
    renderWallet();
    if ($("earn-coins")) $("earn-coins").textContent = st.coins || 0;
    if ($("earn-cash")) $("earn-cash").textContent = (st.cash || 0).toLocaleString();
    if (label) toast("+" + amount + " 心印币（" + label + "）");
  }

  function addCash(n) {
    var st = S();
    if (!st) return;
    st.cash = Math.max(0, Math.round((st.cash || 0) + n));
    GameState.save(st);
    renderWallet();
  }

  function chatQuota(st) {
    return Math.max(0, (st.coins || 0) * 5 - (st.chatCount || 0) % 5);
  }

  function renderWallet() {
    var st = S();
    if (!st) return;
    if ($("pw-yuan")) $("pw-yuan").textContent = (st.cash || 0).toLocaleString();
    if ($("pw-total")) $("pw-total").textContent = "\u2726 \u5fc3\u5370\u5e01 " + (st.coins || 0) + " \u679a \u00b7 \u53ef\u804a " + chatQuota(st) + " \u6761";
    if ($("gift-cash-num")) $("gift-cash-num").textContent = (st.cash || 0).toLocaleString();
  }

  function openEarnModal() {
    var st = S();
    if (!st) return;
    var e = todayEarn(st);
    if ($("earn-coins")) $("earn-coins").textContent = st.coins || 0;
    if ($("earn-cash")) $("earn-cash").textContent = (st.cash || 0).toLocaleString();
    refreshEarnButtons();
    settleInvestSilently(st);
    $("earn-modal").classList.remove("hidden");
    if (earnTimer) clearInterval(earnTimer);
    earnTimer = setInterval(function () {
      if (!$("earn-modal") || $("earn-modal").classList.contains("hidden")) {
        clearInterval(earnTimer);
        earnTimer = null;
        return;
      }
      settleInvestSilently(S());
      refreshEarnButtons();
    }, 1000);
  }

  function refreshEarnButtons() {
    var st = S();
    if (!st || !$("btn-earn-work")) return;
    if ($("earn-cash")) $("earn-cash").textContent = (st.cash || 0).toLocaleString();
    if ($("earn-coins")) $("earn-coins").textContent = st.coins || 0;
    var e = todayEarn(st);
    var now = Date.now();
    // 打工冷却
    var workCd = 10 * 60 * 1000;
    var leftWork = (e.lastWorkAt || 0) + workCd - now;
    var workBtn = $("btn-earn-work");
    if (leftWork > 0) {
      workBtn.disabled = true;
      workBtn.textContent = Math.ceil(leftWork / 60000) + " 分";
    } else {
      workBtn.disabled = false;
      workBtn.textContent = "打工";
    }
    // 私活
    var sideBtn = $("btn-earn-side");
    if (e.sideJobDueAt && now < e.sideJobDueAt) {
      sideBtn.disabled = true;
      sideBtn.textContent = Math.ceil((e.sideJobDueAt - now) / 60000) + " 分";
    } else if (e.sideJobReady) {
      sideBtn.disabled = false;
      sideBtn.textContent = "交付";
    } else {
      sideBtn.disabled = false;
      sideBtn.textContent = "接活";
    }
    // 理财
    var invBtn = $("btn-earn-invest");
    if (e.investDueAt && now < e.investDueAt) {
      invBtn.disabled = true;
      invBtn.textContent = Math.ceil((e.investDueAt - now) / 60000) + " 分";
    } else {
      invBtn.disabled = false;
      invBtn.textContent = "投资";
    }
    // 状态说明
    var parts = [];
    if (leftWork > 0) parts.push("打工冷却中");
    if (e.sideJobDueAt && now < e.sideJobDueAt) parts.push("私活进行中");
    if (e.sideJobReady) parts.push("私活已完成，等你交付");
    if (e.investDueAt && now < e.investDueAt) parts.push("理财未到期");
    if ($("earn-status")) $("earn-status").textContent = parts.join(" · ") || "选一个开始赚钱吧";
  }

  function settleInvestSilently(st) {
    var e = st.earn || {};
    if (e.investDueAt && Date.now() >= e.investDueAt) {
      var amount = e.investAmount || 500;
      var win = Math.random() < 0.55;
      var back = win ? Math.round(amount * 1.4) : Math.round(amount * 0.7);
      e.investAmount = 0;
      e.investDueAt = 0;
      GameState.save(st);
      addCash(back);
      toast(win
        ? ("📈 理财赚了！+" + (back - amount).toLocaleString() + " 元")
        : ("📉 理财亏了一点：" + (back - amount).toLocaleString() + " 元"));
    }
  }

  // ¥ 充值心印币（1 心印币 = ¥100）
  function rechargeCoins(yuan) {
    var st = S();
    if (!st) return;
    if ((st.cash || 0) < yuan) {
      toast("💸 现金不够，去「赚钱」App 打工赚点吧");
      return;
    }
    var add = Math.floor(yuan / 100);
    addCash(-yuan);
    addCoins(add);
    toast("✦ 充值成功：+" + add + " 心印币");
    refreshEarnButtons();
    refreshChatQuota();
    renderRechargeModal();
  }

  function renderRechargeModal() {
    var st = S();
    if (!st) return;
    if ($("rec-cash")) $("rec-cash").textContent = "¥" + (st.cash || 0).toLocaleString();
    if ($("rec-coins")) $("rec-coins").textContent = st.coins || 0;
    var opts = [["btn-rec-1000", 1000], ["btn-rec-2000", 2000], ["btn-rec-5000", 5000]];
    opts.forEach(function (pair) {
      var btn = $(pair[0]);
      if (btn) btn.disabled = (st.cash || 0) < pair[1];
    });
  }

  function openRechargeModal() {
    if (!$("recharge-modal")) return;
    renderRechargeModal();
    $("recharge-modal").classList.remove("hidden");
  }

  function doWork() {
    var st = S();
    var e = todayEarn(st);
    if ((e.lastWorkAt || 0) + 10 * 60 * 1000 > Date.now()) return;
    e.lastWorkAt = Date.now();
    var gain = 200 + Math.floor(Math.random() * 301);
    GameState.save(st);
    addCash(gain);
    toast("\ud83d\udcbc \u6253\u5de5 +\u00a5" + gain.toLocaleString());
    refreshEarnButtons();
  }

  function doSideJob() {
    var st = S();
    var e = todayEarn(st);
    if (e.sideJobDueAt && Date.now() < e.sideJobDueAt) return;
    if (e.sideJobReady) {
      // 交付
      var gain = 800 + Math.floor(Math.random() * 1001);
      e.sideJobReady = false;
      e.sideJobDueAt = 0;
      GameState.save(st);
      addCash(gain);
      toast("\ud83d\udcbb \u79c1\u6d3b\u4ea4\u4ed8 +\u00a5" + gain.toLocaleString());
      refreshEarnButtons();
      return;
    }
    e.sideJobDueAt = Date.now() + 3 * 60 * 1000;
    GameState.save(st);
    toast("💻 私活已接，3 分钟后交付");
    refreshEarnButtons();
  }

  function doInvest() {
    var st = S();
    var e = todayEarn(st);
    if (e.investDueAt && Date.now() < e.investDueAt) return;
    if ((st.cash || 0) < 500) { toast("\ud83d\udcb8 \u73b0\u91d1\u4e0d\u591f\uff0c\u81f3\u5c11\u9700\u8981 \u00a5500"); return; }
    addCash(-500);
    e.investAmount = 500;
    e.investDueAt = Date.now() + 20 * 60 * 1000;
    GameState.save(st);
    toast("\ud83d\udcc8 \u6295\u5165 \u00a5500\uff0c20 \u5206\u949f\u540e\u7ed3\u7b97");
    refreshEarnButtons();
  }

  // ============================================================
  // 云同步（需要自建后端 server/server.js）
  // ============================================================
  function httpJson(method, url, body) {
    return new Promise(function (resolve, reject) {
      var payload = body ? JSON.stringify(body) : null;
      if (typeof fetch === "function") {
        fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: payload
        }).then(function (r) { return r.json(); }).then(resolve).catch(reject);
        return;
      }
      try {
        var x = new XMLHttpRequest();
        x.open(method, url, true);
        x.setRequestHeader("Content-Type", "application/json");
        x.onload = function () {
          try { resolve(JSON.parse(x.responseText)); } catch (e) { reject(e); }
        };
        x.onerror = function () { reject(new Error("网络错误")); };
        x.timeout = 15000;
        x.ontimeout = function () { reject(new Error("请求超时")); };
        x.send(payload);
      } catch (e) { reject(e); }
    });
  }

  function cloudBase() {
    var st = S();
    var url = (st && st.cloud && st.cloud.url) || "";
    return String(url).replace(/\/+$/, "");
  }

  function cloudStatus(text) {
    if ($("cloud-status")) $("cloud-status").textContent = text || "";
  }

  function readAccountForm() {
    var modalOpen = $("account-modal") && !$("account-modal").classList.contains("hidden");
    var nameEl = modalOpen ? $("acc-name") : $("cloud-name");
    var passEl = modalOpen ? $("acc-pass") : $("cloud-pass");
    var urlEl = modalOpen ? $("acc-url") : $("cloud-url");
    return {
      name: nameEl ? String(nameEl.value || "").trim() : "",
      pass: passEl ? String(passEl.value || "") : "",
      url: urlEl ? String(urlEl.value || "").trim().replace(/\/+$/, "") : ""
    };
  }

  function accountStatus(msg) {
    if ($("acc-status")) $("acc-status").textContent = msg || "";
  }

  function refreshStartAccount() {
    var st = S();
    var el = $("start-account-status");
    if (!el) return;
    if (st && st.cloud && st.cloud.token) {
      el.textContent = "☁ 已登录：" + String(st.cloud.username || st.cloud.userId || "").slice(0, 12);
      el.classList.add("on");
    } else {
      el.textContent = "未登录云账号（不登录也能玩，进度只保存在本机）";
      el.classList.remove("on");
    }
  }

  function openAccountModal() {
    var st = S();
    if ($("acc-url") && st && st.cloud && st.cloud.url) $("acc-url").value = st.cloud.url;
    if ($("acc-name") && st && st.cloud && st.cloud.username) $("acc-name").value = st.cloud.username;
    if ($("acc-pass")) $("acc-pass").value = "";
    accountStatus("");
    $("account-modal").classList.remove("hidden");
  }

  function cloudRegister() {
    var st = S();
    var f = readAccountForm();
    if (f.url) {
      st.cloud = st.cloud || { url: "", token: "", userId: "", lastSync: 0 };
      st.cloud.url = f.url;
    }
    var base = cloudBase();
    if (!base) { toast("先填写服务器地址"); return Promise.reject(new Error("no url")); }
    var name = f.name;
    var pass = f.pass;
    if (!name) { toast("请填写账号"); return Promise.reject(new Error("no name")); }
    if (pass.length < 4) { toast("密码至少 4 位"); return Promise.reject(new Error("short pass")); }
    cloudStatus("注册中…");
    return httpJson("POST", base + "/api/register", { name: name, password: pass }).then(function (r) {
      if (!r || !r.ok) throw new Error((r && r.error) || "注册失败");
      st.cloud.token = r.user.token;
      st.cloud.userId = r.user.userId;
      st.cloud.username = readAccountForm().name;
      GameState.save(st);
      cloudStatus("已注册并登录 · " + r.user.userId.slice(0, 6));
      toast("☁ 云端账号已连接");
      renderCloudPanel();
      return r.user;
    }).catch(function (e) {
      cloudStatus("连接失败：" + (e.message || e));
      throw e;
    });
  }

  function cloudLogin() {
    var st = S();
    var f2 = readAccountForm();
    if (f2.url) {
      st.cloud = st.cloud || { url: "", token: "", userId: "", lastSync: 0 };
      st.cloud.url = f2.url;
    }
    var base = cloudBase();
    if (!base) { toast("先填写服务器地址"); return Promise.reject(new Error("no url")); }
    var name = f2.name;
    var pass = f2.pass;
    if (!name || !pass) { toast("请填写账号和密码"); return Promise.reject(new Error("empty")); }
    cloudStatus("登录中…");
    return httpJson("POST", base + "/api/login", { name: name, password: pass }).then(function (r) {
      if (!r || !r.ok) throw new Error((r && r.error) || "登录失败");
      st.cloud.token = r.user.token;
      st.cloud.userId = r.user.userId;
      GameState.save(st);
      cloudStatus("已登录 · " + String(r.user.userId).slice(0, 6));
      toast("☁ 登录成功");
      updateAIServerStatus();
      cloudPull();
      return r.user;
    }).catch(function (e) {
      cloudStatus("登录失败：" + (e.message || e));
      throw e;
    });
  }

  function cloudPush(silent) {
    var st = S();
    var base = cloudBase();
    if (!base || !st.cloud.token) { if (!silent) toast("请先连接云端账号"); return Promise.reject(new Error("not ready")); }
    var copy = JSON.parse(JSON.stringify(st));
    delete copy.cloud;
    cloudStatus("上传中…");
    return httpJson("POST", base + "/api/save", {
      token: st.cloud.token,
      save: copy,
      chatLog: (st.chatLog || []).slice(-300)
    }).then(function () {
      return httpJson("POST", base + "/api/memory", {
        token: st.cloud.token,
        items: (st.memories || []).slice(-40)
      });
    }).then(function () {
      st.cloud.lastSync = Date.now();
      GameState.save(st);
      cloudStatus("已同步 · " + nowHM());
      if (!silent) toast("☁ 存档已上传到云端");
    }).catch(function (e) {
      cloudStatus("上传失败：" + (e.message || e));
    });
  }

  function cloudPull() {
    var st = S();
    var base = cloudBase();
    if (!base || !st.cloud.token) { toast("请先连接云端账号"); return; }
    cloudStatus("读取中…");
    httpJson("GET", base + "/api/save?token=" + encodeURIComponent(st.cloud.token)).then(function (r) {
      if (!r || !r.ok || !r.save) { cloudStatus("云端没有存档"); return; }
      if (!confirm("用云端存档覆盖当前进度吗？当前进度会被替换。")) return;
      var cloudToken = st.cloud.token;
      var merged = Object.assign({}, r.save);
      merged.cloud = { url: base, token: cloudToken, userId: (st.cloud && st.cloud.userId) || "", lastSync: Date.now() };
      GameState.current = merged;
      GameState.save(GameState.current);
      renderHome();
      cloudStatus("已从云端恢复");
      toast("☁ 已恢复云端存档");
      showScreen("phone");
      renderPhone();
    }).catch(function (e) {
      cloudStatus("读取失败：" + (e.message || e));
    });
  }

  function renderAbout() {
    if ($("about-version")) $("about-version").textContent = APP_VERSION;
  }

  function renderCloudPanel() {
    var st = S();
    if (!st || !$("cloud-url")) return;
    if (st.cloud && st.cloud.url) $("cloud-url").value = st.cloud.url;
    if ($("cloud-auto")) $("cloud-auto").checked = !(st.cloud && st.cloud.auto === "off");
    if ($("cloud-name") && st.cloud && st.cloud.username) $("cloud-name").value = st.cloud.username;
    if ($("cloud-mycode")) {
      $("cloud-mycode").textContent = (st.cloud && st.cloud.token)
        ? "恢复码：" + st.cloud.token
        : "恢复码：未连接";
    }
    var connected = !!(st.cloud && st.cloud.token);
    cloudStatus(connected ? ("已连接 · " + (st.cloud.userId || "").slice(0, 8)) : "未连接（填写服务器地址后点连接）");
    updateAIServerStatus();
  }

  // 自动云同步：每 45 秒检查，存档有变化就静默上传
  var autoSyncSig = 0;
  function autoCloudSync() {
    var st = S();
    if (!st || !st.cloud || !st.cloud.token || !st.cloud.url) return;
    if (st.cloud.auto === "off") return;
    var sig = 0;
    try {
      var copy = JSON.parse(JSON.stringify(st));
      delete copy.cloud;
      var str = JSON.stringify(copy);
      sig = str.length;
      if (sig === autoSyncSig) return;
      autoSyncSig = sig;
    } catch (e) { return; }
    cloudPush(true).catch(function () {});
  }

  // ============================================================
  // 聊天长期记忆：把对话要点存成"他记得的事"
  // ============================================================
  function appendChatLog(st, who, text, type) {
    st.chatLog = st.chatLog || [];
    st.chatLog.push({ who: who, text: String(text || "").slice(0, 200), type: type || "text", at: nowHM() });
    if (st.chatLog.length > 300) st.chatLog.shift();
  }

  var HARVEST_EVERY = 10;

  function harvestChatMemories(force) {
    var st = S();
    if (!st) return 0;
    st.memories = st.memories || [];
    var log = st.chatLog || [];
    if (!log.length) return 0;
    var start = Math.max(0, log.length - (force ? 60 : 20));
    var added = 0;
    for (var i = start; i < log.length; i++) {
      var m = log[i];
      if (!m || m.who !== "me") continue;
      var t = String(m.text || "").replace(/\s+/g, " ").trim();
      if (t.length < 6) continue;
      var fact = "TA 说过：「" + t.slice(0, 34) + (t.length > 34 ? "…" : "") + "」";
      var dup = false;
      for (var k = 0; k < st.memories.length; k++) {
        if (st.memories[k].text === fact) { dup = true; break; }
      }
      if (dup) continue;
      st.memories.push({ text: fact, at: nowHM() });
      added++;
      if (st.memories.length > 60) st.memories.shift();
    }
    if (added) {
      GameState.save(st);
      if (cloudBase() && st.cloud.token) {
        httpJson("POST", cloudBase() + "/api/memory", { token: st.cloud.token, items: st.memories.slice(-20) }).catch(function () {});
      }
    }
    return added;
  }

  // 内容过滤（过审用）
  var FILTER_WORDS = ["色情", "强奸", "做爱", "性交", "裸体", "自慰", "肉棒", "阴道", "阴茎", "射精"];

  function remoteWords() {
    try {
      var raw = localStorage.getItem("xd_remote_words");
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function filterText(t) {
    var st = S();
    if (!st || (st.settings && st.settings.strict === "off")) return String(t || "");
    var out = String(t || "");
    var words = FILTER_WORDS.concat(remoteWords());
    for (var i = 0; i < words.length; i++) {
      var w = String(words[i] || "");
      if (w.length < 1) continue;
      out = out.split(w).join("***");
    }
    return out;
  }

  // 拉取服务端词库 + 公告（启动后调用）
  function loadRemoteRules() {
    var base = cloudBase();
    if (!base) return;
    httpJson("GET", base + "/api/words").then(function (r) {
      if (r && Array.isArray(r.words)) {
        try { localStorage.setItem("xd_remote_words", JSON.stringify(r.words)); } catch (e) {}
      }
    }).catch(function () {});
    httpJson("GET", base + "/api/notice").then(function (r) {
      if (!r || !r.enabled || !r.text) return;
      if ($("sys-notice-text")) $("sys-notice-text").textContent = r.text;
      if ($("sys-notice-bar")) {
        $("sys-notice-bar").classList.remove("hidden");
        clearTimeout(window.__noticeTimer);
        window.__noticeTimer = setTimeout(function () {
          if ($("sys-notice-bar")) $("sys-notice-bar").classList.add("hidden");
        }, 12000);
      }
    }).catch(function () {});
  }

  // 图标素材：emoji → 线性 SVG（统一 1.5 描边，风格克制）
  var EMOJI_ICONS = {
    "☕": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<path d="M5 9h11v5.5A3.5 3.5 0 0 1 12.5 18h-4A3.5 3.5 0 0 1 5 14.5V9z"/><path d="M16 10.5h1.6a2.2 2.2 0 0 1 0 4.4H16"/><path d="M8.5 5.5c0 1 .9 1.2.9 2.2"/><path d="M12 5c0 1 .9 1.2.9 2.2"/>\u003c/svg\u003e',
    "🌹": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<path d="M12 12.6a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6z"/><path d="M12 12.6v7"/><path d="M12 16.6c-2.2 0-3.4-1.1-3.4-2.6"/><path d="M12 18.6c2.2 0 3.4-1.1 3.4-2.6"/>\u003c/svg\u003e',
    "💌": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<rect x="4" y="6.5" width="16" height="11" rx="2"/><path d="M4.6 7.4L12 12.6l7.4-5.2"/>\u003c/svg\u003e',
    "✉️": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<rect x="4" y="6.5" width="16" height="11" rx="2"/><path d="M4.6 7.4L12 12.6l7.4-5.2"/>\u003c/svg\u003e',
    "🧣": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<path d="M8 4.5c2.4 1.9 5.6 1.9 8 0v8.6c-2.4 1.9-5.6 1.9-8 0V4.5z"/><path d="M10 13v6.5"/><path d="M14 13v6.5"/>\u003c/svg\u003e',
    "🍰": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<path d="M4.5 19.5h15v-5a3 3 0 0 0-3-3h-9a3 3 0 0 0-3 3v5z"/><path d="M12 11.5V8.6"/><path d="M9.6 5.8c0 .8.6 1 .6 1.6"/><path d="M4.5 15.8c2 1.1 4 1.1 6 0s4-1.1 6 0"/>\u003c/svg\u003e',
    "🎂": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<path d="M4.5 19.5h15v-5a3 3 0 0 0-3-3h-9a3 3 0 0 0-3 3v5z"/><path d="M12 11.5V9"/><path d="M12 5.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/>\u003c/svg\u003e',
    "🎮": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<rect x="3.5" y="8.5" width="17" height="8.5" rx="4.2"/><path d="M8.2 11v3.2"/><path d="M6.6 12.6h3.2"/><circle cx="15.6" cy="11.8" r=".7" fill="currentColor" stroke="none"/><circle cx="17.8" cy="13.8" r=".7" fill="currentColor" stroke="none"/>\u003c/svg\u003e',
    "🌟": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<path d="M12 3.5l1.7 4.2 4.3.4-3.2 2.8.9 4.2L12 12.8l-3.7 2.3.9-4.2L6 8.1l4.3-.4L12 3.5z"/>\u003c/svg\u003e',
    "✨": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<path d="M12 3.5l1.7 4.2 4.3.4-3.2 2.8.9 4.2L12 12.8l-3.7 2.3.9-4.2L6 8.1l4.3-.4L12 3.5z"/>\u003c/svg\u003e',
    "🌧": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<path d="M12 3.5c-3.6 0-6 2.5-6 5.4h12c0-2.9-2.4-5.4-6-5.4z"/><path d="M12 8.9V15"/><path d="M12 15c0 1.4-1 1.9-1 3.2"/>\u003c/svg\u003e',
    "🌧️": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<path d="M12 3.5c-3.6 0-6 2.5-6 5.4h12c0-2.9-2.4-5.4-6-5.4z"/><path d="M12 8.9V15"/><path d="M12 15c0 1.4-1 1.9-1 3.2"/>\u003c/svg\u003e',
    "☔": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<path d="M12 3.5c-3.6 0-6 2.5-6 5.4h12c0-2.9-2.4-5.4-6-5.4z"/><path d="M12 8.9V15"/><path d="M12 15c0 1.4-1 1.9-1 3.2"/>\u003c/svg\u003e',
    "🔍": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<circle cx="11.2" cy="11.2" r="5.4"/><path d="M15.4 15.4L19.6 19.6"/>\u003c/svg\u003e',
    "😣": '\u003csvg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"\u003e<rect x="9" y="3.5" width="6" height="12" rx="3"/><path d="M12 15.5v2.2a2.2 2.2 0 0 0 4.4 0"/><path d="M10.8 9.5h2.4"/>\u003c/svg\u003e',
  };

  function iconForEmoji(emoji) {
    return EMOJI_ICONS[String(emoji || "").trim()] || "";
  }

  // ---------- 手机桌面 ----------
  var PHONE_APPS = [
    { id: "msg", label: "消息", icon: "chat" },
    { id: "moments", label: "朋友圈", icon: "compass" },
    { id: "album", label: "相册", icon: "album" },
    { id: "date", label: "约会", icon: "heart" },
    { id: "gift", label: "礼物", icon: "gift" },
    { id: "call", label: "通话", icon: "call" },
    { id: "card", label: "角色卡", icon: "card" },
    { id: "signin", label: "签到", icon: "calendar" },
    { id: "tasks", label: "任务", icon: "task" },
    { id: "earn", label: "赚钱", icon: "coin" }
  ];
  var PHONE_DOCK = [
    { id: "msg", label: "消息", icon: "chat" },
    { id: "album", label: "相册", icon: "album" },
    { id: "settings", label: "设置", icon: "gear" }
  ];

  function phoneAppAction(id) {
    if (id === "msg") {
      showScreen("home");
      renderHome();
      return;
    }
    if (id === "moments") { openMomentsModal(); return; }
    if (id === "album") { openPanel(); switchTab("album"); return; }
    if (id === "card") { openPanel(); switchTab("card"); return; }
    if (id === "settings") { openPanel(); switchTab("set"); return; }
    if (id === "date") { openScenarioList(); return; }
    if (id === "gift") { openGiftModal(); return; }
    if (id === "call") { openCall(); return; }
    if (id === "signin") { openSigninModal(); return; }
    if (id === "tasks") { openTasksModal(); return; }
    if (id === "earn") { openEarnModal(); return; }
  }

  function buildPhoneApp(app) {
    var b = el("button", "phone-app");
    var box = el("div", "app-icon app-" + app.id);
    var svgHost = el("span", "app-icon-svg");
    svgHost.innerHTML = ICONS[app.icon] || ICONS.chat;
    box.appendChild(svgHost);
    b.appendChild(box);
    b.appendChild(el("span", "app-label", app.label));
    b.addEventListener("click", function () { phoneAppAction(app.id); });
    return b;
  }

  // ---------- PWA / 添加到主屏幕引导 ----------
  var deferredInstall = null;

  function setupPWABanner() {
    var banner = $("pwa-banner");
    if (!banner) return;
    var dismissed = false;
    try { dismissed = !!localStorage.getItem("xin_dong_qy_pwa_off"); } catch (e) {}
    if (dismissed) return;

    var standalone = false;
    try {
      standalone = window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;
    } catch (e) {}
    if (standalone) return;

    var ua = navigator.userAgent || "";
    var isIOS = /iPhone|iPad|iPod/i.test(ua);
    var isAndroid = /Android/i.test(ua);
    var isWeChat = /MicroMessenger/i.test(ua);

    if (isWeChat) {
      if ($("pwa-text")) $("pwa-text").textContent = "右上角「…」→ 在浏览器打开，即可安装到主屏幕";
    } else if (isIOS) {
      if ($("pwa-text")) $("pwa-text").textContent = "点底部 ⤴ 分享 → 「添加到主屏幕」，像 App 一样玩";
    } else if (!isAndroid) {
      return; // 桌面浏览器不提示
    }

    setTimeout(function () { banner.classList.remove("hidden"); }, 2500);

    if ($("btn-pwa-close")) $("btn-pwa-close").addEventListener("click", function () {
      banner.classList.add("hidden");
      try { localStorage.setItem("xin_dong_qy_pwa_off", "1"); } catch (e) {}
    });

    if ($("btn-pwa-install")) {
      $("btn-pwa-install").addEventListener("click", function () {
        if (!deferredInstall) return;
        deferredInstall.prompt();
        deferredInstall.userChoice.then(function () {
          deferredInstall = null;
          banner.classList.add("hidden");
        });
      });
    }
  }

  function renderPhone() {
    var apps = $("phone-apps");
    if (apps) {
      apps.innerHTML = "";
      PHONE_APPS.forEach(function (a) { apps.appendChild(buildPhoneApp(a)); });
    }
    var dock = $("phone-dock");
    if (dock) {
      dock.innerHTML = "";
      PHONE_DOCK.forEach(function (a) { dock.appendChild(buildPhoneApp(a)); });
    }
    updatePhoneClock();
    renderWallet();
  }

  function updatePhoneClock() {
    var node = $("phone-clock");
    if (!node) return;
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    node.textContent = p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function openPhone() {
    renderPhone();
    showScreen("phone");
  }

  // ---------- 他的日程 / 状态 ----------
  var STATUS_TABLE = [
    { from: 0, to: 6, label: "在睡觉", emoji: "💤", busy: true },
    { from: 6, to: 8, label: "刚起床", emoji: "🌅", busy: false },
    { from: 8, to: 10, label: "在通勤路上", emoji: "🚇", busy: true },
    { from: 10, to: 12, label: "在开会", emoji: "💼", busy: true },
    { from: 12, to: 13, label: "在吃午饭", emoji: "🍜", busy: false },
    { from: 13, to: 18, label: "在忙工作", emoji: "💻", busy: true },
    { from: 18, to: 19, label: "刚下班", emoji: "🌆", busy: false },
    { from: 19, to: 21, label: "在放松", emoji: "🎧", busy: false },
    { from: 21, to: 23, label: "在等你的消息", emoji: "🌙", busy: false },
    { from: 23, to: 24, label: "准备睡了", emoji: "🛏️", busy: false }
  ];
  var DAY_VARIANTS = ["normal", "overtime", "trip", "rest"];

  // 每天一个"今日基调"（加班/出差/休假/正常）
  function ensureDailyVariant(st) {
    var today = GameState.todayStr();
    if (st.statusDay === today && st.statusKey) return st.statusKey;
    st.statusDay = today;
    st.statusKey = DAY_VARIANTS[Math.floor(Math.random() * DAY_VARIANTS.length)];
    GameState.save(st);
    return st.statusKey;
  }

  function getStatus(st) {
    if (!st) return { label: "在线", emoji: "💬", busy: false };
    var variant = ensureDailyVariant(st);
    var h = new Date().getHours();
    var row = STATUS_TABLE[0];
    for (var i = 0; i < STATUS_TABLE.length; i++) {
      if (h >= STATUS_TABLE[i].from && h < STATUS_TABLE[i].to) { row = STATUS_TABLE[i]; break; }
    }
    var label = row.label, emoji = row.emoji, busy = row.busy;
    if (variant === "overtime" && h >= 18 && h < 24) { label = "还在加班"; emoji = "💼"; busy = true; }
    else if (variant === "trip" && h >= 8 && h < 20) { label = "在外地出差"; emoji = "✈️"; busy = true; }
    else if (variant === "rest" && h >= 8 && h < 23) { label = "在家休息"; emoji = "🛋️"; busy = false; }
    return { label: label, emoji: emoji, busy: busy, variant: variant };
  }

  function refreshStatusLine() {
    var st = S();
    if (!st) return;
    var s2 = getStatus(st);
    st.bf.statusLabel = s2.emoji + " " + s2.label;
    if ($("chat-status")) {
      $("chat-status").textContent = s2.busy ? (s2.emoji + " " + s2.label + " · 等一下回你") : (s2.emoji + " " + s2.label + " · 想你中 💗");
    }
    if ($("profile-mood") && !$("profile-mood").dataset.locked) {
      $("profile-mood").textContent = s2.emoji + " " + s2.label + " · " + ChatEngine.moodLabel(st.bf) + " · " + GameState.stageName(st.bf.affection) + "阶段";
    }
  }

  // ---------- 长期记忆：从你说的话里提取 ----------------
  var MEMORY_PATTERNS = [
    { re: /我(?:最|超|特别)?喜欢(?:吃|喝|看|听|玩)?([^，。,.！!？?\s]{1,8})/, tpl: "TA 喜欢「$1」" },
    { re: /我(?:最)?(?:讨厌|不喜欢)([^，。,.！!？?\s]{1,8})/, tpl: "TA 不喜欢「$1」" },
    { re: /我(?:有点)?怕([^，。,.！!？?\s]{1,8})/, tpl: "TA 怕「$1」" },
    { re: /我(?:叫|的名字是)([^，。,.！!？?\s]{1,6})/, tpl: "TA 的名字是「$1」" },
    { re: /我(?:的)?生日(?:是)?([^，。,.！!？?\s]{1,10})/, tpl: "TA 的生日是 $1" },
    { re: /我(?:住在|家在)([^，。,.！!？?\s]{1,8})/, tpl: "TA 住在「$1」" }
  ];

  function learnFromMessage(text) {
    var st = S();
    if (!st) return null;
    var t = String(text || "").replace(/\s+/g, "");
    for (var i = 0; i < MEMORY_PATTERNS.length; i++) {
      var m = t.match(MEMORY_PATTERNS[i].re);
      if (!m) continue;
      var fact = MEMORY_PATTERNS[i].tpl.replace("$1", m[1]);
      st.memories = st.memories || [];
      var dup = false;
      for (var k = 0; k < st.memories.length; k++) {
        if (st.memories[k].text === fact) { dup = true; break; }
      }
      if (dup) return null;
      st.memories.push({ text: fact, at: nowHM() });
      if (st.memories.length > 30) st.memories.shift();
      GameState.save(st);
      return fact;
    }
    return null;
  }

  function renderMemories() {
    var st = S();
    var box = $("profile-memory");
    if (!box || !st) return;
    box.innerHTML = "";
    var list = (st.memories || []).slice(-6).reverse();
    if (!list.length) {
      box.appendChild(el("div", "pa-log-empty", "他还在了解你……试试告诉他你喜欢什么"));
      return;
    }
    list.forEach(function (m) {
      var row = el("div", "pa-log-row");
      row.appendChild(el("span", "pa-log-label", m.text));
      row.appendChild(el("span", "pa-log-time", m.at || ""));
      box.appendChild(row);
    });
  }

  // ---------- 节日 / 纪念日 ----------
  var FESTIVALS = {
    "1-1": { title: "新年快乐", emoji: "🎊", text: "跨年的钟声敲响时，他想的第一个人是你。他发来一句：新年也要在一起。", gift: 3 },
    "2-14": { title: "情人节", emoji: "💐", text: "花早就准备好了，只等你说一句有空。他把花递过来，耳朵有点红。", gift: 5 },
    "5-20": { title: "520", emoji: "💗", text: "这一天他只想说一句话。他盯着屏幕打了很久，最后发出来：我爱你。", gift: 5 },
    "8-25": { title: "七夕", emoji: "🌉", text: "他带你去河边放灯，说想和你过很多很多个七夕。", gift: 6 },
    "10-1": { title: "长假第一天", emoji: "🎈", text: "他推掉了所有安排，只留下陪你的时间：这几天，我只想见你。", gift: 30 },
    "12-24": { title: "平安夜", emoji: "🎄", text: "他戴着你送的围巾，在雪里等你下班，手里藏着一颗苹果。", gift: 4 },
    "12-25": { title: "圣诞节", emoji: "🎁", text: "礼物藏在袖子里，他笑着让你猜——猜错三次才肯给你。", gift: 50 },
    "12-31": { title: "跨年夜", emoji: "🎆", text: "他说新年第一句祝福，只想说给你听。", gift: 40 }
  };

  function getFestival(st) {
    var now = new Date();
    var md = (now.getMonth() + 1) + "-" + now.getDate();
    if (FESTIVALS[md]) return FESTIVALS[md];
    var elapsed = daysSince(st.createdAt) - 1;
    if (elapsed > 0 && elapsed % 30 === 0) {
      return { title: "相识 " + elapsed + " 天", emoji: "💞", text: "他记得今天是你们认识 " + elapsed + " 天的日子，特意发来一句：还好那天我没错过你。", gift: 40 };
    }
    return null;
  }

  function checkFestival() {
    var st = S();
    if (!st || !st.bf) return;
    var fest = getFestival(st);
    if (!fest) return;
    var key = GameState.todayStr() + "|" + fest.title;
    st.festivalDone = st.festivalDone || {};
    if (st.festivalDone[key]) return;
    st.festivalDone[key] = true;
    addCoins(fest.gift);
    GameState.addAlbum(st, fest.emoji, fest.title, fest.text + "（收到 " + fest.gift + " 心印币红包）");
    GameState.save(st);
    if ($("fest-emoji")) $("fest-emoji").textContent = fest.emoji;
    if ($("fest-title")) $("fest-title").textContent = fest.title;
    if ($("fest-text")) $("fest-text").textContent = fest.text;
    if ($("fest-reward")) $("fest-reward").textContent = "🧧 红包 " + fest.gift + " 心印币";
    if ($("festival-modal")) $("festival-modal").classList.remove("hidden");
    playDing();
  }

  // ---------- 争风吃醋（有别的男人找你） ----------
  function jealousAboutNpc(st) {
    var list = st.npcContacts || [];
    if (!list.length) return null;
    var npc = list[Math.floor(Math.random() * list.length)];
    var lines = [
      "你和「" + npc.name + "」聊得挺开心？",
      "最近是不是总有人找你聊天。",
      "「" + npc.name + "」是谁。",
      "我不是在查你。……只是想知道。",
      "你回我的时候，是不是也在回别人。"
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }

  // ---------- 冷战 ----------
  var COLD_LINES = [
    "嗯。",
    "在忙。",
    "……",
    "有事吗。",
    "我先不聊了。",
    "知道了。"
  ];
  var WARM_WORDS = /对不起|抱歉|我错了|别生气|喜欢你|爱你|想你|抱抱|别不理我|哄哄/;

  function isCold(st) {
    return !!(st && st.coldUntil && Date.now() < st.coldUntil);
  }

  function startColdWar(st) {
    st.coldUntil = Date.now() + (60 + Math.random() * 120) * 60 * 1000; // 1~3 小时
    st.coldMsgCount = 0;
    GameState.save(st);
  }

  function tryWarmUp(st, text) {
    if (!isCold(st)) return null;
    if (!WARM_WORDS.test(String(text || ""))) return null;
    st.coldMsgCount = (st.coldMsgCount || 0) + 1;
    GameState.save(st);
    if (st.coldMsgCount >= 2) {
      st.coldUntil = 0;
      st.coldMsgCount = 0;
      GameState.save(st);
      return "……过来。让我抱一下，刚才是我不好。";
    }
    return null;
  }

  function renderHome() {
    var st = S && S();
    if (!st || !st.bf) return;
    var bf = st.bf;
    renderHomeChatList(st, bf);
    var moodLine = $("home-mood");
    if (moodLine) moodLine.textContent = ChatEngine.moodLabel(bf);
    var hearts = $("home-hearts");
    if (hearts) {
      var n = Math.max(1, Math.min(5, Math.floor(bf.affection / 20) + 1));
      hearts.innerHTML = "";
      for (var i = 0; i < 5; i++) {
        hearts.appendChild(el("span", "home-heart" + (i < n ? " filled" : ""), i < n ? "🩷" : "🤍"));
      }
    }
    if ($("home-aff-fill")) $("home-aff-fill").style.width = bf.affection + "%";
    if ($("home-aff-num")) $("home-aff-num").textContent = bf.affection;
    if ($("home-stage")) $("home-stage").textContent = GameState.stageName(bf.affection);
    renderHUD();
    updateDockBadges();
    refreshStatusLine();
    checkFestival();
  }

  function homeSpeech(text) {
    var box = $("home-speech");
    if (!box) return;
    box.textContent = text;
    box.classList.remove("hidden");
    if (homeSpeechTimer) clearTimeout(homeSpeechTimer);
    homeSpeechTimer = setTimeout(function () { box.classList.add("hidden"); }, 5000);
  }

  // 摸摸头互动
  function petInteraction() {
    var st = S();
    if (!st || !st.bf) return;
    var line = ChatEngine.petLine(st.bf);
    homeSpeech(line);
    var r = GameState.addAffection(st, 2);
    updateAffectionUI(r);
    playDing();
    vibrate(25);
    bumpTask("pet");
    checkAch();
    GameState.save(st);
    // 互动特效：头像弹跳 + 冒出爱心
    var avatarNode = $("home-chat-avatar");
    var profileAv = $("profile-avatar");
    [avatarNode, profileAv].forEach(function (node) {
      if (!node) return;
      node.classList.remove("react");
      void node.offsetWidth;
      node.classList.add("react");
    });
    if (avatarNode && avatarNode.parentNode) {
      var area = avatarNode.parentNode;
      for (var i = 0; i < 3; i++) {
        (function (n) {
          setTimeout(function () {
            var h = document.createElement("span");
            h.className = "heart-fx";
            h.textContent = "💗";
            h.style.left = (32 + Math.random() * 36) + "%";
            h.style.bottom = (34 + Math.random() * 18) + "%";
            area.appendChild(h);
            setTimeout(function () { if (h.parentNode) h.parentNode.removeChild(h); }, 1300);
          }, n * 90);
        })(i);
      }
    }
  }

  // ---------- 心印币 / HUD ----------
  function ensureDaily() {
    var st = S();
    if (!st) return;
    var today = GameState.todayStr();
    if (!st.daily || st.daily.date !== today) {
      st.daily = { date: today, chat: 0, pet: 0, gift: 0, like: 0, claimed: {} };
    }
    if (st.signin && st.signin.lastDate !== today && st.signin.streak >= 7) {
      st.signin.streak = 0; // 新一轮签到
    }
    if (!st.signin) st.signin = { lastDate: "", streak: 0, total: 0 };
    if (typeof st.coins !== "number") st.coins = 3;
    if (!st.coinsMigrated) {
      if ((st.coins || 0) > 3) {
        st.cash = (st.cash || 0) + (st.coins - 3) * 100;
        st.coins = 3;
      }
      st.coinsMigrated = true;
    }

    // 仅在已有正式存档时才落盘，避免首次启动就产生"存档"（会误触发覆盖确认）
    if (GameState.hasSave()) GameState.save(st);
  }

  function daysSince(createdAt) {
    try {
      var t = Date.parse(String(createdAt || "").replace(" ", "T"));
      if (!t || isNaN(t)) return 1;
      return Math.max(1, Math.floor((Date.now() - t) / 86400000) + 1);
    } catch (e) { return 1; }
  }

  function timeEmoji() {
    var h = new Date().getHours();
    if (h < 6) return "🌙";
    if (h < 11) return "🌅";
    if (h < 14) return "☀️";
    if (h < 18) return "🌤️";
    if (h < 22) return "🌆";
    return "🌙";
  }

  function addCoins(n) {
    var st = S();
    if (!st) return;
    st.coins = Math.max(0, (st.coins || 0) + n);
    GameState.save(st);
    renderHUD();
    if (n > 0) {
      var pill = $("hud-coins");
      if (pill) {
        pill.classList.remove("hud-flash");
        void pill.offsetWidth;
        pill.classList.add("hud-flash");
      }
    }
  }

  function renderHUD() {
    var st = S();
    if (!st) return;
    if ($("hud-coin-num")) $("hud-coin-num").textContent = st.coins || 0;
    if ($("hud-day-num")) $("hud-day-num").textContent = "第" + daysSince(st.createdAt) + "天";
    var signinBtn = $("btn-signin");
    if (signinBtn) {
      var ready = st.signin && st.signin.lastDate !== GameState.todayStr();
      signinBtn.classList.toggle("hud-ready", !!ready);
    }
  }

  // ---------- 图标红点 / 新动态提示 ----------
  function setBadge(btnId, value) {
    var btn = $(btnId);
    if (!btn) return;
    btn.style.position = "relative";
    var b = btn.querySelector(".dock-badge");
    if (!value) {
      if (b) b.remove();
      return;
    }
    if (!b) {
      b = document.createElement("span");
      b.className = "dock-badge";
      btn.appendChild(b);
    }
    b.textContent = value === "dot" ? "" : value;
    b.classList.toggle("dot", value === "dot");
  }

  function updateDockBadges() {
    var st = S();
    if (!st) return;
    var today = GameState.todayStr();
    // 签到：今日可签到
    setBadge("btn-signin", st.signin && st.signin.lastDate !== today ? "dot" : null);
    // 任务：有可领取的奖励
    var claimable = TASKS.some(function (t) {
      var prog = Math.min(st.daily[t.id] || 0, t.target);
      var claimed = !!(st.daily.claimed && st.daily.claimed[t.id]);
      return prog >= t.target && !claimed;
    });
    setBadge("btn-tasks", claimable ? "dot" : null);
    // 朋友圈：今天还没看过
    setBadge("btn-moments", st.momentsReadAt !== today ? "dot" : null);
    // 约会：有解锁且未完成的剧情
    var avail = (window.GAME_SCENARIOS || []).filter(function (sc) {
      return st.bf.affection >= sc.minAffection && !st.scenarioDone[sc.id];
    }).length;
    setBadge("btn-date", avail > 0 ? String(Math.min(avail, 9)) : null);
    // 回忆：有新回忆
    setBadge("btn-album", (st.album.length > (st.albumSeenCount || 0)) ? "dot" : null);
    // 聊天：未读主动消息
    setBadge("btn-chat", (st.unreadMsgs > 0) ? String(Math.min(st.unreadMsgs, 9)) : null);
  }

  // ---------- 每日任务 ----------
  var TASKS = [
    { id: "chat", name: "聊聊天", desc: "发送 3 条消息", target: 3, reward: 2 },
    { id: "pet", name: "摸摸头", desc: "互动 2 次", target: 2, reward: 1 },
    { id: "gift", name: "送个小礼物", desc: "送 1 份礼物", target: 1, reward: 2 },
    { id: "like", name: "关心 TA 的动态", desc: "朋友圈点赞 1 次", target: 1, reward: 1 }
  ];

  function bumpTask(id) {
    var st = S();
    if (!st) return;
    ensureDaily();
    st.daily[id] = (st.daily[id] || 0) + 1;
    GameState.save(st);
    if ($("tasks-modal") && !$("tasks-modal").classList.contains("hidden")) renderTaskList();
  }

  function openTasksModal() {
    ensureDaily();
    renderTaskList();
    $("tasks-modal").classList.remove("hidden");
  }

  function renderTaskList() {
    var st = S();
    var box = $("task-list");
    box.innerHTML = "";
    TASKS.forEach(function (t) {
      var prog = Math.min(st.daily[t.id] || 0, t.target);
      var done = prog >= t.target;
      var claimed = !!(st.daily.claimed && st.daily.claimed[t.id]);
      var item = el("div", "task-item" + (claimed ? " done" : ""));
      var info = el("div", "task-info");
      info.appendChild(el("div", "task-name", t.name + " " + (done ? "✓" : "")));
      info.appendChild(el("div", "task-desc", t.desc + "（" + prog + "/" + t.target + "）"));
      item.appendChild(info);
      var btn = el("button", "task-claim", claimed ? "已领取" : done ? "领取 +" + t.reward : "进行中");
      btn.disabled = claimed || !done;
      btn.addEventListener("click", function () {
        if (claimed || !done) return;
        st.daily.claimed[t.id] = true;
        st.tasksClaimedTotal = (st.tasksClaimedTotal || 0) + 1;
        addCoins(t.reward);
        GameState.save(st);
        toast("✅ 任务完成：心印币 +" + t.reward);
        renderTaskList();
        updateDockBadges();
        checkAch();
      });
      item.appendChild(btn);
      box.appendChild(item);
    });
  }

  // ---------- 签到 ----------
  var SIGNIN_REWARDS = [2, 3, 3, 4, 4, 5, 6];

  function openSigninModal() {
    ensureDaily();
    renderSigninWeek();
    $("signin-modal").classList.remove("hidden");
  }

  function renderSigninWeek() {
    var st = S();
    var box = $("signin-week");
    box.innerHTML = "";
    var streak = (st.signin && st.signin.streak) || 0;
    var today = GameState.todayStr();
    var already = st.signin && st.signin.lastDate === today;
    for (var i = 0; i < 7; i++) {
      var d = el("div", "signin-day");
      d.appendChild(el("div", "signin-day-num", "第" + (i + 1) + "天"));
      d.appendChild(el("div", "signin-day-reward", "+" + SIGNIN_REWARDS[i]));
      if (i < streak) d.classList.add("done");
      else if (i === streak && !already) d.classList.add("today");
      box.appendChild(d);
    }
    var tip = $("signin-tip");
    var go = $("btn-signin-go");
    if (already) {
      tip.textContent = "今天已经签到过了，明天再来吧 ✨";
      go.textContent = "今天已签到";
      go.disabled = true;
    } else {
      tip.textContent = "连续签到心印币奖励更多，断签会重置哦";
      go.textContent = "签到领取";
      go.disabled = false;
    }
  }

  function doSignIn() {
    var st = S();
    var today = GameState.todayStr();
    if (st.signin.lastDate === today) { toast("今天已经签到啦"); return; }
    function p(n) { return (n < 10 ? "0" : "") + n; }
    var y = new Date(Date.now() - 86400000);
    var yStr = y.getFullYear() + "-" + p(y.getMonth() + 1) + "-" + p(y.getDate());
    st.signin.streak = (st.signin.lastDate === yStr && st.signin.streak < 7) ? st.signin.streak + 1 : 1;
    st.signin.lastDate = today;
    st.signin.total = (st.signin.total || 0) + 1;
    var reward = SIGNIN_REWARDS[Math.min(st.signin.streak - 1, 6)];
    st.coins = (st.coins || 0) + reward;
    GameState.save(st);
    renderHUD();
    renderSigninWeek();
    toast("📅 签到成功！心印币 +" + reward + "（已连续 " + st.signin.streak + " 天）");
    updateDockBadges();
    checkAch();
  }

  // ---------- 朋友圈 ----------
  function momentPool() {
    var st = S();
    var key = st.bf.resp || st.bf.roleId || "custom";
    var data = window.GAME_MOMENTS || {};
    return data[key] || data.generic || [];
  }

  function renderAvatarIntoSmall(node, bf) {
    if (bf.portrait) {
      node.innerHTML = portraitImg(bf.portrait, false);
      return;
    }
    if (bf.avatar && window.AvatarEngine) {
      node.innerHTML = window.AvatarEngine.avatarSVG(bf.avatar, bf.gradient);
    } else {
      node.textContent = bf.emoji || "🩵";
    }
  }

  function openMomentsModal() {
    ensureDaily();
    var st = S();
    var pool = momentPool();
    var feed = $("moments-feed");
    feed.innerHTML = "";
    if (!pool.length) {
      feed.appendChild(el("div", "empty-tip", "TA 还没有发动态，过会儿再来刷吧"));
      $("moments-modal").classList.remove("hidden");
      return;
    }
    var count = Math.min(5, pool.length);
    for (var i = 0; i < count; i++) {
      feed.appendChild(renderMomentCard(pool[(st.momentsSeen + i) % pool.length]));
    }
    st.momentsSeen = (st.momentsSeen + count) % pool.length;
    st.momentsReadAt = GameState.todayStr();
    GameState.save(st);
    updateDockBadges();
    $("moments-modal").classList.remove("hidden");
  }

  function renderMomentCard(post) {
    var st = S();
    var card = el("div", "moment-card");
    var head = el("div", "moment-head");
    var av = el("div", "avatar moment-avatar");
    renderAvatarIntoSmall(av, st.bf);
    head.appendChild(av);
    var meta = el("div", "moment-meta");
    meta.appendChild(el("div", "moment-name", st.bf.name || "TA"));
    meta.appendChild(el("div", "moment-time", "刚刚 · 仅你可见"));
    head.appendChild(meta);
    card.appendChild(head);
    card.appendChild(el("div", "moment-text", ChatEngine.fillTokens(post.text, st.bf)));
    var actions = el("div", "moment-actions");
    var likeBtn = el("button", "moment-btn", "🩷 点赞");
    likeBtn.addEventListener("click", function () {
      if (likeBtn.disabled) return;
      likeBtn.disabled = true;
      likeBtn.textContent = "🩷 已赞";
      likeBtn.classList.add("liked");
      st.likesTotal = (st.likesTotal || 0) + 1;
      bumpTask("like");
      var r = GameState.addAffection(st, 1);
      updateAffectionUI(r);
      toast("🩷 点赞成功，好感 +1");
      checkAch();
      GameState.save(st);
    });
    actions.appendChild(likeBtn);
    card.appendChild(actions);
    var commentsBox = el("div", "moment-comments");
    (post.comments || []).forEach(function (opt) {
      var b = el("button", "moment-choice", opt.label);
      b.addEventListener("click", function () {
        commentsBox.innerHTML = "";
        var reply = el("div", "moment-reply", ChatEngine.fillTokens(opt.reply, st.bf));
        card.appendChild(reply);
        var r = GameState.addAffection(st, 2);
        updateAffectionUI(r);
        toast("💬 评论成功，好感 +2");
        checkAch();
        GameState.save(st);
      });
      commentsBox.appendChild(b);
    });
    card.appendChild(commentsBox);
    return card;
  }

  // 换装弹窗（更换立绘）
  var dressCfg = null;
  var dressPortrait = null;
  function openDressModal() {
    var st = S();
    if (!st || !st.bf) return;
    dressCfg = Object.assign({}, st.bf.avatar || (window.AVATAR_PRESETS || {}).custom || {});
    dressPortrait = st.bf.portrait || defaultPortraitFor(st.bf, st.bf.gender || "male");
    buildPortraitPicker($("home-avatar-builder"), dressPortrait, st.bf.gender || "male", function (p) { dressPortrait = p; }, null);
    $("dress-modal").classList.remove("hidden");
  }

  function saveDress() {
    var st = S();
    if (!st || !st.bf || !dressCfg) return;
    st.bf.avatar = Object.assign({}, dressCfg);
    if (dressPortrait) st.bf.portrait = dressPortrait;
    GameState.save(st);
    renderHome();
    $("dress-modal").classList.add("hidden");
    toast("👗 新的立绘已保存");
    homeSpeech("……这身，是特意为我准备的吗？");
  }

  // 从主界面进入聊天
  function openChatFromHome() {
    var st = S();
    showScreen("chat");
    setChatHeader();
    enterChat(!st || st.history.length === 0);
  }

  // 性别切换（纯自定义流程：只有性别选择）
  function setGender(g) {
    createGender = g;
    $("btn-gender-male").classList.toggle("selected", g === "male");
    $("btn-gender-female").classList.toggle("selected", g === "female");
    $("create-gender-hint").textContent = g === "male"
      ? "选择 TA 的性别，然后从零开始定制"
      : "选择 TA 的性别，然后从零开始定制（女性角色推荐开启 AI 聊天）";
  }

  function resetCreateFlow() {
    $("create-step1").classList.remove("hidden");
    $("create-step2").classList.add("hidden");
    $("create-step").textContent = "1/2";
    setGender("male");
    showScreen("create");
  }

  // ---------- 聊天 ----------
  var QUICK_CHIPS = ["在干嘛", "想你了", "晚安", "早安", "好无聊", "夸夸你", "讲个故事", "约会吧", "我饿了"];
  var typingOn = false;
  var aiHintShown = false;
  var nextProactiveAt = 0;

  function enterChat(isNew) {
    setChatHeader();
    renderQuickChips();
    var st = S();
    // 进入聊天即清空未读红点
    if (st.unreadMsgs) {
      st.unreadMsgs = 0;
      GameState.save(st);
      updateDockBadges();
    }
    var list = $("msg-list");
    list.innerHTML = "";
    // 历史为空（新档）→ 生成开场白并入历史
    if (!st.history.length && isNew) {
      var first = getOpeningLine(st.bf);
      GameState.addHistory(st, "him", first);
      GameState.save(st);
    }
    if (!st.contractShown) {
      addSys("你与 " + st.bf.name + " 签订了心动契约 💘");
      st.contractShown = true;
      GameState.save(st);
    }
    // 统一从历史渲染（保证主动消息/离线消息顺序一致）
    st.history.forEach(function (m) {
      addMsg(m.who === "me" ? "me" : "him", m.text, m.type);
    });
    updateAffectionUI({});
    scheduleProactive(true);
  }

  function getOpeningLine(bf) {
    if (bf.openingLine) return ChatEngine.fillTokens(bf.openingLine, bf);
    if (bf.roleId !== "custom" && bf.greeting) {
      var hour = new Date().getHours();
      var key = hour < 6 ? "night" : hour < 11 ? "morning" : hour < 14 ? "afternoon" : hour < 18 ? "afternoon" : hour < 23 ? "evening" : "night";
      var g = bf.greeting[key];
      if (g) return ChatEngine.fillTokens(g, bf);
    }
    // 尝试从角色原型里找开场白
    var role = findRole(bf.roleId);
    if (role && role.openingLine) return ChatEngine.fillTokens(role.openingLine, bf);
    var pn = (bf.playerName || "").trim();
    var hello = pn ? ("你好，" + pn + "。") : "你好。";
    return hello + "我是" + (bf.name || "我") + "。以后，请多指教。";
  }

  function findRole(roleId) {
    var roles = window.GAME_ROLES || [];
    for (var i = 0; i < roles.length; i++) if (roles[i].id === roleId) return roles[i];
    return null;
  }

  // 头像渲染：优先素材立绘，其次旧版矢量，最后 emoji 兜底
  function renderAvatarInto(node, bf, big) {
    if (bf.portrait) {
      node.innerHTML = portraitImg(bf.portrait, !!big);
      node.style.background = "";
      return;
    }
    var cfg = bf.avatar;
    if (cfg && window.AvatarEngine) {
      var expr = window.AvatarEngine.moodToExpression(bf.mood || "normal");
      var c = expr ? Object.assign({}, cfg, { expression: expr }) : cfg;
      node.innerHTML = window.AvatarEngine.avatarSVG(c, bf.gradient);
      node.style.background = "";
    } else {
      node.textContent = bf.emoji || "🩵";
      node.style.background = "linear-gradient(135deg," + bf.gradient[0] + "," + bf.gradient[1] + ")";
    }
  }

  function setChatHeader() {
    var bf = S().bf;
    renderAvatarInto($("chat-avatar"), bf);
    $("chat-name").textContent = bf.name || "他";
    refreshStatusLine();
    refreshChatQuota();
    updateAIbadge();
    updateAffectionUI({});
    $("chat-mood-line").textContent = "🩷 " + ChatEngine.moodLabel(bf) + " · " + GameState.stageName(bf.affection) + "阶段";
  }

  function updateAffectionUI(result) {
    var bf = S().bf;
    var aff = bf.affection;
    $("aff-num").textContent = aff;
    $("aff-fill").style.width = aff + "%";
    $("chat-mood-line").textContent = "🩷 " + ChatEngine.moodLabel(bf) + " · " + GameState.stageName(aff) + "阶段";
    renderAvatarInto($("chat-avatar"), bf);
    renderHome();
    if (result && result.leveled) {
      var f = $("aff-fill");
      f.classList.remove("stage-up");
      void f.offsetWidth;
      f.classList.add("stage-up");
      var st = S();
      GameState.addAlbum(st, result.stage.emoji, "好感度 " + aff, "你们的感情进入「" + result.stage.name + "」阶段");
      toast(result.stage.emoji + " 好感度升阶：进入「" + result.stage.name + "」阶段！");
      if (aff >= 90 && !st.scenarioDone["confess"]) {
        setTimeout(function () { autoPlayScenario("confess"); }, 1600);
      }
    }
  }

  function delayFor(text) {
    return Math.min(600 + String(text).length * 28, 2400);
  }

  function scrollBottom() {
    var list = $("msg-list");
    list.scrollTop = list.scrollHeight;
  }

  function nowHM() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return p(d.getHours()) + ":" + p(d.getMinutes());
  }

  // 表情包（真正的图片贴纸，assets/stickers/*.png）
  var STICKER_PACK = [
    { id: "angry", t: "哼" },
    { id: "wronged", t: "委屈" },
    { id: "shy", t: "害羞" },
    { id: "smug", t: "得意" },
    { id: "sleepy", t: "困了" },
    { id: "love", t: "喜欢你" },
    { id: "dontgo", t: "别走" },
    { id: "speechless", t: "无语" },
    { id: "surprised", t: "惊讶" },
    { id: "sigh", t: "叹气" },
    { id: "hug", t: "抱抱" }
  ];

  function stickerById(id) {
    for (var i = 0; i < STICKER_PACK.length; i++) {
      if (STICKER_PACK[i].id === id) return STICKER_PACK[i];
    }
    return null;
  }

  function randomSticker() {
    return STICKER_PACK[Math.floor(Math.random() * STICKER_PACK.length)];
  }

  function buildBubble(node, text, type) {
    var bubble;
    if (type === "sticker") {
      var sid = (typeof text === "object" && text) ? text.id : text;
      var pack = stickerById(sid);
      bubble = el("div", "bubble sticker-bubble");
      if (pack) {
        var img = document.createElement("img");
        img.className = "sticker-img";
        img.src = "assets/stickers/" + pack.id + ".png";
        img.alt = pack.t;
        img.draggable = false;
        bubble.appendChild(img);
      } else {
        // 兼容旧存档（纯 emoji 字符串）
        bubble.appendChild(el("span", "sticker-emoji", String(text).slice(0, 4) || "🙂"));
      }
    } else {
      bubble = el("div", "bubble", text);
    }
    node.appendChild(bubble);
    return bubble;
  }

  function addMsg(who, text, type) {
    text = (type === "sticker") ? text : filterText(text);
    var list = $("msg-list");
    var row = el("div", "msg msg-" + who + (type && type !== "text" ? " msg-type-" + type : ""));
    buildBubble(row, text, type);
    var time = el("div", "msg-time", nowHM());
    row.appendChild(time);
    list.appendChild(row);
    scrollBottom();
    return row;
  }

  function addSys(text) {
    text = String(text == null ? "" : text).replace(/^[^\w\u4e00-\u9fa5\d]+/, "");
    var list = $("msg-list");
    var n = el("div", "msg-sys", text);
    list.appendChild(n);
    scrollBottom();
  }

  function showTyping() {
    if (typingOn) return;
    typingOn = true;
    var list = $("msg-list");
    var t = el("div", "msg msg-him typing");
    var bubble = el("div", "bubble");
    for (var i = 0; i < 3; i++) bubble.appendChild(el("span", "dot"));
    t.appendChild(bubble);
    t.id = "typing-indicator";
    list.appendChild(t);
    scrollBottom();
  }

  function hideTyping() {
    typingOn = false;
    var t = $("typing-indicator");
    if (t) t.parentNode.removeChild(t);
  }

  function heSays(text, affectionDelta, opts) {
    hideTyping();
    var st = S();
    var line = ChatEngine.fillTokens(text, st.bf);
    st.bf.lastReply = line;
    opts = opts || {};
    var type = opts.type === "voice" ? "text" : (opts.type || "text");
    addMsg("him", line, type);
    st.lastMsgAt = nowHM();
    GameState.addHistory(st, "him", line, type);
    appendChatLog(st, "him", line, type);
    if (!opts.followup) {
      st.pendingSince = Date.now();
      st.followupLevel = 0;
    }
    if (affectionDelta) {
      var r = GameState.addAffection(st, affectionDelta);
      updateAffectionUI(r);
      checkAch();
    }
    renderAvatarInto($("chat-avatar"), st.bf);
    playDing();
    vibrate(30);
    GameState.save(st);
    // 偶尔追加一个表情包（贴图，不打断文字逻辑）
    if (!opts.noSticker && Math.random() < 0.2) {
      setTimeout(function () {
        var st2 = S();
        if (!st2) return;
        var sticker = randomSticker();
        addMsg("him", sticker, "sticker");
        GameState.addHistory(st2, "him", sticker.id, "sticker");
        st2.lastMsgAt = nowHM();
        GameState.save(st2);
      }, 800);
    }
  }

  // 回复队列：保证一条一条回复，避免连发时顺序错乱
  var replyChain = Promise.resolve();
  function queueReply(task) {
    replyChain = replyChain.then(function () {
      return Promise.resolve().then(task).catch(function () { /* 单条失败不影响队列 */ });
    });
    return replyChain;
  }

  // 脚本化回复流程（返回 Promise，回复完成后 resolve）
  function scriptedReply(playerText) {
    return new Promise(function (resolve) {
      var st = S();
      var intent = ChatEngine.detectIntent(playerText);
      var line = isCold(st)
      ? COLD_LINES[Math.floor(Math.random() * COLD_LINES.length)]
      : ChatEngine.pickLine(st.bf.resp || st.bf.roleId, intent, st.bf.affection, st.bf.lastReply);
      var delta = ChatEngine.deltaFor(intent) + ChatEngine.randInt(-1, 1);
      if (delta < 0) delta = 0;
      showTyping();
      var moodNote = ChatEngine.maybeRollMood(st.bf);
      setTimeout(function () {
        heSays(line, delta);
        if (moodNote) addSys(moodNote);
        if (intent === "date") maybeOpenScenarioPicker();
        resolve();
      }, delayFor(line));
    });
  }

  function aiCfg(st) {
    return {
      proxyUrl: (st.cloud && st.cloud.url) || "",
      token: (st.cloud && st.cloud.token) || "",
      temperature: typeof st.settings.temperature === "number" ? st.settings.temperature : 0.9
    };
  }

  // AI 可用 = 开关打开 + 已连接服务器
  function isAIOn(st) {
    return !!(st && st.settings && st.settings.ai === "on" && st.cloud && st.cloud.url && st.cloud.token);
  }

  // AI 回复流程（返回 Promise）
  function aiReply(playerText) {
    return new Promise(function (resolve) {
      var st = S();
      var intent = ChatEngine.detectIntent(playerText);
      var delta = ChatEngine.deltaFor(intent) + ChatEngine.randInt(-1, 1);
      if (delta < 0) delta = 0;
      showTyping();
      AIEngine.chat(st.bf, playerText, st.history.slice(0, -1), aiCfg(st)).then(function (text) {
        st.settings.aiLastError = "";
        heSays(text, delta);
        updateAIbadge();
        if (intent === "date") maybeOpenScenarioPicker();
        resolve();
      }).catch(function (err) {
        var msg = (err && err.message) ? err.message : "未知错误";
        st.settings.aiLastError = msg.slice(0, 120);
        addSys("⚠️ AI 请求失败：" + msg + "（本条已用离线台词回复）");
        updateAIbadge();
        GameState.save(st);
        // 复用同一条队列，离线台词也会按顺序补上
        return scriptedReply(playerText).then(resolve);
      });
    });
  }

  var CHAT_PER_COIN = 5; // 每 5 条消息消耗 1 心印币

  function spendChatCoin(st) {
    var used = st.chatCount || 0;
    if (used % CHAT_PER_COIN !== 0) return true;
    if ((st.coins || 0) <= 0) return false;
    st.coins = (st.coins || 0) - 1;
    return true;
  }

  function refreshChatQuota() {
    var st = S();
    if (!st || !$("chat-quota")) return;
    var left = (st.coins || 0) * CHAT_PER_COIN - (st.chatCount || 0) % CHAT_PER_COIN;
    $("chat-quota").textContent = "✦ " + (st.coins || 0) + " · 还可聊 " + left + " 条";
    $("chat-quota").classList.toggle("low", (st.coins || 0) <= 1);
  }

  function sendPlayer(text) {
    var st = S();
    var t = String(text || "").trim();
    if (!t) return;
    if (t.length > 200) t = t.slice(0, 200);
    if (!spendChatCoin(st)) {
      openRechargeModal();
      return;
    }
    st.chatCount = (st.chatCount || 0) + 1;
    $("msg-input").value = "";
    refreshChatQuota();
    renderWallet();
    addMsg("me", t);
    st.lastMsgAt = nowHM();
    st.pendingSince = 0;
    st.followupLevel = 0;
    learnFromMessage(t);
    var warmLine = tryWarmUp(st, t);
    if (warmLine) {
      setTimeout(function () { heSays(warmLine, 2, { noSticker: true }); }, 600);
    }
    GameState.addHistory(st, "me", t);
    appendChatLog(st, "me", t, "text");
    if (st.chatCount % HARVEST_EVERY === 0) harvestChatMemories(false);
    st.msgCount++;
    bumpTask("chat");
    var h = new Date().getHours();
    if (h >= 23 || h < 5) st.nightChat = true;
    if (isAIOn(st)) {
      queueReply(function () { return aiReply(t); });
    } else {
      if (st.settings.key && !aiHintShown) {
        aiHintShown = true;
        toast("💡 已填写 API Key，但「AI 聊天」未开启，当前使用离线台词。到设置里打开即可", 4200);
      }
      queueReply(function () { return scriptedReply(t); });
    }
    checkAch();
    GameState.save(st);
  }

  function renderQuickChips() {
    var box = $("quick-chips");
    box.innerHTML = "";
    QUICK_CHIPS.forEach(function (c) {
      var b = el("button", "chip-quick", c);
      b.addEventListener("click", function () { sendPlayer(c); });
      box.appendChild(b);
    });
  }

  // 主动消息
  var FREQ_INTERVALS = { low: [180, 420], normal: [75, 180], high: [35, 90] };
  function scheduleProactive(first) {
    var st = S();
    var freq = (st && st.settings && st.settings.proactiveFreq) || "normal";
    var range = FREQ_INTERVALS[freq] || FREQ_INTERVALS.normal;
    nextProactiveAt = Date.now() + (first ? ChatEngine.randInt(25, 50) : ChatEngine.randInt(range[0], range[1])) * 1000;
  }

  // 微信式新消息通知
  var notifyTimer = null;
  function notifyMessage(line) {
    var st = S();
    if (!st) return;
    var box = $("msg-notify");
    if (!box) return;
    var av = $("mn-avatar");
    av.innerHTML = portraitImg(st.bf.portrait, false) || "";
    if (!av.innerHTML) av.textContent = st.bf.emoji || "🩵";
    $("mn-name").textContent = st.bf.name || "他";
    $("mn-text").textContent = line;
    box.classList.remove("hidden");
    box.classList.add("notify-show");
    if (notifyTimer) clearTimeout(notifyTimer);
    notifyTimer = setTimeout(function () {
      box.classList.remove("notify-show");
      setTimeout(function () { box.classList.add("hidden"); }, 320);
    }, 8000);
  }

  // 投递一条主动消息（在聊天页直接显示；在首页则弹通知 + 红点）
  function deliverProactive(line) {
    var st = S();
    var chatVisible = !$("screen-chat").classList.contains("hidden");
    heSays(line, 1);
    if (!chatVisible) {
      st.unreadMsgs = (st.unreadMsgs || 0) + 1;
      GameState.save(st);
      updateDockBadges();
      notifyMessage(line);
    }
  }

  // ---------- 未读追问：他没等到回复时，会越来越在意 ----------
  var IGNORED_LINES = {
    1: [
      "在吗？",
      "刚才那条你看到了吗。",
      "忙完了回我一下。",
      "你是不是在忙？",
      "我先不打扰你，忙完记得回我。"
    ],
    2: [
      "怎么不回我。",
      "是不是不想跟我聊天？",
      "我知道你在线的，别装不在。",
      "是我说错什么了吗。",
      "你回一个字也行。"
    ],
    3: [
      "行，你不回我就不打扰了。",
      "反正你也不会在意。",
      "……我等你想说的时候。",
      "我先去忙了，你想找我再说。"
    ]
  };

  function ignoredLine(level) {
    var pool = IGNORED_LINES[level] || IGNORED_LINES[2];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  var AI_IGNORE_HINTS = {
    1: "（系统：TA 看了你的消息但还没回，你想确认一下 TA 在不在，语气别太急，1 句）",
    2: "（系统：TA 一直没回你，你有点不安和在意，想问问是不是不想理你。可以提到你知道 TA 在线。1-2 句）",
    3: "（系统：TA 还是不回，你有点失落、赌气，但别骂人，是克制的心疼。1-2 句）"
  };

  function checkIgnored() {
    var st = S();
    if (!st) return;
    if (st.settings.proactive !== "on") return;
    if (!st.pendingSince) return;
    var wait = Date.now() - st.pendingSince;
    var lvl = st.followupLevel || 0;
    var next = 0;
    if (lvl === 0 && wait > 100 * 1000) next = 1;
    else if (lvl === 1 && wait > 300 * 1000) next = 2;
    else if (lvl === 2 && wait > 720 * 1000) next = 3;
    if (!next) return;
    // 等到第 3 级还等不到，有概率直接冷战
    if (next === 3 && !isCold(st) && Math.random() < 0.45) {
      startColdWar(st);
      st.followupLevel = 3;
      GameState.save(st);
      heSays("算了，你先忙吧。", 0, { followup: true, noSticker: true, type: "text" });
      return;
    }
    st.followupLevel = next;
    GameState.save(st);
    var chatVisible = !$("screen-chat").classList.contains("hidden");
    if (isAIOn(st)) {
      queueReply(function () {
        return AIEngine.chat(st.bf, AI_IGNORE_HINTS[next], st.history.slice(-8), aiCfg(st)).then(function (text) {
          heSays(text, 0, { followup: true, noSticker: true, type: "text" });
          if (!chatVisible) notifyMessage(text);
          updateAIbadge();
        }).catch(function () {
          var line = ignoredLine(next);
          heSays(line, 0, { followup: true, noSticker: true, type: "text" });
          if (!chatVisible) notifyMessage(line);
        });
      });
    } else {
      var line2 = ignoredLine(next);
      heSays(line2, 0, { followup: true, noSticker: true, type: "text" });
      if (!chatVisible) notifyMessage(line2);
    }
  }

  function tickProactive() {
    var st = S();
    if (!st) return;
    var homeVisible = !$("screen-home").classList.contains("hidden");
    var chatVisible = !$("screen-chat").classList.contains("hidden");
    if (!homeVisible && !chatVisible) return;
    if (st.settings.proactive !== "on") return;
    if (typingOn) return;
    if (document.querySelector(".modal:not(.hidden)")) return;
    if (!$("panel").classList.contains("hidden")) return;
    // 偶遇事件：到点自动弹窗（只在首页、且没有其他弹窗时）
    tickEncounter(homeVisible);
    // 未读追问（他不等你回话这条线）
    if (st.pendingSince) { checkIgnored(); return; }
    if (Date.now() < nextProactiveAt) return;
    scheduleProactive(false);
    // AI 模式下主动消息也由 AI 生成，避免和 AI 回复风格割裂
    if (isAIOn(st)) {
      queueReply(function () {
        showTyping();
        return AIEngine.chat(st.bf,
          "（系统提示：现在你想主动找 TA 说句话。请先看一眼你们最后的对话，自然地接话或关心 TA 的近况；也可以提一句你的工作/收入上的进展作为由头。1-2 句，不要复读之前的台词）",
          st.history.slice(-8), aiCfg(st)).then(function (text) {
          st.settings.aiLastError = "";
          hideTyping();
          deliverProactive(text);
          updateAIbadge();
        }).catch(function () {
          hideTyping();
          deliverProactive(ChatEngine.proactiveMessage(st.bf));
        });
      });
      return;
    }
    var lastUserText = "";
    for (var hi = st.history.length - 1; hi >= 0; hi--) {
      if (st.history[hi].who === "me") { lastUserText = st.history[hi].text; break; }
    }
    var incomeEv = tickIncome(false);
    var jealous = (Math.random() < 0.35) ? jealousAboutNpc(st) : null;
    var line = jealous || ChatEngine.proactiveMessage(st.bf, { lastUserText: lastUserText, income: incomeEv });
    showTyping();
    var moodNote = ChatEngine.maybeRollMood(st.bf);
    setTimeout(function () {
      hideTyping();
      deliverProactive(line);
      if (moodNote && chatVisible) addSys(moodNote);
    }, delayFor(line));
  }

  // ---------- 礼物 ----------
  // ---------- 他的资产（恋与深空风） ----------
  var payByHim = false;
  var COIN_TO_YUAN = 100; // 1 心印币 ≈ ¥100

  function fmtMoney(n) {
    n = Math.round(n || 0);
    if (n >= 100000000) return (n / 100000000).toFixed(2) + " 亿";
    if (n >= 10000) return (n / 10000).toFixed(n >= 1000000 ? 0 : 1) + " 万";
    return String(n);
  }

  // 职业 → 入账类型
  var INCOME_KINDS = [
    { test: /总裁|董事|CEO|老板|集团/, kinds: [["股权分红", 500000, 3000000], ["集团项目分成", 300000, 1500000], ["股票收益", 50000, 500000]] },
    { test: /明星|偶像|演员|歌手|主播/, kinds: [["演出分成", 200000, 1200000], ["代言费", 300000, 2000000], ["直播打赏", 20000, 200000]] },
    { test: /医生|医师|教授|护士/, kinds: [["工资", 12000, 40000], ["夜班补贴", 800, 3000], ["出诊费", 1500, 6000]] },
    { test: /律师|金融|投行|基金|银行/, kinds: [["案件提成", 80000, 400000], ["项目佣金", 50000, 300000]] },
    { test: /设计师|建筑师|工程师|程序员|研究员|会计/, kinds: [["项目奖金", 8000, 60000], ["专利/稿费", 2000, 20000]] }
  ];
  var INCOME_DEFAULT = [["工资", 6000, 20000], ["理财收益", 300, 3000]];

  function incomeKindsFor(bf) {
    var job = (bf && bf.occupation) || "";
    for (var i = 0; i < INCOME_KINDS.length; i++) {
      if (INCOME_KINDS[i].test.test(job)) return INCOME_KINDS[i].kinds;
    }
    return INCOME_DEFAULT;
  }

  function incomeSourceLabel(bf) {
    return incomeKindsFor(bf).map(function (k) { return k[0]; }).join(" / ");
  }

  // 资产 = 基础 + 职业加成 + 好感度成长 + 后续入账 - 花掉的部分
  function computeAssets(st) {
    var bf = st.bf || {};
    var aff = bf.affection || 0;
    var job = bf.occupation || "";
    var jobBoost = 0;
    if (/总裁|董事|CEO|老板|集团|总裁/.test(job)) jobBoost = 24000000;
    else if (/医生|教授|律师|金融|投行|医师/.test(job)) jobBoost = 9000000;
    else if (/明星|偶像|演员|歌手|主播/.test(job)) jobBoost = 13000000;
    else if (/设计师|建筑师|工程师|程序员|研究员/.test(job)) jobBoost = 6000000;
    else if (/老师|教师|医生/.test(job)) jobBoost = 4000000;
    var base = 5000000 + Math.floor(aff / 10) * 1200000 + jobBoost + (st.assetsExtra || 0);
    var spent = st.assetsSpent || 0;
    var total = base * 1.0;
    var cash = Math.max(0, Math.round(total * 0.34) - spent);
    var house = Math.round(total * 0.42);
    var car = Math.round(total * 0.12);
    var invest = Math.round(total * 0.12);
    return {
      total: Math.round(total - Math.min(spent, Math.round(total * 0.3))),
      cash: cash,
      house: house,
      car: car,
      invest: invest
    };
  }

  function renderAssets() {
    var st = S();
    if (!st) return;
    var a = computeAssets(st);
    if ($("profile-asset-total")) $("profile-asset-total").textContent = "¥ " + fmtMoney(a.total);
    if ($("profile-asset-job")) {
      $("profile-asset-job").textContent = (st.bf.occupation || "自由职业") + " · 收入来源：" + incomeSourceLabel(st.bf);
    }
    renderIncomeLog();
    if ($("profile-asset-cash")) $("profile-asset-cash").textContent = "¥ " + fmtMoney(a.cash);
    if ($("profile-asset-house")) $("profile-asset-house").textContent = "¥ " + fmtMoney(a.house);
    if ($("profile-asset-car")) $("profile-asset-car").textContent = "¥ " + fmtMoney(a.car);
    if ($("profile-asset-invest")) $("profile-asset-invest").textContent = "¥ " + fmtMoney(a.invest);
  }

  function renderIncomeLog() {
    var st = S();
    var box = $("profile-asset-log");
    if (!box || !st) return;
    box.innerHTML = "";
    var logs = (st.assetsLog || []).slice(0, 4);
    if (!logs.length) {
      box.appendChild(el("div", "pa-log-empty", "还没有入账记录，过一会儿就会有"));
      return;
    }
    logs.forEach(function (it) {
      var row = el("div", "pa-log-row");
      row.appendChild(el("span", "pa-log-label", it.label));
      row.appendChild(el("span", "pa-log-amt", "+¥" + fmtMoney(it.amount)));
      row.appendChild(el("span", "pa-log-time", it.time || ""));
      box.appendChild(row);
    });
  }

  // 实时入账：每 20~70 分钟来一笔（有职业区分），并记流水
  function tickIncome(force) {
    var st = S();
    if (!st) return null;
    var now = Date.now();
    if (!st.incomeAt) {
      st.incomeAt = now + (8 * 60 + Math.random() * 12 * 60) * 1000;
      GameState.save(st);
      return null;
    }
    if (!force && now < st.incomeAt) return null;
    var kinds = incomeKindsFor(st.bf);
    var k = kinds[Math.floor(Math.random() * kinds.length)];
    var amount = Math.round(k[1] + Math.random() * (k[2] - k[1]));
    st.assetsExtra = (st.assetsExtra || 0) + amount;
    st.assetsLog = st.assetsLog || [];
    st.assetsLog.unshift({ label: k[0], amount: amount, time: nowHM() });
    if (st.assetsLog.length > 20) st.assetsLog.length = 20;
    st.incomeAt = now + (20 * 60 + Math.random() * 50 * 60) * 1000;
    GameState.save(st);
    if ($("profile-sheet") && !$("profile-sheet").classList.contains("hidden")) {
      renderAssets();
    }
    return { label: k[0], amount: amount };
  }

  // 刷他的卡送礼
  function letHimPay() {
    payByHim = true;
    openGiftModal();
    toast("💳 这次礼物让 TA 买单（从 TA 的现金里扣）", 2600);
  }

  // 撒个娇要零花（每天一次）
  function askTransfer() {
    var st = S();
    if (!st) return;
    ensureDaily();
    var today = GameState.todayStr();
    if (st.transferDate === today) {
      toast("💸 今天已经撒过娇啦，明天再来～");
      return;
    }
    var assets = computeAssets(st);
    var amount = (20 + Math.floor((st.bf.affection || 0) / 10) * 8) * COIN_TO_YUAN;
    var cost = amount;
    if (assets.cash < cost) {
      toast("💸 TA 账户余额不够了……先对他好一点吧");
      return;
    }
    st.assetsSpent = (st.assetsSpent || 0) + cost;
    st.transferDate = today;
    addCash(amount);
    GameState.save(st);
    renderAssets();
    addSys("💸 " + (st.bf.name || "TA") + " 给你转了 ¥" + amount.toLocaleString() + " 零花");
    homeSpeech("拿去花，不够再跟我说。");
    toast("💸 收到 ¥" + amount.toLocaleString() + " 零花！");
    checkAch();
  }

  function openGiftModal() {
    ensureDaily();
    var st = S();
    if ($("gift-cash-num")) $("gift-cash-num").textContent = (st.cash || 0).toLocaleString();
    var grid = $("gift-grid");
    grid.innerHTML = "";
    (window.GAME_GIFTS || []).forEach(function (g) {
      var price = (g.price || 0) * COIN_TO_YUAN;
      var afford = (st.cash || 0) >= price;
      var item = el("button", "gift-item" + (afford ? "" : " unaffordable"));
      var gIcon = el("div", "gift-emoji");
      var svg = iconForEmoji(g.emoji);
      if (svg) gIcon.innerHTML = svg; else gIcon.textContent = g.emoji;
      item.appendChild(gIcon);
      item.appendChild(el("div", "gift-name", g.name));
      item.appendChild(el("div", "gift-desc", g.desc));
      item.appendChild(el("div", "gift-delta", "+" + g.delta + " 好感"));
      if (price) item.appendChild(el("div", "gift-price", "¥" + price.toLocaleString()));
      item.addEventListener("click", function () { sendGift(g); });
      grid.appendChild(item);
    });
    $("gift-modal").classList.remove("hidden");
  }

  function sendGift(gift) {
    var st = S();
    var price = (gift.price || 0) * COIN_TO_YUAN;
    var useHis = payByHim;
    var assets = computeAssets(st);
    if (useHis) {
      if (assets.cash < price) {
        toast("💳 TA 的现金不够买这个了");
        payByHim = false;
        return;
      }
      st.assetsSpent = (st.assetsSpent || 0) + price;
      payByHim = false;
      addSys("💳 " + (st.bf.name || "TA") + " 替你付了「" + gift.name + "」的钱");
    } else {
      if ((st.cash || 0) < price) {
        toast("💸 现金不够啦，去「赚钱」App 打工吧");
        return;
      }
      if (price) addCash(-price);
    }
    $("gift-modal").classList.add("hidden");
    addSys("🎁 你送出了「" + gift.name + "」");
    bumpTask("gift");
    st.giftCount++;
    var line;
    if (st.bf.gifts && st.bf.gifts[gift.id]) {
      line = st.bf.gifts[gift.id];
    } else {
      line = ChatEngine.pick(gift.lines);
    }
    showTyping();
    setTimeout(function () {
      heSays(line, gift.delta);
      homeSpeech(line + "（收下了你的礼物 🎁）");
      if (st.giftCount === 1) {
        GameState.addAlbum(st, "🎁", "第一份礼物", "你送出了第一份礼物：「" + gift.name + "」，他一定很开心");
      }
      checkAch();
    }, delayFor(line));
  }

  // ---------- 来电 ----------
  var callBusy = false, lastCallAt = 0;

  function openCall() {
    var st = S();
    if (callBusy) return;
    if (Date.now() - lastCallAt < 120000) { toast("他刚挂断不久，等一会儿再拨吧"); return; }
    callBusy = true;
    var bf = st.bf;
    renderAvatarInto($("call-avatar"), bf);
    $("call-name").textContent = bf.name || "他";
    $("call-status-text").textContent = "来电中… 📞";
    $("call-dialog").classList.add("hidden");
    $("btn-call-end").classList.add("hidden");
    $("btn-call-accept").classList.remove("hidden");
    $("btn-call-decline").classList.remove("hidden");
    $("call-overlay").classList.remove("hidden");
    vibrate([200, 100, 200]);
  }

  function acceptCall() {
    var st = S();
    $("call-status-text").textContent = "通话中… 🎧";
    $("btn-call-accept").classList.add("hidden");
    $("btn-call-decline").classList.add("hidden");
    var box = $("call-dialog");
    box.classList.remove("hidden");
    box.innerHTML = "";
    st.callCount++;
    if (st.callCount === 1) GameState.addAlbum(st, "📞", "第一次通话", "电话接通的那一刻，心都快跳出来了");
    var lines = ChatEngine.getCallScript(st.bf);
    var t = 600;
    lines.forEach(function (l) {
      setTimeout(function () {
        var line = el("div", "call-line", l);
        box.appendChild(line);
        box.scrollTop = box.scrollHeight;
        playDing();
      }, t);
      t += delayFor(l);
    });
    setTimeout(function () {
      $("call-status-text").textContent = "通话已结束 💗";
      $("btn-call-end").classList.remove("hidden");
    }, t + 400);
    checkAch();
    GameState.save(st);
  }

  function endCall() {
    callBusy = false;
    lastCallAt = Date.now();
    $("call-overlay").classList.add("hidden");
    $("call-dialog").innerHTML = "";
  }

  function declineCall() {
    callBusy = false;
    lastCallAt = Date.now();
    $("call-overlay").classList.add("hidden");
    var st = S();
    setTimeout(function () {
      showTyping();
      setTimeout(function () {
        heSays("怎么不接我电话？🥺", 1);
      }, delayFor("怎么不接我电话？🥺"));
    }, 1200);
  }

  // ---------- 剧情 ----------
  function scenarioList() {
    return window.GAME_SCENARIOS || [];
  }

  function maybeOpenScenarioPicker() {
    var st = S();
    var list = scenarioList();
    var unlocked = list.filter(function (sc) { return st.bf.affection >= sc.minAffection && !st.scenarioDone[sc.id]; });
    if (!unlocked.length) return;
    setTimeout(function () {
      openScenarioList();
    }, 2400);
  }

  function autoPlayScenario(id) {
    var sc = null;
    scenarioList().forEach(function (s) { if (s.id === id) sc = s; });
    if (!sc) return;
    var st = S();
    if (st.scenarioDone[sc.id]) return;
    addSys("💘 特别剧情即将开始……");
    setTimeout(function () { playScenario(sc); }, 1200);
  }

  function openScenarioList() {
    var st = S();
    var body = $("scenario-body");
    body.innerHTML = "";
    var actions = $("scenario-actions");
    actions.innerHTML = "";
    $("scenario-icon").textContent = "🎬";
    $("scenario-title").textContent = "约会剧情";
    scenarioList().forEach(function (sc) {
      var done = !!st.scenarioDone[sc.id];
      var locked = st.bf.affection < sc.minAffection;
      var item = el("div", "scenario-item" + (locked ? " locked" : "") + (done ? " done" : ""));
      var scIcon = el("span", "scenario-item-icon");
    var scSvg = iconForEmoji(sc.icon);
    if (scSvg) scIcon.innerHTML = scSvg; else scIcon.textContent = sc.icon;
    item.appendChild(scIcon);
      var meta = el("div", "scenario-item-meta");
      meta.appendChild(el("div", "scenario-item-title", sc.title));
      meta.appendChild(el("div", "scenario-item-desc",
        done ? "已完成 ✓" : locked ? "好感度 " + sc.minAffection + " 解锁 🔒" : "好感度 " + sc.minAffection + " · 可开启"));
      item.appendChild(meta);
      if (!locked && !done) {
        item.addEventListener("click", function () { playScenario(sc); });
      }
      body.appendChild(item);
    });
    actions.appendChild(el("button", "btn btn-ghost", "关闭"));
    actions.firstChild.addEventListener("click", function () { $("scenario-modal").classList.add("hidden"); });
    $("scenario-modal").classList.remove("hidden");
  }

  var scenarioTimer = null;
  function playScenario(sc) {
    var body = $("scenario-body");
    var actions = $("scenario-actions");
    body.innerHTML = "";
    actions.innerHTML = "";
    $("scenario-icon").textContent = sc.icon;
    $("scenario-title").textContent = sc.title;
    $("scenario-modal").classList.remove("hidden");
    var idx = 0;
    function nextNode() {
      if (idx >= sc.story.length) {
        finishScenario(sc);
        return;
      }
      var node = sc.story[idx++];
      var delay = 500;
      scenarioTimer = setTimeout(function () {
        if (node.who === "narr") {
          body.appendChild(el("div", "scenario-narr", node.text));
          body.scrollTop = body.scrollHeight;
          nextNode();
        } else if (node.who === "him") {
          var line = el("div", "scenario-him", ChatEngine.fillTokens(node.text, S().bf));
          body.appendChild(line);
          body.scrollTop = body.scrollHeight;
          playDing();
          nextNode();
        } else if (node.who === "choice") {
          var t = el("div", "scenario-narr", node.text);
          body.appendChild(t);
          var box = el("div", "scenario-choices");
          node.options.forEach(function (opt) {
            var b = el("button", "scenario-choice-btn", opt.label);
            b.addEventListener("click", function () {
              var all = box.querySelectorAll("button");
              all.forEach(function (x) { x.disabled = true; x.classList.add("chosen"); });
              b.classList.add("chosen");
              body.appendChild(el("div", "scenario-you", "你：" + opt.label));
              if (opt.reply) {
                setTimeout(function () {
                  body.appendChild(el("div", "scenario-him", ChatEngine.fillTokens(opt.reply, S().bf)));
                  body.scrollTop = body.scrollHeight;
                  playDing();
                  nextNode();
                }, 700);
              } else {
                nextNode();
              }
            });
            box.appendChild(b);
          });
          body.appendChild(box);
          body.scrollTop = body.scrollHeight;
        }
      }, delay);
    }
    nextNode();
  }

  function finishScenario(sc) {
    var st = S();
    st.scenarioDone[sc.id] = true;
    st.scenarioCount++;
    GameState.addAffection(st, 5);
    updateAffectionUI({});
    GameState.addAlbum(st, sc.icon, "剧情 · " + sc.title, "你们一起经历了「" + sc.title + "」");
    var body = $("scenario-body");
    body.appendChild(el("div", "scenario-narr", "—— 剧情完成 ❤️ 好感度 +5 ——"));
    var actions = $("scenario-actions");
    actions.innerHTML = "";
    var b = el("button", "btn btn-primary", "收下这份心动");
    b.addEventListener("click", function () { $("scenario-modal").classList.add("hidden"); });
    actions.appendChild(b);
    checkAch();
    GameState.save(st);
  }

  // ---------- 面板 ----------
  function openPanel() {
    $("panel").classList.remove("hidden");
    renderBfCard();
    renderAlbum();
    renderAch();
    loadSettingsForm();
    switchTab("card");
  }

  function closePanel() {
    // 关闭面板前把设置改动落盘（防止刷新丢失 API Key）
    if (typeof flushSettings === "function" && S()) flushSettings();
    $("panel").classList.add("hidden");
  }

  // 返回开始页（自动保存进度 + 设置）
  function goBackToStart() {
    try {
      if (typeof flushSettings === "function" && S()) flushSettings();
      if (window.GameState.current) GameState.save(window.GameState.current);
    } catch (e) { /* ignore */ }
    closePanel();
    autoEnter();
  }

  function switchTab(name) {
    $$(".panel-tab").forEach(function (t) {
      t.classList.toggle("active", t.dataset.tab === name);
    });
    $$(".tab").forEach(function (t) { t.classList.add("hidden"); });
    $("tab-" + name).classList.remove("hidden");
    if (name === "album") {
      var st = S();
      if (st) {
        st.albumSeenCount = st.album.length;
        GameState.save(st);
        updateDockBadges();
      }
    }
  }

  function renderBfCard() {
    var bf = S().bf;
    var card = $("bf-card");
    card.innerHTML = "";
    var head = el("div", "bf-card-head");
    var av = el("div", "avatar avatar-lg");
    if (bf.portrait) {
      av.innerHTML = portraitImg(bf.portrait, false);
    } else if (bf.avatar && window.AvatarEngine) {
      av.innerHTML = window.AvatarEngine.avatarSVG(bf.avatar, bf.gradient);
    } else {
      av.textContent = bf.emoji || "🩵";
      av.style.background = "linear-gradient(135deg," + bf.gradient[0] + "," + bf.gradient[1] + ")";
    }
    head.appendChild(av);
    var meta = el("div", "bf-card-meta");
    meta.appendChild(el("div", "bf-card-name", bf.name + "  ·  " + bf.archetype));
    meta.appendChild(el("div", "bf-card-sub", (bf.age || "?") + "岁 · " + (bf.height || "?") + " · " + (bf.occupation || "?")));
    head.appendChild(meta);
    card.appendChild(head);

    var stage = GameState.stageOf(bf.affection);
    var affBox = el("div", "bf-card-aff");
    affBox.appendChild(el("div", "bf-card-aff-text", stage.emoji + " " + stage.name + " · " + bf.affection + "/100"));
    var bar = el("div", "aff-bar");
    var fill = el("div", "aff-fill");
    fill.style.width = bf.affection + "%";
    bar.appendChild(fill);
    affBox.appendChild(bar);
    card.appendChild(affBox);

    function section(title, text) {
      var s = el("div", "bf-card-section");
      s.appendChild(el("div", "bf-card-sec-title", title));
      s.appendChild(el("div", "bf-card-sec-body", text || "—"));
      card.appendChild(s);
    }
    if (bf.personality && bf.personality.length) {
      var tagBox = el("div", "bf-card-tags");
      bf.personality.forEach(function (t) { tagBox.appendChild(el("span", "mini-tag", t)); });
      card.appendChild(tagBox);
    }
    section("🎙️ 说话风格", bf.speakingStyle);
    section("📖 背景详细资料", bf.background);
    if (bf.catchphrases && bf.catchphrases.length) section("💬 口头禅", bf.catchphrases.join(" / "));
    var role = findRole(bf.roleId);
    if (role) {
      section("❤️ 喜欢", role.likes.join("、"));
      section("🙅 讨厌", role.dislikes.join("、"));
    }
    section("💗 对你的称呼", bf.petName);
  }

  function renderAlbum() {
    var grid = $("album-grid");
    grid.innerHTML = "";
    var album = S().album;
    if (!album.length) {
      grid.appendChild(el("div", "empty-tip", "还没有回忆，快去聊天创造心动瞬间吧 ✨"));
      return;
    }
    album.forEach(function (m) {
      var item = el("div", "album-item");
      item.appendChild(el("div", "album-icon", m.icon));
      item.appendChild(el("div", "album-title", m.title));
      item.appendChild(el("div", "album-text", m.text));
      item.appendChild(el("div", "album-time", m.time));
      grid.appendChild(item);
    });
  }

  function renderAch() {
    var box = $("ach-list");
    box.innerHTML = "";
    (window.GAME_ACHIEVEMENTS || []).forEach(function (a) {
      var got = !!S().achievements[a.id];
      var item = el("div", "ach-item" + (got ? "" : " locked"));
      item.appendChild(el("span", "ach-icon", a.icon));
      var meta = el("div", "ach-meta");
      meta.appendChild(el("div", "ach-name", a.name));
      meta.appendChild(el("div", "ach-desc", got ? "已达成 ✓" : "未解锁 · " + a.desc));
      item.appendChild(meta);
      box.appendChild(item);
    });
  }

  function loadSettingsForm() {
    var s = S().settings;
    $("set-ai").value = s.ai;
    if ($("set-model")) $("set-model").value = s.model || "deepseek-flash";
    if ($("set-temp")) {
      $("set-temp").value = typeof s.temperature === "number" ? s.temperature : 0.9;
      if ($("set-temp-val")) $("set-temp-val").textContent = $("set-temp").value;
    }
    updateAIServerStatus();
    $("set-sound").value = s.sound;
    if ($("set-strict")) $("set-strict").value = s.strict || "on";
    renderCloudPanel();
    $("set-proactive").value = s.proactive;
    if ($("set-proactive-freq")) $("set-proactive-freq").value = s.proactiveFreq || "normal";
    if ($("set-enc-freq")) $("set-enc-freq").value = s.encFreq || "low";
  }

  function saveSettings() {
    var st = S();
    collectSettings();
    // 填了 Key 但 AI 还关着 → 自动开启，避免"填了 Key 却一直在用离线台词"
    if (st.settings.key && st.settings.ai !== "on") {
      st.settings.ai = "on";
      if ($("set-ai")) $("set-ai").value = "on";
      setTimeout(function () { toast("✨ 已自动开启 AI 聊天（检测到已填写 API Key）", 3200); }, 200);
    }
    GameState.save(st);
    // 验证是否真的写入了浏览器存储
    var persisted = false;
    try { persisted = !!(localStorage.getItem(GameState.SAVE_KEY) || localStorage.getItem(GameState.SETTINGS_KEY)); } catch (e) { persisted = false; }
    if (!persisted) {
      toast("⚠️ 设置保存失败：浏览器存储不可用或已满，请检查隐私设置", 4200);
      return;
    }
    updateAIbadge();
    toast("设置已保存 ✅（已写入本地存档）");
    if (st.settings.ai === "on" && !(st.cloud && st.cloud.url && st.cloud.token)) {
      toast("⚠️ 还没连接 AI 服务器，当前使用离线对话（不影响聊天）", 3200);
    }
    updateAIServerStatus();
  }

  // 从表单收集设置到状态
  function collectSettings() {
    var st = S();
    if (!st) return;
    st.settings.ai = $("set-ai").value;
    if ($("set-model")) st.settings.model = $("set-model").value.trim() || "deepseek-flash";
    if ($("set-temp")) st.settings.temperature = parseFloat($("set-temp").value);
    st.settings.sound = $("set-sound").value;
    if ($("set-strict")) st.settings.strict = $("set-strict").value;
    if ($("cloud-url")) {
      var cu = String($("cloud-url").value || "").trim().replace(/\/+$/, "");
      st.cloud = st.cloud || { url: "", token: "", userId: "", lastSync: 0 };
      if (cu !== st.cloud.url) st.cloud.url = cu;
    }
    if ($("cloud-auto")) st.cloud.auto = $("cloud-auto").checked ? "on" : "off";
    st.settings.proactive = $("set-proactive").value;
    if ($("set-proactive-freq")) st.settings.proactiveFreq = $("set-proactive-freq").value;
    if ($("set-enc-freq")) st.settings.encFreq = $("set-enc-freq").value;
  }

  // 设置改动自动保存（防刷新丢失 API Key 等）
  var settingsAutoTimer = null;
  function autoSaveSettings() {
    if (!S()) return;
    if (settingsAutoTimer) clearTimeout(settingsAutoTimer);
    settingsAutoTimer = setTimeout(function () {
      settingsAutoTimer = null;
      collectSettings();
      GameState.save(S());
      updateAIbadge();
    }, 350);
  }

  function flushSettings() {
    if (settingsAutoTimer) {
      clearTimeout(settingsAutoTimer);
      settingsAutoTimer = null;
    }
    if (S()) {
      collectSettings();
      GameState.save(S());
    }
  }

  // AI 连接测试
  function updateAIServerStatus() {
    var st = S();
    var box = $("ai-server-status");
    if (!box || !st) return;
    var ready = !!(st.cloud && st.cloud.url && st.cloud.token);
    if (!ready) {
      box.textContent = "未连接服务器 · AI 聊天暂不可用（仍可离线聊天）";
      box.className = "ai-server-status off";
    } else {
      box.textContent = "已连接 · " + String(st.cloud.url).replace(/^https?:\/\//, "");
      box.className = "ai-server-status on";
    }
  }

  function testCloudAI() {
    var st = S();
    var box = $("ai-test-result");
    if (!box) return;
    if (!st.cloud || !st.cloud.url || !st.cloud.token) {
      box.textContent = "请先在下方填写服务器地址并点「连接账号」";
      box.className = "ai-test-result fail";
      return;
    }
    box.textContent = "正在连接服务器…";
    box.className = "ai-test-result";
    httpJson("POST", String(st.cloud.url).replace(/\/+$/, "") + "/api/ai", {
      token: st.cloud.token,
      system: "你是" + (st.bf.name || "TA") + "，请用一句话回答。",
      messages: [{ role: "user", content: "在吗" }],
      temperature: 0.8
    }).then(function (r) {
      if (r && r.ok && r.text) {
        box.textContent = "✅ 服务器 AI 正常：" + r.text.slice(0, 40);
        box.className = "ai-test-result ok";
      } else {
        box.textContent = "❌ " + ((r && r.error) || "服务器未返回内容");
        box.className = "ai-test-result fail";
      }
    }).catch(function (e) {
      box.textContent = "❌ " + (e.message || e);
      box.className = "ai-test-result fail";
    });
  }

  // AI 状态徽章：已连接 / 异常 / 未开启 / 未填 Key
  // AI 标注：只在 AI 生效时显示一行小字说明（合规提示，不抢眼）
  function updateAIbadge() {
    var st = S();
    var badge = $("ai-badge");
    if (!badge || !st) return;
    var aiOn = isAIOn(st);
    if (!aiOn) {
      badge.classList.add("hidden");
      return;
    }
    badge.classList.remove("hidden");
    if (st.settings.aiLastError) {
      badge.textContent = "内容由 AI 生成（本次请求异常，已用离线台词）";
      badge.title = String(st.settings.aiLastError).slice(0, 200);
    } else {
      badge.textContent = "内容由 AI 生成";
      badge.title = "TA 的聊天回复由 AI 实时生成";
    }
  }

  function resetGame() {
    if (!confirm("确定要清除存档，重新开始吗？这段心动回忆将不复存在。")) return;
    GameState.wipe();
    location.reload();
  }

  // ---------- 成就 ----------
  function checkAch() {
    var st = S();
    var unlocked = GameState.checkAchievements(st);
    unlocked.forEach(function (a) {
      toast(a.icon + " 成就达成：「" + a.name + "」！");
      GameState.addAlbum(st, a.icon, "成就 · " + a.name, a.desc);
    });
    if (unlocked.length) GameState.save(st);
  }

  // 开始页按钮状态：有存档时「继续游戏」为主按钮，「开始游戏」变为覆盖存档的次级按钮
  function updateStartButtons() {
    // 开始页不再有"开始/继续"按钮：打开就自动接着玩
    if (hasCharacter(window.GameState && window.GameState.current)) refreshStartAccount();
  }

  // 打开游戏时自动进入：有角色直接到手机桌面，没角色直接去创建
  function hasCharacter(st) {
    if (!st || !st.bf) return false;
    if (st.bf.name && String(st.bf.name).trim()) return true;
    if (Array.isArray(st.bf.personality) && st.bf.personality.length) return true;
    if (st.bf.background && String(st.bf.background).trim()) return true;
    return false;
  }

  function autoEnter() {
    var st = window.GameState && window.GameState.current;
    var hasChar = hasCharacter(st);
    if (hasChar) {
      showScreen("phone");
      renderPhone();
      renderHome();
      refreshStartAccount();
    } else {
      showScreen("start");
      updateStartButtons();
      setTimeout(function () {
        if (!hasCharacter(window.GameState && window.GameState.current)) showScreen("create");
      }, 900);
    }
  }

  // ---------- 存档导出 / 导入 ----------
  function exportSave() {
    var st = S();
    if (!st) return;
    GameState.save(st);
    var json = JSON.stringify(st, null, 2);
    var a = document.createElement("a");
    a.download = "心动契约-存档-" + GameState.todayStr() + ".json";
    try {
      var blob = new Blob([json], { type: "application/json" });
      if (window.URL && URL.createObjectURL) {
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          try { URL.revokeObjectURL(a.href); } catch (e) {}
          if (a.parentNode) a.parentNode.removeChild(a);
        }, 1000);
        toast("💾 存档备份已导出（检查浏览器下载）");
        return;
      }
    } catch (e) { /* fallthrough */ }
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(json);
    document.body.appendChild(a);
    a.click();
    if (a.parentNode) a.parentNode.removeChild(a);
    toast("💾 存档备份已导出（检查浏览器下载）");
  }

  function importSaveText(text) {
    try {
      var obj = JSON.parse(text);
      if (!obj || !obj.bf || typeof obj.bf.name !== "string") {
        toast("❌ 这不是有效的存档文件");
        return false;
      }
      GameState.save(obj);
      var st = GameState.load();
      if (!st) { toast("❌ 存档导入失败"); return false; }
      window.GameState.current = st;
      updateStartButtons();
      closePanel();
      renderHome();
      showScreen("home");
      toast("📂 存档导入成功：「" + st.bf.name + "」回来了");
      return true;
    } catch (e) {
      toast("❌ 存档文件解析失败");
      return false;
    }
  }

  function importSaveFile(file) {
    if (!file) return;
    try {
      var reader = new FileReader();
      reader.onload = function () { importSaveText(String(reader.result || "")); };
      reader.readAsText(file);
    } catch (e) {
      toast("❌ 无法读取存档文件");
    }
  }

  // ---------- 事件绑定 ----------
  function bind() {
    // 开始页

    // 创建流程
    $("btn-back-home").addEventListener("click", function () {
      if (createOrigin === "home" && GameState.hasSave()) {
        var st = GameState.load();
        if (st) { window.GameState.current = st; showScreen("home"); renderHome(); return; }
      }
      showScreen("start");
      updateStartButtons();
    });
    $("btn-gender-male").addEventListener("click", function () { setGender("male"); });
    $("btn-gender-female").addEventListener("click", function () { setGender("female"); });
    $("btn-custom-blank").addEventListener("click", blankCustom);
    $("btn-start-game").addEventListener("click", startNewGame);
    $("btn-quick-gen").addEventListener("click", function () {
      quickGen(true);
      toast("🎲 新的人物资料生成完毕！不满意就再摇一次");
    });
    $("btn-quick-style").addEventListener("click", function () {
      quickGen(false);
      toast("✨ 换了批风格：性格、说话方式、对你的称呼都变了");
    });
    $("btn-gen-style").addEventListener("click", function () {
      if (!createDraft || !window.ProfileGenerator) return;
      var key = createDraft.resp || createDraft.roleId;
      var s = window.ProfileGenerator.genStyle(key);
      if (s) {
        createDraft.speakingStyle = s;
        $("in-style").value = s;
        toast("✨ 已随机生成说话风格");
      }
    });
    $("btn-gen-story").addEventListener("click", function () {
      if (!createDraft || !window.ProfileGenerator) return;
      var key = createDraft.resp || createDraft.roleId;
      var s = window.ProfileGenerator.genStory(key);
      if (s) {
        createDraft.background = s;
        $("in-background").value = s;
        toast("📖 已随机生成背景故事");
      }
    });

    // 创建表单实时预览
    ["in-name", "in-age", "in-height", "in-job"].forEach(function (id) {
      $(id).addEventListener("input", updatePreview);
    });

    // 主界面功能按钮（现在都在人物资料页里）
    $("btn-chat").addEventListener("click", function () {
      closeProfile();
      openChatFromHome();
    });
    $("btn-home-gift").addEventListener("click", openGiftModal);
    $("btn-pet").addEventListener("click", petInteraction);
    $("btn-dress").addEventListener("click", openDressModal);
    $("btn-call-2").addEventListener("click", openCall);
    $("btn-date").addEventListener("click", openScenarioList);
    $("btn-moments").addEventListener("click", openMomentsModal);
    $("btn-album").addEventListener("click", function () { openPanel(); switchTab("album"); });
    $("btn-card").addEventListener("click", function () { openPanel(); switchTab("card"); });
    $("btn-home-settings").addEventListener("click", function () { openPanel(); switchTab("set"); });
    // 人物资料页 / 头像大图
    $("btn-profile-close").addEventListener("click", closeProfile);
    $("profile-avatar").addEventListener("click", openAvatarViewer);
    $("btn-avatar-viewer-close").addEventListener("click", closeAvatarViewer);
    $("avatar-viewer").addEventListener("click", function (e) {
      if (e.target === this) closeAvatarViewer();
    });
    if ($("chat-avatar")) $("chat-avatar").addEventListener("click", openProfile);
    // 资产互动
    $("btn-him-pay").addEventListener("click", letHimPay);
    $("btn-him-transfer").addEventListener("click", askTransfer);
    // 点击新消息通知 → 打开聊天
    $("msg-notify").addEventListener("click", function () {
      $("msg-notify").classList.add("hidden");
      openChatFromHome();
    });
    // NPC 资料页
    $("btn-npc-profile-close").addEventListener("click", closeNpcProfile);
    $("npc-profile-avatar").addEventListener("click", function () {
      var npc = npcProfileId ? findNpc(npcProfileId) : null;
      if (npc) openAvatarViewer(npc);
    });
    $("btn-npc-profile-chat").addEventListener("click", function () {
      var id = npcProfileId;
      closeNpcProfile();
      if (id) openNpcChat(id);
    });
    $("btn-npc-delete").addEventListener("click", function () {
      if (!npcProfileId) return;
      if (!confirm("确定删除这位好友吗？")) return;
      deleteNpcContact(npcProfileId, false);
    });
    $("btn-npc-block").addEventListener("click", function () {
      if (!npcProfileId) return;
      if (!confirm("确定拉黑吗？TA 之后不会再申请加你。")) return;
      deleteNpcContact(npcProfileId, true);
    });
    // TA 资料页：解除关系
    $("btn-ta-unfriend").addEventListener("click", function () {
      if (!confirm("解除关系会删除当前存档（角色、好感、资产、聊天记录全部清空），确定吗？")) return;
      GameState.wipe();
      window.GameState.current = GameState.defaultState();
      closeProfile();
      showScreen("start");
      updateStartButtons();
      toast("已解除关系，可以重新开始");
    });
    // 新的朋友 / NPC 聊天
    if ($("btn-fest-close")) $("btn-fest-close").addEventListener("click", function () { $("festival-modal").classList.add("hidden"); });
    if ($("btn-notice-ok")) $("btn-notice-ok").addEventListener("click", function () { $("notice-modal").classList.add("hidden"); });
    if ($("btn-sys-notice-ok")) $("btn-sys-notice-ok").addEventListener("click", function () { $("sys-notice-bar").classList.add("hidden"); });
    $("btn-friends-close").addEventListener("click", function () { $("friends-modal").classList.add("hidden"); });
    if ($("set-enc-freq")) $("set-enc-freq").addEventListener("change", function () {
      collectSettings();
      if (S() && (S().encCount || 0) > 0) scheduleEncounter(false);
    });
    $("btn-npc-back").addEventListener("click", closeNpcChat);
    $("btn-npc-send").addEventListener("click", sendNpcMessage);
    $("npc-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); sendNpcMessage(); }
    });
    // 偶遇事件
    // 偶遇按钮已移除，只靠自动弹窗触发
    if ($("btn-encounter")) $("btn-encounter").addEventListener("click", openEncounter);
    $("btn-enc-accept").addEventListener("click", function () {
      var id = encPendingId;
      encPendingId = null;
      closeEncounter();
      if (id) acceptFriend(id);
    });
    $("btn-enc-leave").addEventListener("click", closeEncounter);
    if ($("btn-dock-settings")) $("btn-dock-settings").addEventListener("click", function () { openPanel(); switchTab("set"); });
    $("btn-home-back").addEventListener("click", openPhone);
    if ($("btn-account")) $("btn-account").addEventListener("click", openAccountModal);
    if ($("btn-acc-register")) $("btn-acc-register").addEventListener("click", function () {
      accountStatus("注册中…");
      cloudRegister().then(function () {
        accountStatus("✅ 注册成功，已登录");
        setTimeout(function () { $("account-modal").classList.add("hidden"); refreshStartAccount(); }, 700);
      }).catch(function (e) { accountStatus("❌ " + (e.message || "注册失败")); });
    });
    if ($("btn-acc-login")) $("btn-acc-login").addEventListener("click", function () {
      accountStatus("登录中…");
      cloudLogin().then(function () {
        accountStatus("✅ 登录成功");
        setTimeout(function () { $("account-modal").classList.add("hidden"); refreshStartAccount(); }, 700);
      }).catch(function (e) { accountStatus("❌ " + (e.message || "登录失败")); });
    });
    if ($("btn-earn-work")) $("btn-earn-work").addEventListener("click", doWork);
    if ($("btn-earn-side")) $("btn-earn-side").addEventListener("click", doSideJob);
    if ($("btn-earn-invest")) $("btn-earn-invest").addEventListener("click", doInvest);
    if ($("btn-cloud-register")) $("btn-cloud-register").addEventListener("click", function () { collectSettings(); cloudRegister().catch(function () {}); });
    if ($("btn-cloud-login")) $("btn-cloud-login").addEventListener("click", function () { collectSettings(); cloudLogin().catch(function () {}); });
    if ($("btn-cloud-push")) $("btn-cloud-push").addEventListener("click", function () { collectSettings(); cloudPush().catch(function () {}); });
    if ($("btn-cloud-pull")) $("btn-cloud-pull").addEventListener("click", cloudPull);
    if ($("btn-cloud-restore-code") && $("cloud-code-input")) {
      $("btn-cloud-restore-code").addEventListener("click", function () {
        var tok = String($("cloud-code-input").value || "").trim();
        if (tok.length < 20) { toast("恢复码格式不对"); return; }
        var st = S();
        st.cloud = st.cloud || { url: "", token: "", userId: "", lastSync: 0 };
        st.cloud.url = String($("cloud-url").value || st.cloud.url || "").trim().replace(/\/+$/, "");
        st.cloud.token = tok;
        if (!st.cloud.url) { toast("请先填写服务器地址"); return; }
        GameState.save(st);
        toast("☁ 恢复码已填，正在读取云端存档…");
        cloudPull();
      });
    }
    if ($("btn-cloud-disconnect")) $("btn-cloud-disconnect").addEventListener("click", function () {
      var st = S();
      if (!confirm("断开云同步？本地存档不受影响，但将不再自动上传。")) return;
      st.cloud = { url: (st.cloud && st.cloud.url) || "", token: "", userId: "", lastSync: 0, auto: "off" };
      GameState.save(st);
      renderCloudPanel();
      toast("已断开云同步");
    });
    if ($("cloud-auto")) $("cloud-auto").addEventListener("change", function () {
      var st = S();
      st.cloud = st.cloud || { url: "", token: "", userId: "", lastSync: 0 };
      st.cloud.auto = $("cloud-auto").checked ? "on" : "off";
      GameState.save(st);
      toast($("cloud-auto").checked ? "☁ 自动同步已开启" : "自动同步已关闭");
    });
    if ($("btn-rec-1000")) $("btn-rec-1000").addEventListener("click", function () { rechargeCoins(1000); });
    if ($("btn-rec-2000")) $("btn-rec-2000").addEventListener("click", function () { rechargeCoins(2000); });
    if ($("btn-rec-5000")) $("btn-rec-5000").addEventListener("click", function () { rechargeCoins(5000); });
    if ($("btn-rec-earn")) $("btn-rec-earn").addEventListener("click", function () {
      $("recharge-modal").classList.add("hidden");
      openEarnModal();
    });
    if ($("phone-wallet")) $("phone-wallet").addEventListener("click", openRechargeModal);
    if ($("chat-quota")) $("chat-quota").addEventListener("click", openRechargeModal);
    if ($("btn-recharge-1000")) $("btn-recharge-1000").addEventListener("click", function () { rechargeCoins(1000); });
    if ($("btn-recharge-5000")) $("btn-recharge-5000").addEventListener("click", function () { rechargeCoins(5000); });
    $("btn-back-start").addEventListener("click", goBackToStart);
    // 点心印币 → 打开赚心印币的每日任务
    if ($("hud-coins")) $("hud-coins").addEventListener("click", function () {
      toast("✦ 心印币：聊天消耗 · 签到/任务可得 · 可用 ¥ 充值", 3200);
      openTasksModal();
    });
    $("btn-signin").addEventListener("click", openSigninModal);
    $("btn-tasks").addEventListener("click", openTasksModal);
    $("btn-signin-go").addEventListener("click", doSignIn);
    $("btn-signin-close").addEventListener("click", function () { $("signin-modal").classList.add("hidden"); });
    $("btn-tasks-close").addEventListener("click", function () { $("tasks-modal").classList.add("hidden"); });
    $("btn-moments-close").addEventListener("click", function () { $("moments-modal").classList.add("hidden"); });

    // 弹窗返回键（左上角 ←）
    $$(".modal-back").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-close");
        if (id === "scenario-modal") {
          if (scenarioTimer) { clearTimeout(scenarioTimer); scenarioTimer = null; }
          $("scenario-modal").classList.add("hidden");
          toast("已离开约会剧情");
        } else {
          var m = $(id);
          if (m) m.classList.add("hidden");
        }
      });
    });
    // 点击遮罩空白处关闭弹窗（剧情演出除外，避免误触）
    $$(".modal").forEach(function (m) {
      m.addEventListener("click", function (e) {
        if (e.target !== m) return;
        if (m.id === "scenario-modal") return;
        m.classList.add("hidden");
      });
    });
    // 点击面板外区域关闭侧边面板
    $("app").addEventListener("click", function (e) {
      var panel = $("panel");
      if (!panel || panel.classList.contains("hidden")) return;
      if (panel.contains(e.target)) return;
      // 面板内的操作、资料页、顶部 HUD 上的操作都不算"点击外部"
      if (e.target.closest && (e.target.closest(".home-dock") || e.target.closest(".hud-pill") || e.target.closest("#profile-sheet") || e.target.closest(".home-header") || e.target.closest(".profile-action") || e.target.closest("#screen-phone") || e.target.closest(".phone-app") || e.target.closest(".phone-dock"))) return;
      closePanel();
    });

    // 换装弹窗
    $("btn-dress-cancel").addEventListener("click", function () { $("dress-modal").classList.add("hidden"); });
    $("btn-dress-save").addEventListener("click", saveDress);

    // 聊天
    $("btn-chat-back").addEventListener("click", function () { harvestChatMemories(true); showScreen("home"); renderHome(); });
    $("btn-send").addEventListener("click", function () { sendPlayer($("msg-input").value); });
    $("msg-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); sendPlayer($("msg-input").value); }
    });
    $("btn-gift").addEventListener("click", openGiftModal);
    $("btn-gift-close").addEventListener("click", function () { $("gift-modal").classList.add("hidden"); });
    $("btn-call").addEventListener("click", openCall);
    $("btn-call-accept").addEventListener("click", acceptCall);
    $("btn-call-decline").addEventListener("click", declineCall);
    $("btn-call-end").addEventListener("click", endCall);

    // 面板
    $("btn-close-panel").addEventListener("click", closePanel);
    $$(".panel-tab").forEach(function (t) {
      t.addEventListener("click", function () { switchTab(t.dataset.tab); });
    });
    $("btn-save-settings").addEventListener("click", saveSettings);
    $("btn-test-ai").addEventListener("click", testCloudAI);
    // 用户端不再填写 Key（AI 走后端代理）
    if ($("set-temp")) $("set-temp").addEventListener("input", function () {
      if ($("set-temp-val")) $("set-temp-val").textContent = $("set-temp").value;
      autoSaveSettings();
    });
    // 设置项改动后自动保存（无需手动点保存）
    ["set-ai", "set-sound", "set-strict", "set-proactive", "set-proactive-freq", "set-enc-freq", "cloud-url", "cloud-auto"].forEach(function (id) {
      var node = $(id);
      if (!node) return;
      node.addEventListener("change", autoSaveSettings);
      node.addEventListener("input", autoSaveSettings);
    });
    $("btn-reselect").addEventListener("click", function () {
      closePanel();
      createOrigin = "home";
      resetCreateFlow();
      toast("选好新的恋人后点「签订契约」，开始新故事 💘");
    });
    $("btn-export-save").addEventListener("click", exportSave);
    $("btn-import-save").addEventListener("click", function () { $("import-save-file").click(); });
    $("import-save-file").addEventListener("change", function () {
      var f = this.files && this.files[0];
      importSaveFile(f);
      this.value = "";
    });

    // 每 3 秒检查主动消息
    setInterval(tickProactive, 3000);
    setInterval(function () { tickIncome(false); }, 60000);
    setInterval(autoCloudSync, 45000);
    setupPWABanner();
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      deferredInstall = e;
      if ($("btn-pwa-install")) $("btn-pwa-install").classList.remove("hidden");
      if ($("pwa-banner")) $("pwa-banner").classList.remove("hidden");
    });
    setInterval(updatePhoneClock, 20000);
    renderPhone();
  }

  // ---------- 初始化 ----------
  function init() {
    renderRoleGrid();
    bind();
    injectIcons();
    setGender("male");
    var st = GameState.load();
    var rawSave = null;
    try { rawSave = localStorage.getItem(GameState.SAVE_KEY); } catch (e) { rawSave = null; }
    if (st) {
      window.GameState.current = st;
    } else {
      window.GameState.current = GameState.defaultState();
      if (rawSave) {
        setTimeout(function () { toast("⚠️ 存档读取失败（可能已损坏），已使用新存档", 4200); }, 500);
      }
    }
    // 设置镜像：没有存档时也恢复 API Key 等设置
    var mirror = GameState.loadSettingsMirror ? GameState.loadSettingsMirror() : null;
    if (mirror) {
      window.GameState.current.settings = Object.assign({}, window.GameState.current.settings, mirror);
    }
    // 已有 Key 但 AI 关着（旧存档/历史设置）→ 自动开启，避免一直在用离线台词
    if (window.GameState.current.settings.key && window.GameState.current.settings.ai !== "on") {
      window.GameState.current.settings.ai = "on";
    }
    ensureDaily();
    showScreen("start");
    updateStartButtons();
    setTimeout(autoEnter, 60);
    setTimeout(loadRemoteRules, 1500);
    // 本地存储可用性检查（隐私模式/禁用存储时提醒）
    try {
      var probe = "__dsh_probe__";
      localStorage.setItem(probe, "1");
      localStorage.removeItem(probe);
    } catch (e) {
      toast("⚠️ 当前浏览器禁止本地存储，游戏进度将无法保存", 4200);
    }
    // 离开/切后台时自动保存，防止进度丢失
    function autoSave() {
      try {
        if (window.GameState.current) GameState.save(window.GameState.current);
      } catch (e) { /* ignore */ }
    }
    window.addEventListener("pagehide", autoSave);
    window.addEventListener("beforeunload", autoSave);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") autoSave();
    });
    // 注册 Service Worker（离线可玩 + 可添加到主屏幕）
    try {
      if ("serviceWorker" in navigator && location.hostname.indexOf("androidplatform") === -1 && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
        navigator.serviceWorker.register("sw.js").catch(function () { /* 忽略：某些环境不支持 */ });
      }
    } catch (e) { /* ignore */ }
  }

  window.UI = {
    init: init,
    showScreen: showScreen,
    toast: toast,
    addMsg: addMsg,
    addSys: addSys,
    sendPlayer: sendPlayer,
    heSays: heSays,
    updateAffectionUI: updateAffectionUI,
    renderHome: renderHome,
    openScenarioList: openScenarioList,
    importSaveText: importSaveText,
    exportSave: exportSave,
    _forceProactive: function () { nextProactiveAt = 0; },
    _forceFriend: function () { var r = generateFriendRequest(); renderHome(); return r; },
    _forceEncounter: function () { if (window.GameState.current) window.GameState.current.encNextAt = 0; openEncounter(); },
    _setEncounterAt: function (t) { if (window.GameState.current) { window.GameState.current.encNextAt = (t && t > 0) ? t : (Date.now() - 1000); } }
  };
})();
