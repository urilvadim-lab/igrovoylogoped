/* Меню, подвал, нижняя панель, анимации появления. Корень сайта: <body data-root="../"> */
(function(){
  var root=document.body.getAttribute("data-root")||"";
  var cur=document.body.getAttribute("data-page")||"";
  var chev='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>';
  var svc=[["speech","Запуск речи","От первых звуков до фраз","speech/"],["toilet","Туалетный навык","Курс 4 500 ₽ и сопровождение","toilet/"],["behavior","Работа с поведением","Истерики, отказы, правила","behavior/"],["work","Индивидуальная работа","Консультации и сопровождение","work/"]];
  var isSvc=svc.some(function(s){return s[0]===cur;});
  var nav=document.getElementById("nav");
  if(nav){
    nav.innerHTML='<header class="top" id="top"><div class="in"><a class="logo" href="'+root+'"><span class="mono">АК</span><span><b>Александра Карачинцева</b><small>психолог · ABA · запуск речи</small></span></a>'+
      '<button class="burger" id="bgr" aria-label="Меню"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>'+
      '<nav class="nav"><a href="'+root+'"'+(cur==="home"?' class="on"':'')+'>Главная</a>'+
      '<div class="dd'+(isSvc?' on':'')+'" id="dd"><button type="button">Услуги '+chev+'</button><div class="menu">'+
        svc.map(function(s){return '<a href="'+root+s[3]+'"><b>'+s[1]+'</b><span>'+s[2]+'</span></a>';}).join("")+'</div></div>'+
      '<a class="games" href="'+root+'games/">Упражнения</a>'+
      '<a href="'+root+'aba/"'+(cur==="aba"?' class="on"':'')+'>Метод ABA</a>'+
      '<a href="'+root+'team/"'+(cur==="team"?' class="on"':'')+'>Команда</a>'+
      '<a href="'+root+'contact/"'+(cur==="contact"?' class="on"':'')+'>Контакты</a>'+
      '<a class="btn sm" href="'+root+'contact/" style="margin-left:6px">Записаться</a></nav></div></header>';
    var top=document.getElementById("top");
    document.getElementById("bgr").onclick=function(){top.classList.toggle("open");document.body.style.overflow=top.classList.contains("open")?"hidden":"";};
    var dd=document.getElementById("dd"); dd.querySelector("button").onclick=function(e){ if(innerWidth<=1060){ dd.classList.toggle("open"); e.stopPropagation(); } };
  }
  var f=document.getElementById("foot");
  if(f){
    f.innerHTML='<footer><div class="wrap"><div class="cols"><div><h4>Александра Карачинцева</h4><p style="margin:0;font-size:15px;line-height:1.6">Психолог, поведенческий аналитик (ABA), специалист по запуску речи. Работаю онлайн вместе с командой специалистов.</p></div>'+
      '<div><h4>Разделы</h4>'+svc.map(function(s){return '<a href="'+root+s[3]+'">'+s[1]+'</a>';}).join("")+'<a href="'+root+'aba/">Метод ABA</a><a href="'+root+'team/">Команда специалистов</a></div>'+
      '<div><h4>Связаться</h4><a href="https://vk.ru/id286171382" target="_blank" rel="noopener">ВКонтакте</a><a href="https://t.me/rechi_igra" target="_blank" rel="noopener">Telegram</a><a href="https://www.instagram.com/igrovoy_logoped" target="_blank" rel="noopener">Instagram</a><a href="https://www.youtube.com/@rechi_igra" target="_blank" rel="noopener">YouTube</a><a href="'+root+'games/">Упражнения для запуска речи</a></div></div>'+
      '<div class="legal">© Александра Карачинцева. Материалы сайта не заменяют консультацию специалиста. Запись и оплата из других стран возможны, условия обсуждаются индивидуально.</div></div></footer>'+
      '<div class="dock"><a class="v" href="https://vk.ru/id286171382" target="_blank" rel="noopener">ВКонтакте</a><a class="g" href="'+root+'games/">Упражнения</a><a class="a" href="'+root+'contact/">Записаться</a></div>';
  }
  var els=document.querySelectorAll(".rv");
  if("IntersectionObserver" in window){ var io=new IntersectionObserver(function(es){es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });},{threshold:.12}); els.forEach(function(e){io.observe(e);}); }
  else els.forEach(function(e){e.classList.add("in");});
  var c=document.getElementById("copytpl");
  if(c){ c.onclick=function(){ var t="Здравствуйте! Хочу записаться.\nНаправление: (запуск речи / поведение / туалетный навык)\nФормат: (консультация / сопровождение / курс)\nВозраст ребёнка:\nЗапрос:\nЧто уже пробовали:\nУдобное время:\nСтрана проживания (для оплаты):"; var m=document.getElementById("copied"); var ok=function(){ if(m) m.textContent="Скопировано. Вставьте в сообщение."; }; if(navigator.clipboard){ navigator.clipboard.writeText(t).then(ok,ok); } else ok(); }; }
})();
