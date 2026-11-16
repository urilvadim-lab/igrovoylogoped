/* Меню, подвал, нижняя панель, плавающие мессенджеры, видео-кейс, дипломы. Корень сайта: <body data-root="../"> */
(function(){
  var root=document.body.getAttribute("data-root")||"";
  var cur=document.body.getAttribute("data-page")||"";
  var chev='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>';
  var svc=[["work","Индивидуальная работа","Консультации, сопровождение, группа","work/"],["toilet","Туалетный навык","Курс, руководство и сопровождение","toilet/"],["speech","Запуск речи","От первых звуков до фраз","speech/"],["behavior","Работа с поведением","Истерики, отказы, правила","behavior/"]];
  var prod=[["course","Видеокурс «Какаем сидя»","5 видеолекций и материалы","products/course/"],["guide-toilet","Руководство по туалетному навыку","PDF для самостоятельной работы","products/guide-toilet/"],["guide-behavior","Руководство: истерики и протесты","Алгоритм на принципах ABA","products/guide-behavior/"]];
  var about=[["about","Обо мне","Образование и подход","about/"],["aba","Метод ABA","Как это работает","aba/"],["team","Команда специалистов","Роли и взаимодействие","team/"]];
  function menu(id,label,list,on){
    return '<div class="dd'+(on?' on':'')+'" id="'+id+'"><button type="button">'+label+' '+chev+'</button><div class="menu">'+
      list.map(function(s){return '<a href="'+root+s[3]+'"><b>'+s[1]+'</b><span>'+s[2]+'</span></a>';}).join("")+'</div></div>';
  }
  function isIn(list){return list.some(function(s){return s[0]===cur;});}
  var nav=document.getElementById("nav");
  if(nav){
    nav.innerHTML='<header class="top" id="top"><div class="in"><a class="logo" href="'+root+'"><b>Игровой логопед</b></a>'+
      '<button class="burger" id="bgr" aria-label="Меню"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>'+
      '<nav class="nav">'+
      menu("dd1","Услуги",svc,isIn(svc))+menu("dd2","Продукты",prod,cur==="products")+menu("dd3","Об Александре",about,isIn(about))+
      '<a href="'+root+'contact/"'+(cur==="contact"?' class="on"':'')+'>Контакты</a>'+
      '<a class="games" href="'+root+'games/"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="11" rx="5"/><path d="M8 10.5v4M6 12.5h4"/></svg>Упражнения <span class="tagfree">бесплатно</span></a>'+
      '<a class="btn sm js-choose" data-topic="Хочу записаться на консультацию" href="'+root+'contact/">Записаться</a></nav></div></header>';
    var top=document.getElementById("top");
    document.getElementById("bgr").onclick=function(){top.classList.toggle("open");document.body.style.overflow=top.classList.contains("open")?"hidden":"";};
    ["dd1","dd2","dd3"].forEach(function(id){var d=document.getElementById(id); if(d) d.querySelector("button").onclick=function(e){ if(innerWidth<=1060){ d.classList.toggle("open"); e.stopPropagation(); } };});
  }
  var VK='<svg viewBox="0 0 24 24"><path d="M12.8 17.3c-6.3 0-9.9-4.3-10.1-11.5h3.2c.1 5.3 2.4 7.5 4.2 8V5.8h3v4.6c1.8-.2 3.7-2.3 4.3-4.6h3c-.5 2.8-2.6 4.9-4.1 5.8 1.5.7 3.9 2.5 4.8 5.7h-3.3c-.7-2.2-2.5-3.9-4.7-4.1v4.1h-.3z"/></svg>';
  var TG='<svg viewBox="0 0 24 24"><path d="M20.7 4.2 2.9 11c-1.2.5-1.2 1.2-.2 1.5l4.5 1.4 1.7 5.3c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.2-2.1 4.6 3.4c.8.5 1.5.2 1.7-.8l3-14.2c.3-1.2-.5-1.8-1.4-1.6zM9 13.7l8.6-5.4c.4-.3.8-.1.5.2l-7.1 6.4-.3 3z"/></svg>';
  var MX='<svg viewBox="0 0 24 24"><path d="M12 2.5C6.8 2.5 2.7 6.4 2.7 11.3c0 2.1.8 4 2.1 5.5l-.7 3.6c-.1.5.4.8.8.6l3.3-1.7c1.1.4 2.3.6 3.5.6 5.2 0 9.3-3.9 9.3-8.8S17.2 2.5 12 2.5z"/><path d="M7.4 14.2v-4.6l2.3 2.9 2.3-2.9 2.3 2.9 2.3-2.9v4.6" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var MAXL="https://max.ru/u/f9LHodD0cOJkMLvXYQZugiVzBTNR0zrlftLzZGXLHUhJ5cvkQXhTXoKwvF8";
  var f=document.getElementById("foot");
  if(f){
    f.innerHTML='<footer><div class="wrap"><div class="cols"><div><h4>Александра Карачинцева</h4><p style="margin:0;font-size:15px;line-height:1.6">Психолог, поведенческий аналитик (ABA), специалист по запуску речи. Работаю онлайн вместе с командой специалистов.</p></div>'+
      '<div><h4>Разделы</h4>'+svc.map(function(s){return '<a href="'+root+s[3]+'">'+s[1]+'</a>';}).join("")+'<a href="'+root+'products/">Продукты</a><a href="'+root+'about/">Обо мне</a><a href="'+root+'aba/">Метод ABA</a><a href="'+root+'team/">Команда специалистов</a></div>'+
      '<div><h4>Связаться</h4><a href="https://vk.ru/id286171382" target="_blank" rel="noopener">VK</a><a href="https://t.me/rechi_igra" target="_blank" rel="noopener">Telegram</a><a href="https://max.ru/u/f9LHodD0cOJkMLvXYQZugiVzBTNR0zrlftLzZGXLHUhJ5cvkQXhTXoKwvF8" target="_blank" rel="noopener">MAX</a><a href="https://www.instagram.com/igrovoy_logoped" target="_blank" rel="noopener">Instagram</a><a href="https://www.youtube.com/@rechi_igra" target="_blank" rel="noopener">YouTube</a><a href="'+root+'games/">Упражнения для речи</a></div></div>'+
      '<div class="legal">© Александра Карачинцева. Материалы сайта не заменяют консультацию специалиста. Запись и оплата из других стран возможны, условия обсуждаются индивидуально.</div></div></footer>'+
      '<div class="dock"><a class="v" href="https://vk.ru/id286171382" target="_blank" rel="noopener">VK</a><a class="g" href="'+root+'games/">Упражнения</a><a class="a js-choose" data-topic="Хочу записаться на консультацию" href="'+root+'contact/">Записаться</a></div>'+
      '<div class="fab"><a class="fv" href="https://vk.ru/id286171382" target="_blank" rel="noopener" aria-label="Написать в VK">'+VK+'<span>VK</span></a><a class="ft" href="https://t.me/rechi_igra" target="_blank" rel="noopener" aria-label="Написать в Telegram">'+TG+'<span>Telegram</span></a><a class="fm" href="'+MAXL+'" target="_blank" rel="noopener" aria-label="Написать в MAX">'+MX+'<span>MAX</span></a></div>';
  }
  var els=document.querySelectorAll(".rv");
  if("IntersectionObserver" in window){ var io=new IntersectionObserver(function(es){es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });},{threshold:.12}); els.forEach(function(e){io.observe(e);}); }
  else els.forEach(function(e){e.classList.add("in");});
  var c=document.getElementById("copytpl");
  if(c){ c.onclick=function(){ var t="Здравствуйте! Хочу записаться.\nНаправление: (запуск речи / поведение / туалетный навык)\nФормат: (консультация / сопровождение / курс)\nВозраст ребёнка:\nЗапрос:\nЧто уже пробовали:\nУдобное время:\nСтрана проживания (для оплаты):"; var m=document.getElementById("copied"); var ok=function(){ if(m) m.textContent="Скопировано. Вставьте в сообщение."; }; if(navigator.clipboard){ navigator.clipboard.writeText(t).then(ok,ok); } else ok(); }; }
  document.querySelectorAll(".vc").forEach(function(c,i,all){
    var v=c.querySelector("video"),b=c.querySelector(".vplay"),w=c.querySelector(".vph");
    function play(){ all.forEach(function(o){var ov=o.querySelector("video"); if(ov!==v){ov.pause();}}); w.classList.add("on"); v.controls=true; v.play(); }
    b.onclick=play;
    v.addEventListener("ended",function(){ var n=all[i+1]; if(n) n.querySelector(".vplay").click(); });
  });
  document.querySelectorAll(".dipbtn").forEach(function(b){ b.onclick=function(){ var d=document.createElement("div"); d.className="lb"; d.innerHTML='<img src="'+b.getAttribute("data-img")+'" alt="Диплом">'; d.onclick=function(){d.remove();}; document.body.appendChild(d); }; });

  var APPS=[["VK","https://vk.ru/id286171382","fv"],["Telegram","https://t.me/rechi_igra","ft"],["MAX","https://max.ru/u/f9LHodD0cOJkMLvXYQZugiVzBTNR0zrlftLzZGXLHUhJ5cvkQXhTXoKwvF8","fm"]];
  var ICON={VK:VK,Telegram:TG,MAX:MX};
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest(".js-choose"); if(!a) return;
    e.preventDefault();
    var topic=a.getAttribute("data-topic")||"Хочу записаться";
    var d=document.createElement("div"); d.className="chs";
    d.innerHTML='<div class="chs-box" role="dialog" aria-modal="true"><button class="chs-x" aria-label="Закрыть">&times;</button><h3>Куда вам удобнее написать?</h3><p>Выберите мессенджер. Текст сообщения скопируется, останется вставить и отправить:</p><div class="chs-msg">'+topic+'</div><div class="chs-btns">'+APPS.map(function(x){return '<a class="chs-b '+x[2]+'" href="'+x[1]+'" target="_blank" rel="noopener">'+ICON[x[0]]+'<span>'+x[0]+'</span></a>';}).join("")+'</div></div>';
    d.onclick=function(ev){ if(ev.target===d||ev.target.className==="chs-x") d.remove(); };
    d.querySelectorAll(".chs-b").forEach(function(b){ b.addEventListener("click",function(){ try{ navigator.clipboard.writeText(topic); }catch(_){} }); });
    document.body.appendChild(d);
  });
})();
