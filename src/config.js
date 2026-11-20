'use strict'
module.exports = {
	getConfigFields() {
		return [
			{
				type: 'dropdown',
				id: 'language',
				label: 'Language',
				default: 'en',
				choices: [
					{ id: 'es', label: 'Español' },
					{ id: 'en', label: 'English' },
				],
				width: 12,
			},
			{
				type: 'textinput',
				id: 'host',
				regex: this.Regex.IP,
				label: this.t('IP del equipo Timer', 'Timer computer IP'),
				default: '127.0.0.1',
				width: 6,
			},
			{
				type: 'number',
				id: 'port',
				label: this.t('Puerto OSC de recepción del puente', 'Bridge OSC receive port'),
				default: 9010,
				min: 1,
				max: 65535,
				width: 6,
			},
			{
				type: 'checkbox',
				id: 'advanced',
				label: this.t('Ajustes avanzados', 'Advanced settings'),
				default: false,
				width: 12,
			},
			{
				type: 'textinput',
				isVisibleExpression: '$(options:advanced) === true',
				id: 'listenIp',
				regex: this.Regex.IP,
				tooltip: this.t(
					'Usa la IP de red de Companion o 0.0.0.0 para recibir en todas las interfaces.',
					'Use Companion’s network IP or 0.0.0.0 to receive on all interfaces.',
				),
				label: this.t('IP local de Companion', 'Companion local IP'),
				default: '0.0.0.0',
				width: 6,
			},
			{
				type: 'number',
				isVisibleExpression: '$(options:advanced) === true',
				id: 'feedbackPort',
				label: this.t('Puerto de recepción de retorno', 'Feedback receive port'),
				default: 9011,
				min: 1,
				max: 65535,
				width: 6,
			},
		]
	},
}
