/* Пробная часть игр и доступ подписчика. Оплата оформляется только в кабинете (kabinet/).
   SALES (apply_lock.py): false = для гостей «подписка в разработке», true = подписка продаётся всем.
   Список бесплатного: GAMES_TRIAL_PLAN.md (согласован 2026-11-26). */
(function () {
  var STAFF_HASH = "ed6050309e534b91dea4ac6e5175f74d14f9f0f0249c66354939b296fc835522", API = "https://script.google.com/macros/s/AKfycbwZ8Jdt7uZmugQ5z6xnE65OTWZKBIsvM2k2c0Yx2FtzrAUR632k-S2-y-SNgLjzvFAH/exec", SALES = true;
  var FULL = { 2: 1, 11: 1, 26: 1 };   /* открыты полностью только «Где мячик?», «Что звучит?», «Первые слова» (решение 2026-11-28) */
  var FREE = { 1: 1, 3: 1, 4: 1, 5: 2, 6: 1, 7: 3, 8: 1, 9: 1, 10: 1, 11: 1, 12: 3, 13: 4, 14: 5, 15: 2, 16: 1, 17: 3, 18: 3, 19: 3, 20: 3, 21: 4, 22: 1, 23: 3, 24: 1, 25: 1, 26: 2, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1 };
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
  var cab = {};
  try { cab = JSON.parse(read("localStorage", "igl_cab") || "{}") || {}; } catch (e) {}
  /* свой аккаунт: вошли в кабинете, сервер подтвердил полный доступ */
  if (cab.token && cab.full && cab.fullUntil > Date.now()) return;

  /* подписчик: доступ до конца оплаченного срока, который сообщил сервер */
  function paidNow(c) { return !!(c.token && c.access && c.paidUntil > Date.now()); }
  var subscriber = paidNow(cab);
  refresh();
  /* раз в час (а когда срок вышел, раз в минуту) спрашиваем сервер: продление, новый отказ, отключённое устройство */
  function refresh() {
    if (!cab.token || !window.fetch) return;
    var age = Date.now() - (cab.checkedAt || 0);
    if (age < (cab.access && cab.paidUntil <= Date.now() ? 60e3 : 3600e3)) return;
    fetch(API, { method: "POST", body: JSON.stringify({ action: "me", email: cab.email, token: cab.token }) })
      .then(function (r) { return r.json(); })
      .then(function (r) {
        var now = {}; try { now = JSON.parse(read("localStorage", "igl_cab") || "{}") || {}; } catch (e) {}
        if (now.token !== cab.token) return;                       /* пока ждали, вышли или вошли заново */
        if (r.ok) { now.access = r.access === true; now.paidUntil = r.paidUntil || 0; now.canPay = r.canPay === true; }
        else if (r.error === "auth") { delete now.token; now.access = false; now.full = false; }
        else return;
        now.checkedAt = Date.now();
        write("igl_cab", JSON.stringify(now));
        var saved = {}; try { saved = JSON.parse(read("localStorage", "igl_cab") || "{}") || {}; } catch (e) {}
        if (saved.checkedAt === now.checkedAt && paidNow(saved) !== subscriber) location.reload();
      }).catch(function () {});
  }
  if (subscriber) return cleanView();

  /* подписчику: без рекламы и соцсетей, без имени в приветствиях */
  function cleanView() {
    var css = document.createElement("style");
    css.textContent = "#promo,#author,.hotbox,.hlinks,.hnote,.homebtn,.about,a[href*='t.me/'],a[href*='instagram.com'],a[href*='vk.ru'],a[href*='youtube.com']{display:none!important}";
    document.head.appendChild(css);
    function greet() {
      [].forEach.call(document.querySelectorAll("#mcard .nsay,.bubble"), function (e) {
        var t = e.innerHTML.replace(/Меня зовут\s*<b>Александра Карачинцева<\/b>\.\s*/, "").replace(/Я Александра\.\s*/, "");
        if (t !== e.innerHTML) e.innerHTML = t;
      });
    }
    var card = document.getElementById("mcard");
    if (card && window.MutationObserver) new MutationObserver(greet).observe(card, { childList: true, subtree: true });
    greet();
    if (isLesson) {
      var h1 = document.querySelector("h1");
      if (h1) { h1.textContent = "Игровой логопед"; if (h1.nextElementSibling) h1.nextElementSibling.textContent = "Интерактивные занятия и игры"; }
    } else {
      var about = document.querySelector(".about");
      if (about && about.previousElementSibling && about.previousElementSibling.tagName === "H2") about.previousElementSibling.style.display = "none";
    }
    function rename() { var s = document.querySelector(".cab-btn span"); if (s) s.textContent = "Моя подписка"; }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", rename); else rename();
  }
  var selling = SALES || cab.canPay === true;

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
    if (!document.querySelector("a.lcard")) return;   /* новый каталог сам подписывает карточки */
    var main = document.querySelector("main");
    if (main) {
      var note = document.createElement("div");
      note.className = "sub-note";
      note.textContent = "Три игры бесплатны полностью, остальные можно только попробовать. " + (selling ? "Подписка на все интерактивные занятия и игры: первый месяц 299 ₽ для новых подписчиков, дальше 399 ₽ в месяц. Оформляется в кабинете." : "Подписка на все интерактивные занятия и игры сейчас в разработке.");
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
  var bySteps = PICS.length === 1, first = num === 3 && PICS.length > 1 ? 1 : 0;   /* в туалетной истории пробная часть: «Тёма моет руки» */
  var okPic = function (i) { return bySteps || (i >= first && i < first + n); };
  var steps = bySteps ? orderOf(0) : [];
  var okStep = function (s) { return !bySteps || s === 0 || steps.indexOf(s) < n; };

  /* Проба в закрытой игре (решение 2026-11-28): всего 2 действия, без ощущения пройденного задания.
     Действие = выполненное задание (звук успеха, звёздочки, похвала) или переход дальше. Окно не закрывается. */
  var LIMIT = 2, MAX_TAPS = 12, MAX_MS = 90000;
  var box = null, over = false, acts = 0, fresh = false, lastWin = 0, touched = false, taps = 0, wallTimer = 0;
  function wall() {
    over = true;
    clearTimeout(wallTimer);
    if (box) return;
    box = document.createElement("div");
    box.className = "gate";
    box.innerHTML = "<div role='dialog' aria-modal='true' aria-label='Это только начало игры'><h2>Это только начало игры</h2>" +
      "<p>Остальные задания открываются по подписке.</p>" +
      (selling
        ? "<p>Первый месяц 299&nbsp;₽ для новых подписчиков, дальше 399&nbsp;₽ в&nbsp;месяц. На&nbsp;3&nbsp;и&nbsp;12&nbsp;месяцев выгоднее.</p><a class='gb main' href='kabinet/' target='_top'>Оформить подписку</a><a class='gb ln' href='kabinet/' target='_top'>Уже подписаны? Войти</a>"
        : "<p><b>Подписка сейчас в разработке</b>, оформить её пока нельзя.</p>") +
      "<a class='gb ln' href='index.html' target='_top'>Другие игры</a>" +
      "<small>Вопросы: <a href='mailto:igrovoylogoped@gmail.com'>igrovoylogoped@gmail.com</a></small></div>";
    document.body.appendChild(box);
    try { if (window.stopMic) window.stopMic(); } catch (e) {}
  }
  function wallSoon() { over = true; if (!box && !wallTimer) wallTimer = setTimeout(wall, 1800); }

  /* выполненное задание: несколько реакций подряд считаются за одну */
  function success() {
    if (!touched || over) return;
    var now = Date.now();
    if (now - lastWin < 3000) return;
    lastWin = now; fresh = true; acts += 1;
    if (acts >= LIMIT) wallSoon();
  }
  ["chime", "gxPraise", "miniStars", "burst"].forEach(function (name) {
    var f = window[name];
    if (typeof f !== "function") return;
    window[name] = function () {
      success();
      if (name === "burst" && (over || acts >= LIMIT)) return;      /* без праздника на последнем пробном действии */
      return f.apply(this, arguments);
    };
  });
  /* переход дальше: если он сразу после выполненного задания, второй раз не считаем */
  function step() {
    if (over) { wall(); return false; }
    if (!touched) return true;
    if (fresh) { fresh = false; return true; }
    if (acts >= LIMIT) { wall(); return false; }
    acts += 1;
    return true;
  }
  function gameArea(t) { return t && t.closest && !t.closest(".gate, .cab-btn, header, .topbar, a, #modal") && t.closest("button, .frame, #frame, #side, .gx, .ng"); }
  window.addEventListener("pointerdown", function (e) {
    if (box) return;
    if (!gameArea(e.target)) return;
    if (!touched) { touched = true; setTimeout(wall, MAX_MS); }
    if (++taps > MAX_TAPS) wall();
  }, true);

  var go0 = window.go, set0 = window.setSub;
  window.go = function (i, s, quiet) {
    var j = Math.max(0, Math.min(PICS.length - 1, i));
    if (!okPic(j)) return wall();
    if (!quiet && !step()) return;
    return go0(i, s, quiet);
  };
  var inSet = false;
  window.setSub = function (s) {
    if (!okStep(s)) return wall();
    if (!inSet && !step()) return;
    inSet = true;
    try { return set0(s); } finally { inSet = false; }
  };
  window.addEventListener("keydown", function (e) {
    if (box) { e.stopImmediatePropagation(); return; }
    if (!touched && /Arrow|Enter| /.test(e.key)) touched = true;
  }, true);

  if (first > 0) go0(first, undefined, true);
  var dots = document.getElementById("dots");
  if (dots && !bySteps) [].forEach.call(dots.children, function (d, i) { if (!okPic(i)) d.classList.add("locked"); });
  /* в пробной части нет финала с похвалой */
  window.showFinale = function () { return wall(); };
  if (window.meetFinale) window.meetFinale = function () { return wall(); };
  window.IGL_GATE = { total: bySteps ? steps.length : PICS.length, free: n, first: first, bySteps: bySteps };
})();
