'use strict'
const assets = require('./web-assets.json'),
	Session = require('./lan-session.cjs'),
	osc = require('./osc-transport')
module.exports = {
	async configUpdated(config) {
		if (config.transport === 'osc' || (!config.transport && config.host)) {
			this.lan = null
			return osc.configUpdated.call(this, { ...config, transport: 'osc' })
		}
		if (!this.lan) await this.destroy()
		this.config = { language: 'en', ...config }
		if (!this.lan) {
			this.lan = new Session()
			this.catalog = []
			this.state = {
				connected: true,
				running: false,
				time: '10:00',
				phase: 'normal',
				title: '',
				message: '',
				mode: 'down',
				remaining: 600,
				error: '',
			}
		}
		this.define()
		this.lanOnline = undefined
		this.updateLAN()
		clearInterval(this.lanTick)
		this.lanTick = setInterval(() => {
			try {
				this.updateLAN()
			} catch (error) {
				this.log('error', String(error))
			}
		}, 250)
	},
	updateLAN() {
		if (!this.lan) return
		const s = this.lan.snapshot()
		if (s.online !== this.lanOnline) {
			this.lanOnline = s.online
			this.updateStatus(
				s.online ? this.statusCodes.Ok : this.statusCodes.Connecting,
				s.online
					? this.t('Timer disponible en la red local', 'Timer available on the local network')
					: this.t('Abre la página de Timer', 'Open the Timer page'),
			)
		}
		this.state = {
			...this.state,
			...s.display,
			time: s.display.text,
			remaining: s.display.seconds,
			connected: s.online,
		}
		const catalog = s.presets
			.map((p) => ({
				id: p.id,
				name: p.name,
				day: p.day,
				session: p.session,
			}))
			.concat(s.messages.map((p) => ({ ...p, kind: 'message' })))
		if (JSON.stringify(catalog) !== JSON.stringify(this.catalog)) {
			this.catalog = catalog
			this.define()
		}
		this.refresh()
	},
	send(action, args = []) {
		if (!this.lan) return osc.send.call(this, action, args, ...[].slice.call(arguments, 2))
		if (action === 'presets') return true
		try {
			this.lan.command({ action, value: args[0] })
			this.updateLAN()
			return true
		} catch (e) {
			this.log('warn', e.message)
			return false
		}
	},
	handleHttpRequest(req) {
		if (!this.lan) return { status: 404, body: 'OSC mode' }
		const headers = {
			'Cache-Control': 'no-store',
			'X-Content-Type-Options': 'nosniff',
			'Referrer-Policy': 'no-referrer',
		}
		try {
			const route = req.path.replace(/^\//, '').split('?')[0]
			if (route === 'api' && req.method === 'POST') {
				if (Buffer.byteLength(req.body || '') > 512000) return { status: 413, body: 'Too large' }
				const r = this.lan.request(JSON.parse(req.body || '{}'), req.headers?.['user-agent'] || '')
				this.updateLAN()
				return {
					status: r.status,
					headers: { ...headers, 'Content-Type': 'application/json' },
					body: JSON.stringify(r.body),
				}
			}
			if (req.method !== 'GET') return { status: 405, body: 'Method not allowed' }
			if (route === '')
				return {
					status: 302,
					headers: {
						Location: req.baseUrl.replace(/\/$/, '') + '/index.html',
					},
					body: '',
				}
			if (!/^[a-zA-Z0-9_.-]+$/.test(route)) return { status: 404, body: 'Not found' }
			if (!Object.hasOwn(assets, route)) return { status: 404, body: 'Not found' }
			return {
				status: 200,
				headers: {
					...headers,
					'Content-Type': route.endsWith('.js')
						? 'text/javascript; charset=utf-8'
						: route.endsWith('.css')
							? 'text/css; charset=utf-8'
							: 'text/html; charset=utf-8',
				},
				body: assets[route],
			}
		} catch (e) {
			return {
				status: 400,
				headers: { ...headers, 'Content-Type': 'application/json' },
				body: JSON.stringify({ error: e.message }),
			}
		}
	},
}
