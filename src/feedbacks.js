'use strict'
module.exports = function (self) {
	self.setFeedbackDefinitions({
		output_visible: {
			type: 'boolean',
			name: self.t('Salida del ponente visible', 'Speaker output visible'),
			defaultStyle: { bgcolor: 0x137a42, color: 0xffffff },
			options: [],
			callback: () => self.state.connected && self.state.outputVisible !== false,
		},
		mode: {
			type: 'boolean',
			name: self.t('Modo seleccionado', 'Selected mode'),
			defaultStyle: { bgcolor: 0x137a42, color: 0xffffff },
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
			callback: (e) => self.state.connected && self.state.mode === e.options.value,
		},
		connected: {
			type: 'boolean',
			name: self.t('Timer conectado', 'Timer connected'),
			defaultStyle: { bgcolor: 0x137a42, color: 0xffffff },
			options: [],
			callback: () => self.state.connected,
		},
		running: {
			type: 'boolean',
			name: self.t('En marcha', 'Running'),
			defaultStyle: { bgcolor: 0x137a42, color: 0xffffff },
			options: [],
			callback: () => self.state.connected && self.state.running,
		},
		phase: {
			type: 'boolean',
			name: self.t('Estado del contador', 'Timer phase'),
			defaultStyle: { bgcolor: 0xe34848, color: 0xffffff },
			options: [
				{
					type: 'dropdown',
					id: 'phase',
					label: self.t('Estado', 'Phase'),
					default: 'over',
					choices: [
						['normal', 'Normal', 'Normal'],
						['warning', 'Aviso amarillo', 'Yellow warning'],
						['critical', 'Aviso rojo', 'Red warning'],
						['over', 'Tiempo cumplido', 'Time up'],
						['clock', 'Reloj', 'Clock'],
					].map(([id, es, en]) => ({ id, label: self.t(es, en) })),
				},
			],
			callback: (e) => self.state.connected && self.state.phase === e.options.phase,
		},
		message: {
			type: 'boolean',
			name: self.t('Aviso visible', 'Message visible'),
			defaultStyle: { bgcolor: 0xffdf00, color: 0x101820 },
			options: [],
			callback: () => self.state.connected && !!self.state.message,
		},
	})
}
