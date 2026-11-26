/* Пробная часть игр. Подписка пока в разработке: оплаты и сбора почт здесь нет.
   Список бесплатного: GAMES_TRIAL_PLAN.md (согласован 2026-11-26). */
(function () {
  var STAFF_HASH = "ed6050309e534b91dea4ac6e5175f74d14f9f0f0249c66354939b296fc835522";
  var FULL = { 3: 1, 4: 1 };   /* эти две игры открыты полностью (решение 2026-11-26) */
  var FREE = { 1: 1, 2: 2, 5: 2, 6: 1, 7: 3, 8: 1, 9: 1, 10: 1, 11: 1, 12: 3, 13: 4, 14: 5, 15: 2, 16: 1, 17: 3, 18: 3, 19: 3, 20: 3, 21: 4 };
  var isLesson = typeof PICS !== "undefined" && typeof LESSON !== "undefined";

  function read(store, k) { try { return window[store].getItem(k); } catch (e) { return null; } }
  function write(k, v) { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} }
  var staff = read("localStorage", "igl_staff") === STAFF_HASH;

  /* служебный вход: ключ из ссылки уже убран из адреса скриптом в начале страницы */
  var pending = read("sessionStorage", "igl_staff_try");
  if (pending) {
    try { sessionStorage.removeItem("igl_staff_try"); } catch (e) {}
    if (pending === "off") { write("igl_staff", null); if (staff) location.reload(); }
    else if (window.crypto && crypto.subtle) crypto.subtle.digest("SHA-256", new TextEncoder().encode(pending)).then(function (d) {
      var h = [].map.call(new Uint8Array(d), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
      if (h === STAFF_HASH) { write("igl_staff", h); location.reload(); }
    });
  }
  if (staff) return;
  /* свой аккаунт: вошли в кабинете, сервер подтвердил полный доступ */
  try { var cab = JSON.parse(read("localStorage", "igl_cab") || "{}"); if (cab.token && cab.full && cab.fullUntil > Date.now()) return; } catch (e) {}

  var st = document.createElement("style");
  st.textContent =
    ".sub-mark{display:inline-block;margin:6px 12px;border-radius:999px;padding:5px 12px;font:800 13px Nunito,system-ui,sans-serif;background:#EEF5F3;color:#194F52}.sub-mark.full{background:#FFF1CF;color:#7a4b00}" +
    ".sub-note{max-width:900px;margin:62px auto 14px;box-sizing:border-box;background:#fffaf0;border-radius:16px;box-shadow:0 6px 16px rgba(90,60,20,.12);padding:12px 18px;text-align:center;font:700 15px/1.5 Nunito,system-ui,sans-serif;color:#4a3b2c}" +
    ".dots>*.locked{opacity:.3}" +
    ".gate{position:fixed;inset:0;z-index:200;background:rgba(25,52,73,.6);display:flex;align-items:center;justify-content:center;padding:16px;overflow:auto}" +
    ".gate>div{background:#FAF5EB;border-radius:18px;max-width:440px;width:100%;max-height:100%;overflow:auto;padding:24px;text-align:center;font-family:Nunito,system-ui,sans-serif;color:#193449}" +
    ".gate h2{margin:0 0 10px;font-size:22px;line-height:1.25}.gate p{margin:0 0 12px;font-size:16px;line-height:1.5}.gate small{display:block;font-size:13px;color:#5b6b76;margin-top:12px}.gate small a{color:#194F52}" +
    ".gate .gb{display:block;width:100%;box-sizing:border-box;border-radius:12px;padding:13px;font:800 16px Nunito,system-ui,sans-serif;text-decoration:none;cursor:pointer;margin-top:10px;border:0}" +
    ".gate .gb.main{background:#194F52;color:#fff}.gate .gb.ln{background:#fff;color:#193449;border:1.5px solid rgba(25,52,73,.3)}";
  document.head.appendChild(st);

  /* в собранном каталоге ссылки ведут на страницы игр, а не на lesson.html */
  function slugNum(a) { var h = a.getAttribute("href") || ""; return /tualetnye-dela-tyomy/.test(h) ? 3 : /(^|\/)ferma\//.test(h) ? 4 : 0; }
  if (!isLesson) { /* каталог */
    var main = document.querySelector("main");
    if (main) {
      var note = document.createElement("div");
      note.className = "sub-note";
      note.textContent = "Две игры бесплатны полностью, в остальных часть заданий доступна по подписке. Подписка на все интерактивные занятия и игры сейчас в разработке.";
      main.insertBefore(note, main.firstChild);
    }
    [].forEach.call(document.querySelectorAll("a.lcard"), function (a) {
      var m = document.createElement("span"); m.className = "sub-mark"; var num = +((a.getAttribute("href") || "").match(/[?&]l=(\d+)/) || [])[1] || slugNum(a);
      m.textContent = FULL[num] ? "💛 Бесплатно полностью" : "✨ Часть заданий доступна по подписке"; if (FULL[num]) m.className += " full"; a.appendChild(m);
    });
    return;
  }

  var num = LESSON + 1, n = FREE[num] || 1;
  if (FULL[num]) return;
  var bySteps = PICS.length === 1, first = 0;
  var okPic = function (i) { return bySteps || (i >= first && i < first + n); };
  var steps = bySteps ? orderOf(0) : [];
  var okStep = function (s) { return !bySteps || s === 0 || steps.indexOf(s) < n; };

  var box = null;
  function close() { if (box) { box.remove(); box = null; } }
  function wall() {
    if (box) return;
    box = document.createElement("div");
    box.className = "gate";
    box.innerHTML = "<div role='dialog' aria-modal='true' aria-label='Пробная часть пройдена'><h2>Пробная часть пройдена</h2>" +
      "<p>Остальные задания этой игры пока закрыты.</p>" +
      "<p><b>Подписка сейчас в разработке</b>, оформить её пока нельзя. Она откроет все интерактивные занятия и игры, 399&nbsp;₽&nbsp;в&nbsp;месяц.</p>" +
      "<a class='gb main' href='index.html'>Выбрать другое занятие</a><button type='button' class='gb ln'>Остаться в пробной части</button>" +
      "<small>Вопросы: <a href='mailto:igrovoylogoped@gmail.com'>igrovoylogoped@gmail.com</a></small></div>";
    box.querySelector("button").onclick = close;
    document.body.appendChild(box);
  }

  var go0 = window.go, set0 = window.setSub, fin0 = window.showFinale;
  window.go = function (i, s, quiet) {
    var j = Math.max(0, Math.min(PICS.length - 1, i));
    if (!okPic(j)) return wall();
    return go0(i, s, quiet);
  };
  window.setSub = function (s) { if (!okStep(s)) return wall(); return set0(s); };
  window.addEventListener("keydown", function (e) { if (box) { e.stopImmediatePropagation(); if (e.key === "Escape") close(); } }, true);

  if (first > 0) go0(first, undefined, true);
  var dots = document.getElementById("dots");
  if (dots && !bySteps) [].forEach.call(dots.children, function (d, i) { if (!okPic(i)) d.classList.add("locked"); });
  if (!bySteps && first + n < PICS.length) window.showFinale = function () { if (!okPic(cur)) return wall(); return cur === PICS.length - 1 ? wall() : fin0(); };

  window.IGL_GATE = { total: bySteps ? steps.length : PICS.length, free: n, first: first, bySteps: bySteps };
})();
