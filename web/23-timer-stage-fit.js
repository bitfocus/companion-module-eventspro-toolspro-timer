/* Content-aware fitting for legacy extended Timer output. Does not alter state. */
(function(root){
 'use strict';if(root.EventsPROTimerStageFit)return;
 const canvas=document.createElement('canvas'),context=canvas.getContext('2d'),watched=new WeakSet();let pending=false;
 function fit(stage){
  const digits=stage.querySelector('.st-digits');if(!digits||!stage.clientWidth||!context)return;
  const css=getComputedStyle(stage);let width=stage.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight)-12,height=stage.clientHeight-parseFloat(css.paddingTop)-parseFloat(css.paddingBottom)-12;
  const laps=stage.querySelector('.st-lap-display');if(laps&&!laps.hidden&&getComputedStyle(laps).display!=='none'){if(getComputedStyle(laps).position==='absolute')width-=laps.offsetWidth+18;else height-=laps.offsetHeight+10}
  for(const item of stage.querySelectorAll('.st-title,.st-status,.st-message,.st-small-clock'))if(!item.hidden&&getComputedStyle(item).display!=='none'&&getComputedStyle(item).position!=='absolute')height-=item.offsetHeight+8;
  context.font='700 100px ui-monospace, SFMono-Regular, Consolas, monospace';const measured=context.measureText(digits.textContent||'00:00').width,size=Math.max(12,Math.floor(Math.min(Math.max(20,width)*100/Math.max(1,measured),Math.max(12,height)/1.16)));
  digits.style.setProperty('font-size',size+'px','important');digits.style.setProperty('line-height','1.12','important');digits.style.setProperty('letter-spacing','0','important');digits.style.margin='4px 0';
 }
 const resize=typeof ResizeObserver==='function'?new ResizeObserver(entries=>entries.forEach(e=>fit(e.target))):null;
 function run(){pending=false;document.querySelectorAll('.st-stage').forEach(stage=>{if(!watched.has(stage)){watched.add(stage);resize?.observe(stage)}fit(stage)})}
 function schedule(){if(!pending){pending=true;requestAnimationFrame(run)}}
 const observer=new MutationObserver(schedule);observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true});root.addEventListener('resize',schedule);root.EventsPROTimerStageFit={fit};schedule();
})(window);
