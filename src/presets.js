'use strict'
const icons = require('./icons.cjs')
module.exports = function (self) {
	const timeCatalog = self.catalog.filter((p) => p.kind !== 'message'),
		messageCatalog = self.catalog.filter((p) => p.kind === 'message')
	const presets = {},
		make = (id, text, actionId, options = {}, feedbacks = []) => {
			presets[id] = {
				type: 'button',
				category: self.t('Control Timer', 'Timer control'),
				name: text,
				style: {
					text,
					size: 10,
					color: 0xffdf00,
					bgcolor: 0x14212a,
					alignment: 'center:bottom',
					pngalignment: 'center:center',
					png64: icons[id] || '',
					show_topbar: false,
				},
				steps: [{ down: [{ actionId, options }], up: [] }],
				feedbacks,
			}
		}
	make('start', self.t('INICIAR', 'START'), 'start', {}, [
		{
			feedbackId: 'running',
			options: {},
			style: { bgcolor: 0x137a42, color: 0xffffff },
		},
	])
	make('output-show', 'SHOW', 'output/show')
	make('output-hide', 'HIDE', 'output/hide')
	make('output-toggle', 'SHOW / HIDE', 'output/toggle', {}, [
		{
			feedbackId: 'output_visible',
			options: {},
			style: { bgcolor: 0x137a42, color: 0xffffff },
		},
	])
	make('pause', self.t('PAUSA', 'PAUSE'), 'pause')
	make('reset', 'RESET', 'reset')
	make('plus', '+1 min', 'adjust', { value: 60 })
	make('minus', '−1 min', 'adjust', { value: -60 })
	make('clear', self.t('AVISO', 'CLEAR'), 'message/clear', {}, [
		{
			feedbackId: 'message',
			options: {},
			style: { bgcolor: 0xffdf00, color: 0x101820 },
		},
	])
	make('refresh', self.t('LISTA', 'LIST'), 'refresh')
	for (const [value, es, en] of [
		['down', 'CUENTA', 'TIMER'],
		['up', 'CRONO', 'STOPW.'],
		['clock', 'RELOJ', 'CLOCK'],
	]) {
		const id = 'mode-' + value
		make(id, self.t(es, en), 'mode', { value }, [
			{
				feedbackId: 'mode',
				options: { value },
				style: { bgcolor: 0x137a42, color: 0xffffff },
			},
		])
		presets[id].category = self.t('Modo', 'Mode')
		presets[id].name = self.t(
			{ down: 'Cuenta atrás', up: 'Cronómetro', clock: 'Reloj' }[value],
			{ down: 'Countdown', up: 'Stopwatch', clock: 'Clock' }[value],
		)
	}
	make('lap', self.t('MEMORIA', 'LAP'), 'lap')
	presets.lap.name = self.t('Guardar memoria', 'Record lap')
	presets.lap.style.png64 = icons['mode-up']
	for (const minutes of [5, 10, 15, 20, 30, 60]) {
		const id = 'duration-' + minutes
		make(id, minutes + ' min', 'duration', { value: minutes * 60 })
		presets[id].name = self.t('Preparar cuenta atrás: ', 'Prepare countdown: ') + minutes + ' min'
		presets[id].category = self.t('Tiempos preparados', 'Ready durations')
		presets[id].style.png64 = icons['mode-down']
		presets[id].steps = [
			{
				down: [
					{ actionId: 'mode', options: { value: 'down' } },
					{ actionId: 'duration', options: { value: minutes * 60 } },
				],
				up: [],
			},
		]
	}
	make('time', '$(' + self.label + ':time)', 'pause', {}, [
		{
			feedbackId: 'connected',
			options: {},
			style: { bgcolor: 0x137a42, color: 0xffffff },
		},
		{
			feedbackId: 'phase',
			options: { phase: 'warning' },
			style: { bgcolor: 0xffdf00, color: 0x101820 },
		},
		{
			feedbackId: 'phase',
			options: { phase: 'critical' },
			style: { bgcolor: 0xe34848, color: 0xffffff },
		},
		{
			feedbackId: 'phase',
			options: { phase: 'over' },
			style: { bgcolor: 0xe34848, color: 0xffffff },
		},
		{
			feedbackId: 'phase',
			options: { phase: 'clock' },
			style: { bgcolor: 0x14212a, color: 0xffffff },
		},
	])
	presets.time.name = self.t('Visor del contador', 'Timer display')
	presets.time.steps = [{ down: [], up: [] }]
	presets.time.style.size = 18
	presets.time.style.alignment = 'center:center'
	const loadSlotIcon = icons.preset
	const slotCaption = (name) => {
		const full = String(name).trim().replace(/\s+/g, ' ')
		let size = 8,
			lines
		for (; size >= 3; size--) {
			const limit = Math.floor(62 / (size * 0.62))
			lines = []
			for (const word of full.split(' ')) {
				let rest = word
				while (rest.length > limit) {
					if (lines.length && lines[lines.length - 1]) lines.push('')
					lines.push(rest.slice(0, limit))
					rest = rest.slice(limit)
				}
				if (!rest) continue
				if (lines.length && lines[lines.length - 1].length + rest.length + 1 <= limit)
					lines[lines.length - 1] += ' ' + rest
				else lines.push(rest)
			}
			if (lines.length * (size + 1) <= 28) break
		}
		return {
			text: lines.filter(Boolean).join('\n'),
			size: Math.max(3, size),
		}
	}
	for (const p of timeCatalog) {
		for (const actionId of ['preset', 'preset/start']) {
			const id = actionId + '-' + p.id
			const caption = slotCaption(p.name)
			make(id, caption.text, actionId, { presetId: p.id })
			presets[id].name =
				(actionId === 'preset/start' ? self.t('Iniciar ', 'Start ') : self.t('Preparar ', 'Prepare ')) +
				self.presetLabel(p)
			presets[id].category = [p.day, p.session].filter(Boolean).join(' / ') || self.t('Intervenciones', 'Speaker slots')
			presets[id].style.png64 = actionId === 'preset/start' ? icons.start : loadSlotIcon
			presets[id].style.alignment = 'center:bottom'
			presets[id].style.size = caption.size
		}
	}
	for (const p of messageCatalog) {
		const id = 'message/preset-' + p.id
		const caption = slotCaption(p.name)
		make(id, caption.text, 'message/preset', { presetId: p.id })
		presets[id].name = self.t('Enviar aviso: ', 'Send message: ') + p.name
		presets[id].category = self.t('Avisos', 'Messages')
		presets[id].style.png64 = icons.message
		presets[id].style.size = caption.size
	}
	self.setPresetDefinitions(presets)
}
