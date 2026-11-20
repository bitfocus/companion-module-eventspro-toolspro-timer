'use strict'
module.exports = function (self) {
	const actions = {}
	for (const [id, es, en] of [
		['start', 'Iniciar / continuar', 'Start / resume'],
		['pause', 'Pausar', 'Pause'],
		['reset', 'Reiniciar', 'Reset'],
		['message/clear', 'Quitar aviso', 'Clear message'],
		['lap', 'Guardar vuelta', 'Record lap'],
		['output/show', 'Mostrar salida', 'Show output'],
		['output/hide', 'Ocultar salida', 'Hide output'],
		['output/toggle', 'Alternar salida', 'Toggle output'],
		['background/chroma-green', 'Fondo verde chroma', 'Green chroma background'],
		['background/chroma-blue', 'Fondo azul chroma', 'Blue chroma background'],
		['digits/white', 'Texto blanco', 'White text'],
		['digits/green', 'Texto verde', 'Green text'],
	])
		actions[id] = {
			name: self.t(es, en),
			options: [],
			callback: () => self.send(id),
		}
	for (const [id, es, en, min, max, def] of [
		['duration', 'Preparar duración (segundos)', 'Set duration (seconds)', 1, 86400, 600],
		['adjust', 'Ajustar tiempo (segundos)', 'Adjust time (seconds)', -86400, 86400, 60],
	])
		actions[id] = {
			name: self.t(es, en),
			options: [
				{
					type: 'number',
					id: 'value',
					label: self.t('Segundos', 'Seconds'),
					min,
					max,
					default: def,
				},
			],
			callback: (e) => self.send(id, [Number(e.options.value)]),
		}
	for (const [id, es, en] of [
		['message', 'Enviar aviso', 'Send message'],
		['title', 'Nombre del ponente', 'Speaker name'],
	])
		actions[id] = {
			name: self.t(es, en),
			options: [
				{
					type: 'textinput',
					id: 'value',
					label: self.t('Texto', 'Text'),
					default: '',
					useVariables: true,
				},
			],
			callback: async (e, ctx) => {
				const text = await ctx.parseVariablesInString(String(e.options.value ?? ''))
				return self.send(id, [text.slice(0, id === 'message' ? 160 : 100)])
			},
		}
	actions.mode = {
		name: self.t('Cambiar modo', 'Change mode'),
		options: [
			{
				type: 'dropdown',
				id: 'value',
				label: self.t('Modo', 'Mode'),
				default: 'down',
				choices: [
					{ id: 'down', label: self.t('Cuenta atrás', 'Countdown') },
					{ id: 'up', label: self.t('Cronómetro', 'Stopwatch') },
					{ id: 'clock', label: self.t('Reloj', 'Clock') },
				],
			},
		],
		callback: (e) => self.send('mode', [String(e.options.value)]),
	}
	const timeCatalog = self.catalog.filter((p) => p.kind !== 'message'),
		messageCatalog = self.catalog.filter((p) => p.kind === 'message')
	const choices = timeCatalog.map((p) => ({
		id: p.id,
		label: self.presetLabel(p),
	}))
	for (const [id, es, en] of [
		['preset', 'Cargar intervención por nombre', 'Load named speaker slot'],
		['preset/start', 'Cargar e iniciar intervención', 'Load and start speaker slot'],
	])
		actions[id] = {
			name: self.t(es, en),
			options: [
				{
					type: 'dropdown',
					id: 'presetId',
					label: self.t('Día / sesión / ponente', 'Day / session / speaker'),
					default: choices[0]?.id || '',
					choices: choices.length
						? choices
						: [
								{
									id: '',
									label: self.t('Conecta Timer y guarda una intervención', 'Connect Timer and save a speaker slot'),
								},
							],
				},
			],
			callback: (e) => {
				if (!timeCatalog.some((p) => p.id === e.options.presetId)) {
					self.log(
						'warn',
						self.t('Intervención no disponible: actualiza la lista', 'Preset unavailable: refresh the list'),
					)
					return
				}
				self.send(id, [String(e.options.presetId)])
			},
		}
	actions['message/preset'] = {
		name: self.t('Enviar aviso guardado', 'Send saved message'),
		options: [
			{
				type: 'dropdown',
				id: 'presetId',
				label: self.t('Aviso guardado', 'Saved message'),
				default: messageCatalog[0]?.id || '',
				choices: messageCatalog.length
					? messageCatalog.map((p) => ({ id: p.id, label: p.name }))
					: [
							{
								id: '',
								label: self.t('Guarda un aviso en Timer', 'Save a message in Timer'),
							},
						],
			},
		],
		callback: (e) => {
			if (!messageCatalog.some((p) => p.id === e.options.presetId)) {
				self.log('warn', self.t('Aviso no disponible: actualiza la lista', 'Message unavailable: refresh the list'))
				return
			}
			self.send('message/preset', [String(e.options.presetId)])
		},
	}
	actions.refresh = {
		name: self.t('Actualizar intervenciones', 'Refresh speaker slots'),
		options: [],
		callback: () => self.send('presets', [], true),
	}
	self.setActionDefinitions(actions)
}
