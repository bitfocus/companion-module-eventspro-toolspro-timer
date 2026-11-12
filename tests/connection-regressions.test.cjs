const { test } = require('node:test'),
	assert = require('node:assert/strict'),
	dgram = require('node:dgram'),
	{ once } = require('node:events'),
	{ setTimeout: delay } = require('node:timers/promises'),
	{ encode, decode } = require('../src/osc.cjs')
class Host {
	constructor() {
		this.label = 'Timer'
		this.variableUpdates = 0
		this.feedbackChecks = 0
	}
	setVariableDefinitions(v) {
		this.variables = v
	}
	setVariableValues(v) {
		this.values = v
		this.variableUpdates++
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
	checkFeedbacks() {
		this.feedbackChecks++
	}
	updateStatus(status, message) {
		this.status = { status, message }
	}
	log() {}
}
const statuses = { Ok: 'ok', Connecting: 'connecting', ConnectionFailure: 'failure', BadConfig: 'bad' }
test('real UDP OSC initial timeout reports failure and recovery immediately refreshes presets', async (t) => {
	const server = dgram.createSocket('udp4')
	server.bind(0, '127.0.0.1')
	await once(server, 'listening')
	t.after(() => server.close())
	const reserve = dgram.createSocket('udp4')
	reserve.bind(0, '127.0.0.1')
	await once(reserve, 'listening')
	const feedbackPort = reserve.address().port
	reserve.close()
	await once(reserve, 'close')
	const seen = []
	server.on('message', (p) => seen.push(...decode(p).map((m) => m.address)))
	const M = require('../src/module.js')({ InstanceBase: Host, InstanceStatus: statuses }),
		m = new M()
	t.after(() => m.destroy())
	await m.init({ host: '127.0.0.1', port: server.address().port, feedbackPort })
	if (!m.startedAt) await once(m.socket, 'listening')
	m.startedAt = Date.now() - 6000
	await delay(1100)
	assert.equal(m.status.status, 'failure')
	assert.equal(m.status.message, 'No Timer feedback')
	assert.equal(m.state.connected, false)
	const before = seen.length
	server.send(encode('/eventspro/timer/connected', [1]), feedbackPort, '127.0.0.1')
	for (let i = 0; i < 30 && seen.length === before; i++) await delay(10)
	assert.equal(m.status.status, 'ok')
	assert.equal(m.state.connected, true)
	assert(seen.slice(before).includes('/eventspro/timer/presets'))
})
test('LAN idle refresh does not resend unchanged variables or feedback', async (t) => {
	const M = require('../src/lan-module.cjs')({ InstanceBase: Host, InstanceStatus: statuses }),
		m = new M()
	await m.init({ transport: 'lan' })
	t.after(() => m.destroy())
	const updates = m.variableUpdates,
		checks = m.feedbackChecks
	for (let i = 0; i < 5; i++) m.updateLAN()
	assert.equal(m.variableUpdates, updates)
	assert.equal(m.feedbackChecks, checks)
	assert.equal(m.status.status, 'connecting')
	m.lan.request({ op: 'owner', client: 'a'.repeat(64) })
	m.updateLAN()
	assert.equal(m.status.status, 'ok')
	assert(m.variableUpdates > updates)
	m.lan.ownerSeen = 0
	m.updateLAN()
	assert.equal(m.status.status, 'connecting')
})
