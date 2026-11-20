'use strict'
const dgram = require('node:dgram'),
	net = require('node:net')
const { encode, decode } = require('./osc.cjs')
module.exports = {
	async configUpdated(config) {
		await this.destroy()
		this.config = {
			language: 'en',
			host: '127.0.0.1',
			port: 9010,
			listenIp: '0.0.0.0',
			feedbackPort: 9011,
			...config,
		}
		if (!this.config.advanced) this.config.listenIp = this.config.host.startsWith('127.') ? '127.0.0.1' : '0.0.0.0'
		this.state = { ...this.state, connected: false, running: false }
		this.catalog = []
		this.pendingCatalog = null
		this.wasConnected = false
		this.timedOut = false
		this.define()
		const c = this.config
		if (!c.host.startsWith('127.') && c.listenIp.startsWith('127.')) {
			this.updateStatus(
				this.statusCodes.BadConfig,
				this.t(
					'La IP local de Companion no puede ser loopback para un Timer remoto',
					'Companion local IP cannot be loopback for a remote Timer',
				),
			)
			return
		}
		if (
			net.isIP(c.host) !== 4 ||
			net.isIP(c.listenIp) !== 4 ||
			![c.port, c.feedbackPort].every((p) => Number.isInteger(Number(p)) && Number(p) > 0 && Number(p) < 65536)
		) {
			this.updateStatus(this.statusCodes.BadConfig, this.t('IP o puerto no válidos', 'Invalid IP / port'))
			return
		}
		this.lastSeen = 0
		this.startedAt = 0
		this.socket = dgram.createSocket('udp4')
		const socket = this.socket
		socket.on('error', (e) => {
			this.log('error', e.message)
			this.state.connected = false
			this.refresh()
			this.updateStatus(this.statusCodes.ConnectionFailure, e.message)
		})
		socket.on('message', (packet, remote) => {
			if (this.socket !== socket || remote.address !== c.host) return
			try {
				for (const m of decode(packet)) this.received(m)
			} catch (e) {
				this.log('warn', e.message)
			}
		})
		socket.bind(Number(c.feedbackPort), c.listenIp, () => {
			if (this.socket !== socket) return
			this.startedAt = Date.now()
			this.updateStatus(this.statusCodes.Connecting, this.t('Esperando Timer', 'Waiting for Timer'))
			this.send('presets', [], true)
		})
		this.watch = setInterval(() => {
			if (
				!this.timedOut &&
				(this.lastSeen || this.startedAt) &&
				Date.now() - (this.lastSeen || this.startedAt) > 4000
			) {
				this.timedOut = true
				this.state.connected = false
				this.wasConnected = false
				this.state.running = false
				this.pendingCatalog = null
				this.refresh()
				this.updateStatus(this.statusCodes.ConnectionFailure, this.t('Sin retorno de Timer', 'No Timer feedback'))
			}
		}, 1000)
		this.catalogRefresh = setInterval(() => this.send('presets', [], true), 10000)
	},
	async destroy() {
		clearInterval(this.watch)
		clearInterval(this.catalogRefresh)
		if (this.socket) {
			const old = this.socket
			this.socket = null
			try {
				old.close()
			} catch {}
		}
	},
	send(action, args = [], allowDisconnected = false) {
		if (!this.socket || (!allowDisconnected && !this.state.connected)) {
			this.log('warn', this.t('Timer no está conectado', 'Timer is disconnected'))
			return false
		}
		const packet = encode('/eventspro/timer/' + action, args)
		this.socket.send(packet, Number(this.config.port), this.config.host, (e) => {
			if (e) this.log('error', e.message)
		})
		return true
	},
	received({ address, args }) {
		const key = address.replace('/eventspro/timer/', '')
		if (address !== '/eventspro/timer/' + key) return
		if (key === 'presets/begin') {
			if (typeof args[0] === 'string' && Number.isInteger(args[1]) && args[1] >= 0 && args[1] <= 230)
				this.pendingCatalog = {
					revision: args[0],
					count: args[1],
					entries: new Map(),
				}
			return
		}
		if (key === 'presets/entry') {
			const p = this.pendingCatalog
			if (!p || args[0] !== p.revision || typeof args[1] !== 'string') return
			try {
				const entry = JSON.parse(args[1])
				if (
					typeof entry.id === 'string' &&
					entry.id.length <= 100 &&
					typeof entry.name === 'string' &&
					p.entries.size < 230
				)
					p.entries.set(entry.id, {
						id: entry.id,
						name: entry.name.slice(0, 100),
						day: String(entry.day || '').slice(0, 60),
						session: String(entry.session || '').slice(0, 80),
						...(entry.kind === 'message'
							? {
									kind: 'message',
									text: String(entry.text || '').slice(0, 160),
								}
							: {}),
					})
				else this.log('warn', 'Speaker slot entry rejected: invalid id/name or catalogue limit')
			} catch (error) {
				this.log('warn', 'Speaker slot entry rejected: invalid JSON')
			}
			return
		}
		if (key === 'presets/end') {
			const p = this.pendingCatalog
			this.pendingCatalog = null
			if (p && args[0] === p.revision && p.entries.size === p.count) {
				const catalog = [...p.entries.values()]
				if (JSON.stringify(catalog) !== JSON.stringify(this.catalog)) {
					this.catalog = catalog
					this.define()
				}
			} else
				this.log(
					'warn',
					`Speaker slot list rejected: received ${p?.entries.size ?? 0} of ${p?.count ?? 0}; revision/count mismatch`,
				)
			return
		}
		const mapping = {
			'output/visible': 'outputVisible',
			time: 'time',
			remaining: 'remaining',
			running: 'running',
			phase: 'phase',
			title: 'title',
			message: 'message',
			mode: 'mode',
			connected: 'connected',
			error: 'error',
		}
		if (!mapping[key]) return
		if (['connected', 'running', 'output/visible'].includes(key)) {
			if (![0, 1].includes(args[0])) return
			this.state[mapping[key]] = args[0] === 1
		} else if (key === 'remaining') {
			if (!Number.isFinite(args[0])) return
			this.state.remaining = args[0]
		} else {
			if (typeof args[0] !== 'string') return
			this.state[key] = args[0].slice(0, 160)
		}
		if (key === 'connected') {
			this.timedOut = false
			const reconnect = this.state.connected && !this.wasConnected
			this.wasConnected = this.state.connected
			this.lastSeen = Date.now()
			this.updateStatus(
				this.state.connected ? this.statusCodes.Ok : this.statusCodes.Connecting,
				this.state.connected ? undefined : this.t('Conecta Timer al puente', 'Connect Timer to the bridge'),
			)
			if (reconnect) this.send('presets', [], true)
		}
		if (key === 'error') this.log('warn', this.state.error)
		this.refresh()
	},
}
