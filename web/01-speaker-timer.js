/* EventsPRO speaker countdown: timestamps keep the clock independent of repaint rate. */
(function(root){'use strict';
 const MAX=86400000;
 const defaults=()=>({schema:'eventspro-timer-v1',mode:'down',showClock:false,showHours:false,showHundredths:false,end:'stop',message:'',title:'Tiempo de intervención',duration:600000,remaining:600000,deadline:null,running:false,laps:[],warning:300000,critical:60000,digitColor:"#5ce5a5",backgroundColor:"#000000",alertColors:true});
 function restore(value){
  if(!value||value.schema!=='eventspro-timer-v1')throw Error('Temporizador no válido.');
  for(const key of ['duration','remaining','warning'])if(!Number.isFinite(value[key]))throw Error('Tiempo no válido.');
  if(value.duration<1000||value.duration>MAX||Math.abs(value.remaining)>MAX||value.warning<0||value.warning>MAX||typeof value.running!=='boolean'||(value.running&&!Number.isFinite(value.deadline)))throw Error('Tiempo fuera de rango.');
  if(value.critical!==undefined&&(!Number.isFinite(value.critical)||value.critical<0||value.critical>MAX))throw Error('Aviso rojo no válido.');
  const color=(v,fallback)=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v)?v:fallback;
  const laps=[];if(Array.isArray(value.laps))for(const lap of value.laps.slice(0,100)){if(!Number.isFinite(lap?.atMs)||lap.atMs<0||lap.atMs>MAX*2||lap.atMs<(laps.at(-1)?.atMs??0))continue;laps.push({atMs:Math.round(lap.atMs),splitMs:Math.round(lap.atMs-(laps.at(-1)?.atMs??0))});}
  return {...defaults(),critical:value.critical??0,digitColor:color(value.digitColor,'#5ce5a5'),backgroundColor:color(value.backgroundColor,'#000000'),alertColors:value.alertColors!==false,showClock:value.showClock===true,showHours:value.showHours===true,showHundredths:value.showHundredths===true,end:value.end==='continue'?'continue':'stop',mode:['down','up','clock'].includes(value.mode)?value.mode:'down',message:String(value.message||'').slice(0,160),title:String(value.title||'Tiempo de intervención').slice(0,100),duration:value.duration,remaining:value.remaining,warning:value.warning,running:value.running,deadline:value.running?value.deadline:null,laps};
 }
 const remaining=(s,now=Date.now())=>{const value=s.running?s.deadline-now:s.remaining;return s.mode==='up'?Math.max(-MAX,value):s.end==='stop'?Math.max(0,value):value;};
 function settle(s,now=Date.now()){return s.mode==='down'&&s.running&&s.end==='stop'&&s.deadline<=now?{...s,running:false,remaining:0,deadline:null}:s;}
 function start(s,now=Date.now()){return s.running?s:{...s,running:true,deadline:now+s.remaining};}
 function pause(s,now=Date.now()){return {...s,remaining:Math.max(-MAX,remaining(s,now)),deadline:null,running:false};}
 function reset(s){return {...s,remaining:s.duration,deadline:null,running:false};}
 const elapsed=(s,now=Date.now())=>Math.max(0,Math.min(MAX*2,s.duration-remaining(s,now)));
 function recordLap(s,now=Date.now()){if(s.mode!=='up'||!s.running||(s.laps||[]).length>=100)return s;const atMs=Math.round(elapsed(s,now)),last=s.laps?.at(-1)?.atMs??0;return {...s,laps:[...(s.laps||[]),{atMs,splitMs:atMs-last}]};}
 const clearLaps=s=>({...s,laps:[]});
 function removeLap(s,index){const source=s.laps||[];if(!Number.isInteger(index)||index<0||index>=source.length)return s;const laps=source.filter((_,i)=>i!==index);return {...s,laps:laps.map((lap,i)=>({...lap,splitMs:lap.atMs-(i?laps[i-1].atMs:0)}))};}
 function formatLap(ms){const cs=Math.floor(Math.max(0,ms)/10),h=Math.floor(cs/360000),m=Math.floor(cs%360000/6000),seconds=Math.floor(cs%6000/100);return (h?String(h).padStart(2,'0')+':':'')+String(m).padStart(2,'0')+':'+String(seconds).padStart(2,'0')+'.'+String(cs%100).padStart(2,'0');}
 function adjust(s,delta,now=Date.now()){const value=Math.max(-MAX,Math.min(MAX,remaining(s,now)+(s.mode==='up'?-delta:delta)));return {...s,remaining:value,deadline:s.running?now+value:null};}
 function configure(s,seconds){if(!Number.isInteger(seconds)||seconds<1||seconds>86400)throw Error('Elige una duración entre 1 segundo y 24 horas.');return reset({...s,duration:seconds*1000});}
 function display(s,now=Date.now()){
  const format=(ticks,clock=false)=>{const seconds=Math.floor(ticks/100),h=Math.floor(seconds/3600),hours=clock||s.showHours,hundredths=!clock&&s.showHundredths,m=hours?Math.floor(seconds%3600/60):Math.floor(seconds/60),sec=seconds%60;return (hours?String(h).padStart(2,'0')+':':'')+String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')+(hundredths?'.'+String(ticks%100).padStart(2,'0'):'');};
  if(s.mode==='clock'){const d=new Date(now),ticks=(d.getHours()*3600+d.getMinutes()*60+d.getSeconds())*100+Math.floor(d.getMilliseconds()/10);return {text:format(ticks,true),phase:'clock',progress:0,ms:0};}
  const ms=remaining(s,now),elapsed=s.mode==='up'?Math.max(0,s.duration-ms):Math.abs(ms),unit=s.showHundredths?10:1000,rounded=s.mode==='up'||ms<0?Math.floor(elapsed/unit):Math.ceil(elapsed/unit),ticks=rounded*(s.showHundredths?1:100);
  return {text:(ms<0&&s.mode!=='up'?'+':'')+format(ticks),phase:s.mode==='up'?'normal':ms<=0?'over':s.critical>0&&ms<=s.critical?'critical':s.warning>0&&ms<=s.warning?'warning':'normal',progress:Math.max(0,Math.min(1,ms/s.duration)),ms};
 }
 const api={settle,defaults,restore,remaining,elapsed,recordLap,clearLaps,removeLap,formatLap,start,pause,reset,adjust,configure,display};root.EventsPROSpeakerTimer=api;if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);