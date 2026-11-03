'use strict'
const crypto = require('node:crypto'),
	C = require('./speaker-timer.js'),
	R = require('./remote.cjs')
function validCatalog(entries, limit, messages = false) {
	if (!Array.isArray(entries) || entries.length > limit) return false
	const ids = new Set()
	return entries.every((entry) => {
		if (
			!entry ||
			typeof entry !== 'object' ||
			typeof entry.id !== 'string' ||
			!entry.id.trim() ||
			entry.id.length > 100 ||
			ids.has(entry.id) ||
			typeof entry.name !== 'string' ||
			!entry.name.trim() ||
			(messages && typeof entry.text !== 'string')
		)
			return false
		ids.add(entry.id)
		return true
	})
}
class Session {
	constructor() {
		this.state = C.defaults()
		this.revision = 0
		this.presets = []
		this.messages = []
		this.token = crypto.randomBytes(32).toString('hex')
		this.owner = null
		this.ownerSeen = 0
		this.remoteSeen = 0
		this.device = ''
	}
	command(command) {
		this.state = R.apply(this.state, command, this.presets, this.messages)
		this.revision++
		return this.snapshot()
	}
	snapshot() {
		const settled = C.settle(this.state)
		if (settled !== this.state) {
			this.state = settled
			this.revision++
		}
		const d = C.display(this.state)
		return {
			serverNow: Date.now(),
			online: Date.now() - this.ownerSeen < 10000,
			revision: this.revision,
			state: this.state,
			display: {
				text: d.text,
				seconds: Math.round(d.ms / 1000),
				phase: d.phase,
				running: this.state.running,
				title: this.state.title,
				message: this.state.message,
				mode: this.state.mode,
			},
			presets: this.presets,
			messages: this.messages,
			remote: { connected: Date.now() - this.remoteSeen < 5000, device: this.device },
		}
	}
	request(body, agent = '') {
		if (body.op === 'owner') {
			if (typeof body.client !== 'string' || !/^[a-f0-9]{64}$/.test(body.client)) throw Error('Invalid client')
			if (this.owner && this.owner !== body.client && Date.now() - this.ownerSeen < 10000)
				return { status: 409, body: { error: 'Timer ya está abierto en otro equipo' } }
			this.owner = body.client
			this.ownerSeen = Date.now()
			return { status: 200, body: { ...this.snapshot(), control: this.token } }
		}
		const owner = body.client === this.owner && this.owner !== null
		if (!owner && body.control !== this.token) return { status: 403, body: { error: 'Vinculación no válida' } }
		if (owner) {
			if (body.op === 'sync' && body.revision === this.revision) {
				if (
					(body.presets !== undefined && !validCatalog(body.presets, 200)) ||
					(body.messages !== undefined && !validCatalog(body.messages, 30, true))
				) {
					return { status: 400, body: { error: 'Catálogo de Timer no válido' } }
				}
				if (body.changed) {
					this.state = C.restore(body.state)
					this.revision++
				}
				if (body.presets !== undefined) this.presets = body.presets
				if (body.messages !== undefined) this.messages = body.messages
			}
			this.ownerSeen = Date.now()
		} else {
			this.remoteSeen = Date.now()
			this.device = /iPhone/i.test(agent) ? 'iPhone' : /Android/i.test(agent) ? 'Android' : 'Navegador móvil'
		}
		if (body.op === 'command') return { status: 200, body: this.command(body.command) }
		return { status: 200, body: this.snapshot() }
	}
}
module.exports = Session
