(function(){
var head=document.querySelector('header .w'),nav=head&&head.querySelector('nav');
if(nav){
  var b=document.createElement('button');b.type='button';b.className='burger';b.setAttribute('aria-label','Меню');b.setAttribute('aria-expanded','false');b.textContent='☰';head.appendChild(b);
  b.addEventListener('click',function(){var o=nav.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'✕':'☰'});
  nav.addEventListener('click',function(){nav.classList.remove('open');b.textContent='☰'});
}
document.addEventListener('click',function(e){var x=e.target.closest&&e.target.closest('.promo .x');if(x)x.parentNode.remove()});
/* подсказка про большой экран: на телефоне, один раз за посещение */
var phone=/iPhone|iPod|Android.*Mobile|Windows Phone/i.test(navigator.userAgent)||window.innerWidth<600;
var seen=false;try{seen=!!sessionStorage.getItem('big_ok')}catch(e){}
if(phone&&!seen){
  var d=document.createElement('div');d.className='big';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');
  d.innerHTML='<div><i>💻</i><h2>Упражнения лучше на большом экране</h2><p>Мы рекомендуем заниматься с <b>компьютера или планшета</b>: картинки крупнее, а\u00a0ребёнку удобнее нажимать и\u00a0слушать.</p><button type="button" class="btn main">Всё равно продолжить</button><small>Можно вернуться позже с\u00a0компьютера</small></div>';
  document.body.appendChild(d);document.documentElement.style.overflow='hidden';
  d.querySelector('button').addEventListener('click',function(){d.remove();document.documentElement.style.overflow='';try{sessionStorage.setItem('big_ok','1')}catch(e){}});
}
})();

/* кто уже вошёл или подписан: своё меню, без рекламы подписки */
(function(){
var c={};try{c=JSON.parse(localStorage.getItem('igl_cab')||'{}')||{}}catch(e){}
if(!c.token)return;
var nav=document.querySelector('header nav');if(!nav)return;
var paid=(c.access&&c.paidUntil>Date.now())||(c.full&&c.fullUntil>Date.now());
if(!paid){[].forEach.call(nav.querySelectorAll('a'),function(a){if(a.textContent.trim()==='Войти')a.textContent='Кабинет'});return}
var here=location.pathname;
nav.innerHTML=[['/games/','Все игры'],['/games/segodnya/','Занятие на сегодня'],['/games/kabinet/','Кабинет'],['/#faq','Помощь']].map(function(x){return '<a href="'+x[0]+'"'+(here===x[0]?' class="cur"':'')+'>'+x[1]+'</a>'}).join('');
[].forEach.call(document.querySelectorAll('.ad,.sub,header .btn.small'),function(x){x.remove()});
})();
