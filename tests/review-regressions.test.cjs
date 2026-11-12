const { test } = require('node:test'),
	assert = require('node:assert/strict'),
	vm = require('node:vm'),
	fs = require('node:fs')
const C = require('../src/speaker-timer.js'),
	Session = require('../src/lan-session.cjs')
test('English defaults and intentional readable variable names retain IDs', () => {
	assert.equal(C.defaults().title, 'Speaker time')
	let names
	class Host {
		setVariableDefinitions(v) {
			names = v
		}
		setVariableValues() {}
		setActionDefinitions() {}
		setFeedbackDefinitions() {}
		setPresetDefinitions() {}
		checkFeedbacks() {}
	}
	const M = require('../src/module.js')({ InstanceBase: Host }),
		m = new M()
	m.catalog = []
	m.state = {}
	m.define()
	assert.equal(m.t('Español', 'English'), 'English')
	assert.equal(names.find((v) => v.variableId === 'seconds').name, 'Remaining time (seconds)')
})
test('display seconds follow the same countdown rounding including overtime', () => {
	let s = new Session()
	s.state = { ...C.defaults(), remaining: 599400 }
	assert.equal(s.snapshot().display.seconds, 600)
	s.state = { ...s.state, end: 'continue', remaining: -5600 }
	assert.equal(s.snapshot().display.seconds, -5)
})
test('advanced configuration visibility preserves both conditions', () => {
	const M = require('../src/lan-module.cjs')({ InstanceBase: class {} })
	const fields = new M().getConfigFields()
	assert.match(fields.find((v) => v.id === 'listenIp').isVisibleExpression, /advanced/)
	assert.match(fields.find((v) => v.id === 'listenIp').isVisibleExpression, /transport/)
	assert.equal(fields[0].width, 12)
})
test('open owner reclaims after module restart without resetting running clock', async (t) => {
 t.mock.timers.enable({apis:['Date'],now:Date.now()});
	const original = new Session()
	const client = 'a'.repeat(64)
	original.request({ op: 'owner', client })
	original.command({ action: 'duration', value: 1200 })
	original.command({ action: 'title', value: 'Ana' })
	original.command({ action: 'start' })
	const state = original.snapshot().state,
		store = new Map()
	const KEY = 'eventspro-speaker-timer-v1:'
	store.set(KEY, JSON.stringify(state))
	const session = new Session()
	let timerCallback,
		requests = 0
	const context = {
		URLSearchParams,
		EventsPROSpeakerTimer: C,
		location: { pathname: '/index.html', search: '' },
		sessionStorage: { timerLANClient: client },
		crypto: require('node:crypto').webcrypto,
		Uint8Array,
		Date,
		JSON,
		StorageEvent: class {},
		dispatchEvent() {},
		document: {
			documentElement: {},
			querySelector() {
				return null
			},
		},
		MutationObserver: class {
			observe() {}
		},
		localStorage: { getItem: (k) => store.get(k) || null, setItem: (k, v) => store.set(k, v) },
		setTimeout: (f) => (timerCallback = f),
		fetch: async (_url, o) => {
			const b = JSON.parse(o.body)
			requests++
			const r = requests === 2 ? { status: 403, body: { error: 'Invalid pairing' } } : session.request(b)
			return { ok: r.status === 200, status: r.status, json: async () => r.body }
		},
	}
	vm.runInNewContext(fs.readFileSync(require.resolve('../web/lan-client.js'), 'utf8'), context)
	await new Promise(setImmediate) // initial owner
	store.set(KEY, JSON.stringify(state))
	await timerCallback()
	await new Promise(setImmediate) // 403
	await timerCallback()
	await new Promise(setImmediate)
	assert.equal(session.state.title, 'Ana')
	assert.equal(session.state.running, true)
	assert.equal(session.state.duration, 1200000)
	assert.equal(session.state.deadline, state.deadline)
})
