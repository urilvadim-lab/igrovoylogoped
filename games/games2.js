/* Игры l=22–31 (2026-11-27). Подключается ДО основного скрипта lesson.html.
   Данные кладутся в window.NG, основной скрипт добавляет их в PICS_ALL/GROUPS/LTITLE/LAIM/GXPLAN.
   Общие функции (tone, whoosh, chime, burst, gxStars, gxPraise, gxSay, $, PICS, cur, sub) берутся из lesson.html во время игры.
   Пути: общая библиотека героев и предметов assets/lib/*.webp (см. assets/lib/CATALOG.md). */
(function(){
"use strict";
const L=n=>"assets/lib/"+n+".webp";
const A=n=>"assets/"+n+".png";
const BG=n=>"img/new/"+n+".jpg";
const ROOM=BG("bg_room");
const NG=window.NG={groups:[],titles:[],aims:[],plans:[],pics:[]};
const FIRST_G=21; let G=FIRST_G;
function game(name,title,aim,plan,pics){ NG.groups.push({name}); NG.titles.push(title); NG.aims.push(aim); NG.plans.push(plan);
  pics.forEach(p=>NG.pics.push(Object.assign({kind:"ng",g:G,alpha:true,info:{skill:p.skill,say:p.say}},p))); G++; }

/* ---------- 22. Повтори за мной ---------- */
const M=(t,word,a,b,adult,o)=>Object.assign({t,word,a:L(a),b:L(b),adult},o||{});
game("Повтори за мной","Запуск речи для малышей: повтори за мной","подражание: ребёнок повторяет движения за Тёмой и за вами",
 [["Всё тело","Хлопаем, топаем, машем"],["Руки и пальцы","Кулачки, ладошки, пальчик"],["Лицо","Рот, улыбка, трубочка, щёки, язык"],["С предметами","Мяч, ложка, кубики, шапка, колокольчик"]],
 [{t:"imit",title:"Повтори: всё тело",level:"Крупные движения",thumb:L("tm_clap_b"),skill:"Подражание крупным движениям: хлопаем, топаем, машем.",say:"Делайте движение вместе с Тёмой. Говорите коротко и весело, а потом подождите.",
   steps:[M("Хлопаем!","Хлоп-хлоп!","tm_clap_a","tm_clap_b","Хлопните в ладоши сами и скажите «хлоп-хлоп».",{snd:"g_clap"}),
          M("Топаем!","Топ-топ!","tm_stomp_a","tm_stomp_b","Потопайте вместе, сидя или стоя.",{snd:"g_stomp"}),
          M("Машем!","Пока-пока!","tm_wave_a","tm_wave_b","Помашите ребёнку и дождитесь, когда он помашет в ответ.",{sway:true}),
          M("Руки вверх!","Вверх!","tm_up_a","tm_up_b","Поднимите руки и скажите «вверх», опустите: «вниз»."),
          M("Прыгаем!","Прыг!","tm_jump_a","tm_jump_b","Прыгайте вместе. Можно держать ребёнка за руки.",{lift:9,snd:"g_stomp",sndOn:0})]},
  {t:"imit",title:"Повтори: руки и пальцы",level:"Мелкие движения",thumb:L("tm_thumb_b"),skill:"Подражание движениям рук и пальцев.",say:"Сядьте лицом к ребёнку, чтобы он хорошо видел ваши руки.",
   steps:[M("Кулачки","Раз — кулачки!","tm_open","tm_fists","Раскройте ладони и сожмите в кулачки."),
          M("Ладошки вместе","Вместе!","tm_palms_a","tm_palms_b","Разведите ладони и соедините."),
          M("Пальчик вверх","Вот!","tm_fist1","tm_index","Покажите указательный палец. Если трудно, мягко помогите."),
          M("Большой палец","Во!","tm_fist2","tm_thumb_b","Покажите «класс» и улыбнитесь.")]},
  {t:"imit",title:"Повтори: лицо",level:"Мимика",face:true,thumb:L("tm_face_tongue"),skill:"Подражание движениям рта и лица.",say:"Покажите движение своим лицом близко к ребёнку. Можно смотреть вдвоём в зеркало.",
   steps:[M("Открой рот","А-а-а!","tm_face_calm","tm_face_open","Широко откройте рот и протяните «а-а-а»."),
          M("Улыбнись","И-и-и!","tm_face_calm","tm_face_smile","Улыбнитесь широко, покажите зубы."),
          M("Трубочка","У-у-у!","tm_face_calm","tm_face_tube","Вытяните губы трубочкой."),
          M("Надуй щёки","Пф-ф!","tm_face_calm","tm_face_puff","Надуйте щёки и легонько хлопните по ним."),
          M("Язычок","Язычок!","tm_face_calm","tm_face_tongue","Покажите язык. Не заставляйте: это просто игра.")]},
  {t:"imit",title:"Повтори: с предметами",level:"Действия с предметами",thumb:L("tm_hat_b"),skill:"Подражание действиям с предметами.",say:"Дайте ребёнку такой же предмет, как у вас. Сначала покажите вы, потом он.",
   steps:[{t:"Приготовьте предметы",prep:true,adult:"Нужны: мяч, ложка с кастрюлькой, два кубика, шапка, колокольчик. Вместо колокольчика подойдёт погремушка. Если чего-то нет, пропустите задание кнопкой «Дальше»."},
          M("Покати мяч","Кати!","tm_roll_a","tm_roll_b","Сядьте напротив и катите мяч друг другу."),
          M("Постучи ложкой","Тук-тук!","tm_spoon_a","tm_spoon_b","Постучите ложкой по кастрюльке или крышке.",{snd:"g_pot"}),
          M("Кубик на кубик","Оп!","tm_cube_a","tm_cube_b","Поставьте один кубик на другой."),
          M("Надень шапку","Шапка!","tm_hat_a","tm_hat_b","Наденьте шапку на себя, потом пусть наденет ребёнок."),
          M("Позвони","Динь-динь!","tm_bell_a","tm_bell_b","Позвоните и остановитесь. Ждите, что позвонит ребёнок.",{sway:true,snd:"g_bell",every:2})]}]);

/* ---------- 23. Раз, два, три… пауза ---------- */
const PZ=(id,title,thumb,adult,bg)=>({t:"pause",title,level:"Ждём сигнал ребёнка",thumb,scene:id,bg,adult,steps:[{}],
  skill:"Инициатива в общении: ребёнок взглядом, жестом или звуком просит продолжить.",
  say:"Скажите вместе с экраном «раз, два…», замолчите и ждите. Любой сигнал ребёнка означает «ещё!»."});
game("Раз, два, три… пауза!","Запуск речи для малышей: раз, два, три… пауза!","инициативу в общении: ребёнок подаёт сигнал, чтобы игра продолжилась",
 [["Считаем","Раз, два…"],["Ждём","Взгляд, жест или звук ребёнка"],["Поехали!","Взрослый нажимает кнопку, и всё оживает"]],
 [PZ("car","Машинка на горке",L("car"),"Машинка стоит наверху и вот-вот поедет.",BG("bg_hill")),
  PZ("balloon","Воздушный шарик",A("sp_balloon"),"Шарик почти надут и хочет улететь.","img/blow/bg_sky.jpg"),
  PZ("swing","Качели",L("swing"),"Оля ждёт, когда качели полетят.",BG("bg_lawn")),
  PZ("tower","Башня из кубиков",L("tower"),"Башня качается и сейчас упадёт.",ROOM),
  PZ("rocket","Ракета",L("rocket"),"Ракета готовится к старту.",BG("bg_night")),
  PZ("bubbles","Мыльные пузыри",A("toy_bubbles"),"Сейчас будет много пузырей.",ROOM),
  PZ("box","Коробка с сюрпризом",L("box_closed"),"В коробке кто-то шевелится.",ROOM),
  PZ("train","Паровозик",A("sp_train"),"Паровозик пыхтит и ждёт отправления.","img/blow/bg_rail.jpg")]);

/* ---------- 24. Съедобное — несъедобное ---------- */
const E=(img,n,yes)=>({img:L(img),n,yes});
game("Съедобное — несъедобное","Запуск речи для малышей: съедобное — несъедобное","понимание вопроса «это едят?» и первые ответы: «да», «нет», «ням»",
 [["Смотрим","Что показали мишке?"],["Отвечаем","«Ням», «да», «нет», кивок или жест"],["Кормим","Мишка ест или смешно отказывается"]],
 [{t:"edible",title:"Мишка кушает: просто",level:"Очевидные пары",thumb:L("food_apple"),skill:"Понимание: что едят, а что нет. Ответ словом, кивком или жестом.",say:"Спросите: «Это едят?» Подождите ответа, а потом нажмите то, что ответил ребёнок.",
   steps:[E("food_apple","Яблоко",true),E("no_shoe","Ботинок",false),E("food_banana","Банан",true),E("no_hat","Шапка",false),E("food_cookie","Печенье",true),E("no_book","Книга",false)]},
  {t:"edible",title:"Мишка кушает: вперемешку",level:"Труднее",thumb:L("food_carrot"),skill:"Понимание и называние: еда и вещи.",say:"Спросите: «Что это? Это едят?» Назовите предмет вместе.",
   steps:[E("food_carrot","Морковка",true),E("no_sock","Носок",false),E("food_bread","Хлеб",true),E("no_brick","Кубик",false),E("no_umbrella","Зонтик",false),E("food_cheese","Сыр",true)]}]);

/* ---------- 25. Найди такой же ---------- */
const S=(sample,ok,a,b,n)=>({sample,ok,opts:[ok,a,b].filter(Boolean),n});
const w=n=>A("w_"+n), an=n=>A("an_"+n);
game("Найди такой же","Запуск речи для малышей: найди такой же","зрительное сопоставление: находим такую же картинку, тень и предмет того же вида",
 [["Такая же картинка","Выбираем из двух и трёх"],["Тень","Чья это тень?"],["Тот же предмет","Другой на вид, а называется так же"]],
 [{t:"same",title:"Такая же картинка",level:"Уровень 1",thumb:w("myach"),skill:"Сопоставление одинаковых картинок.",say:"Покажите на верхнюю картинку: «Найди такую же». Пусть ребёнок покажет пальцем.",
   steps:[S(w("myach"),w("myach"),an("cat"),null,"мяч"),S(an("cow"),an("cow"),w("dom"),null,"корова"),S(w("sok"),w("sok"),an("car"),null,"сок"),S(an("duck"),an("duck"),w("dom"),w("noga"),"утка"),S(w("mashina"),w("mashina"),w("tsvetok"),an("dog"),"машина"),S(w("slon"),w("slon"),w("lisa"),w("stol"),"слон")]},
  {t:"same",title:"Чья тень?",level:"Уровень 2",shadow:true,thumb:an("horse"),skill:"Сопоставление предмета и его силуэта.",say:"Скажите: «Это тень. Чья она?» Предложите посмотреть на форму.",
   steps:[S(an("duck"),an("duck"),w("dom"),null,"утка"),S(w("slon"),w("slon"),w("myach"),null,"слон"),S(an("train"),an("train"),an("cat"),w("tsvetok"),"поезд"),S(w("traktor"),w("traktor"),w("stol"),an("hen"),"трактор"),S(an("horse"),an("horse"),an("pig"),an("sheep"),"лошадь"),S(w("vertolet"),w("vertolet"),w("mashina"),w("krokodil"),"вертолёт")]},
  {t:"same",title:"Тоже мяч, тоже дом",level:"Уровень 3",thumb:L("var_ball"),skill:"Обобщение: разные на вид предметы с одним названием.",say:"Скажите: «Это мяч. Найди ещё мяч». Потом назовите оба вместе.",
   steps:[S(L("var_ball"),w("myach"),w("dom"),null,"мяч"),S(L("var_truck"),w("mashina"),an("cat"),null,"машина"),S(L("var_house"),w("dom"),w("stol"),w("sok"),"дом"),S(L("var_cat"),an("cat"),an("dog"),an("pig"),"кошка"),S(L("var_flower"),w("tsvetok"),w("malina"),w("luk"),"цветок"),S(L("var_table"),w("stol"),w("dom"),w("koleso"),"стол")]}]);

/* ---------- 26. Первые слова: дай, ещё, помоги, открой, всё ---------- */
const W=(task,before,after,btn,adult)=>({task,before,after,btn,adult});
const it=(src,x,b,h,c)=>({src,x,b,h,c});
const WG=(word,title,thumb,steps)=>({t:"word",title,word,level:"Слово «"+word.replace("!","")+"»",thumb,steps,
  skill:"Первое полезное слово «"+word.replace("!","").toLowerCase()+"»: слово или жест что-то меняет.",
  say:"Покажите, что случилось, и подождите. Если ребёнок молчит, скажите слово сами и подождите ещё."});
game("Первые слова","Слоги и первые слова: дай, ещё, помоги, открой, всё","первые полезные слова: «дай», «ещё», «помоги», «открой», «всё»",
 [["Дай","Хочу то, что у мамы"],["Ещё","Закончилось, а хочется"],["Помоги","Не достать самому"],["Открой","Закрыто"],["Всё","Закончили"]],
 [WG("Дай!","Дай",A("toy_ball"),[
   W("Мяч у мамы. Тёма хочет мяч.",[it(L("mama_gives"),70,16,66),it(L("tm_ask"),28,16,52)],[it(A("mama"),72,16,66),it(L("tm_ball"),30,16,54,"hop")],"Дать мяч","Держите паузу. Подскажите: «Дай!» Подойдёт и жест рукой."),
   W("Тёма хочет яблоко.",[it(L("food_apple"),70,38,28,"breathe"),it(L("tm_ask"),30,16,56)],[it(L("food_apple"),40,30,18,"pop"),it(L("tm_up_b"),30,16,56,"hop")],"Дать яблоко","«Дай!» или «Дай ням-ням!». Любая попытка засчитывается.")]),
  WG("Ещё!","Ещё",L("glass_full"),[
   W("Сок закончился.",[it(L("glass_empty"),68,24,34),it(L("tm_ask"),30,16,56)],[it(L("glass_full"),68,24,34,"pop"),it(L("tm_up_b"),30,16,56,"hop")],"Налить ещё","Покажите пустой стакан и ждите. Подскажите: «Ещё!»"),
   W("Каша закончилась.",[it(L("bowl_empty"),68,22,28),it(L("tm_ask"),30,16,56)],[it(L("bowl_full"),68,22,30,"pop"),it(L("tm_up_b"),30,16,56,"hop")],"Положить ещё","«Ещё!» можно сказать и жестом: сложить пальцы вместе.")]),
  WG("Помоги!","Помоги",L("tm_reach"),[
   W("Мяч высоко. Тёме не достать.",[it(L("shelf"),64,56,14),it(A("toy_ball"),64,66,17),it(L("tm_reach"),42,16,58)],[it(L("shelf"),64,56,14),it(L("tm_ball"),42,16,56,"hop")],"Помочь","Подождите, пока ребёнок посмотрит на вас. Подскажите: «Помоги!»"),
   W("Банка не открывается.",[it(L("jar_closed"),68,22,38,"shake"),it(L("tm_surprise"),30,16,56)],[it(L("jar_open"),68,22,38,"pop"),it(L("tm_up_b"),30,16,56,"hop")],"Помочь открыть","Сделайте вид, что крышка тугая. Ждите «помоги».")]),
  WG("Открой!","Открой",L("box_closed"),[
   W("Что в коробке?",[it(L("box_closed"),50,20,46,"shake")],[it(L("box_open"),50,20,62,"pop")],"Открыть","Покажите на коробку: «Кто там?» Ждите «открой»."),
   W("За дверью кто-то есть.",[it(L("door_closed"),50,16,66,"shake")],[it(L("door_puppy"),50,16,66,"pop")],"Открыть дверь","Постучите по столу: «тук-тук». Подождите «открой».")]),
  WG("Всё!","Всё",L("bowl_empty"),[
   W("Тёма доел кашу.",[it(L("tm_eat"),50,16,62,"breathe")],[it(L("bowl_empty"),70,20,26,"pop"),it(L("tm_allgone"),34,16,58,"hop")],"Доел!","Разведите руки: «всё!» Пусть ребёнок повторит жест или слово."),
   W("Сок выпит.",[it(L("glass_full"),68,24,34,"breathe"),it(L("tm_up_a"),30,16,56)],[it(L("glass_empty"),68,24,34,"pop"),it(L("tm_allgone"),30,16,56,"hop")],"Выпил!","Скажите: «Нет сока. Всё!»")])]);

/* ---------- 27. Ку-ку ---------- */
const K=(who,name,say,place,adult,o)=>Object.assign({who,name,say,place:L(place),adult},o||{});
game("Ку-ку! Кто там?","Слоги и первые слова: ку-ку! кто там?","слова «мама», «папа», «тут», «там», «вот»",
 [["Кто там?","Ждём и угадываем"],["Ку-ку!","Герой выглядывает, называем"],["Там или тут?","Ищем, кто где спрятался"]],
 [{t:"peek",title:"Кто спрятался?",level:"Мама, папа, киса",thumb:A("mama"),skill:"Первые слова: мама, папа, киса, ляля, собачка (ав-ав).",say:"Спросите: «Кто там?» Сделайте паузу и посмотрите на ребёнка с ожиданием.",
   steps:[K(A("mama"),"Мама!","Мама тут!","curtain","Скажите: «Где мама?»"),K(A("sprite_mt_papa"),"Папа!","Папа тут!","blanket","Скажите: «Где папа?»"),
          K(A("an_cat"),"Киса!","Киса тут!","basket","Позовите тихонько: «кис-кис»."),K(A("an_dog"),"Ав-ав!","Вот ав-ав!","toyhouse","Спросите: «Кто в домике?»"),
          K(A("toddler_happy"),"Ляля!","Вот ляля!","bush","Спросите: «Кто за кустом?»"),K(A("sprite_kid_olya"),"Оля!","Оля тут!","cardboard","Позовите: «О-ля!»")]},
  {t:"where",title:"Там или тут?",level:"Тут, там, вот",thumb:L("basket"),skill:"Указательный жест и слова «там», «тут», «вот».",say:"Спросите: «Где спрятался?» Пусть ребёнок покажет пальцем и скажет «там». Нажмите то место, на которое он показал.",
   steps:[{who:A("an_cat"),name:"киса",places:["basket","bush"],at:0},{who:A("mama"),name:"мама",places:["curtain","blanket"],at:1},{who:A("an_dog"),name:"собачка",places:["cardboard","toyhouse","basket"],at:1},{who:A("sprite_mt_papa"),name:"папа",places:["blanket","curtain","bush"],at:2},{who:A("an_duck"),name:"уточка",places:["bush","basket","cardboard"],at:0}]}]);

/* ---------- 28. Ой! Бах! Ням! (каждое действие в своём месте, видно сразу) ---------- */
const O=(word,line,scene,snd,o)=>Object.assign({word,line,scene:scene?BG(scene):null,snd},o||{});
const OG=(title,level,thumb,btn,steps)=>({t:"oi",title,level,thumb,btn,steps,skill:"Лепетные слова и восклицания в понятной ситуации.",
  say:"Покажите на картинку: что делает герой? Нажмите кнопку, скажите слово с выражением и подождите, пока попробует ребёнок."});
game("Ой! Бах! Ням!","Слоги и первые слова: ой! бах! ням!","короткие слова: «бах», «ой», «ух», «тук-тук», «ням-ням», «буль-буль», «кап-кап», «бай-бай»",
 [["Смотрим","Что делает Тёма?"],["Озвучиваем","Взрослый говорит с выражением"],["Теперь ты","Пауза, и говорит ребёнок"]],
 [OG("Бах, ой, ух","Что случилось",L("cubes_fallen"),"▶ Что случилось?",[
   O("Бах!","Стоит башня… и вдруг —",null,"g_stomp",{before:[it(L("tower"),50,16,66,"tense")],after:[it(L("cubes_fallen"),50,16,34,"pop")]}),
   O("Ой!","Тёма споткнулся и сел —","sc_knee","oi"),
   O("Ух!","Тёма катится с горки —","sc_slide","uh"),
   O("Тук-тук!","Тёма стучит в дверь —","sc_knock","h_door",{ms:2200})]),
  OG("Ням, буль, кап","Каждый день",L("food_cookie"),"▶ Скажем вместе",[
   O("Ням-ням!","Тёма ест кашу —","sc_eat","am",{move:"nod"}),
   O("Буль-буль!","Тёма купается —","sc_bath","h_water",{ms:2600,fx:"bubbles"}),
   O("Кап-кап!","Идёт дождик —","sc_rain","h_rain",{ms:3500,fx:"rain"}),
   O("Бай-бай!","Тёма спит в кроватке. Тихо —","sc_sleep","aa",{fx:"zzz",move:"slow"})])]);

/* ---------- 29. Барабанчик ---------- */
const D=(syl,img,title)=>({syl,img,title});
game("Барабанчик","Слоги и первые слова: барабанчик","ритм и слоговой рисунок: повторяем удары, потом слоги и слова",
 [["Слушаем","Мишка играет ритм"],["Повторяем","Ладошками по столу или голосом"],["Слова","Отбиваем каждый слог"]],
 [{t:"drum",title:"Мишка барабанит",level:"Ритм",thumb:L("drum_ready"),skill:"Повторение простого ритма: сколько ударов и где пауза.",say:"Нажмите «Играй, мишка», послушайте вместе, потом повторите ладошкой по столу и скажите «бам».",
   steps:[D(["Бам"],null,"Один удар"),D(["Бам","бам"],null,"Два удара"),D(["Бам","бам","бам"],null,"Три удара"),D(["Бам","","бам","бам"],null,"Удар, пауза, два удара"),D(["Бам","бам","","бам"],null,"Два удара, пауза, удар")]},
  {t:"drum",title:"Слова с барабаном",level:"Два слога",thumb:w("lisa"),skill:"Слова из двух слогов: один удар на каждый слог.",say:"Говорите слово по слогам вместе с мишкой: один слог, один хлопок по столу.",
   steps:[D(["ма","ма"],A("mama"),"Мама"),D(["па","па"],A("sprite_mt_papa"),"Папа"),D(["ля","ля"],A("toddler_happy"),"Ляля"),D(["ли","са"],w("lisa"),"Лиса"),D(["ру","ка"],w("ruka"),"Рука"),D(["но","га"],w("noga"),"Нога")]},
  {t:"drum",title:"Длинные слова",level:"Три слога",thumb:w("mashina"),skill:"Слова из трёх слогов с опорой на ритм.",say:"Сначала медленно по слогам, потом быстро всё слово целиком.",
   steps:[D(["ма","ши","на"],w("mashina"),"Машина"),D(["со","ба","ка"],an("dog"),"Собака"),D(["ко","ро","ва"],w("korova"),"Корова"),D(["ма","ли","на"],w("malina"),"Малина"),D(["па","на","ма"],w("panama"),"Панама")]}]);

/* ---------- 30. Договори словечко (стихи написаны для этой игры). Герой виден сразу и движется ---------- */
const R=(l1,l2,ans,img,place,move,o)=>Object.assign({l1,l2,ans,img,place:place.indexOf("/")>0?place:BG(place),move},o||{});
const RG=(title,level,thumb,steps)=>({t:"rhyme",title,level,thumb,steps,skill:"Договаривание слова в стихотворной строчке: "+level.toLowerCase()+".",
  say:"Покажите на героя и назовите его. Читайте не спеша, а перед последним словом замолчите и посмотрите на ребёнка."});
const SKY="img/blow/bg_sky.jpg", RAIL="img/blow/bg_rail.jpg";
game("Договори словечко","Слоги и первые слова: договори словечко","умение договаривать: звук, короткое и длинное слово в конце стихотворной строчки",
 [["Смотрим","Кто пришёл? Называем"],["Слушаем стишок","Читает взрослый"],["Договариваем","Ребёнок заканчивает строчку"]],
 [RG("Договори звук","Звукоподражания",an("cow"),[
   R("Я траву в лугу жую","и зову всех:","му-у-у!",an("cow"),"bg_meadow","walk"),
   R("Скажет нам в густой траве","белая овечка:","бе-е!",an("sheep"),"bg_meadow","come"),
   R("Утром рано у двора","уточка кричит:","кря-кря!",an("duck"),"bg_pond","swim"),
   R("На болоте есть трава,","там лягушки:","ква-ква!",an("frog"),"bg_pond","hopin"),
   R("По дороге мчит такси","и сигналит нам:","би-би!",an("car"),"bg_road","drive"),
   R("Стук колёс и там и тут,","паровоз гудит:","ту-ту!",A("sp_train"),RAIL,"drive",{b:24,h:36})]),
  RG("Договори слово","Короткие слова",w("myach"),[
   R("Прыгнул с горки он и вскачь!","Круглый, звонкий, красный","мяч!",w("myach"),"bg_lawn","bounce",{h:34}),
   R("Кто мурлычет у ворот?","Ну конечно, это","кот!",w("kot"),"bg_meadow","walk"),
   R("Крыша, окна, дверь при нём:","это наш любимый","дом!",w("dom"),"bg_meadow","come",{h:50}),
   R("Рыжий хвост, кругом леса.","Это хитрая","лиса!",w("lisa"),"bg_forest","walk"),
   R("Он большой, почти как дом,","машет хоботом наш","слон!",w("slon"),"bg_savanna","come",{h:54}),
   R("Красный-красный, вот так так!","Распустился в поле","мак!",w("mak"),"bg_meadow","grow")]),
  RG("Договори длинное слово","Длинные слова",w("vertolet"),[
   R("Крыльев нет, а он в полёт!","Это в небе","вертолёт!",w("vertolet"),SKY,"fly",{b:36,h:36}),
   R("Фары, руль, четыре шины.","По дороге мчит","машина!",w("mashina"),"bg_road","drive",{h:34}),
   R("Вот стакан, а в нём обнова:","молоко дала","корова!",w("korova"),"bg_meadow","come"),
   R("Он в реке весь день бродил,","зубы скалил","крокодил!",w("krokodil"),"bg_pond","swim"),
   R("Вот какая тут картина:","спелая в саду","малина!",w("malina"),"bg_forest","grow"),
   R("Дам тебе я два совета:","сначала суп, потом","конфета!",w("konfeta"),"bg_room","come",{h:38})])]);

/* ---------- 31. Первая фраза ---------- */
const F=(c1,c2,before,after,phrase,fx)=>({cards:[c1,c2],before,after,phrase,fx});
const C=(t,img)=>({t,img});
const PH=(title,thumb,steps)=>({t:"phrase",title,level:"Два слова вместе",thumb,steps,skill:"Фраза из двух слов: называем по порядку и говорим вместе.",
  say:"Пусть ребёнок покажет первую картинку и назовёт её, потом вторую. Нажимайте по порядку, а в конце скажите фразу целиком."});
game("Первая фраза","Слоги и первые слова: первая фраза","фразу из двух слов: «мама, дай», «ещё сок», «киса спит»",
 [["Первое слово","Показываем и называем"],["Второе слово","Добавляем к первому"],["Вся фраза","Говорим вместе, и картинка оживает"]],
 [PH("Прошу",L("mama_gives"),[
   F(C("Мама",A("mama")),C("дай",L("tm_ask")),[it(A("mama"),50,31,42,"breathe")],[it(L("mama_gives"),66,16,50,"pop"),it(L("tm_ball"),34,16,42,"hop")],"Мама, дай!"),
   F(C("Ещё",L("jug")),C("сок",L("glass_full")),[it(L("glass_empty"),50,34,28,"breathe")],[it(L("jug"),38,34,36,"pop"),it(L("glass_full"),62,20,32,"hop")],"Ещё сок!"),
   F(C("Папа",A("sprite_mt_papa")),C("иди",L("papa_walk")),[it(A("sprite_mt_papa"),24,32,40,"breathe")],[it(L("papa_walk"),50,16,52,"hop")],"Папа, иди!")]),
  PH("Кто что делает",L("cat_sleep"),[
   F(C("Киса",A("an_cat")),C("спит",L("cat_sleep")),[it(A("an_cat"),50,32,38,"breathe")],[it(L("cat_sleep"),50,22,36,"breathe")],"Киса спит.","zzz"),
   F(C("Оля",A("sprite_kid_olya")),C("ест",L("food_apple")),[it(A("sprite_kid_olya"),50,31,42,"breathe")],[it(L("olya_eat"),50,16,52,"hop")],"Оля ест."),
   F(C("Мяч",A("toy_ball")),C("прыг",L("ball_bounce")),[it(A("toy_ball"),50,34,24,"breathe")],[it(L("ball_bounce"),50,18,46,"hop")],"Мяч прыг!")])]);

/* ============ Движок ============ */
const ST={}; let timers=[];
const later=(f,ms)=>{ const t=setTimeout(f,ms); timers.push(t); return t; };
const every=(f,ms)=>{ const t=setInterval(f,ms); timers.push(t); return t; };
NG.stop=()=>{ timers.forEach(t=>{ clearTimeout(t); clearInterval(t); }); timers=[]; };
NG.make=(s,p)=>{ s.innerHTML=`<div class="ng"></div>`; ST[PICS.indexOf(p)]={root:s.firstChild,p}; };
NG.order=p=>p.steps.map((x,i)=>i+1);
NG.pos=p=>p.steps.length>1?`Задание ${Math.max(1,sub)} из ${p.steps.length}`:"Ждём сигнал";
const h=(html)=>{ const d=document.createElement("div"); d.innerHTML=html.trim(); return d.firstChild; };
function spr(R,o){ const e=h(`<div class="ng-s ${o.c||""}" style="left:${o.x}%;bottom:${o.b}%;height:${o.h}%"><img src="${o.src}" alt="" draggable="false"></div>`); R.appendChild(e); return e; }
function layer(R,list){ const d=h(`<div class="pz"></div>`); list.forEach(o=>spr(d,o)); R.appendChild(d); return d; }
function bg(R,src){ R.appendChild(h(`<img class="ng-bg" src="${src}" alt="" draggable="false">`)); }
const SOON=w=>`<small>Сейчас скажем: «${w}»</small>`;
function top(R,text){ R.querySelectorAll(".ng-top").forEach(e=>e.remove()); R.appendChild(h(`<div class="ng-top">${text}</div>`)); }
function word(R,text,pulse){ R.querySelectorAll(".ng-word,.ng-wait").forEach(e=>e.remove()); if(text) R.appendChild(h(`<div class="ng-word ${pulse?"pulse":""}">${text}</div>`)); }
function dots(R){ word(R,""); R.appendChild(h(`<div class="ng-wait"><i></i><i></i><i></i></div>`)); }
function acts(R,list){ R.querySelectorAll(".ng-act").forEach(e=>e.remove()); const a=h(`<div class="ng-act"></div>`); list.forEach(([text,cls,fn])=>{ const b=h(`<button type="button" class="ng-btn ${cls||""}">${text}</button>`); b.onclick=e=>{ e.stopPropagation(); fn(b); }; a.appendChild(b); }); R.appendChild(a); }
function cheer(R,y){ chime(); gxStars(R,50,y||45,16); gxPraise(R); }
function forward(){ return [cur===PICS.length-1&&sub===PICS[cur].steps.length?"Завершить ✓":"Дальше ›","green",()=>next()]; }
/* настоящие записи (Wikimedia Commons, авторы в audio/credits.json) */
const RA={};
function REAL(k,ms){ if(muted) return; const a=(RA[k]||(RA[k]=new Audio("audio/"+k+".mp3"))).cloneNode(); a.volume=.9; a.play().catch(()=>{}); if(ms) later(()=>a.pause(),ms); }
const CRED={g_clap:"Хлопок",g_stomp:"Топот",g_drum:"Барабан",g_pot:"Кастрюля",g_bell:"Колокольчик",h_door:"Стук в дверь",h_water:"Вода",h_rain:"Дождь"};
/* звуки: синтез только для сигналов интерфейса; слова произносит взрослый */
const SND={
  drum(){ tone(190,70,.22,.22,"sine"); tone(330,120,.09,.07,"triangle"); },
  bah(){ tone(150,45,.4,.2,"sine"); whoosh(.3,.07); [0,.09,.17].forEach((d,i)=>tone(420-i*70,200,.08,.06,"square",d)); },
  oi(){ tone(700,380,.25,.07,"triangle"); },
  uh(){ tone(950,260,.7,.07,"sine"); whoosh(.6,.04); },
  tuk(){ tone(220,130,.08,.18,"triangle"); tone(220,130,.08,.18,"triangle",.24); },
  am(){ tone(300,170,.12,.1,"triangle"); tone(300,170,.12,.1,"triangle",.28); },
  bul(){ [0,.14,.27,.4].forEach((d,i)=>tone(320+i*60,760+i*60,.1,.07,"sine",d)); },
  kap(){ [0,.3,.55,.9].forEach((d,i)=>tone(1500-i*90,800,.07,.06,"sine",d)); },
  aa(){ tone(392,392,.8,.04,"sine"); tone(330,330,1.1,.04,"sine",.7); },
  go(){ whoosh(.7,.09); tone(330,990,.6,.07,"sine"); },
  tick(){ tone(520,520,.12,.07,"sine"); },
  pop(){ tone(500,1100,.12,.08,"sine"); }
};

/* --- повтори за мной --- */
function rImit(st,s){
  const R=st.root; bg(R,ROOM);
  if(s.prep){
    top(R,"Приготовьте предметы");
    const items=[[A("toy_ball"),"Мяч"],[L("tm_spoon_a"),"Ложка и кастрюля"],[L("tm_cube_b"),"2 кубика"],[L("tm_hat_a"),"Шапка"],[A("toy_bell"),"Колокольчик"]];
    R.appendChild(h(`<div class="pr-grid">${items.map((x,i)=>`<figure style="--i:${i}"><img src="${x[0]}" alt=""><figcaption>${x[1]}</figcaption></figure>`).join("")}</div>`));
    acts(R,[["Всё готово ›","green",()=>next()],["Пропустить уровень","soft",()=>{ if(cur<PICS.length-1) go(cur+1); else showFinale(); }]]); return;
  }
  top(R,s.t);
  const face=st.p.face; let e, img;
  if(face){ e=h(`<div class="ng-mirror"><img src="${s.a}" alt="" draggable="false"></div>`); R.appendChild(e); img=e.firstChild; }
  else { e=spr(R,{src:s.a,x:50,b:14,h:66}); img=e.firstChild; }
  new Image().src=s.b; let k=0, beats=0, quiet=false;
  every(()=>{ k^=1; img.src=k?s.b:s.a;
    if(!face) e.style.bottom=(14+(k&&s.lift?s.lift:0))+"%";
    if(s.sway) img.style.rotate=(k?"3deg":"-3deg");
    if(!face){ e.classList.remove("beat"); void e.offsetWidth; e.classList.add("beat"); }
    if(s.snd&&!quiet&&k===(s.sndOn===undefined?1:s.sndOn)){ beats++; if(beats<=5&&(!s.every||beats%s.every===1)) REAL(s.snd); }
  },850);
  later(()=>{ word(R,s.word,true); R.querySelectorAll(".ng-top").forEach(x=>x.remove()); const wd=R.querySelector(".ng-word"); wd.style.top="2.6%"; wd.style.fontSize="8cqw"; },900);
  const done=["⭐ Получилось!","pulse",()=>{ quiet=true; cheer(R,42); if(!face) e.classList.add("hop"); acts(R,[["Ещё раз","soft",()=>ngRender()],forward()]); }];
  acts(R,s.snd?[done,["🔊 Звук","soft",()=>{ beats=0; REAL(s.snd); }]]:[done]);
}

/* --- пауза --- */
function rPause(st){
  const R=st.root, p=st.p; bg(R,p.bg);
  const Z=h(`<div class="pz"></div>`); R.appendChild(Z);
  const el=o=>spr(Z,o);
  let tense=()=>{}, run=()=>{};
  if(p.scene==="car"){ const c=el({src:L("car"),x:21,b:44.5,h:17}); c.firstChild.style.rotate="21deg"; tense=()=>c.classList.add("tense");
    run=()=>{ c.classList.remove("tense");
      /* точки лежат на дороге фона bg_hill, наклон по склону */
      const way=[[21,44.5,21],[33,37.5,22],[45,33,16],[58,30.5,9],[70,29.5,4],[83,29,2]];
      c.animate(way.map(w=>({left:w[0]+"%",bottom:w[1]+"%"})),{duration:2200,easing:"cubic-bezier(.45,0,.75,1)",fill:"forwards"});
      c.firstChild.animate(way.map(w=>({rotate:w[2]+"deg"})),{duration:2200,easing:"cubic-bezier(.45,0,.75,1)",fill:"forwards"}); }; }
  if(p.scene==="balloon"){ const c=el({src:A("sp_balloon"),x:50,b:24,h:24,c:"pz-move"}); c.style.transition="height .8s cubic-bezier(.3,1.6,.5,1),bottom 2.4s cubic-bezier(.5,0,.7,1),left 2.4s"; tense=k=>{ c.style.height=(24+k*13)+"%"; if(k===2) c.classList.add("tense"); }; run=()=>{ c.classList.remove("tense"); c.style.bottom="112%"; c.style.left="64%"; }; }
  if(p.scene==="swing"){
    Z.appendChild(h(`<svg class="pz-frame" viewBox="0 0 400 300" preserveAspectRatio="none"><g stroke="#8a5a2b" stroke-width="11" stroke-linecap="round" fill="none"><path d="M200 44L96 250"/><path d="M200 44L304 250"/></g><g stroke="#b98350" stroke-width="5" stroke-linecap="round" fill="none"><path d="M199 46L96 248"/><path d="M201 46L303 248"/></g></svg>`));
    const c=h(`<div class="pz-swing" style="--rx:53.1%;aspect-ratio:825/984"><img src="${L("swing_side")}" alt="" draggable="false"></div>`); Z.appendChild(c);
    Z.appendChild(h(`<i class="pz-pin"></i>`));
    tense=()=>c.classList.add("back"); run=()=>c.classList.add("run"); }
  if(p.scene==="tower"){ const c=el({src:L("tower"),x:50,b:17,h:62}); tense=()=>c.classList.add("tense"); run=()=>{ Z.innerHTML=""; spr(Z,{src:L("cubes_fallen"),x:50,b:16,h:34,c:"pop"}); SND.bah(); }; }
  if(p.scene==="rocket"){ const c=el({src:L("rocket"),x:50,b:20,h:44,c:"pz-move"}); c.style.transition="bottom 2.2s cubic-bezier(.6,0,.8,1)"; tense=()=>c.classList.add("tense"); run=()=>{ c.classList.remove("tense"); c.appendChild(h(`<i class="pz-fire"></i>`)); c.style.bottom="118%"; }; }
  if(p.scene==="bubbles"){ const c=el({src:A("toy_bubbles"),x:50,b:18,h:36,c:"breathe"}); tense=()=>{ c.classList.remove("breathe"); c.classList.add("tense"); }; run=()=>{ c.classList.remove("tense"); for(let i=0;i<34;i++){ const b=h(`<i class="pz-bub"></i>`); const s=4+Math.random()*10; b.style.cssText=`left:${47+Math.random()*6}%;top:50%;width:${s}cqw;height:${s}cqw;--dx:${(Math.random()-.5)*90}cqw;--dy:${-12-Math.random()*42}cqh;animation-delay:${i*.07}s;opacity:0`; Z.appendChild(b); if(i%4===0) later(SND.pop,i*70); } }; }
  if(p.scene==="box"){ const c=el({src:L("box_closed"),x:50,b:18,h:46}); tense=()=>c.classList.add("tense"); run=()=>{ Z.innerHTML=""; spr(Z,{src:L("box_open"),x:50,b:18,h:62,c:"pop"}); }; }
  if(p.scene==="train"){ const c=el({src:A("sp_train"),x:38,b:24,h:32,c:"pz-move"}); tense=()=>c.classList.add("tense"); run=()=>{ c.classList.remove("tense"); c.style.left="140%"; }; }
  function ready(){
    word(R,""); top(R,p.title);
    acts(R,[["▶ Раз, два…","pulse",()=>{ acts(R,[]); word(R,"Раз…"); SND.tick(); tense(1);
      later(()=>{ word(R,"два…"); SND.tick(); tense(2); },1300);
      later(()=>{ top(R,"Молчим и ждём сигнал ребёнка"); dots(R); acts(R,[["Три! Поехали!","",fire]]); },2700); }]]);
  }
  function fire(){
    word(R,"Три!"); top(R,p.title); acts(R,[]); SND.go(); run();
    later(()=>{ word(R,""); cheer(R,40); acts(R,[["Ещё раз!","",()=>ngRender()],forward()]); },2400);
  }
  ready();
}

/* --- съедобное --- */
function rEdible(st,s){
  const R=st.root; bg(R,ROOM);
  const bear=spr(R,{src:L("bear_calm"),x:50,b:15,h:62,c:"breathe"}), img=bear.firstChild;
  const item=h(`<div class="ed-item"><img src="${s.img}" alt="${s.n}"></div>`); R.appendChild(item);
  ["bear_open","bear_chew","bear_no","bear_think"].forEach(n=>new Image().src=L(n));
  top(R,s.n+". Это едят?");
  let done=false;
  const ask=()=>acts(R,[["😋 Ням! Едят","green pulse",()=>pick(true)],["🙅 Не едят","red",()=>pick(false)]]);
  function pick(v){
    if(done) return;
    if(v!==s.yes){ img.src=L("bear_think"); top(R,"Давай подумаем ещё. Это едят?"); bear.classList.add("shake"); tone(300,240,.15,.05); later(()=>{ img.src=L("bear_calm"); bear.classList.remove("shake"); },1400); return; }
    done=true; acts(R,[]);
    if(s.yes){ img.src=L("bear_open"); top(R,"Ням-ням!"); word(R,"Ням!"); later(()=>item.classList.add("eat"),250); later(()=>{ item.classList.add("gone"); img.src=L("bear_chew"); SND.am(); bear.classList.add("hop"); },1100); later(()=>{ word(R,""); top(R,"Вкусно! "+s.n+" едят."); cheer(R,40); acts(R,[forward()]); },2400); }
    else { item.classList.add("near"); later(()=>{ img.src=L("bear_no"); word(R,"Не-ет!"); SND.oi(); bear.classList.add("shake"); item.classList.remove("near"); },850); later(()=>{ word(R,""); top(R,"Правильно! "+s.n+" не едят."); cheer(R,40); acts(R,[forward()]); },2400); }
  }
  ask();
}

/* --- найди такой же --- */
function rSame(st,s){
  const R=st.root, p=st.p;
  const ord=s.opts.slice().sort(()=>Math.random()-.5);
  top(R,p.shadow?"Чья это тень?":(p.title.startsWith("Тоже")?"Найди ещё: "+s.n:"Найди такой же"));
  const smp=h(`<div class="fs-sample ${p.shadow?"shadow":""}"><img class="ng-pic" src="${s.sample}" alt=""></div>`); R.appendChild(smp);
  const box=h(`<div class="fs-opts"></div>`); R.appendChild(box); let done=false;
  ord.forEach((src,i)=>{ const b=h(`<button type="button" class="fs-o" style="--i:${i}"><img class="ng-pic" src="${src}" alt=""></button>`); b.onclick=()=>{ if(done) return;
    if(src!==s.ok){ b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); later(()=>b.classList.remove("shake"),600); tone(300,260,.12,.04); return; }
    done=true; box.querySelectorAll(".fs-o").forEach(x=>{ if(x!==b) x.classList.add("dim"); }); b.classList.add("good"); smp.classList.add("solved"); word(R,s.n[0].toUpperCase()+s.n.slice(1)+"!"); cheer(R,40);
    later(()=>{ word(R,""); const f=forward(); R.querySelectorAll(".ng-act").forEach(e=>e.remove()); acts(R,[f]); R.querySelector(".ng-act").style.bottom="40%"; },1500); };
    box.appendChild(b); });
}

/* --- первые слова --- */
function rWord(st,s){
  const R=st.root; bg(R,ROOM); top(R,s.task+SOON(st.p.word));
  let Z=layer(R,s.before);
  later(()=>dots(R),900);
  acts(R,[["🗣 Что скажем?","pulse",()=>{ word(R,st.p.word,true); SFX.panel(); acts(R,[[s.btn+"!","pulse",()=>{ acts(R,[]); Z.remove(); Z=layer(R,s.after); word(R,st.p.word); SND.pop(); cheer(R,46); later(()=>acts(R,[["Ещё раз","soft",()=>ngRender()],forward()]),1200); }]]); }]]);
}

/* --- ку-ку --- */
function rPeek(st,s){
  const R=st.root; bg(R,ROOM); top(R,"Кто там спрятался?"+SOON(s.name));
  const who=spr(R,{src:s.who,x:50,b:16,h:56,c:"kk-who"}); who.style.transform="translateX(-50%) scale(.55)"; who.style.opacity="0"; who.style.zIndex=1;
  const pl=spr(R,{src:s.place,x:50,b:15,h:54});
  every(()=>{ pl.classList.remove("shake"); void pl.offsetWidth; pl.classList.add("shake"); },2600);
  later(()=>dots(R),700);
  acts(R,[["🙈 Ку-ку!","pulse",()=>{ NG.stop(); acts(R,[]); pl.classList.remove("shake"); pl.style.transition="left .6s cubic-bezier(.4,1.4,.5,1),height .6s"; pl.style.left="17%"; pl.style.height="36%"; who.style.opacity="1"; who.style.transform="translateX(-50%) scale(1.08)"; who.style.left="58%"; who.style.zIndex=3; SND.pop(); word(R,s.name); top(R,s.say); later(()=>{ cheer(R,42); acts(R,[["Спрятать опять","soft",()=>ngRender()],forward()]); },700); }]]);
}
function rWhere(st,s){
  const R=st.root; bg(R,ROOM); top(R,"Где спрятался герой: "+s.name+"?"+SOON("там!"));
  const n=s.places.length, xs=n===2?[28,72]:[19,50,81];
  const who=spr(R,{src:s.who,x:xs[s.at],b:20,h:34,c:"kk-who"}); who.style.opacity="0"; who.style.zIndex=1; who.style.transform="translateX(-50%) scale(.4)";
  const peek=spr(R,{src:s.who,x:xs[s.at],b:40,h:20}); peek.style.zIndex=1;
  let done=false;
  s.places.forEach((pn,i)=>{ const e=spr(R,{src:L(pn),x:xs[i],b:18,h:n===2?38:32,c:"pop"}); e.style.pointerEvents="auto"; e.style.cursor="pointer";
    e.onclick=()=>{ if(done) return; if(i!==s.at){ e.classList.remove("shake","pop"); void e.offsetWidth; e.classList.add("shake"); word(R,"Тут никого!"); tone(300,240,.15,.05); later(()=>word(R,""),1200); return; }
      done=true; peek.remove(); who.style.opacity="1"; who.style.zIndex=4; who.style.bottom="40%"; who.style.transform="translateX(-50%) scale(1.15)"; SND.pop(); word(R,"Вот!"); top(R,"Вот "+s.name+"! Тут!"); cheer(R,45); later(()=>acts(R,[forward()]),900); }; });
}

/* --- ой бах ням --- */
function rOi(st,s){
  const R=st.root; let Z=null, pic=null;
  if(s.scene){ pic=h(`<img class="ng-bg ng-scene ${s.move||""}" src="${s.scene}" alt="" draggable="false">`); R.appendChild(pic); }
  else { bg(R,ROOM); Z=layer(R,s.before); }
  top(R,s.line+" …"+SOON(s.word));
  const show=()=>{ acts(R,[]);
    if(!s.scene){ Z.remove(); Z=layer(R,s.after); }
    else { pic.classList.remove("punch"); void pic.offsetWidth; pic.classList.add("punch"); }
    if(s.fx==="rain") for(let i=0;i<34;i++){ const d=h(`<i class="rn"></i>`); d.style.cssText=`left:${3+Math.random()*94}%;top:${4+Math.random()*42}%;animation-delay:${Math.random()}s`; R.appendChild(d); }
    if(s.fx==="bubbles") for(let i=0;i<26;i++){ const b=h(`<i class="pz-bub"></i>`); const sz=3+Math.random()*6; b.style.cssText=`left:${25+Math.random()*50}%;top:70%;width:${sz}cqw;height:${sz}cqw;--dx:${(Math.random()-.5)*30}cqw;--dy:${-20-Math.random()*38}cqh;animation-delay:${i*.09}s;opacity:0`; R.appendChild(b); }
    if(s.fx==="zzz") for(let k=0;k<3;k++) R.appendChild(h(`<i class="ng-z" style="left:${62+k*7}%;top:${40-k*8}%;font-size:${5+k*2}cqw;animation-delay:${k*.6}s">z</i>`));
    if(/^(g_|h_)/.test(s.snd)) REAL(s.snd,s.ms); else SND[s.snd]();
    const high=()=>{ if(!s.scene) return; R.querySelectorAll(".ng-top").forEach(x=>x.remove()); const wd=R.querySelector(".ng-word"); wd.style.top="1.6%"; wd.style.fontSize="7.4cqw"; };
    word(R,s.word); top(R,s.line+" "+s.word); high();
    later(()=>{ word(R,s.word,true); top(R,"Теперь ты! Скажи: "+s.word); high(); acts(R,[["⭐ Попробовал!","pulse",()=>{ cheer(R,46); acts(R,[["Ещё раз","soft",()=>ngRender()],forward()]); }],["Ещё раз показать","soft",()=>ngRender()]]); },1800); };
  acts(R,[[st.p.btn,"pulse",show]]);
}

/* --- барабанчик --- */
function rDrum(st,s){
  const R=st.root; bg(R,ROOM); top(R,s.title);
  const bear=spr(R,{src:L("drum_ready"),x:s.img?40:50,b:29,h:52}), img=bear.firstChild;
  ["drum_left","drum_right","drum_joy","drum_both","drum_wait"].forEach(n=>new Image().src=L(n));
  if(s.img) R.appendChild(h(`<div class="dr-card"><img class="ng-pic" src="${s.img}" alt=""></div>`));
  const row=h(`<div class="dr-row">${s.syl.map(x=>x?`<i>${x}</i>`:`<i style="visibility:hidden;min-width:5cqw;padding:0"></i>`).join("")}</div>`); R.appendChild(row);
  const dd=row.querySelectorAll("i"); let playing=false;
  function play(){
    if(playing) return; playing=true; acts(R,[]); let side=0; const step=620;
    s.syl.forEach((x,i)=>later(()=>{ if(!x){ img.src=L("drum_ready"); return; } side^=1; img.src=L(side?"drum_left":"drum_right"); REAL("g_drum"); dd[i].classList.add("on"); bear.classList.remove("beat"); void bear.offsetWidth; bear.classList.add("beat"); later(()=>dd[i].classList.remove("on"),420); },350+i*step));
    later(()=>{ playing=false; img.src=L("drum_wait"); top(R,"Теперь ты!"); acts(R,[["⭐ Получилось!","pulse",()=>{ img.src=L("drum_joy"); dd.forEach(d=>{ if(d.textContent) d.classList.add("on"); }); top(R,s.title+"!"); cheer(R,40); acts(R,[["🥁 Ещё раз","soft",()=>ngRender()],forward()]); }],["🥁 Послушать ещё","soft",()=>{ top(R,s.title); play(); }]]); },500+s.syl.length*step);
  }
  acts(R,[["🥁 Играй, мишка!","pulse",play]]);
}

/* --- договори словечко --- */
function rRhyme(st,s){
  const R=st.root; bg(R,s.place);
  R.appendChild(h(`<div class="rh-verse">${s.l1}<br>${s.l2} <span class="rh-gap">…</span><small class="rh-soon">Ребёнок договорит: «${s.ans}»</small></div>`));
  const hero=h(`<div class="rh-hero" style="bottom:${s.b===undefined?15:s.b}%;height:${s.h||44}%"><div class="rh-mv ${s.move}"><img src="${s.img}" alt="" draggable="false"></div></div>`); R.appendChild(hero);
  let done=false;
  const open=()=>{ if(done) return; done=true; const g=R.querySelector(".rh-gap"); g.textContent=s.ans; g.classList.add("on"); R.querySelector(".rh-soon")?.remove(); const m=hero.firstChild; m.className="rh-mv party"; SND.pop(); acts(R,[]); later(()=>{ cheer(R,56); acts(R,[["Прочитать снова","soft",()=>ngRender()],forward()]); },900); };
  acts(R,[["⭐ Договорили!","pulse",open]]);
}

/* --- первая фраза --- */
function rPhrase(st,s){
  const R=st.root; bg(R,ROOM);
  const strip=h(`<div class="ph-strip"><div class="ph-slot"></div><div class="ph-slot"></div></div>`); R.appendChild(strip);
  let Z=layer(R,s.before), n=0;
  const cards=h(`<div class="ph-cards"></div>`); R.appendChild(cards);
  s.cards.forEach((c,i)=>{ const b=h(`<button type="button" class="ph-card" style="--i:${i}"><img src="${c.img}" alt=""><b>${c.t}</b></button>`); b.onclick=()=>{
    if(i!==n){ b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); tone(300,260,.12,.04); return; }
    const sl=strip.children[n]; sl.innerHTML=b.innerHTML; sl.classList.add("full"); b.classList.add("used"); SND.pop(); n++;
    if(n===2){ later(()=>{ cards.remove(); Z.remove(); Z=layer(R,s.after); if(s.fx==="zzz") for(let k=0;k<3;k++){ const z=h(`<div class="ng-word" style="left:${64+k*7}%;top:${48-k*8}%;font-size:${4+k*1.6}cqw;animation-delay:${k*.45}s">z</div>`); Z.appendChild(z); }
        [0,1].forEach(k=>later(()=>{ const x=strip.children[k]; x.classList.remove("full","say"); x.style.cssText="border:0;background:#fff;box-shadow:var(--shadow)"; void x.offsetWidth; x.classList.add("say"); SND.tick(); },500+k*700));
        later(()=>{ word(R,s.phrase,true); R.querySelector(".ng-word.pulse").style.top="29%"; cheer(R,55); acts(R,[["Ещё раз","soft",()=>ngRender()],forward()]); },1900); },700); } };
    cards.appendChild(b); });
}

const RENDER={imit:rImit,pause:rPause,edible:rEdible,same:rSame,word:rWord,peek:rPeek,where:rWhere,oi:rOi,drum:rDrum,rhyme:rRhyme,phrase:rPhrase};
function ngRender(){
  NG.stop(); const st=ST[cur]; if(!st) return; const p=st.p, s=p.steps[Math.max(1,sub)-1];
  st.root.innerHTML=""; RENDER[p.t](st,s);
}
NG.render=ngRender;

/* --- панель взрослого --- */
const HOW={
  imit:"Тёма показывает движение по кругу. 1) Сделайте его сами. 2) Скажите «делай так» и подождите. 3) Если не получается, мягко помогите руками ребёнка. 4) Нажмите «Получилось!» и похвалите.",
  pause:"1) Нажмите «Раз, два…» и считайте вслух. 2) Замолчите, смотрите на ребёнка и ждите 3–10 секунд. 3) Любой сигнал (взгляд, жест, звук, слово «три») принимайте сразу: нажимайте «Поехали!». 4) Если сигнала нет, скажите «три» сами и сыграйте ещё раз.",
  edible:"1) Назовите предмет и спросите: «Это едят?» 2) Подождите ответа: слово, «ням», кивок или жест. 3) Нажмите то, что ответил ребёнок.",
  same:"Ребёнок показывает картинку пальцем. Нажмите её сами или дайте нажать ему. Назовите, что нашли.",
  word:"1) Покажите, что случилось. 2) Подождите. 3) Нажмите «Что скажем?»: появится слово. 4) Когда ребёнок скажет слово, часть слова или покажет жестом, нажмите жёлтую кнопку: картинка изменится.",
  peek:"1) Спросите: «Кто там?» и подождите. 2) Нажмите «Ку-ку!». 3) Назовите героя и подождите, пока ребёнок попробует повторить.",
  where:"Пусть ребёнок покажет пальцем и скажет «там» или «тут». Нажмите выбранное место.",
  oi:"1) Прочитайте строчку вверху. 2) Нажмите кнопку и с выражением скажите слово. 3) Дайте ребёнку попробовать. Играя повторно, замолчите перед словом.",
  drum:"1) Нажмите «Играй, мишка!». 2) Повторите сами: ладошкой по столу и голосом. 3) Теперь ребёнок. Если трудно, держите его ладошку и играйте вместе.",
  rhyme:"Назовите героя, прочитайте стишок и остановитесь перед последним словом. Подождите. Когда ребёнок договорит или попробует, нажмите «Договорили!»: появится слово, а герой обрадуется.",
  phrase:"Нажимайте картинки по порядку слева направо, когда ребёнок покажет и назовёт каждую. Потом скажите фразу вместе, без паузы между словами."
};
const ASK={
  imit:s=>s.prep?[]:["Смотри на Тёму!","Делай так!","Молодец, ещё раз!"],
  pause:()=>["Раз… два…","(молчите и ждите)","Три! Поехали!"],
  edible:s=>["Что это?","Это едят?","Покажи, как мишка ест."],
  same:s=>["Что это?","Найди такой же.","Покажи пальчиком."],
  word:(s,p)=>["Что случилось?","Что скажем?","Скажи: «"+p.word+"»"],
  peek:s=>["Кто там?","Ку-ку!","Кто это?"],
  where:s=>["Где "+s.name+"?","Покажи пальчиком.","Там или тут?"],
  oi:s=>["Что делает?","Скажи вместе со мной.","А теперь сам!"],
  drum:s=>["Послушай!","Повтори за мишкой.","Скажи по слогам."],
  rhyme:s=>["Кто это?","Послушай стишок.","Договори словечко!"],
  phrase:s=>["Кто это или что это?","Что дальше?","Скажи всё вместе: «"+s.phrase+"»"]
};
NG.side=()=>{
  const p=PICS[cur], d=INFO[cur], s=p.steps[Math.max(1,sub)-1];
  let t=`<h3>Отрабатываем</h3><p class="skill">${d.skill}</p>`;
  if(p.steps.length>1) t+=`<span class="chip where">Задание ${Math.max(1,sub)} из ${p.steps.length}</span>`;
  const note=s.adult||p.adult;
  if(note) t+=`<div class="tip"><b>Сейчас</b>${note}</div>`;
  t+=`<div class="tip"><b>Как играть</b>${HOW[p.t]}</div>`;
  const q=ASK[p.t](s,p);
  if(q.length) t+=`<div class="ask">Что говорить</div>`+q.map((x,k)=>`<button class="q" data-k="ng:${cur}:${sub}:${k}"><b>${k+1}</b><span>${x}</span></button>`).join("");
  t+=`<button class="zbtn" id="ngAgain">🔁 Задание заново</button>`;
  if(["imit","drum","oi"].includes(p.t)) t+=`<details class="cred"><summary>Авторы звуков</summary><div id="ngCred">Загрузка…</div></details>`;
  $("side").innerHTML=t;
  const cr=$("side").querySelector(".cred"); if(cr) cr.addEventListener("toggle",()=>{ fetch("audio/credits.json").then(r=>r.json()).then(j=>{ const box=$("ngCred"); if(box) box.innerHTML=j.filter(c=>CRED[c.key]).map(c=>`<div>${CRED[c.key]}: <a href="${c.page}" target="_blank" rel="noopener">${c.file}</a>, ${c.license}${c.artist?`, ${c.artist}`:""}</div>`).join("")+`<div style="margin-top:6px">Источник: Wikimedia Commons. Фрагменты обрезаны.</div>`; }).catch(()=>{}); });
  $("ngAgain").onclick=()=>{ ngRender(); SFX.all(); };
  $("side").querySelectorAll(".q").forEach(b=>b.onclick=()=>{ b.classList.toggle("done"); SFX.panel(); });
  $("side").scrollTop=0;
};
})();
