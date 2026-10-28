(function(root){'use strict';
const C=typeof module==='object'&&module.exports?require('./speaker-timer.js'):root.EventsPROSpeakerTimer;
function apply(state,command,presets=[],messages=[]){let s=C.settle(C.restore(state));const v=command.value;switch(command.action){
case 'start':if(s.mode==='clock'||(s.mode==='down'&&s.end==='stop'&&C.remaining(s)<=0))throw Error('Timer cannot start');return C.start(s);
case 'pause':return C.pause(s);
case 'reset':return {...C.reset(s),laps:[]};
case 'adjust':if(s.mode==='clock'||!Number.isInteger(v)||Math.abs(v)>86400)throw Error('Invalid adjustment');return C.adjust(s,v*1000);
case 'duration':if(s.running)throw Error('Pause before changing duration');return C.configure(s,v);
case 'mode':if(s.running||!['down','up','clock'].includes(v))throw Error('Pause before changing mode');return C.reset({...s,mode:v,laps:[]});
case 'title':if(typeof v!=='string'||v.length>100)throw Error('Invalid title');return {...s,title:v};
case 'message':if(typeof v!=='string'||v.length>160)throw Error('Invalid message');return {...s,message:v};
case 'message/preset':{if(typeof v!=='string'||!v||v.length>100)throw Error('Invalid message preset ID');const p=messages.find(p=>p.id===v);if(!p)throw Error('Unknown message preset ID');if(typeof p.text!=='string'||!p.text||p.text.length>160)throw Error('Invalid saved message');return {...s,message:p.text};}
case 'message/clear':return {...s,message:''};
case 'lap':if(s.mode!=='up'||!s.running)throw Error('Stopwatch is not running');return C.recordLap(s);
case 'preset':case 'preset/start':{if(s.running&&command.action==='preset')throw Error('Pause before loading a preset');const p=presets.find(p=>p.id===v);if(!p)throw Error('Unknown preset ID');const prepared=C.reset(C.restore(p.state));return command.action==='preset/start'?C.start(prepared):prepared;}
default:throw Error('Unknown command');}}
const api={apply};if(typeof module==='object'&&module.exports)module.exports=api;else root.EventsPROTimerRemote=api;
})(typeof globalThis!=='undefined'?globalThis:this);
