/* Что видит тот, у кого уже есть доступ (подписка или служебный): без меток о бесплатном,
   без цен и приглашений купить. Для гостя файл ничего не делает. */
(function () {
  var c = {};
  try { c = JSON.parse(localStorage.getItem("igl_cab") || "{}") || {}; } catch (e) {}
  var has = !!(c.token && ((c.access && c.paidUntil > Date.now()) || (c.full && c.fullUntil > Date.now())));
  if (!has) return;

  function all(s) { return [].slice.call(document.querySelectorAll(s)); }
  function drop(s) { all(s).forEach(function (x) { x.remove(); }); }
  function button(a, text, href) { a.textContent = text; if (href) a.setAttribute("href", href); a.removeAttribute("target"); }
  var path = location.pathname.replace(/index\.html$/, "");

  if (path === "/games/") {
    drop(".gc .badge");
    all(".gc .gb a.btn").forEach(function (a) { a.textContent = "Играть"; a.classList.remove("line"); a.classList.add("main"); });
    var free = document.querySelector('.chip[data-v="free"]');
    if (free) { if (free.classList.contains("on")) free.click(); free.remove(); }
    drop(".today .soon");
    all(".today p").forEach(function (p) { p.textContent = p.textContent.replace(/\s*Один\sпробный\sнабор[^.]*\./, ""); });
    all(".today a.btn").forEach(function (a) { button(a, "Открыть занятие на сегодня →"); });
  }

  if (path === "/") {
    /* цены, скидки, пробные игры и пробный подбор подписчику не нужны */
    drop(".ny, .nyb, #price, #free, #plan");
    var row = all(".hero .row a");
    if (row[0]) button(row[0], "Открыть занятие на сегодня", "/games/segodnya/");
    if (row[1]) button(row[1], "Все игры", "/games/");
    all(".mbar a, .final a.btn").forEach(function (a) { button(a, "Занятие на сегодня", "/games/segodnya/"); });
    all(".final p").forEach(function (p) { p.textContent = "Сядьте рядом с ребёнком и откройте занятие на сегодня."; });
    drop(".path .soon");
    all(".path p").forEach(function (p) { p.textContent = p.textContent.replace(/\s*Один\sпробный\sнабор[^.]*\./, ""); });
    all(".path a.btn").forEach(function (a) { button(a, "Открыть занятие →"); });
    all('a[href="#free"]').forEach(function (a) { a.setAttribute("href", "/games/"); });
    all('a[href="#price"]').forEach(function (a) { a.setAttribute("href", "/games/kabinet/"); });
  }

  /* страница отдельной игры: пометка о бесплатной части и о подписке */
  drop(".hero span.free");
})();
