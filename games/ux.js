/* Удобство раздела игр (2026-11-26):
   1) вопросы при входе скрыты, кнопка подсвечена; в играх с микрофоном панель открыта и микрофон запрашивается сразу;
   2) кнопка «на весь экран» один раз подписана;
   3) полный экран не сбрасывается при переходах внутри раздела: следующие страницы открываются в рамке поверх текущей;
   4) возврат в список к той же игре. */
(function () {
  var inFrame = false;
  try { inFrame = window.parent !== window && !!window.parent.IGL_FS; } catch (e) {}
  var host = inFrame ? window.parent.IGL_FS : null;
  var root = document.documentElement;
  var canFS = !!(inFrame ? window.parent.document.documentElement.requestFullscreen : root.requestFullscreen);
  var isLesson = typeof PICS !== "undefined" && typeof LESSON !== "undefined";
  var isCatalog = !isLesson && !!document.querySelector("a.lcard");
  var GAMES = new URL(".", document.currentScript.src).pathname;   // .../games/

  function seen(k) { try { return localStorage.getItem(k) === "1"; } catch (e) { return false; } }
  function mark(k) { try { localStorage.setItem(k, "1"); } catch (e) {} }

  var st = document.createElement("style");
  st.textContent =
    "@keyframes uxglow{0%,100%{box-shadow:0 0 0 0 rgba(240,166,43,.75),0 6px 16px rgba(90,60,20,.16)}50%{box-shadow:0 0 0 9px rgba(240,166,43,0),0 6px 16px rgba(90,60,20,.16)}}" +
    ".ux-glow{animation:uxglow 1.7s ease-in-out infinite;outline:2px solid #f0a62b}" +
    ".ux-tip{position:fixed;z-index:95;max-width:230px;background:#193449;color:#fff;font:700 13.5px/1.4 Nunito,system-ui,sans-serif;border-radius:12px;padding:9px 13px;box-shadow:0 8px 22px rgba(25,52,73,.28);cursor:pointer}" +
    ".ux-tip:before{content:'';position:absolute;width:10px;height:10px;background:#193449;transform:rotate(45deg);left:var(--ax,50%);margin-left:-5px}" +
    ".ux-tip.below:before{top:-5px}.ux-tip.above:before{bottom:-5px}" +
    ".ux-fs{position:absolute;z-index:75;right:176px;top:14px;font:800 14px/1 Nunito,system-ui,sans-serif;color:#194F52;background:#fffaf0;border:0;border-radius:999px;box-shadow:0 6px 16px rgba(90,60,20,.16);padding:11px 16px;cursor:pointer;white-space:nowrap}" +
    "@media (max-width:700px){.ux-fs{display:none}}" +
    "@media (prefers-reduced-motion:reduce){.ux-glow{animation:none}}";
  document.head.appendChild(st);

  /* подпись-подсказка у кнопки */
  function tip(el, text, onceKey) {
    if (!el || seen(onceKey) || !el.offsetParent) return;
    el.classList.add("ux-glow");
    var t = document.createElement("div"); t.className = "ux-tip"; t.textContent = text; document.body.appendChild(t);
    function place() {
      var r = el.getBoundingClientRect(), w = t.offsetWidth, h = t.offsetHeight, below = r.top < innerHeight / 2;
      var x = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2));
      t.className = "ux-tip " + (below ? "below" : "above");
      t.style.left = x + "px"; t.style.top = (below ? r.bottom + 12 : r.top - h - 12) + "px";
      t.style.setProperty("--ax", (r.left + r.width / 2 - x) + "px");
    }
    function done() { mark(onceKey); el.classList.remove("ux-glow"); t.remove(); removeEventListener("resize", place); removeEventListener("scroll", place); }
    place(); addEventListener("resize", place); addEventListener("scroll", place, { passive: true });
    el.addEventListener("click", done, { once: true }); t.onclick = done;
    setTimeout(function () { if (t.isConnected) { t.remove(); } }, 12000);   // подпись уходит, подсветка остаётся до первого нажатия
  }

  /* ---------- полный экран ---------- */
  var frame = null;
  var shell = {
    toggle: function () {
      if (document.fullscreenElement) { try { screen.orientation.unlock(); } catch (e) {} document.exitFullscreen(); }
      else root.requestFullscreen().then(function () { try { screen.orientation.lock("landscape").catch(function () {}); } catch (e) {} }).catch(function () {});
    },
    isOn: function () { return !!document.fullscreenElement; }
  };
  function openFrame(url) {
    if (frame) { frame.src = url; return; }
    if (typeof stopMic === "function") stopMic();
    try { speechSynthesis.cancel(); } catch (e) {}
    history.pushState({ uxFrame: 1 }, "", url);
    frame = document.createElement("iframe");
    frame.setAttribute("allow", "fullscreen; microphone; autoplay");
    frame.title = "Игры";
    frame.style.cssText = "position:fixed;inset:0;width:100%;height:100%;border:0;z-index:100000;background:#FAF5EB";
    frame.addEventListener("load", function () {
      try { var l = frame.contentWindow.location; history.replaceState(history.state, "", l.pathname + l.search); document.title = frame.contentDocument.title; frame.contentWindow.focus(); } catch (e) {}
    });
    frame.src = url;
    document.body.appendChild(frame);
    [].forEach.call(document.body.children, function (c) { if (c !== frame) c.style.visibility = "hidden"; });
    document.body.style.overflow = "hidden";
  }
  if (!inFrame) {
    window.IGL_FS = shell;
    /* «Назад» браузера до исходной страницы: рамка убирается, страница перечитывается */
    addEventListener("popstate", function () { if (frame && !(history.state && history.state.uxFrame)) location.reload(); });
  }

  /* переходы внутри раздела игр */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || a.target === "_blank") return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin) return;
    var inside = u.pathname.indexOf(GAMES) === 0;
    if (inFrame) { if (!inside) a.target = "_top"; return; }
    if (inside && document.fullscreenElement && !(u.pathname === location.pathname && u.search === location.search)) { e.preventDefault(); openFrame(u.href); }
  });

  var fsToggle = inFrame ? function () { host.toggle(); } : shell.toggle;

  if (isLesson) {
    var fsBtn = document.getElementById("fs"), hints = document.getElementById("hints");
    if (canFS) { window.toggleFS = fsToggle; if (fsBtn) fsBtn.onclick = fsToggle; }
    var kind = PICS[0].kind, needsMic = kind === "blow" || kind === "voice";
    var wide = matchMedia("(min-width:901px)").matches;
    if (needsMic) {
      document.body.classList.remove("noside"); fit();
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) setTimeout(function () { startMic(); }, 700);
      /* без нажатия браузер может держать звук на паузе: будим при первом касании */
      var wake = function () { try { if (MIC && MIC.ac && MIC.ac.state === "suspended") MIC.ac.resume(); } catch (e) {} };
      document.addEventListener("pointerdown", wake); document.addEventListener("keydown", wake);
    } else if (wide) {
      document.body.classList.add("noside"); fit();
      if (hints) {
        hints.classList.add("ux-glow");
        hints.addEventListener("click", function () { hints.classList.remove("ux-glow"); });
        setTimeout(function () { tip(hints, "Здесь вопросы для ребёнка и подсказки", "ux_tip_q"); }, 900);
      }
    }
    if (canFS && wide) setTimeout(function () { tip(fsBtn, "Можно играть на весь экран", "ux_tip_fs"); }, 1200);
    return;
  }

  /* каталог и страницы игр: своя кнопка полного экрана */
  if (canFS) {
    var b = document.createElement("button"); b.type = "button"; b.className = "ux-fs"; b.textContent = "⛶ На весь экран";
    b.onclick = fsToggle;
    var upd = function () { var on = inFrame ? host.isOn() : shell.isOn(); b.textContent = on ? "⛶ Свернуть" : "⛶ На весь экран"; };
    (inFrame ? window.parent.document : document).addEventListener("fullscreenchange", function () { if (b.isConnected) upd(); });
    document.body.appendChild(b); upd();
    if (isCatalog) setTimeout(function () { tip(b, "Все игры можно открыть на весь экран", "ux_tip_fs_cat"); }, 1200);
  }

  /* возврат к той же игре в списке */
  if (isCatalog) {
    var cards = [].slice.call(document.querySelectorAll("a.lcard"));
    cards.forEach(function (c) { c.addEventListener("click", function () { try { sessionStorage.setItem("ux_card", c.getAttribute("href")); } catch (e) {} }); });
    var nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    var fromGames = document.referrer && new URL(document.referrer).pathname.indexOf(GAMES) === 0;
    var last = null; try { last = sessionStorage.getItem("ux_card"); } catch (e) {}
    if (last && (fromGames || (nav && nav.type === "back_forward"))) {
      var card = cards.filter(function (c) { return c.getAttribute("href") === last; })[0];
      if (card) {
        var go = function () { root.style.scrollBehavior = "auto"; card.classList.add("in", "show", "visible"); card.scrollIntoView({ block: "center" }); root.style.scrollBehavior = ""; };
        go(); addEventListener("load", function () { setTimeout(go, 60); });
      }
    }
  }
})();
