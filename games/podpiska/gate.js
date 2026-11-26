/* Замки в копии занятий. Список бесплатного: GAMES_TRIAL_PLAN.md (согласован 2026-11-26). */
(function () {
  var FREE = { 1: 1, 2: 2, 3: 1, 4: 1, 5: 2, 6: 1, 7: 3, 8: 1, 9: 1, 10: 1, 11: 1, 12: 3, 13: 4, 14: 5, 15: 2, 16: 1, 17: 3, 18: 3, 19: 3, 20: 3, 21: 4 };
  var num = LESSON + 1, full = IGL.full(), n = FREE[num] || 1;

  var st = document.createElement("style");
  st.textContent = ".demo-tag{position:fixed;z-index:60;left:50%;transform:translateX(-50%);bottom:4px;background:#193449;color:#fff;font:700 11px/1.3 Nunito,system-ui,sans-serif;border-radius:999px;padding:3px 12px;white-space:nowrap;opacity:.82;pointer-events:none}" +
    ".sub-top{position:fixed;z-index:80;bottom:20px;left:16px;font:800 14px Nunito,system-ui,sans-serif;color:#4a3b2c;background:#fffaf0;border-radius:999px;box-shadow:0 6px 16px rgba(90,60,20,.14);text-decoration:none;padding:11px 18px}" +
    "@media (max-width:700px){.sub-top{bottom:auto;left:auto;top:12px;right:66px;padding:8px 12px;font-size:13px}}" +
    ".gate{position:fixed;inset:0;z-index:200;background:rgba(25,52,73,.6);display:flex;align-items:center;justify-content:center;padding:16px}" +
    ".gate div{background:#FAF5EB;border-radius:18px;max-width:430px;width:100%;padding:26px;text-align:center;font-family:Nunito,system-ui,sans-serif;color:#193449}" +
    ".gate h2{margin:0 0 10px;font-size:23px;line-height:1.25}.gate p{margin:0 0 18px;font-size:16px;line-height:1.5}" +
    ".gate a,.gate button{display:block;width:100%;box-sizing:border-box;border-radius:12px;padding:13px;font:800 16px Nunito,system-ui,sans-serif;text-decoration:none;cursor:pointer;margin-top:10px}" +
    ".gate a{background:#C4561F;color:#fff}.gate button{background:#fff;color:#193449;border:1.5px solid rgba(25,52,73,.3)}" +
    (full ? "#author,#promo,.hotbox{display:none!important}" : ".dots>*.locked{opacity:.3}");
  document.head.appendChild(st);

  function add(tag, cls, html) { var e = document.createElement(tag); e.className = cls; e.innerHTML = html; document.body.appendChild(e); return e; }
  add("div", "demo-tag", "Демонстрация: деньги не списываются");
  var top = add("a", "sub-top", full ? "Моя подписка" : "Подписка");
  top.href = "podpiska/index.html?s=" + (full ? "my" : "sub");

  /* ссылки «все занятия» ведут в демонстрационный каталог */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href^='index.html']");
    if (a) { e.preventDefault(); location.href = "podpiska/zanyatiya.html"; }
  }, true);

  if (full) {
    var h1 = document.querySelector("h1");
    if (h1) { h1.textContent = "Игровой логопед"; if (h1.nextElementSibling) h1.nextElementSibling.textContent = "Интерактивные занятия и игры"; }
    return;
  }

  /* где ограничивать: по заданиям (картинкам) или, если картинка одна, по шагам */
  var bySteps = PICS.length === 1;
  var first = 0;
  if (num === 3) { /* бесплатна история «Тёма моет руки» */
    for (var i = 0; i < PICS.length; i++) if (/рук/i.test(PICS[i].title)) { first = i; break; }
  }
  var okPic = function (i) { return bySteps || (i >= first && i < first + n); };
  var steps = bySteps ? orderOf(0) : [];
  var okStep = function (s) { return !bySteps || s === 0 || steps.indexOf(s) < n; };

  var box = null;
  function wall() {
    if (box) return;
    box = add("div", "gate", "<div role='dialog' aria-modal='true'><h2>Пробная часть пройдена</h2>" +
      "<p>Остальные задания этой игры и все занятия открываются по подписке: " + IGL.DEMO.price + " ₽ в месяц.</p>" +
      "<a href='podpiska/index.html?s=sub'>Оформить подписку</a><a href='podpiska/index.html?s=email' style='background:#194F52'>Уже подписаны? Войти</a>" +
      "<button type='button'>Остаться в пробной части</button></div>");
    box.querySelector("button").onclick = function () { box.remove(); box = null; };
  }

  var go0 = window.go, set0 = window.setSub, fin0 = window.showFinale;
  window.go = function (i, s, quiet) {
    var j = Math.max(0, Math.min(PICS.length - 1, i));
    if (!okPic(j)) return wall();
    return go0(i, s, quiet);
  };
  window.setSub = function (s) { if (!okStep(s)) return wall(); return set0(s); };
  /* клавиши и кнопки при открытом окне не листают */
  window.addEventListener("keydown", function (e) { if (box) { e.stopImmediatePropagation(); if (e.key === "Escape") { box.remove(); box = null; } } }, true);

  if (first > 0) go0(first, undefined, true);
  var dots = document.getElementById("dots");
  if (dots && !bySteps) [].forEach.call(dots.children, function (d, i) { if (!okPic(i)) d.classList.add("locked"); });
  /* последнее бесплатное задание в игре с историей не в конце списка: «Дальше» показывает окно */
  if (!bySteps && first + n < PICS.length) window.showFinale = function () { if (!okPic(cur)) return wall(); return cur === PICS.length - 1 ? wall() : fin0(); };

  window.IGL_GATE = { total: bySteps ? steps.length : PICS.length, free: n, first: first, bySteps: bySteps };
})();
