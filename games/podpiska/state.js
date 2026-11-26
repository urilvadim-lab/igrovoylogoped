/* Состояние демонстрации подписки. Хранится только в этом браузере. */
var IGL = (function () {
  var KEY = "igl_demo_sub", mem = null;
  var DEMO = { email: "demo@igrovoylogoped.ru", code: "246810", price: "399" };
  function get() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return mem || {}; }
  }
  function set(v) {
    mem = v;
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
  }
  function until() {
    var d = new Date(), day = d.getDate();
    d.setDate(1); d.setMonth(d.getMonth() + 1);
    d.setDate(Math.min(day, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()));
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }).replace(/\s*г\.$/, "");
  }
  /* доступ открыт: вошли и подписка оплачена (даже если карта уже отвязана) */
  function full() { var s = get(); return !!(s.logged && s.paid); }
  return { DEMO: DEMO, get: get, set: set, until: until, full: full };
})();
