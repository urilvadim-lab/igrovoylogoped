/* общее меню и подвал для всех страниц сайта; корень сайта берётся из <body data-root="../"> */
(function(){
  var root=document.body.getAttribute("data-root")||"";
  var cur=document.body.getAttribute("data-page")||"";
  var links=[["home","Главная",""],["work","Индивидуальная работа","work/"],["toilet","Туалетный навык","toilet/"],["behavior","Поведение","behavior/"],["speech","Запуск речи","speech/"],["contact","Контакты","contact/"]];
  var nav=document.getElementById("nav");
  if(nav){
    nav.innerHTML='<nav id="navb"><div class="in"><a class="logo" href="'+root+'">Игровой логопед</a><button class="burger" aria-label="Меню" id="bgr">☰</button><div class="links">'+
      links.map(function(l){return '<a class="l'+(l[0]===cur?' on':'')+'" href="'+root+l[2]+'">'+l[1]+'</a>';}).join("")+
      '<a class="btn play" href="'+root+'games/">🎮 Игры</a></div></div></nav>';
    document.getElementById("bgr").onclick=function(){document.getElementById("navb").classList.toggle("open");};
  }
  var f=document.getElementById("foot");
  if(f){
    f.innerHTML='<footer><div>© Александра Карачинцева · Игровой логопед</div><div>'+
      '<a href="https://vk.ru/id286171382" target="_blank" rel="noopener">ВКонтакте</a>'+
      '<a href="https://t.me/rechi_igra" target="_blank" rel="noopener">Telegram</a>'+
      '<a href="https://www.instagram.com/igrovoy_logoped" target="_blank" rel="noopener">Instagram</a>'+
      '<a href="https://www.youtube.com/@rechi_igra" target="_blank" rel="noopener">YouTube</a></div></footer>';
  }
})();
