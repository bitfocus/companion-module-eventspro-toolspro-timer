'use strict'
module.exports = function (self) {
	self.setVariableDefinitions(
		[
			'time',
			'seconds',
			'title',
			'message',
			'mode',
			'phase',
			'connected',
			'running',
			'preset_count',
			'message_preset_count',
			'error',
			'output_visible',
		].map((variableId) => ({
			variableId,
			name: (self.config?.language === 'es'
				? {
						time: 'Contador formateado',
						seconds: 'Tiempo restante (segundos)',
						title: 'Nombre del ponente',
						message: 'Mensaje del ponente',
						mode: 'Modo del contador',
						phase: 'Estado del contador',
						connected: 'Timer conectado (1/0)',
						running: 'Timer en marcha (1/0)',
						preset_count: 'Intervenciones guardadas',
						message_preset_count: 'Mensajes guardados',
						error: 'Último error',
						output_visible: 'Salida del ponente visible (1/0)',
					}
				: {
						time: 'Formatted timer',
						seconds: 'Remaining time (seconds)',
						title: 'Speaker name',
						message: 'Speaker message',
						mode: 'Timer mode',
						phase: 'Timer phase',
						connected: 'Timer connected (1/0)',
						running: 'Timer running (1/0)',
						preset_count: 'Saved speaker slots',
						message_preset_count: 'Saved messages',
						error: 'Last error',
						output_visible: 'Speaker output visible (1/0)',
					})[variableId],
		})),
	)
}
