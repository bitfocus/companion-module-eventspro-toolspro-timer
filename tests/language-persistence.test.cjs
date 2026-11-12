const { test } = require('node:test')
const assert = require('node:assert/strict')
class Host {
 constructor(){this.label='Timer'}
 setVariableDefinitions(v){this.variables=v}
 setVariableValues(){}
 setActionDefinitions(v){this.actions=v}
 setFeedbackDefinitions(v){this.feedbacks=v}
 setPresetDefinitions(v){this.presets=v}
 checkFeedbacks(){} updateStatus(_s,m){this.statusText=m} log(){}
}
const M=require('../src/lan-module.cjs')({InstanceBase:Host, InstanceStatus:{Ok:'ok',Connecting:'connecting'}})
const snapshot=m=>({config:m.getConfigFields().map(({id,default:d,choices})=>({id,default:d,choices:choices?.map(c=>c.id)})),actions:Object.fromEntries(Object.entries(m.actions).map(([id,v])=>[id,v.options.map(o=>({id:o.id,default:o.default,choices:o.choices?.map(c=>c.id)}))])),feedback:Object.keys(m.feedbacks),variables:m.variables.map(v=>v.variableId),presets:Object.fromEntries(Object.entries(m.presets).map(([id,v])=>[id,v.steps]))})
test('English is default and saved Spanish configuration survives connection reconstruction without changing identifiers',async t=>{
 const english=new M();await english.init({transport:'lan'});t.after(()=>english.destroy())
 assert.equal(english.config.language,'en');assert.equal(english.actions.start.name,'Start / resume')
 assert.equal(english.getConfigFields().find(f=>f.id==='host').label,'Timer computer IP')
 const identifiers=snapshot(english)
 const saved=JSON.parse(JSON.stringify({...english.config,language:'es'}))
 const spanish=new M();await spanish.init(saved);t.after(()=>spanish.destroy())
 assert.equal(spanish.config.language,'es');assert.equal(spanish.actions.start.name,'Iniciar / continuar')
 assert.equal(spanish.getConfigFields().find(f=>f.id==='host').label,'IP del equipo Timer')
 assert.equal(spanish.variables.find(v=>v.variableId==='seconds').name,'Tiempo restante (segundos)')
 assert.equal(spanish.feedbacks.output_visible.name,'Salida del ponente visible')
 assert.deepEqual(snapshot(spanish),identifiers)
 const restarted=new M();await restarted.init(JSON.parse(JSON.stringify(spanish.config)));t.after(()=>restarted.destroy())
 assert.equal(restarted.config.language,'es');assert.equal(restarted.presets.start.style.text,'INICIAR')
 assert.equal(restarted.actions.start.name,'Iniciar / continuar')
 await restarted.configUpdated({...restarted.config,language:'en'})
 assert.equal(restarted.actions.start.name,'Start / resume');assert.deepEqual(snapshot(restarted),identifiers)
})
test('legacy OSC configuration retains its transport and language on reload',async t=>{
 const m=new M();await m.init({host:'127.0.0.1',port:9010,feedbackPort:0,language:'es'});t.after(()=>m.destroy())
 assert.equal(m.config.transport,'osc');assert.equal(m.config.language,'es');assert.equal(m.config.port,9010)
 assert.equal(m.actions.start.name,'Iniciar / continuar')
})
