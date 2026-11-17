// Service Worker —— 让游戏离线可用（缓存所有资源）
var CACHE = "xin-dong-qy-v62";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/main.js",
  "./js/game/ui.js",
  "./js/game/state.js",
  "./js/engine/ai.js",
  "./js/engine/chat.js",
  "./js/engine/generator.js",
  "./js/engine/avatar.js",
  "./js/data/roles.js",
  "./js/data/scenarios.js",
  "./js/data/gifts.js",
  "./js/data/achievements.js",
  "./js/data/moments.js",
  "./js/data/avatar.js",
  "./js/data/portraits.js",
  "./js/data/gen-pools.js",
  "./js/data/resp/ceo.js",
  "./js/data/resp/doctor.js",
  "./js/data/resp/vampire.js",
  "./js/data/resp/knight.js",
  "./js/data/resp/senpai.js",
  "./js/data/resp/idol.js",
  "./js/data/resp/master.js",
  "./js/data/resp/bartender.js",
  "./js/data/resp/generic.js",
  "./js/data/resp/index.js",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  // 立绘图片也用缓存优先
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        // 缓存同源资源（含立绘图片）
        if (res.ok && (url.origin === self.location.origin || url.protocol === "data:")) {
          var clone = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(e.request, clone); });
        }
        return res;
      }).catch(function () {
        // 离线且无缓存：返回空
        return new Response("", { status: 503, statusText: "offline" });
      });
    })
  );
});
