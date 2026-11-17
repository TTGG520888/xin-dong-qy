// ============================================================
// ProfileGenerator —— 「一键生成资料」随机组合引擎
// 依赖 js/data/gen-pools.js（window.GEN_POOLS）
// ============================================================
(function () {
  "use strict";

  function pick(arr) {
    if (!arr || !arr.length) return "";
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function poolFor(key) {
    var P = window.GEN_POOLS || {};
    return P[key] || P.custom || {};
  }

  // 生成完整资料
  function generate(key) {
    var p = poolFor(key);
    var bgParts = [pick(p.origins), pick(p.events), pick(p.meetings), pick(p.details)]
      .filter(function (s) { return s; });
    var traits = pick(p.traitSets);
    return {
      name: pick(p.names) || "",
      age: pick(p.ages) || "",
      height: pick(p.heights) || "",
      occupation: pick(p.occupations) || "",
      personality: Array.isArray(traits) ? traits.slice() : [],
      speakingStyle: pick(p.styles) || "",
      petName: pick(p.petNames) || "",
      background: bgParts.join("")
    };
  }

  // 只换风格（性格/说话风格/称呼）
  function rerollStyle(key) {
    var p = poolFor(key);
    var traits = pick(p.traitSets);
    return {
      personality: Array.isArray(traits) ? traits.slice() : [],
      speakingStyle: pick(p.styles) || "",
      petName: pick(p.petNames) || ""
    };
  }

  // 随机建模（仅完全自定义角色使用；按性别过滤可选部件）
  function randomAvatar(gender) {
    var P = window.AVATAR_PARTS || {};
    var isFem = gender === "female";
    var femStyles = ["long", "twin", "hime", "bun", "pony", "curly", "short", "wolf"];
    var mascStyles = ["short", "slick", "messy", "wolf", "curly", "bun"];
    var femOutfits = ["dress", "jk", "cheongsam", "lolita", "blouse", "gown", "hoodie", "shirt", "turtleneck", "uniform"];
    var mascOutfits = ["suit_dark", "suit_light", "coat_doctor", "cape_vamp", "armor", "uniform", "stage", "robe", "vest", "hoodie", "shirt", "turtleneck"];
    function r(list, fallback) {
      if (list && list.length) return list[Math.floor(Math.random() * list.length)].id;
      return fallback;
    }
    var hairList = (P.hairStyles || []).filter(function (h) { return (isFem ? femStyles : mascStyles).indexOf(h.id) !== -1; });
    var outfitList = (P.outfits || []).filter(function (o) { return (isFem ? femOutfits : mascOutfits).indexOf(o.id) !== -1; });
    return {
      hairStyle: r(hairList, "short"),
      hairColor: r(P.hairColors, "hc_black"),
      eyeColor: r(P.eyeColors, "ec_black"),
      skin: r(P.skinTones, "sk_fair"),
      outfit: r(outfitList, "shirt"),
      accessory: r(P.accessories, "none"),
      expression: r(P.expressions, "soft")
    };
  }

  // 只生成说话风格（供创建页「生成」按钮使用）
  function genStyle(key) {
    var p = poolFor(key);
    return pick(p.styles) || "";
  }

  // 只生成背景故事（供创建页「生成故事」按钮使用）
  function genStory(key) {
    var p = poolFor(key);
    var bgParts = [pick(p.origins), pick(p.events), pick(p.meetings), pick(p.details)]
      .filter(function (s) { return s; });
    return bgParts.join("");
  }

  window.ProfileGenerator = {
    generate: generate,
    rerollStyle: rerollStyle,
    randomAvatar: randomAvatar,
    genStyle: genStyle,
    genStory: genStory,
    pick: pick
  };
})();
