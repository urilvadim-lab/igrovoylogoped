(function(){
var re=/(^|[\s(«\u00a0])(в|во|на|с|со|к|ко|у|о|об|и|а|но|не|ни|по|за|из|от|до|для|без|под|при|про|или|что|чем|как|это)[ \t\r\n]+/gi;
var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),t,list=[];
while(t=w.nextNode()){if(!/^(SCRIPT|STYLE)$/.test(t.parentNode.nodeName)&&t.nodeValue.trim())list.push(t)}
list.forEach(function(t){var s=t.nodeValue,p;do{p=s;s=s.replace(re,'$1$2\u00a0')}while(s!==p);t.nodeValue=s.replace(/ (?=[—–] )/g,'\u00a0').replace(/ПА-ТА-КА/g,'ПА\u2011ТА\u2011КА')});
})();
