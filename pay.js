/* Кнопка «Купить» -> оплата ЮKassa через Google-скрипт. Подключается только на страницах товаров. */
(function () {
  var API = "https://script.google.com/macros/s/AKfycbyNhGfsa4Ah72qm0I6i31HULQ1FSdf7NzqHstHfnYcHOsebX-GNlVkh1ag0Oc7uVgmF/exec";
  var LIVE = true; // true = кнопки оплаты включены для всех; false = только для проверки (адрес с ?pay=1)

  var test = false;
  try {
    if (location.search.indexOf("pay=1") > -1) localStorage.setItem("payTest", "1");
    if (location.search.indexOf("pay=0") > -1) localStorage.removeItem("payTest");
    test = localStorage.getItem("payTest") === "1";
  } catch (e) {}
  if (!LIVE && !test) return;

  var m = location.pathname.match(/\/products\/(course|guide-toilet|guide-behavior)\/?/);
  // в общем списке товаров одна кнопка покупки: «Купить курс»
  var list = /\/products\/(index\.html)?$/.test(location.pathname);
  if (!m && !list) return;
  var id = m ? m[1] : "course";
  var T = {
    "course": ["Видеокурс «Дефекация сидя»", "3 500 ₽"],
    "guide-toilet": ["Руководство «Туалетный навык без давления»", "999 ₽"],
    "guide-behavior": ["Руководство «Как преодолеть истерики и протесты у ребёнка»", "999 ₽"]
  }[id];

  var box = document.createElement("div");
  box.className = "paymodal";
  box.hidden = true;
  box.innerHTML =
    '<div class="pm-back"></div><div class="pm-card" role="dialog" aria-modal="true" aria-labelledby="pm-h">' +
    '<button type="button" class="pm-x" aria-label="Закрыть">×</button>' +
    '<h3 id="pm-h"></h3><p class="pm-price"></p>' +
    '<p class="pm-note">Укажите email: на него придут ссылки на материал. Чек пришлём отдельно.</p>' +
    '<form class="pm-form" novalidate>' +
    '<input type="email" class="pm-email" placeholder="Ваш email" autocomplete="email" required>' +
    '<label class="pm-agree"><input type="checkbox" class="pm-ok"> <span>Согласен(на) с <a href="/oferta/" target="_blank">офертой</a> и <a href="/privacy/" target="_blank">политикой конфиденциальности</a></span></label>' +
    '<p class="pm-err" role="alert"></p>' +
    '<button type="submit" class="btn xl pm-go">Перейти к оплате</button>' +
    '</form>' +
    '<p class="pm-small">Оплата проходит на защищённой странице ЮKassa. Данные карты на сайте не сохраняются.</p></div>';
  document.body.appendChild(box);
  box.querySelector("#pm-h").textContent = T[0];
  box.querySelector(".pm-price").textContent = T[1];

  var form = box.querySelector(".pm-form"), em = box.querySelector(".pm-email"),
      ok = box.querySelector(".pm-ok"), err = box.querySelector(".pm-err"), go = box.querySelector(".pm-go");

  function open() { box.hidden = false; document.documentElement.classList.add("pm-open"); err.textContent = ""; setTimeout(function () { em.focus(); }, 50); }
  function close() { box.hidden = true; document.documentElement.classList.remove("pm-open"); }
  box.querySelector(".pm-x").addEventListener("click", close);
  box.querySelector(".pm-back").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) close(); });

  var MSG = {
    email: "Проверьте адрес почты.",
    rate: "Слишком много попыток. Попробуйте позже или напишите нам.",
    payment: "Не получилось создать оплату. Напишите нам в мессенджер, мы поможем.",
    server: "Сервис оплаты сейчас недоступен. Напишите нам в мессенджер, мы поможем."
  };
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = em.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { err.textContent = MSG.email; em.focus(); return; }
    if (!ok.checked) { err.textContent = "Поставьте галочку согласия."; return; }
    err.textContent = ""; go.disabled = true; go.textContent = "Создаём оплату…";
    fetch(API + "?action=create&product=" + encodeURIComponent(id) + "&email=" + encodeURIComponent(v))
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && j.ok && j.url && /^https:\/\//.test(j.url)) { location.href = j.url; return; }
        err.textContent = MSG[(j && j.error)] || MSG.server;
        go.disabled = false; go.textContent = "Перейти к оплате";
      })
      .catch(function () { err.textContent = MSG.server; go.disabled = false; go.textContent = "Перейти к оплате"; });
  });

  var links = document.querySelectorAll("a.btn");
  for (var i = 0; i < links.length; i++) {
    if (/^\s*Купить/.test(links[i].textContent)) {
      links[i].addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); open(); }, true);
      var note = links[i].parentNode.querySelector("p.note");
      if (note) note.textContent = "Оплата на сайте через ЮKassa. Ссылки на материал придут на почту.";
    }
  }
})();
