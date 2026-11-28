/* Тихие звуки платформы: только в ответ на действие. Настоящие записи из games/audio (CC0 и общественное достояние).
   Выбор «со звуком / без звука» запоминается на устройстве. */
(function () {
  var KEY = "igl_sound", off = false, cache = {};
  try { off = localStorage.getItem(KEY) === "off"; } catch (e) {}
  var SOUNDS = { tap: ["g_drum", 0.14, 1.7], star: ["g_bell", 0.28, 1.15], cheer: ["h_clap", 0.3, 1] };

  function play(name, limitMs) {
    if (off) return;
    var s = SOUNDS[name];
    try {
      var a = cache[name] || (cache[name] = new Audio("/games/audio/" + s[0] + ".mp3"));
      clearInterval(a._fade); clearTimeout(a._stop);
      a.pause(); a.currentTime = 0; a.volume = s[1]; a.playbackRate = s[2];
      var p = a.play(); if (p && p.catch) p.catch(function () {});
      if (limitMs) a._stop = setTimeout(function () {
        a._fade = setInterval(function () {
          if (a.volume > 0.04) a.volume -= 0.04; else { clearInterval(a._fade); a.pause(); }
        }, 50);
      }, limitMs);
    } catch (e) {}
  }

  /* до того, как страница перерисуется после нажатия */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("button");
    if (!b || b.disabled || b.classList.contains("snd")) return;
    if (b.hasAttribute("data-done")) {
      var last = document.querySelectorAll(".stars .got").length === 2;
      play("star");
      if (last) setTimeout(function () { play("cheer", 1500); }, 450);
    } else if (b.matches(".age, .sk, .opt, .qgrid .q button, .steps3 button, .mini button, .chip[data-g]")) {
      play("tap", 320);
    }
  }, true);

  var t = document.createElement("button");
  t.type = "button"; t.className = "snd";
  function label() {
    t.textContent = off ? "🔇" : "🔊";
    var text = off ? "Включить звуки" : "Выключить звуки";
    t.setAttribute("aria-label", text); t.title = text; t.setAttribute("aria-pressed", off ? "true" : "false");
  }
  t.addEventListener("click", function () {
    off = !off;
    try { localStorage.setItem(KEY, off ? "off" : "on"); } catch (e) {}
    if (off) Object.keys(cache).forEach(function (k) { cache[k].pause(); });
    label(); if (!off) play("tap", 320);
  });
  label();
  var css = document.createElement("style");
  css.textContent = ".snd{position:fixed;left:14px;bottom:14px;z-index:40;width:46px;height:46px;border-radius:50%;border:1px solid #e9dfcd;background:#fff;box-shadow:0 8px 22px rgba(25,52,73,.16);font-size:20px;line-height:1;cursor:pointer;padding:0}" +
    "@media(max-width:900px){body.has-mbar .snd{bottom:82px}.snd{width:42px;height:42px;left:10px}}";
  document.head.appendChild(css);
  if (document.querySelector(".mbar")) document.body.classList.add("has-mbar");
  document.body.appendChild(t);
})();
