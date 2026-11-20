const { test } = require('node:test'),
	assert = require('node:assert/strict'),
	fs = require('node:fs'),
	path = require('node:path')
const load = require('./helpers/load-module.cjs')
class Host {
	constructor() {
		this.label = 'Timer'
		this.logs = []
		this.statuses = []
	}
	setVariableDefinitions(v) {
		this.variables = v
	}
	setVariableValues(v) {
		this.values = v
	}
	setActionDefinitions(v) {
		this.actions = v
	}
	setFeedbackDefinitions(v) {
		this.feedbacks = v
	}
	setPresetDefinitions(v) {
		this.presets = v
	}
	checkFeedbacks() {}
	updateStatus(status, message) {
		this.statuses.push({ status, message })
	}
	log(level, message) {
		this.logs.push({ level, message })
	}
}
const status = { Ok: 'ok', Connecting: 'connecting', BadConfig: 'bad', ConnectionFailure: 'failure' }
const Module = load({ InstanceBase: Host, InstanceStatus: status })
test('message and title variables resolve before length limits in both transports', async (t) => {
	for (const transport of ['lan', 'osc']) {
		const m = new Module()
		m.catalog = []
		m.state = {}
		m.config = { transport }
		m.define()
		const sent = []
		m.send = (id, args) => sent.push({ id, args })
		for (const id of ['message', 'title']) {
			let received
			await m.actions[id].callback(
				{ options: { value: '$(custom:speaker)' } },
				{
					parseVariablesInString: async (input) => {
						received = input
						return 'Maria Lopez ' + 'x'.repeat(170)
					},
				},
			)
			assert.equal(received, '$(custom:speaker)')
			assert.equal(sent.at(-1).args[0].length, id === 'message' ? 160 : 100)
			assert.match(sent.at(-1).args[0], /^Maria Lopez /)
		}
	}
})
test('remote OSC advanced defaults receive on network and loopback is rejected explicitly', async (t) => {
	const m = new Module()
	t.after(() => m.destroy())
	const fields = m.getConfigFields()
	assert.equal(fields.find((f) => f.id === 'listenIp').default, '0.0.0.0')
	assert.ok(fields.find((f) => f.id === 'host').regex)
	assert.ok(fields.find((f) => f.id === 'listenIp').regex)
	await m.init({ transport: 'osc', host: '192.0.2.1', listenIp: '127.0.0.1', advanced: true })
	assert.equal(m.statuses.at(-1).status, 'bad')
	assert.match(m.statuses.at(-1).message, /loopback/)
	assert.equal(m.socket, undefined)
})
test('invalid speaker entries and rejected catalogue are logged without exposing user text', () => {
	const m = new Module()
	m.catalog = []
	m.state = {}
	m.received({ address: '/eventspro/timer/presets/begin', args: ['r', 1] })
	m.received({ address: '/eventspro/timer/presets/entry', args: ['r', 'not-json-secret'] })
	m.received({ address: '/eventspro/timer/presets/end', args: ['r'] })
	assert.equal(m.logs.length, 2)
	assert.ok(m.logs.every((x) => x.level === 'warn'))
	assert.ok(m.logs.every((x) => !x.message.includes('not-json-secret')))
	assert.deepEqual(m.catalog, [])
})
test('clock preset uses a readable name while preserving variable button text and empty steps', () => {
	const m = new Module()
	m.catalog = []
	m.state = {}
	m.define()
	assert.equal(m.presets.time.name, 'Timer display')
	assert.equal(m.presets.time.style.text, '$(Timer:time)')
	assert.deepEqual(JSON.parse(JSON.stringify(m.presets.time.steps)), [{ down: [], up: [] }])
})
test('served web bundle and core copies exactly match every tracked web source', () => {
	const root = path.join(__dirname, '..'),
		web = path.join(root, 'web'),
		assets = require('../src/web-assets.json'),
		files = fs
			.readdirSync(web)
			.filter((f) => fs.statSync(path.join(web, f)).isFile())
			.sort()
	assert.deepEqual(Object.keys(assets).sort(), files)
	for (const f of files) assert.equal(assets[f], fs.readFileSync(path.join(web, f), 'utf8'), f)
	for (const [a, b] of [
		['01-speaker-timer.js', 'speaker-timer.js'],
		['05-timer-remote.js', 'remote.cjs'],
	])
		assert.equal(fs.readFileSync(path.join(web, a), 'utf8'), fs.readFileSync(path.join(root, 'src', b), 'utf8'))
})

test('OSC watchdog reports each outage once and rearms after reconnection', async (t) => {
	const dgram = require('node:dgram'),
		{ once } = require('node:events'),
		{ setTimeout: delay } = require('node:timers/promises')
	const reserve = dgram.createSocket('udp4')
	reserve.bind(0, '127.0.0.1')
	await once(reserve, 'listening')
	const feedbackPort = reserve.address().port
	reserve.close()
	await once(reserve, 'close')
	const m = new Module()
	t.after(() => m.destroy())
	await m.init({ transport: 'osc', host: '127.0.0.1', feedbackPort })
	if (!m.startedAt) await once(m.socket, 'listening')
	m.startedAt = Date.now() - 6000
	await delay(2100)
	assert.equal(m.statuses.filter((s) => s.status === 'failure').length, 1)
	m.received({ address: '/eventspro/timer/connected', args: [1] })
	assert.equal(m.timedOut, false)
	m.lastSeen = Date.now() - 6000
	await delay(1100)
	assert.equal(m.statuses.filter((s) => s.status === 'failure').length, 2)
})
