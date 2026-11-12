'use strict';const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const W=path.join(__dirname,'../web');
function context(seed={}){
 const store=new Map(Object.entries(seed)),callbacks={};
 const doc={documentElement:{lang:'en'},readyState:'loading',querySelectorAll:()=>[],addEventListener:(k,f)=>(callbacks[k]??=[]).push(f),scrollingElement:{scrollTop:0,scrollLeft:0}};
 const ctx={document:doc,location:{pathname:'/index.html'},localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v))},requestAnimationFrame:f=>f(),scrollTo(){},dispatchEvent(){},CustomEvent:class{},MutationObserver:class{observe(){}disconnect(){}},console};ctx.window=ctx;
 vm.createContext(ctx);for(const file of ['00-timer-i18n-core.js','00-timer-i18n-init.js','03-suite-projects.js','01-speaker-timer.js','02-speaker-timer-ui.js'])vm.runInContext(fs.readFileSync(path.join(W,file),'utf8'),ctx,{filename:file});return{ctx,store,callbacks};
}
const clean=context();assert.equal(clean.ctx.EventsPROI18n.getLanguage(),'en');assert.equal(clean.ctx.document.documentElement.lang,'en');assert.equal(clean.store.get('eventspro.interface.language.v1'),'en');
for(const lang of ['es','en']){const saved=context({'eventspro.interface.language.v1':lang});assert.equal(saved.ctx.EventsPROI18n.getLanguage(),lang);assert.equal(saved.ctx.document.documentElement.lang,lang);}
assert.equal(context({'eventspro.interface.language.v1':'fr'}).ctx.EventsPROI18n.getLanguage(),'en');
const I=clean.ctx.EventsPROI18n,captions=JSON.parse(fs.readFileSync(path.join(__dirname,'web-language-captions.json'),'utf8'));
function node(){return{isConnected:true,children:[],childNodes:[],textContent:'',attrs:{},setAttribute(k,v){this.attrs[k]=String(v);}};}
const save=node(),placeholder=node(),user=node();user.value='Mesa redonda · Ángela';user.textContent='Nombre del cliente';I.bind(save,captions.keys.Save);I.bind(placeholder,captions.keys.Day,'placeholder');assert.equal(save.textContent,'Save');assert.equal(placeholder.attrs.placeholder,'Day');
const C=clean.ctx.EventsPROSpeakerTimer,base=C.configure(C.defaults(),3599);base.title='Mesa redonda · Ángela QA';const paused=C.pause(C.restore(base));
const agenda=Array.from({length:12},(_,i)=>({id:'qa-'+i,name:'Ponente QA '+(i+1),day:'Día QA',session:'Sesión QA',type:'Ponencia',state:{...paused,title:'Ponente QA '+(i+1)}}));const messages=[{id:'qa-message',name:'Aviso del cliente',text:'No traducir este mensaje'}];
clean.store.set('eventspro-speaker-timer-v1:',JSON.stringify(paused));clean.store.set('eventspro-speaker-timer-v1:-presets',JSON.stringify(agenda));clean.store.set('eventspro-speaker-timer-v1:-messages',JSON.stringify(messages));const before=[...clean.store].filter(([k])=>k!=='eventspro.interface.language.v1');
I.setLanguage('es');assert.equal(I.t('timer.output.visible'),'VISIBLE\nSalida visible');assert.equal(I.t('timer.output.hidden'),'OCULTA\nSalida oculta');assert.equal(save.textContent,'Guardar');assert.equal(placeholder.attrs.placeholder,'Día');assert.equal(user.value,'Mesa redonda · Ángela');assert.equal(user.textContent,'Nombre del cliente');assert.deepEqual([...clean.store].filter(([k])=>k!=='eventspro.interface.language.v1'),before);
I.setLanguage('en');assert.equal(I.t('timer.output.visible'),'SHOW\nOutput visible');assert.equal(I.t('timer.output.hidden'),'HIDE\nOutput hidden');assert.equal(save.textContent,'Save');assert.equal(placeholder.attrs.placeholder,'Day');assert.equal(I.t('timer.workbook.columns'),'Select the speaker slot and timing columns.');assert.deepEqual([...clean.store].filter(([k])=>k!=='eventspro.interface.language.v1'),before);
assert.equal(C.remaining(C.restore(JSON.parse(clean.store.get('eventspro-speaker-timer-v1:')))),3599000);assert.equal(C.restore(JSON.parse(clean.store.get('eventspro-speaker-timer-v1:'))).running,false);
const reloaded=context(Object.fromEntries(clean.store));assert.equal(reloaded.ctx.EventsPROI18n.getLanguage(),'en');assert.equal(reloaded.store.get('eventspro-speaker-timer-v1:-presets'),JSON.stringify(agenda));
I.setLanguage('es');assert.equal(context(Object.fromEntries(clean.store)).ctx.EventsPROI18n.getLanguage(),'es');
for(const [en,key]of Object.entries(captions.keys)){I.setLanguage('en');assert.equal(I.t(key),en);I.setLanguage('es');assert.equal(I.t(key),captions.es[key]);}

const result={pass:true,cleanDefault:'en',savedSpanish:true,savedEnglish:true,unsupportedPreferenceFallsBackEnglish:true,workspaceCaptionPairs:Object.keys(captions.keys).length,liveBoundCaptions:true,userValuesUntouched:true,timerPaused5999Preserved:true,twelveSyntheticPresetsPreserved:true,storageLanguageOnlyWrite:true,reloadPersistence:true,proof:'Real translation core and timer model in VM; real IAB UI acceptance pending; no actual CEPSA profile used'};
console.log(JSON.stringify(result));
