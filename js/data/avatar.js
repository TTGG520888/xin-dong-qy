// ============================================================
// 人物建模数据 —— SVG 立绘部件库（发型/颜色/服装/配饰/表情）
// 画布 200x220，头中心(100,92)，脸 rx48 ry54
// ============================================================
window.AVATAR_PARTS = {
  // ---- 发型：back(后发，先画) + front(刘海/前发，后画) + extra(额外) ----
  hairStyles: [
    {
      id: "short", name: "清爽短发",
      back: "M52,120 C44,74 50,38 100,34 C150,38 156,74 148,120 L148,134 C120,126 80,126 52,134 Z",
      front: "M54,108 C48,60 64,38 100,38 C136,38 152,60 146,108 C140,84 132,76 122,70 C114,76 86,76 78,70 C68,76 60,84 54,108 Z"
    },
    {
      id: "slick", name: "利落背头",
      back: "M50,118 C42,66 50,34 100,32 C150,34 158,66 150,118 L150,130 C124,124 76,124 50,130 Z",
      front: "M56,88 C60,46 78,32 100,32 C122,32 140,46 144,88 C132,60 118,54 100,56 C82,54 68,60 56,88 Z"
    },
    {
      id: "messy", name: "凌乱碎发",
      back: "M50,116 C42,64 46,36 100,32 C154,36 158,64 150,116 L150,130 C118,122 82,122 50,130 Z",
      front: "M52,104 C46,58 62,34 100,34 C138,34 154,58 148,104 L140,88 L128,96 L116,80 L104,94 L92,78 L80,92 L68,80 L58,96 Z"
    },
    {
      id: "long", name: "及腰长发",
      back: "M50,150 C40,60 46,34 100,30 C154,34 160,60 150,150 L156,202 C146,198 138,200 136,194 C132,200 122,200 118,194 C112,202 88,202 82,194 C78,200 68,200 64,194 C62,200 54,198 44,202 Z",
      front: "M56,104 C48,58 64,36 100,36 C136,36 152,58 144,104 C136,76 126,66 116,60 C106,66 94,66 84,60 C74,66 64,76 56,104 Z M56,104 C54,120 54,142 58,162 L50,162 C46,142 46,120 48,104 Z M144,104 C146,120 146,142 142,162 L150,162 C154,142 154,120 152,104 Z"
    },
    {
      id: "wolf", name: "狼尾半长",
      back: "M48,142 C40,60 46,34 100,30 C154,34 160,60 152,142 L158,180 L148,172 L140,182 L132,170 L124,184 L118,172 L112,186 L104,172 L96,186 L88,172 L82,184 L76,170 L68,182 L60,172 L52,180 L42,172 Z",
      front: "M54,106 C48,58 64,36 100,36 C136,36 152,58 146,106 C138,78 126,68 116,62 C108,68 92,68 84,62 C74,68 62,78 54,106 Z M54,106 C52,122 52,140 56,156 L48,156 C44,140 44,122 46,106 Z M146,106 C148,122 148,140 144,156 L152,156 C156,140 156,122 154,106 Z"
    },
    {
      id: "curly", name: "蓬松卷发",
      back: "M48,122 C40,66 44,34 100,30 C156,34 160,66 152,122 C158,98 156,86 152,80 C144,88 136,80 130,88 C122,78 112,88 104,78 C96,88 86,78 78,88 C70,80 62,88 54,80 C50,86 48,98 44,122 Z",
      front: "M54,104 C48,60 62,36 100,36 C138,36 152,60 146,104 C140,86 130,82 120,80 C112,86 88,86 80,80 C70,82 60,86 54,104 Z",
      extra: "M58,70 a16,16 0 1,1 6,-30 M100,56 a16,16 0 1,1 2,-30 M142,70 a16,16 0 1,1 -6,-30"
    },
    {
      id: "bun", name: "高丸子头",
      back: "M50,118 C42,66 50,34 100,32 C150,34 158,66 150,118 L150,130 C124,124 76,124 50,130 Z",
      front: "M56,100 C50,56 66,34 100,34 C134,34 150,56 144,100 C134,72 122,64 112,60 C104,66 96,66 88,60 C78,64 66,72 56,100 Z",
      extra: "M84,26 a16,16 0 1,0 32,0 a16,16 0 1,0 -32,0"
    },
    {
      id: "pony", name: "侧边马尾",
      back: "M50,116 C42,64 46,36 100,32 C154,36 158,64 150,116 L150,130 C118,122 82,122 50,130 Z",
      front: "M54,102 C48,56 64,34 100,34 C136,34 152,56 146,102 C136,76 124,64 114,58 C106,64 94,64 86,58 C76,64 64,76 54,102 Z",
      extra: "M144,80 C164,72 174,96 168,132 C166,144 158,150 152,154 C160,142 162,124 158,104 C155,92 150,84 144,80 Z"
    },
    {
      id: "twin", name: "双马尾",
      back: "M50,118 C42,66 46,36 100,32 C154,36 158,64 150,118 L150,130 C118,122 82,122 50,130 Z",
      front: "M54,104 C48,58 64,36 100,36 C136,36 152,58 146,104 C138,76 126,68 116,62 C108,68 92,68 84,62 C74,68 62,78 54,104 Z",
      extra: "M44,96 C30,120 26,150 30,186 C34,196 44,200 48,196 C52,200 58,192 54,182 C50,160 52,130 60,110 Z M156,96 C170,120 174,150 170,186 C166,196 156,200 152,196 C148,200 142,192 146,182 C150,160 148,130 140,110 Z"
    },
    {
      id: "hime", name: "公主切",
      back: "M50,140 C42,60 46,34 100,30 C154,34 158,60 150,140 L150,152 C120,144 80,144 50,152 Z",
      front: "M54,100 C48,56 64,34 100,34 C136,34 152,56 146,100 L146,112 L54,112 Z M50,100 L60,100 L60,132 L50,132 Z M150,100 L140,100 L140,132 L150,132 Z"
    }
  ],

  // ---- 发色 / 瞳色 / 肤色 ----
  hairColors: [
    { id: "hc_black", name: "墨黑", value: "#1f2937" },
    { id: "hc_darkbrown", name: "深棕", value: "#4a2c1a" },
    { id: "hc_chestnut", name: "栗棕", value: "#7c4a24" },
    { id: "hc_wine", name: "酒红", value: "#8b3a2f" },
    { id: "hc_gold", name: "暖金", value: "#e8c468" },
    { id: "hc_silver", name: "银灰", value: "#cfd4dc" },
    { id: "hc_blue", name: "雾蓝", value: "#5b7bb4" },
    { id: "hc_purple", name: "雾紫", value: "#6d5aa8" },
    { id: "hc_pink", name: "樱粉", value: "#e88aa8" }
  ],
  eyeColors: [
    { id: "ec_black", name: "曜黑", value: "#3b3b3b" },
    { id: "ec_amber", name: "琥珀", value: "#b08b3a" },
    { id: "ec_brown", name: "深棕", value: "#5b3a1a" },
    { id: "ec_blue", name: "海蓝", value: "#7a9cc6" },
    { id: "ec_green", name: "松绿", value: "#7aa86a" },
    { id: "ec_rose", name: "蔷薇", value: "#a05a7a" }
  ],
  skinTones: [
    { id: "sk_light", name: "瓷白", value: "#ffe8d6" },
    { id: "sk_fair", name: "白皙", value: "#f7d9c4" },
    { id: "sk_warm", name: "暖麦", value: "#e8b98f" },
    { id: "sk_tan", name: "小麦", value: "#c68b59" },
    { id: "sk_deep", name: "蜜糖", value: "#8d5a3b" }
  ],

  // ---- 服装：body 底色 + 细节(d 路径/f 填充/s 描边/sw 宽度) + cape(披风，画在身体后) ----
  outfits: [
    {
      id: "suit_dark", name: "深色西装", fill: "#232a3a",
      details: [
        { d: "M82,164 L100,186 L118,164 L118,220 L82,220 Z", f: "#f4f6f8" },
        { d: "M100,186 L84,220 L94,220 Z", f: "#171c28" },
        { d: "M100,186 L116,220 L106,220 Z", f: "#171c28" },
        { d: "M96,166 L100,196 L104,166 Z", f: "#a3384f" }
      ]
    },
    {
      id: "suit_light", name: "浅色西装", fill: "#c9d4e4",
      details: [
        { d: "M82,164 L100,186 L118,164 L118,220 L82,220 Z", f: "#ffffff" },
        { d: "M100,186 L84,220 L94,220 Z", f: "#a9b8cc" },
        { d: "M100,186 L116,220 L106,220 Z", f: "#a9b8cc" },
        { d: "M96,166 L100,196 L104,166 Z", f: "#33557a" }
      ]
    },
    {
      id: "coat_doctor", name: "医生白大褂", fill: "#f2f5f8",
      details: [
        { d: "M84,164 L100,182 L116,164 L116,220 L84,220 Z", f: "#dcebf2" },
        { d: "M86,166 L100,182 L114,166", s: "#c3ccd4", sw: 2 },
        { d: "M118,190 L134,190", s: "#c3ccd4", sw: 2 },
        { d: "M100,188 C114,198 114,206 100,212", s: "#55636e", sw: 2.5 },
        { d: "M114,190 a4,4 0 1,0 0.1,0", s: "#55636e", sw: 3 }
      ]
    },
    {
      id: "cape_vamp", name: "血族披风", fill: "#1a1f2b",
      cape: [
        { d: "M34,192 C30,120 52,60 100,44 C148,60 170,120 166,192 C150,178 50,178 34,192 Z", f: "#2a1030" },
        { d: "M166,192 C170,140 158,110 148,96 C156,128 158,160 156,192 Z", f: "#7e2b3f" }
      ],
      details: [
        { d: "M74,158 L100,186 L126,158 L126,172 L100,196 L74,172 Z", f: "#2f3a4d" },
        { d: "M100,180 a4,4 0 1,0 0.1,0", f: "#b3395e" }
      ]
    },
    {
      id: "armor", name: "骑士轻甲", fill: "#8b9bb0",
      details: [
        { d: "M76,166 L124,166 L118,206 L82,206 Z", f: "#aebfd4" },
        { d: "M76,176 L124,176", s: "#5b6b80", sw: 3 },
        { d: "M38,176 a20,16 0 1,0 40,0 a20,16 0 1,0 -40,0", f: "#93a5bc" },
        { d: "M122,176 a20,16 0 1,0 40,0 a20,16 0 1,0 -40,0", f: "#93a5bc" },
        { d: "M58,176 a2.6,2.6 0 1,0 0.1,0", f: "#5b6b80" },
        { d: "M142,176 a2.6,2.6 0 1,0 0.1,0", f: "#5b6b80" }
      ]
    },
    {
      id: "uniform", name: "校园制服", fill: "#3d5a80",
      details: [
        { d: "M86,164 L100,182 L114,164 L114,220 L86,220 Z", f: "#f6f8fa" },
        { d: "M96,168 L100,190 L104,168 Z", f: "#b23a52" },
        { d: "M84,164 L100,186 L84,220 Z", f: "#33495f" },
        { d: "M116,164 L100,186 L116,220 Z", f: "#33495f" }
      ]
    },
    {
      id: "stage", name: "舞台装", fill: "#f3e6f7",
      details: [
        { d: "M80,164 L100,190 L120,164 L120,176 L100,198 L80,176 Z", f: "#c9b8d8" },
        { d: "M120,180 l4,-6 l4,6 z", f: "#d9a6e8" },
        { d: "M70,196 l3,-5 l3,5 z", f: "#d9a6e8" },
        { d: "M134,204 l3,-5 l3,5 z", f: "#d9a6e8" }
      ]
    },
    {
      id: "robe", name: "仙袍", fill: "#cdd9e8",
      details: [
        { d: "M88,164 L100,184 L112,164 L112,220 L88,220 Z", f: "#f2f6fa" },
        { d: "M82,160 L118,160 L112,170 L88,170 Z", f: "#b9c6d8" },
        { d: "M88,190 L112,190 L108,200 L92,200 Z", f: "#7a8ba3" },
        { d: "M100,200 L100,220", s: "#7a8ba3", sw: 2 }
      ]
    },
    {
      id: "vest", name: "调酒师马甲", fill: "#5a4632",
      details: [
        { d: "M84,164 L100,184 L116,164 L116,220 L84,220 Z", f: "#f4efe6" },
        { d: "M84,164 L100,184 L84,220 Z", f: "#4a3827" },
        { d: "M116,164 L100,184 L116,220 Z", f: "#4a3827" },
        { d: "M100,190 a2.5,2.5 0 1,0 0.1,0", f: "#8a7354" },
        { d: "M100,202 a2.5,2.5 0 1,0 0.1,0", f: "#8a7354" },
        { d: "M100,214 a2.5,2.5 0 1,0 0.1,0", f: "#8a7354" }
      ]
    },
    {
      id: "hoodie", name: "慵懒卫衣", fill: "#55688f",
      details: [
        { d: "M60,164 C58,138 74,124 100,124 C126,124 142,138 140,164 C130,154 70,154 60,164 Z", f: "#4a5c80" },
        { d: "M92,168 L88,186", s: "#e8edf4", sw: 2.5 },
        { d: "M108,168 L112,186", s: "#e8edf4", sw: 2.5 },
        { d: "M70,196 L130,196 L124,214 L76,214 Z", f: "#4a5c80" }
      ]
    },
    {
      id: "shirt", name: "休闲衬衫", fill: "#eef2f6",
      details: [
        { d: "M86,164 L100,180 L114,164 L110,172 L100,182 L90,172 Z", f: "#ffffff" },
        { d: "M100,182 L100,220", s: "#c9d3dc", sw: 2 },
        { d: "M100,190 a2.4,2.4 0 1,0 0.1,0", f: "#c9d3dc" },
        { d: "M100,202 a2.4,2.4 0 1,0 0.1,0", f: "#c9d3dc" }
      ]
    },
    {
      id: "turtleneck", name: "高领毛衣", fill: "#83604f",
      details: [
        { d: "M78,158 L122,158 L126,178 L74,178 Z", f: "#6b4c3e" },
        { d: "M74,178 L74,166", s: "#5d4236", sw: 2 },
        { d: "M126,178 L126,166", s: "#5d4236", sw: 2 }
      ]
    },
    // ---- 女性装扮 ----
    {
      id: "dress", name: "心形连衣裙", fill: "#e8a0b8",
      details: [
        { d: "M84,164 L100,188 L116,164 L116,220 L84,220 Z", f: "#f3c3d3" },
        { d: "M88,196 L112,196 L108,206 L92,206 Z", f: "#c96a8a" },
        { d: "M92,199 a2,2 0 1,0 0.1,0", f: "#fff" },
        { d: "M108,199 a2,2 0 1,0 0.1,0", f: "#fff" },
        { d: "M60,168 C64,158 70,158 74,166", s: "#e8c468", sw: 2 },
        { d: "M140,168 C136,158 130,158 126,166", s: "#e8c468", sw: 2 }
      ]
    },
    {
      id: "jk", name: "JK 制服", fill: "#2f4a6d",
      details: [
        { d: "M74,160 L100,190 L126,160 L132,174 L100,206 L68,174 Z", f: "#f2f6fa" },
        { d: "M79,164 L100,190 L121,164", s: "#9db8d4", sw: 2 },
        { d: "M96,190 L100,202 L104,190 Z", f: "#b23a52" },
        { d: "M96,190 L88,198 L94,202 Z", f: "#b23a52" },
        { d: "M104,190 L112,198 L106,202 Z", f: "#b23a52" }
      ]
    },
    {
      id: "cheongsam", name: "旗袍", fill: "#a33a4a",
      details: [
        { d: "M86,158 L114,158 L118,174 L82,174 Z", f: "#8f2c42" },
        { d: "M84,164 L100,190 L116,164", s: "#e8c468", sw: 1.5 },
        { d: "M100,186 a2.4,2.4 0 1,0 0.1,0", f: "#e8c468" },
        { d: "M100,198 a2.4,2.4 0 1,0 0.1,0", f: "#e8c468" },
        { d: "M100,210 a2.4,2.4 0 1,0 0.1,0", f: "#e8c468" }
      ]
    },
    {
      id: "lolita", name: "洛丽塔裙", fill: "#c9b8e8",
      details: [
        { d: "M82,164 Q86,176 92,164 Q96,176 102,164 Q108,176 114,164 Q118,176 122,164 L122,172 Q118,184 112,172 Q106,184 100,172 Q94,184 88,172 Q82,184 78,172 Z", f: "#f2ecfa" },
        { d: "M96,182 L100,194 L104,182 Z", f: "#d98aa8" },
        { d: "M76,214 Q82,206 88,214 Q94,206 100,214 Q106,206 112,214 Q118,206 124,214", s: "#f2ecfa", sw: 2 }
      ]
    },
    {
      id: "blouse", name: "衬衫半裙", fill: "#f6eef2",
      details: [
        { d: "M86,164 L100,182 L114,164 L110,174 L100,184 L90,174 Z", f: "#ffffff" },
        { d: "M94,178 L100,190 L106,178 Z", f: "#d98aa8" },
        { d: "M100,196 a2.2,2.2 0 1,0 0.1,0", f: "#e2c4cc" },
        { d: "M100,206 a2.2,2.2 0 1,0 0.1,0", f: "#e2c4cc" }
      ]
    },
    {
      id: "gown", name: "晚礼服", fill: "#3b2a4a",
      details: [
        { d: "M76,164 Q100,156 124,164 L124,174 Q100,166 76,174 Z", f: "#e8c468" },
        { d: "M100,182 a3,3 0 1,0 0.1,0", f: "#ffe8a3" },
        { d: "M70,186 l4,-6 l4,6 z", f: "#8f7bb0" },
        { d: "M126,196 l4,-6 l4,6 z", f: "#8f7bb0" },
        { d: "M96,210 l3,-5 l3,5 z", f: "#8f7bb0" }
      ]
    }
  ],

  // ---- 配饰 ----
  accessories: [
    { id: "none", name: "无" },
    {
      id: "glasses", name: "圆框眼镜",
      details: [
        { d: "M74,102 a11,11 0 1,0 0.1,0", s: "#2b3442", sw: 3 },
        { d: "M126,102 a11,11 0 1,0 0.1,0", s: "#2b3442", sw: 3 },
        { d: "M85,100 L115,100", s: "#2b3442", sw: 3 },
        { d: "M63,100 L52,96", s: "#2b3442", sw: 2.5 },
        { d: "M137,100 L148,96", s: "#2b3442", sw: 2.5 }
      ]
    },
    {
      id: "earring", name: "耳钉",
      details: [
        { d: "M50,112 a2.8,2.8 0 1,0 0.1,0", f: "#e8c468" },
        { d: "M50,108 L50,104", s: "#e8c468", sw: 1.5 }
      ]
    },
    {
      id: "headphones", name: "头戴耳机",
      details: [
        { d: "M64,98 C60,56 140,56 136,98", s: "#3a4557", sw: 6 },
        { d: "M56,92 h18 v24 h-18 z", f: "#3a4557" },
        { d: "M126,92 h18 v24 h-18 z", f: "#3a4557" }
      ]
    },
    {
      id: "scarf", name: "围巾",
      details: [
        { d: "M70,166 L130,166 L136,186 L64,186 Z", f: "#b23a52" },
        { d: "M70,182 L130,182 L128,190 L72,190 Z", f: "#8f2c42" }
      ]
    },
    {
      id: "crown", name: "小皇冠",
      details: [
        { d: "M84,54 L92,66 L100,50 L108,66 L116,54 L112,72 L88,72 Z", f: "#e8c468" },
        { d: "M100,56 a2.4,2.4 0 1,0 0.1,0", f: "#b23a52" }
      ]
    },
    {
      id: "hairpin", name: "蝴蝶结发饰",
      details: [
        { d: "M84,62 L96,56 L92,70 Z", f: "#ff9db1" },
        { d: "M108,62 L96,56 L100,70 Z", f: "#ffc3d3" },
        { d: "M96,56 a2.4,2.4 0 1,0 0.1,0", f: "#ffffff" }
      ]
    }
  ],

  // ---- 表情：mouth(嘴) brows(眉) blush(脸红透明度) sleepy(困倦眯眼) ----
  expressions: [
    { id: "soft", name: "温柔浅笑", emoji: "😊", mouth: "M92,125 Q100,133 108,125", browL: "M64,86 Q76,80 88,86", browR: "M112,86 Q124,80 136,86", blush: 0.4, sleepy: false },
    { id: "smirk", name: "坏笑", emoji: "😏", mouth: "M90,125 Q101,134 110,122", browL: "M64,88 Q76,84 88,84", browR: "M112,84 Q124,84 136,88", blush: 0.15, sleepy: false },
    { id: "pout", name: "傲娇噘嘴", emoji: "😤", mouth: "M93,131 Q100,123 107,131", browL: "M64,84 Q76,88 88,86", browR: "M112,86 Q124,88 136,84", blush: 0.35, sleepy: false },
    { id: "shy", name: "害羞脸红", emoji: "😳", mouth: "M94,126 Q100,130 106,126", browL: "M64,88 Q76,84 88,88", browR: "M112,88 Q124,84 136,88", blush: 0.75, sleepy: false },
    { id: "sleepy", name: "困倦", emoji: "😪", mouth: "M94,128 Q100,131 106,128", browL: "M66,86 Q76,84 86,86", browR: "M114,86 Q124,84 134,86", blush: 0.2, sleepy: true }
  ]
};

// ---- 各原型默认建模 ----
window.AVATAR_PRESETS = {
  ceo:      { hairStyle: "slick",  hairColor: "hc_black",     eyeColor: "ec_black", skin: "sk_fair",  outfit: "suit_dark",  accessory: "none",  expression: "smirk" },
  doctor:   { hairStyle: "short",  hairColor: "hc_darkbrown", eyeColor: "ec_blue",  skin: "sk_fair",  outfit: "coat_doctor", accessory: "none", expression: "soft" },
  vampire:  { hairStyle: "long",   hairColor: "hc_silver",    eyeColor: "ec_rose",  skin: "sk_light", outfit: "cape_vamp", accessory: "earring", expression: "smirk" },
  knight:   { hairStyle: "messy",  hairColor: "hc_chestnut",  eyeColor: "ec_green", skin: "sk_warm",  outfit: "armor",   accessory: "none", expression: "soft" },
  senpai:   { hairStyle: "messy",  hairColor: "hc_darkbrown", eyeColor: "ec_brown", skin: "sk_fair",  outfit: "uniform", accessory: "none", expression: "soft" },
  idol:     { hairStyle: "wolf",   hairColor: "hc_pink",      eyeColor: "ec_rose",  skin: "sk_fair",  outfit: "stage",   accessory: "earring", expression: "smirk" },
  master:   { hairStyle: "long",   hairColor: "hc_silver",    eyeColor: "ec_blue",  skin: "sk_light", outfit: "robe",    accessory: "none", expression: "soft" },
  bartender:{ hairStyle: "messy",  hairColor: "hc_darkbrown", eyeColor: "ec_black", skin: "sk_warm",  outfit: "vest",    accessory: "earring", expression: "smirk" },
  custom:   { hairStyle: "short",  hairColor: "hc_black",     eyeColor: "ec_black", skin: "sk_fair",  outfit: "shirt",   accessory: "none", expression: "soft" },
  female:   { hairStyle: "long",   hairColor: "hc_wine",      eyeColor: "ec_rose",  skin: "sk_fair",  outfit: "dress",   accessory: "hairpin", expression: "soft" }
};
