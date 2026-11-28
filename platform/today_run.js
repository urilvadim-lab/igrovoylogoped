/* Игра, запущенная из «Занятия на сегодня» (lesson.html?...&today=1):
   в конце сама отмечается сыгранной и возвращает в занятие, где подсвечена следующая игра.
   Обычный запуск игры из каталога не меняется. */
(function () {
  if (new URLSearchParams(location.search).get("today") !== "1") return;
  function read(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }
  var run = read("igl_today_run");
  if (!run || run.date !== new Date().toLocaleDateString("sv") || !read("igl_today")) return;
  var BACK = "/games/segodnya/#go", AUTO_SEC = 10, timer = 0;

  function mark() {
    var s = read("igl_today");
    if (!s || !s.done) return;
    if (s.done.indexOf(run.i) < 0) s.done.push(run.i);
    try { localStorage.setItem("igl_today", JSON.stringify(s)); } catch (e) {}
  }
  function left() {
    var s = read("igl_today") || { done: [] };
    return [0, 1, 2].filter(function (k) { return k !== run.i && s.done.indexOf(k) < 0; });
  }
  function nextLabel() { return left().length ? "Дальше: следующая игра ›" : "Завершить занятие ★"; }
  function stop() { if (timer) { clearInterval(timer); timer = 0; } }

  var css = document.createElement("style");
  css.textContent = "#promo{display:none!important}" +
    ".tr-box{margin:14px 0 4px;background:#dfeee9;border-radius:16px;padding:12px 16px;color:#14443f;font-weight:700;line-height:1.45;text-align:center}" +
    ".tr-box small{display:block;margin-top:4px;font-weight:600;font-size:14px}" +
    ".tr-box button{border:0;background:none;padding:0 0 0 6px;font:inherit;text-decoration:underline;cursor:pointer;color:#14443f}";
  document.head.appendChild(css);

  function finale(link) {
    link.setAttribute("data-tr", "1");
    mark();
    var rest = left(), done = 3 - rest.length;
    link.href = BACK;
    link.textContent = nextLabel();
    var box = document.createElement("div");
    box.className = "tr-box";
    var head = document.createElement("div");
    head.textContent = "★ Отмечено в занятии на сегодня: сыграно " + done + " из 3." +
      (rest.length ? " Следующая: «" + run.titles[rest[0]] + "»." : " Занятие пройдено!");
    var info = document.createElement("small"), sec = document.createElement("span"), stay = document.createElement("button");
    stay.type = "button"; stay.textContent = "Остаться здесь";
    info.appendChild(sec); info.appendChild(stay); box.appendChild(head); box.appendChild(info);
    var tip = link.closest(".mnav").parentNode.querySelector(".tip");
    if (tip) tip.innerHTML = tip.innerHTML.replace(" Можно выбрать другое занятие.", "");
    var nav = link.closest(".mnav");
    nav.parentNode.insertBefore(box, nav);
    var n = AUTO_SEC;
    function show() { sec.textContent = "Вернёмся в занятие через " + n + " с."; }
    show(); stop();
    timer = setInterval(function () {
      if (!document.body.contains(box) || !document.querySelector("#modal.show")) { stop(); return; }
      n -= 1; if (n <= 0) { stop(); location.href = BACK; return; }
      show();
    }, 1000);
    stay.addEventListener("click", function () { stop(); info.remove(); });
    var again = document.getElementById("fa");
    if (again) again.addEventListener("click", stop);
  }

  /* закрытая часть игры: пробные задания пройдены, можно идти дальше по занятию */
  function wall(card) {
    card.setAttribute("data-tr", "1");
    var a = document.createElement("a");
    a.className = "gb main"; a.href = BACK; a.target = "_top"; a.textContent = nextLabel();
    a.addEventListener("click", mark);
    [].forEach.call(card.querySelectorAll("a.gb.main"), function (x) { x.classList.remove("main"); x.classList.add("ln"); });
    card.insertBefore(a, card.querySelector(".gb"));
  }

  function check() {
    var link = document.querySelector('#modal.show #mcard .mnav a[href="index.html"]:not([data-tr])');
    if (link) finale(link);
    var card = document.querySelector(".gate > div:not([data-tr])");
    if (card) wall(card);
    var top = document.querySelector('a[href="index.html"][title="Все занятия"]');
    if (top) { top.href = BACK; top.textContent = "‹ К занятию на сегодня"; top.title = "Занятие на сегодня"; }
  }
  new MutationObserver(check).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  check();
})();
