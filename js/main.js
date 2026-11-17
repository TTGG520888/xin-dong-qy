// ============================================================
// main —— 入口：按序加载完毕后启动游戏
// ============================================================
(function () {
  "use strict";

  function boot() {
    // 数据完整性检查
    var missing = [];
    if (!window.GAME_ROLES || !window.GAME_ROLES.length) missing.push("roles");
    if (!window.GAME_SCENARIOS || !window.GAME_SCENARIOS.length) missing.push("scenarios");
    if (!window.GAME_GIFTS) missing.push("gifts");
    if (!window.GAME_ACHIEVEMENTS) missing.push("achievements");
    if (!window.RESPONSES) missing.push("responses");
    if (!window.AVATAR_PARTS) missing.push("avatar");
    if (!window.GAME_PORTRAITS) missing.push("portraits");
    if (!window.GEN_POOLS) missing.push("gen-pools");
    if (!window.GAME_MOMENTS) missing.push("moments");

    if (missing.length) {
      document.body.innerHTML =
        '<div style="font-family:sans-serif;color:#ff8fb1;background:#14101f;height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;box-sizing:border-box;">' +
        '<div>💔 数据加载不完整（' + missing.join(", ") + '）<br><br>' +
        '请确认所有 js/data 文件完整，或通过本地服务器访问（python -m http.server）后再试。</div></div>';
      return;
    }

    window.UI.init();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
