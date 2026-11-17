// ============================================================
// AvatarEngine —— SVG 立绘渲染（全身像 + 部件缩略图）
// ============================================================
(function () {
  "use strict";

  function byId(arr, id) {
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return arr[0];
  }

  function colorValue(colorArr, id) {
    var c = byId(colorArr, id);
    return c ? c.value : (id && id.indexOf("#") === 0 ? id : "#888888");
  }

  function darker(hex, factor) {
    try {
      var h = hex.replace("#", "");
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      var r = Math.round(parseInt(h.substr(0, 2), 16) * factor);
      var g = Math.round(parseInt(h.substr(2, 2), 16) * factor);
      var b = Math.round(parseInt(h.substr(4, 2), 16) * factor);
      function p(n) { n = Math.min(255, n); var s = n.toString(16); return s.length < 2 ? "0" + s : s; }
      return "#" + p(r) + p(g) + p(b);
    } catch (e) { return hex; }
  }

  function parts() { return window.AVATAR_PARTS; }

  function normalizeCfg(cfg) {
    var P = parts();
    var c = cfg || {};
    var defaults = window.AVATAR_PRESETS ? (window.AVATAR_PRESETS.custom || {}) : {};
    return {
      hairStyle: byId(P.hairStyles, c.hairStyle || defaults.hairStyle) ? (c.hairStyle || defaults.hairStyle) : "short",
      hairColor: c.hairColor || defaults.hairColor || "hc_black",
      eyeColor: c.eyeColor || defaults.eyeColor || "ec_black",
      skin: c.skin || defaults.skin || "sk_fair",
      outfit: byId(P.outfits, c.outfit || defaults.outfit) ? (c.outfit || defaults.outfit) : "shirt",
      accessory: c.accessory || defaults.accessory || "none",
      expression: c.expression || defaults.expression || "soft"
    };
  }

  // 完整立绘
  function avatarSVG(cfg, gradient) {
    var P = parts();
    var c = normalizeCfg(cfg);
    var skin = colorValue(P.skinTones, c.skin);
    var hair = colorValue(P.hairColors, c.hairColor);
    var hairDark = darker(hair, 0.72);
    var eye = colorValue(P.eyeColors, c.eyeColor);
    var hairStyle = byId(P.hairStyles, c.hairStyle);
    var outfit = byId(P.outfits, c.outfit);
    var acc = byId(P.accessories, c.accessory);
    var expr = byId(P.expressions, c.expression);
    var g = gradient || ["#a78bfa", "#f472b6"];

    var s = [];
    s.push('<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="角色立绘">');
    s.push('<defs>' +
      '<linearGradient id="avbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + g[0] + '"/><stop offset="1" stop-color="' + g[1] + '"/></linearGradient>' +
      '<radialGradient id="avglow" cx="0.5" cy="0.34" r="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>' +
      '</defs>');
    s.push('<rect x="0" y="0" width="200" height="260" fill="url(#avbg)"/>');
    s.push('<rect x="0" y="0" width="200" height="260" fill="url(#avglow)"/>');

    // 披风（在头发与身体之间）
    if (outfit.cape) {
      outfit.cape.forEach(function (p) { s.push(pathStr(p)); });
    }
    // 后发
    s.push('<path d="' + hairStyle.back + '" fill="' + hair + '"/>');

    // 手臂（在躯干后）
    s.push('<rect x="14" y="188" width="20" height="64" rx="10" fill="' + darker(outfit.fill, 0.88) + '"/>');
    s.push('<rect x="166" y="188" width="20" height="64" rx="10" fill="' + darker(outfit.fill, 0.88) + '"/>');
    s.push('<circle cx="24" cy="250" r="9" fill="' + skin + '"/>');
    s.push('<circle cx="176" cy="250" r="9" fill="' + skin + '"/>');
    // 身体（Q 版圆润躯干）
    s.push('<path d="M32,260 C34,196 58,162 100,162 C142,162 166,196 168,260 Z" fill="' + outfit.fill + '"/>');
    // 脖子
    s.push('<rect x="92" y="146" width="16" height="26" rx="8" fill="' + darker(skin, 0.92) + '"/>');
    // 耳朵
    s.push('<circle cx="44" cy="98" r="9" fill="' + skin + '"/>');
    s.push('<circle cx="156" cy="98" r="9" fill="' + skin + '"/>');
    // 脸（大头 Q 版）
    s.push('<ellipse cx="100" cy="94" rx="52" ry="58" fill="' + skin + '"/>');
    // 脸部柔和暗部
    s.push('<ellipse cx="100" cy="134" rx="40" ry="16" fill="' + darker(skin, 0.94) + '" opacity="0.6"/>');

    // 前发 + 额外发件
    s.push('<path d="' + hairStyle.front + '" fill="' + hair + '"/>');
    if (hairStyle.extra) {
      s.push('<path d="' + hairStyle.extra + '" fill="' + hair + '"/>');
    }
    // 发丝暗部
    s.push('<path d="' + hairStyle.front + '" fill="none" stroke="' + hairDark + '" stroke-width="1.6" opacity="0.45"/>');

    // 眼睛（Q 版大眼，分组用于眨眼动画）
    var eyeY = 104;
    s.push('<g class="av-eye-group">');
    [76, 124].forEach(function (ex) {
      if (expr.sleepy) {
        s.push('<path d="M' + (ex - 11) + "," + eyeY + " Q" + ex + "," + (eyeY - 9) + " " + (ex + 11) + "," + eyeY + '" fill="none" stroke="#2b2b2b" stroke-width="3.4" stroke-linecap="round"/>');
      } else {
        s.push('<ellipse cx="' + ex + '" cy="' + eyeY + '" rx="13" ry="13.5" fill="#ffffff"/>');
        s.push('<circle cx="' + ex + '" cy="' + (eyeY + 1) + '" r="8" fill="' + eye + '"/>');
        s.push('<circle cx="' + ex + '" cy="' + (eyeY + 1) + '" r="3.8" fill="#1a1a1a"/>');
        s.push('<circle cx="' + (ex - 2.5) + '" cy="' + (eyeY - 2) + '" r="2.2" fill="#ffffff"/>');
        s.push('<circle cx="' + (ex + 3) + '" cy="' + (eyeY + 5) + '" r="1.1" fill="#ffffff" opacity="0.9"/>');
      }
    });
    s.push('</g>');
    // 眉毛
    s.push('<path d="' + expr.browL + '" fill="none" stroke="' + hairDark + '" stroke-width="2.6" stroke-linecap="round"/>');
    s.push('<path d="' + expr.browR + '" fill="none" stroke="' + hairDark + '" stroke-width="2.6" stroke-linecap="round"/>');
    // 腮红
    if (expr.blush > 0) {
      s.push('<ellipse cx="56" cy="122" rx="11" ry="6.5" fill="#ff9db1" opacity="' + expr.blush + '"/>');
      s.push('<ellipse cx="144" cy="122" rx="11" ry="6.5" fill="#ff9db1" opacity="' + expr.blush + '"/>');
    }
    // 鼻子
    s.push('<path d="M100,114 q2.5,4 0,7" fill="none" stroke="' + darker(skin, 0.72) + '" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>');
    // 嘴
    s.push('<path d="' + expr.mouth + '" fill="none" stroke="#c96a6a" stroke-width="3" stroke-linecap="round"/>');

    // 服装细节
    if (outfit.details) {
      outfit.details.forEach(function (p) { s.push(pathStr(p)); });
    }
    // 配饰
    if (acc.details) {
      acc.details.forEach(function (p) { s.push(pathStr(p)); });
    }
    s.push("</svg>");
    return s.join("");
  }

  function pathStr(p) {
    var attrs = 'd="' + p.d + '"';
    if (p.f) attrs += ' fill="' + p.f + '"';
    else if (p.s) attrs += ' fill="none"';
    if (p.s) attrs += ' stroke="' + p.s + '" stroke-width="' + (p.sw || 2) + '" stroke-linecap="round"';
    return "<path " + attrs + "/>";
  }

  // 发型缩略图
  function hairThumb(hairId) {
    var P = parts();
    var st = byId(P.hairStyles, hairId);
    var T = ' transform="translate(32,30) scale(0.28) translate(-100,-100)"';
    return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="32" cy="32" r="30" fill="#2a2440"/>' +
      '<path d="' + st.back + '" fill="#e8e2f0"' + T + '/>' +
      '<path d="' + st.front + '" fill="#f6f2fb"' + T + '/>' +
      (st.extra ? '<path d="' + st.extra + '" fill="#f6f2fb"' + T + '/>' : "") +
      "</svg>";
  }

  // 服装缩略图（适配 200x260 立绘画布）
  function outfitThumb(outfitId) {
    var P = parts();
    var o = byId(P.outfits, outfitId);
    var T = ' transform="translate(32,32) scale(0.42) translate(-100,-190)"';
    var s = ['<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">'];
    s.push('<circle cx="32" cy="32" r="30" fill="#2a2440"/>');
    s.push('<path d="M32,260 C34,196 58,162 100,162 C142,162 166,196 168,260 Z" fill="' + o.fill + '"' + T + '/>');
    if (o.cape) o.cape.forEach(function (p) {
      s.push('<path d="' + p.d + '" fill="' + (p.f || "#666") + '"' + T + '/>');
    });
    if (o.details) o.details.forEach(function (p) {
      s.push('<path d="' + p.d + '"' + (p.f ? ' fill="' + p.f + '"' : ' fill="none"') + (p.s ? ' stroke="' + p.s + '" stroke-width="' + (p.sw || 2) + '"' : "") + T + '/>');
    });
    s.push("</svg>");
    return s.join("");
  }

  // 心情 → 表情映射
  function moodToExpression(mood) {
    var map = {
      happy: "soft", tsundere: "pout", pout: "pout", soft: "shy", tired: "sleepy", normal: null
    };
    return map[mood] || null;
  }

  window.AvatarEngine = {
    avatarSVG: avatarSVG,
    hairThumb: hairThumb,
    outfitThumb: outfitThumb,
    moodToExpression: moodToExpression,
    normalizeCfg: normalizeCfg,
    parts: parts
  };
})();
