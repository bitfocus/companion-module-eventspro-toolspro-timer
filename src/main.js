'use strict'
const { InstanceBase, InstanceStatus, Regex, runEntrypoint } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const UpdatePresets = require('./presets')
const Config = require('./config')
const OSC = require('./osc-transport')
const LAN = require('./lan-transport')
class ModuleInstance extends InstanceBase {
	constructor(...args) {
		super(...args)
		this.statusCodes = InstanceStatus
		this.Regex = Regex
	}
	async init(config) {
		this.catalog = []
		this.state = {
			connected: false,
			running: false,
			time: '--:--',
			phase: '',
			title: '',
			message: '',
			mode: '',
			remaining: 0,
			error: '',
		}
		this.pendingCatalog = null
		await this.configUpdated(config)
	}
	t(es, en) {
		return this.config?.language === 'es' ? es : en
	}
	getConfigFields() {
		return [
			{
				type: 'dropdown',
				id: 'transport',
				label: this.t('Conexión de Timer', 'Timer connection'),
				width: 12,
				default: this.config?.transport || 'lan',
				choices: [
					{ id: 'lan', label: this.t('Timer en navegador por red local', 'Timer in browser over local network') },
					{ id: 'osc', label: this.t('Timer instalado (OSC)', 'Installed Timer (OSC)') },
				],
			},
			...Config.getConfigFields.call(this).map((f) =>
				f.id === 'language'
					? f
					: {
							...f,
							isVisibleExpression: f.isVisibleExpression
								? `(${f.isVisibleExpression}) && $(options:transport) === 'osc'`
								: "$(options:transport) === 'osc'",
						},
			),
		]
	}
	async configUpdated(config) {
		return LAN.configUpdated.call(this, config)
	}
	async destroy() {
		clearInterval(this.lanTick)
		return OSC.destroy.call(this)
	}
	send(action, args = [], allowDisconnected = false) {
		return LAN.send.call(this, action, args, allowDisconnected)
	}
	received(message) {
		return OSC.received.call(this, message)
	}
	updateLAN() {
		return LAN.updateLAN.call(this)
	}
	handleHttpRequest(request) {
		return LAN.handleHttpRequest.call(this, request)
	}
	presetLabel(p) {
		return [p.day, p.session, p.name].filter(Boolean).join(' / ')
	}
	refresh() {
		const values = {
			output_visible: this.state.outputVisible === false ? 0 : 1,
			time: this.state.time,
			seconds: this.state.remaining,
			title: this.state.title,
			message: this.state.message,
			mode: this.state.mode,
			phase: this.state.phase,
			connected: this.state.connected ? 1 : 0,
			running: this.state.running ? 1 : 0,
			preset_count: this.catalog.filter((p) => p.kind !== 'message').length,
			message_preset_count: this.catalog.filter((p) => p.kind === 'message').length,
			error: this.state.error,
		}
		const signature = JSON.stringify(values)
		if (signature === this.lastValues) return
		this.lastValues = signature
		this.setVariableValues(values)
		this.checkFeedbacks('output_visible', 'connected', 'running', 'phase', 'message', 'mode')
	}
	define() {
		this.lastValues = null
		this.updateVariableDefinitions()
		this.updateActions()
		this.updateFeedbacks()
		this.updatePresets()
		this.refresh()
	}
	updateActions() {
		UpdateActions(this)
	}
	updateFeedbacks() {
		UpdateFeedbacks(this)
	}
	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
	updatePresets() {
		UpdatePresets(this)
	}
}
runEntrypoint(ModuleInstance, UpgradeScripts)
