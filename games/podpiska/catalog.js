/* Каталог демонстрации: пометки о пробной части, кнопка подписки. */
(function () {
  var full = IGL.full();
  var st = document.createElement("style");
  st.textContent = ".demo-bar{position:sticky;top:0;z-index:90;display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center;justify-content:center;background:#193449;color:#fff;padding:10px 14px;font:700 14px/1.4 Nunito,system-ui,sans-serif}" +
    ".demo-bar a{color:#193449;background:#fff;border-radius:999px;padding:7px 16px;text-decoration:none}" +
    ".sub-mark{display:inline-block;margin:6px 12px;border-radius:999px;padding:5px 12px;font:800 13px Nunito,system-ui,sans-serif;background:#F9E4D5;color:#8a3d12}" +
    ".homebtn{display:none!important}" +
    (full ? ".sbtn,.appnote,a[href*='t.me/'],a[href*='instagram.com'],a[href*='vk.ru'],a[href*='youtube.com']{display:none!important}" : "");
  document.head.appendChild(st);
  var bar = document.createElement("div");
  bar.className = "demo-bar";
  bar.innerHTML = "<span>Демонстрация подписки: деньги не списываются</span><span>" + (full ? "Подписка активна: все задания открыты" : "Открыта пробная часть") + "</span>" +
    "<a href='podpiska/index.html?s=" + (full ? "my" : "sub") + "'>" + (full ? "Моя подписка" : "Подписка 399 ₽ в месяц") + "</a>" +
    (full ? "" : "<a href='podpiska/index.html?s=email'>Войти</a>");
  document.body.insertBefore(bar, document.body.firstChild);
  if (!full) [].forEach.call(document.querySelectorAll("a.lcard"), function (a) {
    var m = document.createElement("span"); m.className = "sub-mark"; m.textContent = "🔒 Часть заданий по подписке"; a.appendChild(m);
  });
})();
