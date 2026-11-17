// 对话库合并索引 —— 把所有角色的对话库汇总到一个表
(function () {
  var table = {
    ceo: window.RESP_CEO,
    doctor: window.RESP_DOCTOR,
    vampire: window.RESP_VAMPIRE,
    knight: window.RESP_KNIGHT,
    senpai: window.RESP_SENPAI,
    idol: window.RESP_IDOL,
    master: window.RESP_MASTER,
    bartender: window.RESP_BARTENDER,
    custom: window.RESP_GENERIC,
    generic: window.RESP_GENERIC
  };
  window.RESPONSES = table;
})();
