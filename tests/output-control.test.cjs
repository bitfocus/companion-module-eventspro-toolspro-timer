const { test } = require('node:test'),
	assert = require('node:assert/strict'),
	C = require('../src/speaker-timer.js'),
	R = require('../src/remote.cjs'),
	Session = require('../src/lan-session.cjs')
test('HIDE preserves deadline and running clock, SHOW restores output only', () => {
	const now = Date.now()
	let s = C.start(C.defaults(), now)
	const end = s.deadline
	s = R.apply(s, { action: 'output/hide' })
	assert.equal(s.outputVisible, false)
	assert.equal(s.running, true)
	assert.equal(s.deadline, end)
	assert.equal(C.remaining(s, now + 1000), 599000)
	s = R.apply(s, { action: 'output/show' })
	assert.equal(s.outputVisible, true)
	assert.equal(s.deadline, end)
})
test('legacy projects show output; hidden output survives JSON and presets', () => {
	const old = C.defaults()
	delete old.outputVisible
	assert.equal(C.restore(old).outputVisible, true)
	const s = R.apply({ ...C.defaults(), outputVisible: false }, { action: 'preset', value: 'one' }, [
		{ id: 'one', state: C.defaults() },
	])
	assert.equal(C.restore(JSON.parse(JSON.stringify(s))).outputVisible, false)
})
test('chroma and independent text presets persist through remote server and restore', () => {
	let s = new Session()
	s.command({ action: 'background/chroma-green' })
	s.command({ action: 'digits/white' })
	assert.equal(s.state.backgroundColor, '#00ff00')
	assert.equal(s.state.digitColor, '#ffffff')
	s.command({ action: 'background/chroma-blue' })
	assert.equal(s.state.backgroundColor, '#0000ff')
	assert.equal(s.state.digitColor, '#ffffff')
	s.command({ action: 'digits/green' })
	s.command({ action: 'output/hide' })
	const restored = C.restore(JSON.parse(JSON.stringify(s.state)))
	assert.equal(restored.digitColor, '#00ff00')
	assert.equal(restored.outputVisible, false)
	assert.equal(s.snapshot().display.outputVisible, false)
})
test('new Companion visibility controls are additive and transport-agnostic', () => {
	class Host {
		setVariableDefinitions(v) {
			this.vars = v
		}
		setVariableValues(v) {
			this.values = v
		}
		setActionDefinitions(v) {
			this.actions = v
		}
		setFeedbackDefinitions(v) {
			this.fb = v
		}
		setPresetDefinitions(v) {
			this.ps = v
		}
		checkFeedbacks() {}
	}
	const M = require('../src/module.js')({ InstanceBase: Host }),
		m = new M()
	m.state = { connected: true, outputVisible: false }
	m.catalog = []
	m.define()
	assert.equal(m.values.output_visible, 0)
	assert.equal(m.fb.output_visible.callback(), false)
	let sent
	m.send = (...args) => (sent = args)
	m.actions['output/toggle'].callback()
	assert.deepEqual(sent, ['output/toggle'])
	assert.equal(m.ps['output-toggle'].steps[0].down[0].actionId, 'output/toggle')
	m.received({ address: '/eventspro/timer/output/visible', args: [1] })
	assert.equal(m.state.outputVisible, true)
})
test('alpha is explicit, persistent and reset by chroma presets', () => {
	let s = R.apply(C.defaults(), { action: 'background/transparent' })
	assert.equal(s.backgroundAlpha, 0)
	assert.equal(C.restore(JSON.parse(JSON.stringify(s))).backgroundAlpha, 0)
	s = R.apply(s, { action: 'background/chroma-blue' })
	assert.equal(s.backgroundAlpha, 1)
	const old = C.defaults()
	delete old.backgroundAlpha
	assert.equal(C.restore(old).backgroundAlpha, 1)
})
