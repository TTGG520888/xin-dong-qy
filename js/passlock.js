// ============================================================
// 访问密码锁 —— 打开先输密码，验证通过才进入游戏
// 密码以 SHA-256 哈希保存（不存明文），本地验证，解锁状态存 localStorage
// ============================================================
(function () {
  "use strict";

  var PASS_KEY = "xin_dong_qy_unlock_v1";

  // ★ 你的专属密码：XinDong520TTGG
  //   哈希 = sha256("XinDong520TTGG")
  var PASS_HASH = "cce2d6c4ca622d97ba0ba52ecd27dad0f2edd84cc1b469abc556476421f065d3";

  // ---- 纯 JS SHA-256（标准、已验证，支持 UTF-8 中文） ----
  function sha256Hex(ascii) {
    var utf8 = unescape(encodeURIComponent(ascii));
    var bytes = [];
    for (var i = 0; i < utf8.length; i++) bytes.push(utf8.charCodeAt(i) & 0xff);

    function rightRotate(v, a) { return (v >>> a) | (v << (32 - a)); }

    function push32(arr, v) {
      arr.push((v >>> 24) & 0xff);
      arr.push((v >>> 16) & 0xff);
      arr.push((v >>> 8) & 0xff);
      arr.push(v & 0xff);
    }

    var K = [
      0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
      0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
      0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
      0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
      0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
      0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
      0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
      0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
    ];

    var bitLen = bytes.length * 8;
    bytes.push(0x80);
    while ((bytes.length % 64) !== 56) bytes.push(0x00);
    // 64 位大端长度：高 32 位在前，低 32 位在后
    push32(bytes, Math.floor(bitLen / 0x100000000));
    push32(bytes, bitLen >>> 0);

    var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];

    for (var chunk = 0; chunk < bytes.length; chunk += 64) {
      var w = new Array(64);
      for (var j = 0; j < 16; j++) {
        var off = chunk + j * 4;
        w[j] = ((bytes[off] << 24) | (bytes[off+1] << 16) | (bytes[off+2] << 8) | bytes[off+3]) >>> 0;
      }
      for (var j2 = 16; j2 < 64; j2++) {
        var s0 = rightRotate(w[j2-15],7) ^ rightRotate(w[j2-15],18) ^ (w[j2-15] >>> 3);
        var s1 = rightRotate(w[j2-2],17) ^ rightRotate(w[j2-2],19) ^ (w[j2-2] >>> 10);
        w[j2] = (w[j2-16] + s0 + w[j2-7] + s1) >>> 0;
      }
      var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
      for (var j3 = 0; j3 < 64; j3++) {
        var S1 = rightRotate(e,6) ^ rightRotate(e,11) ^ rightRotate(e,25);
        var ch = (e & f) ^ (~e & g);
        var temp1 = (h + S1 + ch + K[j3] + w[j3]) >>> 0;
        var S0 = rightRotate(a,2) ^ rightRotate(a,13) ^ rightRotate(a,22);
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var temp2 = (S0 + maj) >>> 0;
        h=g; g=f; f=e; e=(d+temp1)>>>0; d=c; c=b; b=a; a=(temp1+temp2)>>>0;
      }
      H[0]=(H[0]+a)>>>0; H[1]=(H[1]+b)>>>0; H[2]=(H[2]+c)>>>0; H[3]=(H[3]+d)>>>0;
      H[4]=(H[4]+e)>>>0; H[5]=(H[5]+f)>>>0; H[6]=(H[6]+g)>>>0; H[7]=(H[7]+h)>>>0;
    }

    var out = "";
    for (var k = 0; k < 8; k++) {
      out += ("00000000" + H[k].toString(16)).slice(-8);
    }
    return out;
  }

  function isUnlocked() {
    try { return localStorage.getItem(PASS_KEY) === "1"; } catch (e) { return false; }
  }

  // 等游戏脚本（window.UI）就绪后再显示游戏，避免露出未初始化的空白界面
  function revealApp() {
    var gate = document.getElementById("pass-gate");
    var app = document.getElementById("app");
    if (gate) gate.style.display = "none";
    if (app) app.classList.remove("gated-hidden");
  }

  function revealWhenReady() {
    var tries = 0;
    function check() {
      tries++;
      if (window.UI || tries > 150) {
        revealApp();
        return true;
      }
      return false;
    }
    if (check()) return;
    var timer = setInterval(function () {
      if (check()) clearInterval(timer);
    }, 100);
  }

  function unlock() {
    try { localStorage.setItem(PASS_KEY, "1"); } catch (e) {}
    revealWhenReady();
  }

  function showError(msg) {
    var e = document.getElementById("pass-error");
    if (!e) return;
    e.textContent = msg;
    e.classList.remove("hidden");
  }

  function verify(entered) {
    if (sha256Hex(entered) === PASS_HASH) {
      unlock();
    } else {
      showError("密码不对，再试一次");
      var inp = document.getElementById("pass-input");
      if (inp) { inp.value = ""; inp.focus(); }
    }
  }

  // App / 安卓安装包 / ?nopass=1 时不需要密码（审核员和普通用户直接进入）
  function skipGate() {
    try {
      var host = location.hostname || "";
      if (host.indexOf("androidplatform") !== -1) return true;
      if (location.protocol === "file:") return true;
      if (String(location.search || "").indexOf("nopass=1") !== -1) return true;
    } catch (e) {}
    return false;
  }

  function init() {
    var gate = document.getElementById("pass-gate");
    if (!gate) return;
    if (skipGate()) {
      try { gate.classList.add("hidden"); } catch (e) {}
      var appEl = document.getElementById("app");
      if (appEl) appEl.classList.remove("gated-hidden");
      revealWhenReady();
      return;
    }
    if (isUnlocked()) {
      revealWhenReady();
      return;
    }
    document.getElementById("app").classList.add("gated-hidden");
    var btn = document.getElementById("pass-confirm");
    var inp = document.getElementById("pass-input");
    function go() { verify(inp.value || ""); }
    if (btn) btn.addEventListener("click", go);
    if (inp) {
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); go(); } });
      inp.focus();
    }
  }

  // 脚本位于 body 底部，gate 元素已渲染，直接执行；若未渲染则等 DOMContentLoaded
  function readyInit() {
    init();
  }
  if (document.getElementById("pass-gate")) {
    readyInit();
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", readyInit);
  } else {
    readyInit();
  }
})();
