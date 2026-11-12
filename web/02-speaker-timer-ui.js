;(function (root) {
	'use strict'
	const timeI18n = globalThis.EventsPROI18n,
		timeES = {
			'timer.text.0': 'Cada intervención, a su tiempo.',
			'timer.text.1': '← Volver a TOOLS',
			'timer.text.2': 'Presets de tiempo',
			'timer.text.3':
				'Organiza días, sesiones y ponentes. Selecciona uno para prepararlo.',
			'timer.text.4': 'Guardar intervención',
			'timer.text.5': 'Día',
			'timer.text.6': 'Ej.: Día 1 · 12 octubre',
			'timer.text.7': 'Ej.: Apertura / Sala A',
			'timer.text.8': 'Tipo',
			'timer.text.9': 'Ponente o actividad',
			'timer.text.10': 'Ej.: María López · conferencia',
			'timer.text.11': 'Configuración general',
			'timer.text.12': 'Nombre de la intervención',
			'timer.text.13': 'Modo',
			'timer.text.14': 'Cuenta atrás',
			'timer.text.15': 'Cronómetro',
			'timer.text.16': 'Reloj',
			'timer.text.17': 'Duraciones predeterminadas',
			'timer.text.18': 'Minutos',
			'timer.text.19': 'Segundos',
			'timer.text.20': 'Aplicar duración',
			'timer.text.21': 'Introduce minutos y segundos válidos.',
			'timer.text.22': 'minutos restantes',
			'timer.text.23': 'Elige un aviso entre 0 y 1440 minutos.',
			'timer.text.24': 'Amarillo · minutos restantes',
			'timer.text.25': 'Rojo · minutos restantes',
			'timer.text.26': 'Al terminar',
			'timer.text.27': 'Parpadear y detener en cero',
			'timer.text.28': 'Continuar mostrando el exceso',
			'timer.text.29':
				'0 desactiva el aviso. El rojo tiene prioridad sobre el amarillo.',
			'timer.text.30': 'Números',
			'timer.text.31': 'Fondo',
			'timer.text.32': 'Usar amarillo y rojo en los avisos',
			'timer.text.33': 'Verde',
			'timer.text.34': 'Restablecer verde sobre negro',
			'timer.text.35': 'Blanco sobre negro para luma',
			'timer.text.36': 'Horas',
			'timer.text.37': 'Centésimas',
			'timer.text.38': 'Hora local auxiliar',
			'timer.text.39': 'Guardar en la agenda',
			'timer.text.40': 'Indica día, sesión y ponente o actividad.',
			'timer.text.41': 'La agenda admite hasta 200 intervenciones.',
			'timer.text.42': 'Duración personalizada',
			'timer.text.43': 'Avisos personalizados',
			'timer.text.44': 'Colores y formato',
			'timer.text.45': 'Agenda guardada en este navegador.',
			'timer.text.46': 'No se ha podido guardar la agenda.',
			'timer.text.47':
				'Todavía no hay intervenciones. Configura el tiempo y guarda la primera.',
			'timer.text.48':
				'Pausa el temporizador antes de cambiar de intervención.',
			'timer.text.49': 'Borrar ',
			'timer.text.50': 'Avisos guardados',
			'timer.text.51': 'Selecciona un aviso para editarlo antes de enviarlo.',
			'timer.text.52': 'No se han podido guardar los avisos.',
			'timer.text.53': 'Avisos guardados en este navegador.',
			'timer.text.54': 'Aviso cargado. Revísalo antes de enviarlo.',
			'timer.text.55': 'Borrar aviso ',
			'timer.text.56': 'Todavía no hay avisos guardados.',
			'timer.text.57': 'Aviso para el ponente o moderador',
			'timer.text.58':
				'Ej.: No tenemos tiempo para preguntas y debate. Hay que terminar.',
			'timer.text.59': 'Enviar aviso',
			'timer.text.60': 'Quitar aviso',
			'timer.text.61': 'Nombre del aviso',
			'timer.text.62': 'Guardar aviso',
			'timer.text.63': 'Escribe un aviso antes de guardarlo.',
			'timer.text.64': 'Puedes guardar hasta 30 avisos.',
			'timer.text.65': 'Vista del ponente',
			'timer.text.66': 'Hora local',
			'timer.text.67': 'Memorias del cronómetro',
			'timer.text.68': 'Iniciar',
			'timer.text.69': 'Guardar memoria',
			'timer.text.70': 'Reiniciar',
			'timer.text.71': 'Borrar memoria',
			'timer.text.72': 'Pantalla completa',
			'timer.text.73': 'Abrir vista extendida en otra ventana',
			'timer.text.74':
				'El navegador ha bloqueado la ventana. Permite abrir la vista del ponente.',
			'timer.text.75': 'Salir de pantalla completa',
			'timer.text.76': 'Memorias',
			'timer.text.77': 'Parcial',
			'timer.text.78': 'Total',
			'timer.text.79': 'Sin memorias',
			'timer.text.80': 'Seleccionar memoria ',
			'timer.text.81': 'Hora local · ',
			'timer.text.82': 'Tiempo de intervención',
			'timer.text.83': 'HORA LOCAL',
			'timer.text.84': 'TIEMPO CUMPLIDO',
			'timer.text.85': 'EN CURSO',
			'timer.text.86': 'PREPARADO',
			'timer.text.87': 'EN PAUSA',
			'timer.text.88': 'Pausar',
			'timer.text.89': 'Continuar',
			'timer.text.90': 'Finalizado',
			'timer.text.91':
				'No se pueden guardar ni sincronizar los ajustes en este navegador.',
			'timer.text.92':
				'Pantalla completa no disponible en este navegador. Puedes usar la vista del ponente.',
		},
		timeEN = {
			'timer.text.0': 'Every speaker, on time.',
			'timer.text.1': '← Back to TOOLS',
			'timer.text.2': 'Time presets',
			'timer.text.3':
				'Organize days, sessions and speakers. Select one to prepare it.',
			'timer.text.4': 'Save speaker slot',
			'timer.text.5': 'Day',
			'timer.text.6': 'E.g. Day 1 · 12 October',
			'timer.text.7': 'E.g. Opening / Room A',
			'timer.text.8': 'Type',
			'timer.text.9': 'Speaker or activity',
			'timer.text.10': 'E.g. Maria Lopez · keynote',
			'timer.text.11': 'General settings',
			'timer.text.12': 'Speaker slot name',
			'timer.text.13': 'Mode',
			'timer.text.14': 'Countdown',
			'timer.text.15': 'Stopwatch',
			'timer.text.16': 'Clock',
			'timer.text.17': 'Preset durations',
			'timer.text.18': 'Minutes',
			'timer.text.19': 'Seconds',
			'timer.text.20': 'Apply duration',
			'timer.text.21': 'Enter valid minutes and seconds.',
			'timer.text.22': 'minutes remaining',
			'timer.text.23': 'Choose a warning between 0 and 1440 minutes.',
			'timer.text.24': 'Yellow · minutes remaining',
			'timer.text.25': 'Red · minutes remaining',
			'timer.text.26': 'When finished',
			'timer.text.27': 'Flash and stop at zero',
			'timer.text.28': 'Continue showing overtime',
			'timer.text.29':
				'0 disables the warning. Red takes priority over yellow.',
			'timer.text.30': 'Digits',
			'timer.text.31': 'Background',
			'timer.text.32': 'Use yellow and red warnings',
			'timer.text.33': 'Green',
			'timer.text.34': 'Reset green on black',
			'timer.text.35': 'White on black for luma',
			'timer.text.36': 'Hours',
			'timer.text.37': 'Hundredths',
			'timer.text.38': 'Secondary local clock',
			'timer.text.39': 'Save to agenda',
			'timer.text.40': 'Enter the day, session and speaker or activity.',
			'timer.text.41': 'The agenda supports up to 200 speaker slots.',
			'timer.text.42': 'Custom duration',
			'timer.text.43': 'Custom warnings',
			'timer.text.44': 'Colors and format',
			'timer.text.45': 'Agenda saved in this browser.',
			'timer.text.46': 'Could not save the agenda.',
			'timer.text.47':
				'No speaker slots yet. Set the time and save the first one.',
			'timer.text.48': 'Pause the timer before changing speaker slots.',
			'timer.text.49': 'Delete ',
			'timer.text.50': 'Saved messages',
			'timer.text.51': 'Select a message to edit before sending it.',
			'timer.text.52': 'Could not save messages.',
			'timer.text.53': 'Messages saved in this browser.',
			'timer.text.54': 'Message loaded. Review it before sending.',
			'timer.text.55': 'Delete message ',
			'timer.text.56': 'No saved messages yet.',
			'timer.text.57': 'Message for the speaker or moderator',
			'timer.text.58':
				'E.g. No time for questions and discussion. Please finish.',
			'timer.text.59': 'Send message',
			'timer.text.60': 'Clear message',
			'timer.text.61': 'Message name',
			'timer.text.62': 'Save message',
			'timer.text.63': 'Write a message before saving it.',
			'timer.text.64': 'You can save up to 30 messages.',
			'timer.text.65': 'Speaker view',
			'timer.text.66': 'Local time',
			'timer.text.67': 'Stopwatch laps',
			'timer.text.68': 'Start',
			'timer.text.69': 'Save lap',
			'timer.text.70': 'Reset',
			'timer.text.71': 'Delete lap',
			'timer.text.72': 'Fullscreen',
			'timer.text.73': 'Open extended view in another window',
			'timer.text.74':
				'The browser blocked the window. Allow the speaker view to open.',
			'timer.text.75': 'Exit fullscreen',
			'timer.text.76': 'Laps',
			'timer.text.77': 'Split',
			'timer.text.78': 'Total',
			'timer.text.79': 'No laps',
			'timer.text.80': 'Select lap ',
			'timer.text.81': 'Local time · ',
			'timer.text.82': 'Speaker time',
			'timer.text.83': 'LOCAL TIME',
			'timer.text.84': 'TIME UP',
			'timer.text.85': 'RUNNING',
			'timer.text.86': 'READY',
			'timer.text.87': 'PAUSED',
			'timer.text.88': 'Pause',
			'timer.text.89': 'Resume',
			'timer.text.90': 'Finished',
			'timer.text.91': 'Cannot save or synchronize settings in this browser.',
			'timer.text.92':
				'Fullscreen is unavailable in this browser. Use the speaker view.',
		}

	Object.assign(timeES, {
		'timer.type.lecture': 'Ponencia',
		'timer.type.panel': 'Mesa redonda',
		'timer.type.session': 'Sesión',
		'timer.type.other': 'Otro',
		'timer.agenda.detail': '{type} · {minutes} min',
		'timer.session.label': 'Sesión',
	})
	Object.assign(timeEN, {
		'timer.type.lecture': 'Lecture',
		'timer.type.panel': 'Panel discussion',
		'timer.type.session': 'Session',
		'timer.type.other': 'Other',
		'timer.agenda.detail': '{type} · {minutes} min',
		'timer.session.label': 'Session',
	})
	if (timeI18n) {
		timeI18n.register('es', timeES)
		timeI18n.register('en', timeEN)
	}
	const M = (key, params) =>
		timeI18n
			? timeI18n.message(key, params)
			: String(timeEN[key] ?? timeES[key]).replace(/\{(\w+)\}/g, (_, k) =>
					String(
						(typeof params === 'function' ? params() : params || {})[k] ??
							'{' + k + '}',
					),
				)
	function paintTime(node, value, attribute) {
		if (timeI18n && value?.eventsproMessage)
			return timeI18n.render(node, value, attribute)
		if (attribute) node.setAttribute(attribute, String(value))
		else node.textContent = String(value)
		return node
	}

	const C = root.EventsPROSpeakerTimer,
		KEY =
			'eventspro-speaker-timer-v1:' +
			location.pathname.split('/').slice(0, -1).join('/')
	const el = (tag, cls, text) => {
		const n = document.createElement(tag)
		if (cls) n.className = cls
		if (text != null) {
			if (tag === 'label') {
				const caption = document.createElement('span')
				paintTime(caption, text)
				n.append(caption)
			} else paintTime(n, text)
		}
		return n
	}
	function freshDefaults() {
		const value = C.defaults()
		if (timeI18n?.getLanguage() !== 'es') value.title = 'Speaker slot'
		return value
	}
	function read() {
		try {
			const value = localStorage.getItem(KEY)
			return value ? C.restore(JSON.parse(value)) : freshDefaults()
		} catch {
			return freshDefaults()
		}
	}

	const boundaryES = {
			'tool.boundary.19': 'Temporizador no válido.',
			'tool.boundary.20': 'Tiempo no válido.',
			'tool.boundary.21': 'Tiempo fuera de rango.',
			'tool.boundary.22': 'Aviso rojo no válido.',
			'tool.boundary.23': 'Elige una duración entre 1 segundo y 24 horas.',
		},
		boundaryEN = {
			'tool.boundary.19': 'Invalid timer.',
			'tool.boundary.20': 'Invalid time.',
			'tool.boundary.21': 'Time out of range.',
			'tool.boundary.22': 'Invalid red warning.',
			'tool.boundary.23': 'Choose a duration between 1 second and 24 hours.',
		}
	timeI18n?.register('es', boundaryES)
	timeI18n?.register('en', boundaryEN)
 Object.assign(timeEN,boundaryEN); Object.assign(timeES,boundaryES)
	Object.assign(timeES, {
		'timer.filter.allDays': 'Todos los días',
		'timer.filter.allSessions': 'Todas las sesiones',
		'timer.filter.search': 'Buscar ponente o actividad',
		'timer.filter.previous': 'Anterior',
		'timer.filter.next': 'Siguiente',
		'timer.filter.page': 'Página {page} de {pages} · {count} memorias',
		'timer.filter.none': 'No hay memorias que coincidan.',
	})
	Object.assign(timeEN, {
		'timer.filter.allDays': 'All days',
		'timer.filter.allSessions': 'All sessions',
		'timer.filter.search': 'Search speaker or activity',
		'timer.filter.previous': 'Previous',
		'timer.filter.next': 'Next',
		'timer.filter.page': 'Page {page} of {pages} \u00b7 {count} presets',
		'timer.filter.none': 'No matching presets.',
	})
	timeI18n?.register('es', timeES)
	timeI18n?.register('en', timeEN)
    function renamePresetGroup(entries,day,session,value){
        const name=String(value).trim();if(!name)throw Error('Name is required')
        return entries.map(p=>p.day===day&&(session===null||p.session===session)?{...p,...(session===null?{day:name}:{session:name})}:p)
    }
    function fitFontSize(width,height,textWidth){return Math.max(12,Math.floor(Math.min(Math.max(20,width)*100/Math.max(1,textWidth),Math.max(12,height)/1.16)))}
    function formatPresetDuration(milliseconds){const total=Math.round(milliseconds/1000),minutes=Math.floor(total/60),seconds=total%60;return minutes+' min'+(seconds?' '+seconds+' s':'')}
	function presetPage(entries, filters) {
		const days = [...new Set(entries.map((p) => p.day))],
			sessions = [
				...new Set(
					entries
						.filter((p) => !filters.day || p.day === filters.day)
						.map((p) => p.session),
				),
			]
		const fold = (v) =>
				String(v || '')
					.normalize('NFKD')
					.replace(/[\u0300-\u036f]/g, '')
					.toLowerCase(),
			query = fold(filters.query).trim()
		const matched = entries.filter(
			(p) =>
				(!filters.day || p.day === filters.day) &&
				(!filters.session || p.session === filters.session) &&
				(!query || fold(p.name + ' ' + p.type).includes(query)),
		)
		const pages = Math.max(1, Math.ceil(matched.length / 10)),
			page = Math.max(0, Math.min(pages - 1, Number(filters.page) || 0))
		return {
			days,
			sessions,
			page,
			pages,
			total: matched.length,
			visible: matched.slice(page * 10, page * 10 + 10),
		}
	}
	function interfaceError(value) {
		const text = String(value),
			api = timeI18n
		if (!api || api.getLanguage() === 'es') return text
		let m
		if ((m = /^Fila (\d+): (.+)$/.exec(text))) {
			const descriptions = {
				'se esperan MHz y dBm.': 'expected MHz and dBm.',
				'valores inválidos.': 'invalid values.',
				'número de columnas incorrecto.': 'incorrect column count.',
				'texto demasiado largo.': 'text too long.',
				'falta el nombre del canal.': 'channel name missing.',
			}
			if (descriptions[m[2]]) return 'Row ' + m[1] + ': ' + descriptions[m[2]]
		}
		if ((m = /^Frecuencia fuera de rango: (.+)\.$/.exec(text)))
			return 'Frequency out of range: ' + m[1] + '.'
		if ((m = /^(.+): usa un valor entre (.+) y (.+)\.$/.exec(text)))
			return (
				api.sourceText(m[1]) +
				': use a value between ' +
				m[2] +
				' and ' +
				m[3] +
				'.'
			)
		return api.formatError(text)
	}

 const workspaceKeys={"Background preset": "timer.workspace.540cf33e6185", "Text preset": "timer.workspace.f4a51efc2762", "Custom background": "timer.workspace.f1833876c94a", "Black": "timer.workspace.c6cfe6e4f129", "Green chroma": "timer.workspace.e9ee4b485a0e", "Blue chroma": "timer.workspace.cdd195f8e603", "Transparent alpha (web capture only)": "timer.workspace.d02b03bdb518", "Custom text": "timer.workspace.2b816a05ccc3", "White text": "timer.workspace.c63a8a051f79", "Green text": "timer.workspace.8c6dc20347b4", "Alpha applies to the web output for browser capture. Desktop windows remain opaque.": "timer.workspace.b9e11c18e62a", "Save": "timer.workspace.1509f561f241", "Cancel": "timer.workspace.19766ed6ccb2", "Import spreadsheet": "timer.workspace.390d53d00539", "Paste two columns or open a CSV/TSV file without headers: slot name and duration (mm:ss or hh:mm:ss).": "timer.workspace.be9d5bff6ad7", "Day": "timer.workspace.8f2364e11b8b", "Session": "timer.workspace.6959b4159575", " · REQUIRED": "timer.workspace.4f0a2821aa97", "Sheet / table": "timer.workspace.c6c419e0f219", "First data row": "timer.workspace.9e8e32cbd5c1", "Speaker slot": "timer.workspace.82301d4b8379", "Duration": "timer.workspace.4fc52a3c4c55", "Start": "timer.workspace.e4bb9f1ece9a", "End": "timer.workspace.f4db1e48476f", "Cell format": "timer.workspace.9beea97fc43b", "Minutes": "timer.workspace.4f846a84e7fc", "Seconds": "timer.workspace.381a8e969905", "Day fraction": "timer.workspace.e47e590d79be", "Numeric durations": "timer.workspace.28109f93720f", "Unassigned": "timer.workspace.14d33bd014e6", "Check the first data row.": "timer.workspace.b1f6aec6cd01", "Check row ": "timer.workspace.f35335a43c11", "Enter slots (200 total maximum).": "timer.workspace.83c94810bdb5", "Open workbook or table": "timer.workspace.3a70610e856a", "Maximum workbook size: 16 MB.": "timer.workspace.bb4dcea13d0d", "Maximum file size: 1 MB": "timer.workspace.6de12f3dcbef", "Add to agenda": "timer.workspace.93d1b0c9fcfd", "Enter day and session.": "timer.workspace.275a4471c000", "Added to agenda: ": "timer.workspace.12b0b4ebe405", "Enter the day and session.": "timer.workspace.c8ec4efc90e0", "Enter the day.": "timer.workspace.0c397c670ecd", "Enter the session.": "timer.workspace.eb92c0caa8e9", "Detail rows without a slot name or time: ": "timer.workspace.a84ae3852962", "Day name": "timer.workspace.df7e1289fea6", "Session name": "timer.workspace.136a71a25be7", "Edit day": "timer.workspace.4d2e2ff5dede", "Edit session": "timer.workspace.71a0b8486e24", "Edit": "timer.workspace.464c4ffd019e", "Message text to save": "timer.workspace.9f9ab34c9f6e", "New": "timer.workspace.18fdd549b2ed", "New speaker slot": "timer.workspace.87389fe96751", "Times": "timer.workspace.0c0fd31c67d4", "Messages": "timer.workspace.04d7b4833927", "SHOW / HIDE speaker output": "timer.workspace.e0988f2a4b2f"};
 timeI18n?.register('es',{"timer.workspace.540cf33e6185": "Preajuste de fondo", "timer.workspace.f4a51efc2762": "Preajuste de texto", "timer.workspace.f1833876c94a": "Fondo personalizado", "timer.workspace.c6cfe6e4f129": "Negro", "timer.workspace.e9ee4b485a0e": "Croma verde", "timer.workspace.cdd195f8e603": "Croma azul", "timer.workspace.d02b03bdb518": "Alfa transparente (sólo captura web)", "timer.workspace.2b816a05ccc3": "Texto personalizado", "timer.workspace.c63a8a051f79": "Texto blanco", "timer.workspace.8c6dc20347b4": "Texto verde", "timer.workspace.b9e11c18e62a": "El alfa se aplica a la salida web para captura en navegador. Las ventanas de escritorio permanecen opacas.", "timer.workspace.1509f561f241": "Guardar", "timer.workspace.19766ed6ccb2": "Cancelar", "timer.workspace.390d53d00539": "Importar tabla", "timer.workspace.be9d5bff6ad7": "Pega dos columnas o abre un CSV/TSV sin encabezados: intervención y duración (mm:ss o hh:mm:ss).", "timer.workspace.8f2364e11b8b": "Día", "timer.workspace.6959b4159575": "Sesión", "timer.workspace.4f0a2821aa97": " · OBLIGATORIO", "timer.workspace.c6c419e0f219": "Hoja / tabla", "timer.workspace.9e8e32cbd5c1": "Primera fila de datos", "timer.workspace.82301d4b8379": "Intervención", "timer.workspace.4fc52a3c4c55": "Duración", "timer.workspace.e4bb9f1ece9a": "Inicio", "timer.workspace.f4db1e48476f": "Fin", "timer.workspace.9beea97fc43b": "Formato de celda", "timer.workspace.4f846a84e7fc": "Minutos", "timer.workspace.381a8e969905": "Segundos", "timer.workspace.e47e590d79be": "Fracción de día", "timer.workspace.28109f93720f": "Duraciones numéricas", "timer.workspace.14d33bd014e6": "Sin asignar", "timer.workspace.b1f6aec6cd01": "Revisa la primera fila.", "timer.workspace.f35335a43c11": "Revisa la fila ", "timer.workspace.83c94810bdb5": "Introduce intervenciones (máximo 200 en total).", "timer.workspace.3a70610e856a": "Abrir Excel, Numbers, CSV o TSV", "timer.workspace.bb4dcea13d0d": "El máximo para libros es 16 MB.", "timer.workspace.6de12f3dcbef": "Tamaño máximo del archivo: 1 MB", "timer.workspace.93d1b0c9fcfd": "Añadir a la escaleta", "timer.workspace.275a4471c000": "Indica día y sesión.", "timer.workspace.12b0b4ebe405": "Añadidas a la escaleta: ", "timer.workspace.c8ec4efc90e0": "Faltan el día y la sesión.", "timer.workspace.0c397c670ecd": "Falta el día.", "timer.workspace.eb92c0caa8e9": "Falta la sesión.", "timer.workspace.a84ae3852962": "Filas de detalle sin intervención ni tiempos: ", "timer.workspace.df7e1289fea6": "Nombre del día", "timer.workspace.136a71a25be7": "Nombre de la sesión", "timer.workspace.4d2e2ff5dede": "Editar día", "timer.workspace.71a0b8486e24": "Editar sesión", "timer.workspace.464c4ffd019e": "Editar", "timer.workspace.9f9ab34c9f6e": "Texto del mensaje para guardar", "timer.workspace.18fdd549b2ed": "Nuevo", "timer.workspace.87389fe96751": "Nueva intervención", "timer.workspace.0c0fd31c67d4": "Tiempos", "timer.workspace.04d7b4833927": "Mensajes", "timer.workspace.e0988f2a4b2f": "MOSTRAR / OCULTAR salida del ponente", "timer.preset.detail": "{type} · {duration}", "timer.preset.remove": "Borrar {name}", "timer.message.remove": "Borrar aviso {name}"});
 timeI18n?.register('en',{"timer.workspace.540cf33e6185": "Background preset", "timer.workspace.f4a51efc2762": "Text preset", "timer.workspace.f1833876c94a": "Custom background", "timer.workspace.c6cfe6e4f129": "Black", "timer.workspace.e9ee4b485a0e": "Green chroma", "timer.workspace.cdd195f8e603": "Blue chroma", "timer.workspace.d02b03bdb518": "Transparent alpha (web capture only)", "timer.workspace.2b816a05ccc3": "Custom text", "timer.workspace.c63a8a051f79": "White text", "timer.workspace.8c6dc20347b4": "Green text", "timer.workspace.b9e11c18e62a": "Alpha applies to the web output for browser capture. Desktop windows remain opaque.", "timer.workspace.1509f561f241": "Save", "timer.workspace.19766ed6ccb2": "Cancel", "timer.workspace.390d53d00539": "Import spreadsheet", "timer.workspace.be9d5bff6ad7": "Paste two columns or open a CSV/TSV file without headers: slot name and duration (mm:ss or hh:mm:ss).", "timer.workspace.8f2364e11b8b": "Day", "timer.workspace.6959b4159575": "Session", "timer.workspace.4f0a2821aa97": " · REQUIRED", "timer.workspace.c6c419e0f219": "Sheet / table", "timer.workspace.9e8e32cbd5c1": "First data row", "timer.workspace.82301d4b8379": "Speaker slot", "timer.workspace.4fc52a3c4c55": "Duration", "timer.workspace.e4bb9f1ece9a": "Start", "timer.workspace.f4db1e48476f": "End", "timer.workspace.9beea97fc43b": "Cell format", "timer.workspace.4f846a84e7fc": "Minutes", "timer.workspace.381a8e969905": "Seconds", "timer.workspace.e47e590d79be": "Day fraction", "timer.workspace.28109f93720f": "Numeric durations", "timer.workspace.14d33bd014e6": "Unassigned", "timer.workspace.b1f6aec6cd01": "Check the first data row.", "timer.workspace.f35335a43c11": "Check row ", "timer.workspace.83c94810bdb5": "Enter slots (200 total maximum).", "timer.workspace.3a70610e856a": "Open workbook or table", "timer.workspace.bb4dcea13d0d": "Maximum workbook size: 16 MB.", "timer.workspace.6de12f3dcbef": "Maximum file size: 1 MB", "timer.workspace.93d1b0c9fcfd": "Add to agenda", "timer.workspace.275a4471c000": "Enter day and session.", "timer.workspace.12b0b4ebe405": "Added to agenda: ", "timer.workspace.c8ec4efc90e0": "Enter the day and session.", "timer.workspace.0c397c670ecd": "Enter the day.", "timer.workspace.eb92c0caa8e9": "Enter the session.", "timer.workspace.a84ae3852962": "Detail rows without a slot name or time: ", "timer.workspace.df7e1289fea6": "Day name", "timer.workspace.136a71a25be7": "Session name", "timer.workspace.4d2e2ff5dede": "Edit day", "timer.workspace.71a0b8486e24": "Edit session", "timer.workspace.464c4ffd019e": "Edit", "timer.workspace.9f9ab34c9f6e": "Message text to save", "timer.workspace.18fdd549b2ed": "New", "timer.workspace.87389fe96751": "New speaker slot", "timer.workspace.0c0fd31c67d4": "Times", "timer.workspace.04d7b4833927": "Messages", "timer.workspace.e0988f2a4b2f": "SHOW / HIDE speaker output", "timer.preset.detail": "{type} · {duration}", "timer.preset.remove": "Delete {name}", "timer.message.remove": "Delete message {name}"});
	function mount(host, options = {}) {
		const normalizePresets = (raw) =>
			Array.isArray(raw)
				? raw.slice(0, 200).flatMap((p, i) => {
						try {
							return [
								{
									id: String(p.id || 'preset-' + i),
									day: String(p.day || 'Sin día').slice(0, 60),
									session: String(p.session || 'Sin sesión').slice(0, 80),
									type: ['Ponencia', 'Mesa redonda', 'Sesión', 'Otro'].includes(
										p.type,
									)
										? p.type
										: 'Ponencia',
									name: String(p.name || 'Intervención').slice(0, 80),
									state: C.restore(p.state),
								},
							]
						} catch {
							return []
						}
					})
				: []
		let state = read(),
			savedPresets = []
		try {
			savedPresets = normalizePresets(
				JSON.parse(localStorage.getItem(KEY + '-presets') || '[]'),
			)
		} catch {}
		const normalizeMessages = (raw) =>
			Array.isArray(raw)
				? raw.slice(0, 30).flatMap((entry, i) => {
						const name = String(entry?.name || '')
								.trim()
								.slice(0, 60),
							text = String(entry?.text || '')
								.trim()
								.slice(0, 160)
						return name && text
							? [{ id: String(entry.id || 'message-' + i), name, text }]
							: []
					})
				: []
		let savedMessages = []
		try {
			savedMessages = normalizeMessages(
				JSON.parse(localStorage.getItem(KEY + '-messages') || '[]'),
			)
		} catch {}
		let disposed = false,
			handle,
			wake = null
		const output = !!options.output
 document.documentElement.classList.toggle('st-speaker-output',output)
		if (output) {
			const updateTitle = () => {
				document.title =
					(timeI18n?.getLanguage() !== 'es'
						? 'Speaker view'
						: 'Vista del ponente') + ' · EventsPRO'
			}
			updateTitle()
			timeI18n?.onChange(updateTitle)
		}
		const app = el('section', 'st-app' + (output ? ' st-output' : ''))
		host.replaceChildren(app)
		const button = (text, action, cls = '') => {
			const b = el('button', cls, text)
			b.type = 'button'
			b.onclick = action
			return b
		}
		const note = el('p', 'st-note')
		note.setAttribute('role', 'status')
		const setNote = (value) => {
			if (!value?.eventsproMessage) {
				const key =
					Object.keys(timeES).find(
						(k) => timeES[k] === String(value) || timeEN[k] === String(value),
					) ||
					Object.keys(boundaryES).find(
						(k) =>
							boundaryES[k] === String(value) ||
							boundaryEN[k] === String(value),
					)
				if (key) value = M(key)
			}
			paintTime(note, value)
		}
		function save() {
			try {
				localStorage.setItem(KEY, JSON.stringify(state))
				setNote('')
			} catch {
				setNote(M('timer.text.91'))
			}
			render()
		}
		async function lock() {
			try {
				if (
					!wake &&
					navigator.wakeLock &&
					document.visibilityState === 'visible'
				) {
					wake = await navigator.wakeLock.request('screen')
					wake.addEventListener('release', () => (wake = null))
				}
			} catch {}
		}
		async function fullscreen() {
			try {
				if (document.fullscreenElement) await document.exitFullscreen()
				else {
					await stage.requestFullscreen()
					await lock()
				}
			} catch {
				setNote(M('timer.text.92'))
			}
		}
		const header = el('header', 'st-header'),
			heading = el('div')
		heading.append(el('h1', '', 'Timer PRO'), el('p', '', M('timer.text.0')))
		if (!output)
			header.append(
				button(M('timer.text.1'), () => {
					dispose()
					options.home()
				}),
			)
		header.append(heading)
		if (!output) app.append(header)
		app.classList.add('st-workspace-v2')
        const layout = el('div', 'st-layout')
		app.append(layout)
		const agenda = el('aside', 'st-agenda')
		const agendaHead = el('div', 'st-agenda-head')
		agendaHead.append(
			el('h2', '', M('timer.text.2')),
			el('p', 'st-note', M('timer.text.3')),
		)
		agenda.append(agendaHead)
		const agendaAdd = el('details', 'st-agenda-add'),
			agendaForm = el('div', 'st-agenda-form')
		agendaAdd.append(el('summary', '', M('timer.text.4')), agendaForm)
		agendaAdd.open = true
		function agendaInput(label, placeholder, max = 80) {
			const field = el('label', 'st-field', label),
				input = el('input')
			input.type = 'text'
			input.maxLength = max
			paintTime(input, placeholder, 'placeholder')
			field.append(input)
			agendaForm.append(field)
			return input
		}
		const dayInput = agendaInput(M('timer.text.5'), M('timer.text.6'), 60),
			sessionInput = agendaInput(M('timer.session.label'), M('timer.text.7'))
		const typeLabel = el('label', 'st-field', M('timer.text.8')),
			typeInput = el('select')
		for (const type of ['Ponencia', 'Mesa redonda', 'Sesión', 'Otro']) {
			const option = el(
				'option',
				'',
				M(
					{
						Ponencia: 'timer.type.lecture',
						'Mesa redonda': 'timer.type.panel',
						Sesión: 'timer.type.session',
						Otro: 'timer.type.other',
					}[type],
				),
			)
			option.value = type
			typeInput.append(option)
		}
		typeLabel.append(typeInput)
		agendaForm.append(typeLabel)
		const presetName = agendaInput(M('timer.text.9'), M('timer.text.10'))
        const agendaDuration=el('div','st-duration'),agendaMinutes=el('input'),agendaSeconds=el('input')
        for(const [input,label,max]of [[agendaMinutes,M('timer.text.18'),1440],[agendaSeconds,M('timer.text.19'),59]]){input.type='number';input.min='0';input.max=String(max);input.step='1';const field=el('label','st-field',label);field.append(input);agendaDuration.append(field)}
        agendaMinutes.value=Math.floor(state.duration/60000);agendaSeconds.value=(state.duration/1000)%60;agendaForm.append(agendaDuration)
		const presetList = el('div', 'st-agenda-list')
		agenda.append(presetList)
		const presetFilters = { day: '', session: '', query: '', page: 0 },
			filterBar = el('div', 'st-agenda-filter-bar')
		agenda.insertBefore(filterBar, presetList)
		filterBar.style.cssText =
			'display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:12px'
		function presetSelect(label) {
			const field = el('label', 'st-field'),
				caption = el('span', '', label),
				select = el('select')
			select.style.cssText = 'min-height:44px;width:100%;min-width:0'
			field.append(caption, select)
			filterBar.append(field)
			return select
		}
		const filterDay = presetSelect(M('timer.text.5')),
			filterSession = presetSelect(M('timer.session.label')),
			filterSearchLabel = el('label', 'st-field'),
			filterSearch = el('input')
		filterSearch.type = 'search'
		filterSearchLabel.style.gridColumn = '1 / -1'
		filterSearch.style.minHeight = '44px'
		filterSearchLabel.append(
			el('span', '', M('timer.filter.search')),
			filterSearch,
		)
		filterBar.append(filterSearchLabel)
		paintTime(filterSearch, M('timer.filter.search'), 'aria-label')
		const pageBar = el('div', 'st-agenda-pagination'),
			pageStatus = el('span'),
			previousPage = button(M('timer.filter.previous'), () => {
				presetFilters.page--
				renderPresets()
			}),
			nextPage = button(M('timer.filter.next'), () => {
				presetFilters.page++
				renderPresets()
			})
		pageBar.style.cssText =
			'display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:12px'
		previousPage.style.minHeight = nextPage.style.minHeight = '44px'
		pageStatus.setAttribute('role', 'status')
		pageBar.append(previousPage, pageStatus, nextPage)
		agenda.append(pageBar)
		filterDay.onchange = () => {
			presetFilters.day = filterDay.value
			presetFilters.session = ''
			presetFilters.page = 0
			renderPresets()
		}
		filterSession.onchange = () => {
			presetFilters.session = filterSession.value
			presetFilters.page = 0
			renderPresets()
		}
		filterSearch.oninput = () => {
			presetFilters.query = filterSearch.value
			presetFilters.page = 0
			renderPresets()
		}

		const controls = el('section', 'st-controls')
		if (!output) layout.append(controls, agenda)
		controls.append(el('h2', 'st-zone-title', M('timer.text.11')))
		const nameLabel = el('label', 'st-field', M('timer.text.12')),
			name = el('input')
		name.type = 'text'
		name.maxLength = 100
		name.value = state.title
		nameLabel.append(name)
		controls.append(nameLabel)
		const modeLabel = el('div', 'st-field'),
			mode = el('div', 'st-modes'),
			modeButtons = []
		mode.setAttribute('role', 'group')
		paintTime(mode, M('timer.text.13'), 'aria-label')
		modeLabel.append(el('span', '', M('timer.text.13')), mode)
		for (const [v, t] of [
			['down', M('timer.text.14')],
			['up', M('timer.text.15')],
			['clock', M('timer.text.16')],
		]) {
			const b = button(t, () => {
				state = C.reset({ ...state, mode: v })
				save()
			})
			b.dataset.mode = v
			modeButtons.push(b)
			mode.append(b)
		}
		modeLabel.classList.add('st-mode-bar')
		if (!output) app.insertBefore(modeLabel, layout)
		name.oninput = () => {
			state.title = name.value
			save()
		}
		const durationTitle = el('h2', '', M('timer.text.17'))
		controls.append(durationTitle)
		const presets = el('div', 'st-presets'),
			presetButtons = []
		for (const minutes of [5, 10, 15, 20, 30, 60]) {
			const b = button('', () => {
				state = C.configure(state, minutes * 60)
				sync()
				save()
			})
			b.setAttribute('aria-label', minutes + ' min')
			b.append(el('span', 'st-preset-value', String(minutes)), el('span', 'st-preset-unit', 'min'))
			presetButtons.push(b)
			presets.append(b)
		}
		controls.append(presets)
		const duration = el('div', 'st-duration')
		function input(label, value, max) {
			const l = el('label', 'st-field', label),
				i = el('input')
			i.type = 'number'
			i.min = 0
			i.max = max
			i.step = 1
			i.value = value
			l.append(i)
			duration.append(l)
			return i
		}
		const minutes = input(
				M('timer.text.18'),
				Math.floor(state.duration / 60000),
				1440,
			),
			seconds = input(M('timer.text.19'), (state.duration / 1000) % 60, 59)
		controls.append(duration)
		const prepare = button(M('timer.text.20'), () => {
			const m = Number(minutes.value),
				s = Number(seconds.value)
			try {
				if (
					minutes.value === '' ||
					seconds.value === '' ||
					!Number.isInteger(m) ||
					m < 0 ||
					!Number.isInteger(s) ||
					s < 0 ||
					s > 59
				)
					throw Error(M('timer.text.21'))
				state = C.configure(state, m * 60 + s)
				save()
			} catch (e) {
				setNote(interfaceError(e.message))
			}
		})
		controls.append(prepare)
		function threshold(label, key, cls) {
			const l = el('label', 'st-field ' + cls),
				i = el('input')
			l.append(
				el('span', 'st-threshold-swatch'),
				el('span', 'st-threshold-unit', M('timer.text.22')),
			)
			paintTime(i, label, 'aria-label')
			i.type = 'number'
			i.min = 0
			i.max = 1440
			i.step = 0.5
			i.value = state[key] / 60000
			l.append(i)
			i.onchange = () => {
				const v = Number(i.value)
				if (i.value === '' || !Number.isFinite(v) || v < 0 || v > 1440) {
					setNote(M('timer.text.23'))
					return
				}
				state[key] = v * 60000
				save()
			}
			controls.append(l)
			return [l, i]
		}
		const [warningLabel, warning] = threshold(
			M('timer.text.24'),
			'warning',
			'st-yellow-label',
		)
		const [criticalLabel, critical] = threshold(
			M('timer.text.25'),
			'critical',
			'st-red-label',
		)
		const endLabel = el('label', 'st-field', M('timer.text.26')),
			end = el('select')
		for (const [v, t] of [
			['stop', M('timer.text.27')],
			['continue', M('timer.text.28')],
		]) {
			const o = el('option', '', t)
			o.value = v
			end.append(o)
		}
		end.value = state.end
		endLabel.append(end)
		controls.append(endLabel)
		end.onchange = () => {
			state.end = end.value
			save()
		}
		const colourNote = el('p', 'st-note', M('timer.text.29'))
		controls.append(colourNote)
		const appearance = el('div', 'st-appearance'),
			colorInputs = []
		for (const [key, label] of [
			['digitColor', M('timer.text.30')],
			['backgroundColor', M('timer.text.31')],
		]) {
			const l = el('label', 'st-field', label),
				i = el('input')
			i.type = 'color'
			i.value = state[key]
			i.oninput = () => {
				state[key] = i.value
				save()
			}
			l.append(i)
			appearance.append(l)
			colorInputs.push([key, i])
		}
		controls.append(appearance)
		const chroma = el('div', 'st-chroma-presets')
        const backgroundPreset=el('select'), textPreset=el('select');
        paintTime(backgroundPreset,workspaceText('Background preset','Preajuste de fondo'),'aria-label');paintTime(textPreset,workspaceText('Text preset','Preajuste de texto'),'aria-label');
        const backgrounds=[[workspaceText('Custom background','Fondo personalizado'),''],[workspaceText('Black','Negro'),'#000000'],[workspaceText('Green chroma','Croma verde'),'#00ff00'],[workspaceText('Blue chroma','Croma azul'),'#0000ff']];
        if(!root.EventsPROTimerDesktop)backgrounds.push([workspaceText('Transparent alpha (web capture only)','Alfa transparente (sólo captura web)'),'transparent']);
        for(const [label,value]of backgrounds){const option=el('option','',label);option.value=value;backgroundPreset.append(option)}
        for(const [label,value]of [[workspaceText('Custom text','Texto personalizado'),''],[workspaceText('White text','Texto blanco'),'#ffffff'],[workspaceText('Green text','Texto verde'),'#00ff00']]){const option=el('option','',label);option.value=value;textPreset.append(option)}
        backgroundPreset.onchange=()=>{if(!backgroundPreset.value)return;state.backgroundAlpha=backgroundPreset.value==='transparent'?0:1;if(state.backgroundAlpha)state.backgroundColor=backgroundPreset.value;state.alertColors=false;sync();save()};
        textPreset.onchange=()=>{if(!textPreset.value)return;state.digitColor=textPreset.value;state.alertColors=false;sync();save()};
        chroma.append(backgroundPreset,textPreset,el('small','st-note',workspaceText('Alpha applies to the web output for browser capture. Desktop windows remain opaque.','El alfa se aplica a la salida web para captura en navegador. Las ventanas de escritorio permanecen opacas.')));
		const alertLabel = el('label', 'st-alert-colors'),
			alertColors = el('input')
		alertColors.type = 'checkbox'
		alertColors.checked = state.alertColors
		alertColors.onchange = () => {
			state.alertColors = alertColors.checked
			save()
		}
		alertLabel.append(alertColors, el('span', '', M('timer.text.32')))
		controls.append(alertLabel)
		const colourPresets = el('div', 'st-colour-presets')
		const defaultColour = button(
			M('timer.text.33'),
			() => {
				state.digitColor = '#5ce5a5'
				state.backgroundColor = '#000000'
				state.alertColors = true
				sync()
				save()
			},
			'st-colour-preset st-colour-green',
		)
		paintTime(defaultColour, M('timer.text.34'), 'title')
		paintTime(defaultColour, M('timer.text.34'), 'aria-label')
		const lumaButton = button(
			'Luma',
			() => {
				state.digitColor = '#ffffff'
				state.backgroundColor = '#000000'
				state.alertColors = false
				sync()
				save()
			},
			'st-colour-preset st-colour-luma',
		)
		paintTime(lumaButton, M('timer.text.35'), 'title')
		paintTime(lumaButton, M('timer.text.35'), 'aria-label')
		colourPresets.append(defaultColour, lumaButton)
		controls.append(colourPresets)
		const formatBox = el('div', 'st-format')
		const formatInputs = []
		for (const [key, label] of [
			['showHours', M('timer.text.36')],
			['showHundredths', M('timer.text.37')],
			['showClock', M('timer.text.38')],
		]) {
			const l = el('label'),
				i = el('input')
			i.type = 'checkbox'
			i.checked = !!state[key]
			i.onchange = () => {
				state[key] = i.checked
				save()
			}
			l.append(i, el('span', '', label))
			formatInputs.push([key, i])
			formatBox.append(l)
		}
		controls.append(formatBox)
		let editingPresetId = null
		function workspaceText(en, es) { return timeI18n ? timeI18n.message(workspaceKeys[en],undefined,en) : en }
        function editIcon(b,label){b.textContent='';b.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m4 16-1 5 5-1L20 8l-4-4L4 16Zm10-10 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';b.title=label;b.setAttribute('aria-label',label);return b}
		const savePreset = button(workspaceText('Save', 'Guardar'), () => {
			const n = presetName.value.trim(),
				day = dayInput.value.trim(),
				session = sessionInput.value.trim()
			if (!n || !day || !session) {
				setNote(M('timer.text.40'))
				return
			}
			if (!editingPresetId && savedPresets.length >= 200) {
				setNote(M('timer.text.41'))
				return
			}
			let presetState
			try {
				const m = Number(agendaMinutes.value),
					s = Number(agendaSeconds.value)
				if (
					agendaMinutes.value === '' ||
					agendaSeconds.value === '' ||
					!Number.isInteger(m) ||
					m < 0 ||
					!Number.isInteger(s) ||
					s < 0 ||
					s > 59
				)
					throw Error(M('timer.text.21'))
				presetState = C.configure(
					{ ...(savedPresets.find(p=>p.id===editingPresetId)?.state || state), mode: savedPresets.find(p=>p.id===editingPresetId)?.state.mode || (state.mode === 'clock' ? 'down' : state.mode) },
					m * 60 + s,
				)
			} catch (e) {
				setNote(interfaceError(e.message))
				return
			}
			const updatedPreset = {
				id:
					editingPresetId || 'preset-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
				day,
				session,
				type: typeInput.value,
				name: n,
				state: { ...presetState, title: n, message: '' },
			}
			if(editingPresetId) savedPresets=savedPresets.map(p=>p.id===editingPresetId?updatedPreset:p)
			else savedPresets.push(updatedPreset)
			editingPresetId=null; agendaAdd.open=false
			persistPresets()
			renderPresets()
			presetName.value = ''
		})
		const cancelPreset = button(workspaceText('Cancel','Cancelar'),()=>{editingPresetId=null;agendaAdd.open=false;presetName.value='';sync()})
		agendaForm.append(savePreset,cancelPreset)
		function compactSection(label, nodes) {
			const box = el('details', 'st-settings-section'),
				body = el('div', 'st-settings-body')
			box.append(el('summary', '', label), body)
			body.append(...nodes)
			controls.append(box)
			box.addEventListener('toggle', () => {
				if (box.open)
					for (const other of controls.querySelectorAll('.st-settings-section'))
						if (other !== box) other.open = false
			})
			return box
		}
		const timingSection = compactSection(M('timer.text.42'), [
			duration,
			prepare,
		])
		const alertsSection = compactSection(M('timer.text.43'), [
			warningLabel,
			criticalLabel,
			endLabel,
			colourNote,
		])
		const appearanceSection = compactSection(M('timer.text.44'), [
			appearance,
            chroma,
			alertLabel,
			colourPresets,
			formatBox,
		])
		agenda.insertBefore(agendaAdd, agendaHead.nextSibling)
		function persistPresets() {
			try {
				localStorage.setItem(KEY + '-presets', JSON.stringify(savedPresets))
				setNote(M('timer.text.45'))
			} catch {
				setNote(M('timer.text.46'))
			}
		}
        function groupRename(day,session){
            const box=el('div','st-group-rename'),form=el('div','st-group-rename-form'),input=el('input')
            input.type='text';input.maxLength=session===null?60:80;input.value=session===null?day:session
            paintTime(input,session===null?workspaceText('Day name','Nombre del día'):workspaceText('Session name','Nombre de la sesión'),'aria-label')
            const open=button(session===null?workspaceText('Edit day','Editar día'):workspaceText('Edit session','Editar sesión'),()=>{input.value=session===null?day:session;form.hidden=false;input.focus()},'st-saved-edit')
            const commit=button(workspaceText('Save','Guardar'),()=>{const value=input.value.trim();if(!value){input.focus();return}savedPresets=renamePresetGroup(savedPresets,day,session,value);if(presetFilters.day===day&&session===null)presetFilters.day=value;if(presetFilters.day===day&&presetFilters.session===session)presetFilters.session=value;persistPresets();renderPresets()})
            const cancel=button(workspaceText('Cancel','Cancelar'),()=>{form.hidden=true})
            editIcon(open,session===null?workspaceText('Edit day','Editar día'):workspaceText('Edit session','Editar sesión'));form.append(input,commit,cancel);form.hidden=true;box.append(open,form);return box
        }
		function renderPresets() {
			const page = presetPage(savedPresets, presetFilters)
			presetFilters.page = page.page
			filterDay.replaceChildren()
			filterSession.replaceChildren()
			for (const [select, values, all, selected] of [
				[filterDay, page.days, 'timer.filter.allDays', presetFilters.day],
				[
					filterSession,
					page.sessions,
					'timer.filter.allSessions',
					presetFilters.session,
				],
			]) {
				const first = el('option', '', M(all))
				first.value = ''
				select.append(first)
				for (const value of values) {
					const option = el('option', '', value)
					option.value = value
					select.append(option)
				}
				select.value = selected
			}
			paintTime(
				pageStatus,
				M('timer.filter.page', {
					page: page.page + 1,
					pages: page.pages,
					count: page.total,
				}),
			)
			previousPage.disabled = page.page === 0
			nextPage.disabled = page.page >= page.pages - 1
			presetList.replaceChildren()
			if (!savedPresets.length) {
				presetList.append(el('p', 'st-note', M('timer.text.47')))
				return
			}
			if (!page.visible.length) {
				presetList.append(el('p', 'st-note', M('timer.filter.none')))
				return
			}
			const days = new Map()
			for (const p of page.visible) {
				if (!days.has(p.day)) days.set(p.day, new Map())
				const sessions = days.get(p.day)
				if (!sessions.has(p.session)) sessions.set(p.session, [])
				sessions.get(p.session).push(p)
			}
			for (const [day, sessions] of days) {
				const dayGroup = el('section', 'st-agenda-day')
				dayGroup.append(el('h3', '', day),groupRename(day,null))
				for (const [session, entries] of sessions) {
					const group = el('div', 'st-agenda-session')
					group.append(el('h4', '', session),groupRename(day,session))
					for (const p of entries) {
						const row = el('div', 'st-agenda-entry'),
							load = button(p.name, () => {
								if (state.running) {
									setNote(M('timer.text.48'))
									return
								}
								state = C.reset({
									...p.state,
									message: '',
									outputVisible: state.outputVisible,
								})
								sync()
								save()
								renderPresets()
							})
						load.className = 'st-agenda-load'
						load.dataset.id = p.id
						load.setAttribute(
							'aria-pressed',
							String(
								state.title === p.name && state.duration === p.state.duration,
							),
						)
                        const typeLabel=M({Ponencia:'timer.type.lecture','Mesa redonda':'timer.type.panel','Sesión':'timer.type.session',Otro:'timer.type.other'}[p.type])
                        const detail=el('span','',M('timer.preset.detail',()=>({type:String(typeLabel),duration:formatPresetDuration(p.state.duration)})))
						load.append(detail)
						const remove = button(
							'×',
							() => {
								savedPresets = savedPresets.filter((item) => item.id !== p.id)
								persistPresets()
								renderPresets()
							},
							'st-agenda-delete',
						)
						paintTime(remove,M('timer.preset.remove',()=>({name:p.name})),'aria-label')
						const edit=button(workspaceText('Edit','Editar'),()=>{editingPresetId=p.id;dayInput.value=p.day;sessionInput.value=p.session;typeInput.value=p.type;presetName.value=p.name;agendaMinutes.value=Math.floor(p.state.duration/60000);agendaSeconds.value=(p.state.duration/1000)%60;agendaAdd.open=true;presetName.focus()},'st-saved-edit')
						editIcon(edit,workspaceText('Edit','Editar'));row.append(load,edit,remove)
						group.append(row)
					}
					dayGroup.append(group)
				}
				presetList.append(dayGroup)
			}
		}
		renderPresets()
		const messageLabel = el('label', 'st-field', M('timer.text.57')),
			messageInput = el('textarea')
		messageInput.rows = 3
		messageInput.maxLength = 160
		paintTime(messageInput, M('timer.text.58'), 'placeholder')
		messageLabel.append(messageInput)
		const messagePanel = el('section', 'st-message-panel')
		messagePanel.append(messageLabel)
		const messageActions = el('div', 'st-view-buttons')
		messageActions.append(
			button(M('timer.text.59'), () => {
				state.message = messageInput.value.trim()
				save()
			}),
			button(M('timer.text.60'), () => {
				state.message = ''
				messageInput.value = ''
				save()
			}),
		)
		messagePanel.append(messageActions)
		const messagePresets = el('aside', 'st-message-presets'),
			messagePresetTitle = el('h2', '', M('timer.text.50')),
			messagePresetHelp = el('p', 'st-note', M('timer.text.51')),
			messagePresetList = el('div', 'st-message-preset-list')
		const messagePresetName = el('input')
		messagePresetName.type = 'text'
		messagePresetName.maxLength = 60
		paintTime(messagePresetName, M('timer.text.61'), 'placeholder')
		paintTime(messagePresetName, M('timer.text.61'), 'aria-label')
		const messagePresetNameLabel = el('label', 'st-field', M('timer.text.61')); messagePresetNameLabel.append(messagePresetName)
		const messagePresetTextLabel = el('label', 'st-field', workspaceText('Message text to save','Texto del mensaje para guardar')), messagePresetText = el('textarea')
		messagePresetText.rows = 3; messagePresetText.maxLength = 160; paintTime(messagePresetText, M('timer.text.58'), 'placeholder'); messagePresetTextLabel.append(messagePresetText)
		let editingMessageId=null
		const messageEditor=el('div','st-saved-editor')
		const saveMessagePreset = button(workspaceText('Save','Guardar'), () => {
			const text = messagePresetText.value.trim(),
				name = messagePresetName.value.trim() || text.slice(0, 40)
			if (!text) {
				setNote(M('timer.text.63'))
				return
			}
			if (!editingMessageId && savedMessages.length >= 30) {
				setNote(M('timer.text.64'))
				return
			}
			const updatedMessage = {
				id:
					editingMessageId || 'message-' +
					Date.now() +
					'-' +
					Math.random().toString(36).slice(2, 7),
				name,
				text,
			}
			if(editingMessageId)savedMessages=savedMessages.map(m=>m.id===editingMessageId?updatedMessage:m)
			else savedMessages.push(updatedMessage)
			editingMessageId=null;messageEditor.hidden=true
			persistMessages()
			renderMessages()
			messagePresetName.value = ''
			messagePresetText.value = ''
		})
		function persistMessages() {
			try {
				localStorage.setItem(KEY + '-messages', JSON.stringify(savedMessages))
				setNote(M('timer.text.53'))
			} catch {
				setNote(M('timer.text.52'))
			}
		}
		function renderMessages() {
			messagePresetList.replaceChildren()
			if (!savedMessages.length) {
				messagePresetList.append(el('p', 'st-note', M('timer.text.56')))
				return
			}
			for (const entry of savedMessages) {
				const row = el('div', 'st-message-preset-entry'),
					load = button(
						entry.name,
						() => {
							messageInput.value = entry.text
							messagePresetName.value = entry.name; messagePresetText.value = entry.text
							setNote(M('timer.text.54'))
						},
						'st-message-preset-load',
					),
					remove = button(
						'×',
						() => {
							savedMessages = savedMessages.filter(
								(item) => item.id !== entry.id,
							)
							persistMessages()
							renderMessages()
						},
						'st-message-preset-delete',
					)
				load.title = entry.text
				paintTime(remove,M('timer.message.remove',()=>({name:entry.name})),'aria-label')
				const edit=button(workspaceText('Edit','Editar'),()=>{editingMessageId=entry.id;messagePresetName.value=entry.name;messagePresetText.value=entry.text;messageEditor.hidden=false;messagePresetName.focus()},'st-saved-edit')
				editIcon(edit,workspaceText('Edit','Editar'));row.append(load,edit,remove)
				messagePresetList.append(row)
			}
		}
		renderMessages()
		const newMessage=button(workspaceText('New','Nuevo'),()=>{editingMessageId=null;messagePresetName.value='';messagePresetText.value='';messageEditor.hidden=false;messagePresetName.focus()},'st-primary')
        const cancelMessage=button(workspaceText('Cancel','Cancelar'),()=>{editingMessageId=null;messageEditor.hidden=true})
        messageEditor.append(messagePresetNameLabel,messagePresetTextLabel,saveMessagePreset,cancelMessage);messageEditor.hidden=true
        messagePresets.append(messagePresetTitle,messagePresetHelp,newMessage,messageEditor,messagePresetList)
        paintTime(agendaAdd.querySelector('summary'),workspaceText('New speaker slot','Nueva intervención'));agendaAdd.open=false
        const savedPanel=el('section','st-saved-workspace'),savedTabs=el('div','st-saved-tabs');savedTabs.setAttribute('role','tablist')
        const timeTab=button(workspaceText('Times','Tiempos'),()=>selectSaved(false)),messageTab=button(workspaceText('Messages','Mensajes'),()=>selectSaved(true))
        for(const tab of [timeTab,messageTab])tab.setAttribute('role','tab')
        savedTabs.append(timeTab,messageTab);savedPanel.append(savedTabs)
        if(!output){layout.append(savedPanel);savedPanel.append(agenda,messagePresets)}
        function selectSaved(messages){agenda.hidden=messages;messagePresets.hidden=!messages;timeTab.setAttribute('aria-selected',String(!messages));messageTab.setAttribute('aria-selected',String(messages));savedPanel.dataset.tab=messages?'messages':'times'}
        selectSaved(false)
		const visibilityControl = el('label', 'st-output-visibility')
		const visibilitySwitch = el('input')
		visibilitySwitch.type = 'checkbox'
		visibilitySwitch.setAttribute('role', 'switch')
		paintTime(visibilitySwitch,workspaceText('SHOW / HIDE speaker output','MOSTRAR / OCULTAR salida del ponente'),'aria-label')
		visibilitySwitch.onchange = () => {
			state.outputVisible = visibilitySwitch.checked
			save()
		}
		const visibilityText = el('span')
		visibilityControl.append(visibilitySwitch, visibilityText)
		// Visibility belongs with the transport controls.
		const viewer = el('section', 'st-viewer')
		const stage = el('div', 'st-stage')
		paintTime(stage, M('timer.text.65'), 'aria-label')
		const title = el('div', 'st-title'),
			digits = el('div', 'st-digits'),
			status = el('div', 'st-status'),
			bar = el('div', 'st-progress'),
			fill = el('div')
		bar.append(fill)
		const smallClock = el('div', 'st-small-clock')
		paintTime(smallClock, M('timer.text.66'), 'aria-label')
		const message = el('div', 'st-message')
		message.setAttribute('role', 'status')
		const lapDisplay = el('aside', 'st-lap-display')
		paintTime(lapDisplay, M('timer.text.67'), 'aria-label')
		stage.append(title, digits, status, smallClock, message, bar)
        if(output)stage.append(lapDisplay)
		viewer.append(stage)
		// Saved panes stay together in their tabbed workspace.
		layout.append(viewer)
		const transport = el('div', 'st-transport'),
			toggle = button(
				M('timer.text.68'),
				() => {
					state = state.running ? C.pause(state) : C.start(state)
					if (state.running) lock()
					else if (wake) {
						wake.release()
						wake = null
					}
					save()
				},
				'st-primary',
			),
			lapButton = button(M('timer.text.69'), () => {
				state = C.recordLap(state)
				save()
			}),
			reset = button(M('timer.text.70'), () => {
				state = C.reset(state)
				if (state.mode === 'up') {
					state = C.clearLaps(state)
					selectedLapIndex = null
				}
				save()
			}),
			clearLapsButton = button(M('timer.text.71'), () => {
				if (selectedLapIndex === null) return
				state = C.removeLap(state, selectedLapIndex)
				selectedLapIndex = null
				save()
			}),
			minus = button('−1 min', () => {
				state = C.adjust(state, -60000)
				save()
			}),
			plus = button('+1 min', () => {
				state = C.adjust(state, 60000)
				save()
			})
		transport.append(toggle, lapButton, reset, clearLapsButton, minus, plus)
		const runControls=el('div','st-run-controls');runControls.append(transport)
        if (!output) viewer.append(runControls)
		const viewButtons = el('div', 'st-view-buttons st-view-icon-group')
		const iconButton = (label, svg, action) => {
			const b = button('', action, 'st-view-icon')
			paintTime(b, label, 'aria-label')
			paintTime(b, label, 'title')
			b.innerHTML = svg
			return b
		}
		viewButtons.append(
			iconButton(
				M('timer.text.72'),
				'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5"/></svg>',
				fullscreen,
			),
		)
		if (!output)
			viewButtons.append(
				iconButton(
					M('timer.text.73'),
					'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="14" height="11" rx="1"/><path d="M8 20h13V9M17 9h4v4"/></svg>',
					() => {
						const win = window.open(
							'index.html?nativeSpeaker=1',
							'eventspro-speaker-output',
							'popup,width=1100,height=650',
						)
						if (!win) setNote(M('timer.text.74'))
					},
				),
			)
		if (!output) {const viewerToolbar=el('div','st-viewer-toolbar');viewerToolbar.append(modeLabel,visibilityControl,viewButtons);viewer.prepend(viewerToolbar)}
		else viewer.append(viewButtons)
		if (!output) viewer.append(messagePanel,lapDisplay)
		viewer.append(note)
		if (output) {
			const exit = button(M('timer.text.75'), fullscreen, 'st-exit')
			stage.append(exit)
		}
		function sync() {
			if (document.activeElement !== name) name.value = state.title
			minutes.value = Math.floor(state.duration / 60000)
			seconds.value = (state.duration / 1000) % 60
			warning.value = state.warning / 60000
			critical.value = state.critical / 60000
			end.value = state.end
			for (const [key, i] of colorInputs) i.value = state[key]
			alertColors.checked = state.alertColors
		}
        const fitCanvas=document.createElement('canvas'),fitContext=fitCanvas.getContext('2d')
        function fitDigits(){
            if(!stage.clientWidth||!stage.clientHeight||!fitContext)return
            const style=getComputedStyle(stage),paddingX=parseFloat(style.paddingLeft)+parseFloat(style.paddingRight),paddingY=parseFloat(style.paddingTop)+parseFloat(style.paddingBottom)
            const hasLaps=stage.contains(lapDisplay)&&!lapDisplay.hidden,lapWidth=hasLaps&&getComputedStyle(lapDisplay).position==='absolute'?lapDisplay.offsetWidth+18:0
            let availableWidth=Math.max(20,stage.clientWidth-paddingX-lapWidth-12),availableHeight=stage.clientHeight-paddingY-12
            for(const n of [title,status,message,smallClock])if(!n.hidden && getComputedStyle(n).position!=='absolute' && getComputedStyle(n).display!=='none')availableHeight-=n.offsetHeight+8
            if(hasLaps&&getComputedStyle(lapDisplay).position!=='absolute')availableHeight-=lapDisplay.offsetHeight+10
            fitContext.font='700 100px ui-monospace, SFMono-Regular, Consolas, monospace'
            const measured=fitContext.measureText(digits.textContent||'00:00').width
            const size=fitFontSize(availableWidth,availableHeight,measured)
            digits.style.setProperty('font-size',size+'px','important');digits.style.setProperty('line-height','1.12','important');digits.style.margin='4px 0'
        }
        const fitObserver=typeof ResizeObserver==='function'?new ResizeObserver(()=>fitDigits()):null
        if(fitObserver)fitObserver.observe(stage)
		let selectedLapIndex = null,
			lapSignature = ''
		function renderLaps() {
			const laps = state.laps || [],
				signature = laps.map((l) => l.atMs).join(',') + '|' + selectedLapIndex
			if (signature === lapSignature) return
			lapSignature = signature
			lapDisplay.replaceChildren(el('h3', '', M('timer.text.76')))
			const headings = el('div', 'st-lap-head')
			headings.append(
				el('span', '', ''),
				el('span', '', M('timer.text.77')),
				el('span', '', M('timer.text.78')),
			)
			lapDisplay.append(headings)
			if (!laps.length) {
				lapDisplay.append(el('p', 'st-note', M('timer.text.79')))
				return
			}
			const list = el('div', 'st-lap-list')
			laps.forEach((lap, i) => {
				const row = button(
					'',
					() => {
						selectedLapIndex = selectedLapIndex === i ? null : i
						renderLaps()
						clearLapsButton.disabled = selectedLapIndex === null
					},
					'st-lap-row',
				)
				row.setAttribute('aria-label', M('timer.text.80') + (i + 1))
				row.setAttribute('aria-pressed', String(selectedLapIndex === i))
				row.append(
					el('strong', '', 'm' + (i + 1)),
					el('span', '', C.formatLap(lap.splitMs)),
					el('span', '', C.formatLap(lap.atMs)),
				)
				list.append(row)
			})
			lapDisplay.append(list)
		}
		function render() {
			/* timer-preset-inference:start */
const inferredBackground=state.backgroundAlpha===0?'transparent':String(state.backgroundColor).toLowerCase();
if(document.activeElement!==backgroundPreset)backgroundPreset.value=backgrounds.some(entry=>entry[1]===inferredBackground)?inferredBackground:'';
const inferredText=String(state.digitColor).toLowerCase();
if(document.activeElement!==textPreset)textPreset.value=['#ffffff','#00ff00'].includes(inferredText)?inferredText:'';
/* timer-preset-inference:end */
visibilitySwitch.checked = state.outputVisible !== false
			visibilityText.textContent =
				state.outputVisible === false
                    ? String(M('timer.output.hidden'))
                    : String(M('timer.output.visible'))
			stage.classList.toggle(
				'st-output-hidden',
				output && state.outputVisible === false,
			)
			const settled = C.settle(state)
			if (settled !== state) {
				state = settled
				if (!output)
					try {
						localStorage.setItem(KEY, JSON.stringify(state))
					} catch {}
			}
			for (const [key, i] of formatInputs) i.checked = !!state[key]
			const now = Date.now(),
				d = C.display(state, now)
			smallClock.hidden = !state.showClock || state.mode === 'clock'
			smallClock.textContent =
				M('timer.text.81') +
				C.display(
					{ ...state, mode: 'clock', showHours: true, showHundredths: false },
					now,
				).text
			smallClock.style.color = '#ffffff'
			const clockMode = state.mode === 'clock',
				stopwatchMode = state.mode === 'up'
			app.classList.toggle('st-clock-mode', clockMode)
			app.classList.toggle('st-stopwatch-mode', stopwatchMode)
			controls.hidden = false
			title.hidden = clockMode
			title.textContent = clockMode ? '' : state.title || M('timer.text.82')
			digits.textContent = d.text
			fitDigits()
			stage.dataset.phase = d.phase
			stage.style.backgroundColor = state.backgroundAlpha===0 ? 'transparent' : state.backgroundColor
 document.documentElement.classList.toggle('st-alpha-output',output && state.backgroundAlpha===0)
			stage.style.color = !state.alertColors ? state.digitColor : clockMode
				? '#ffffff'
				: state.alertColors
					? d.phase === 'warning'
						? '#ffe000'
						: ['critical', 'over'].includes(d.phase)
							? '#ff5b64'
							: state.digitColor
					: state.digitColor
			digits.style.setProperty('color',stage.style.color,'important')
 stage.classList.toggle(
				'st-zero-blink',
				d.phase === 'over' && state.end === 'stop',
			)
			message.textContent = state.message
			message.hidden = !state.message
			lapDisplay.hidden = !stopwatchMode || (output && !(state.laps || []).length)
			renderLaps()
			bar.hidden = clockMode || stopwatchMode
			transport.hidden = clockMode
            runControls.setAttribute('aria-hidden',String(clockMode))
			agenda.hidden = savedPanel.dataset.tab === 'messages'
			lapButton.hidden = !stopwatchMode
			lapButton.disabled =
				!stopwatchMode || !state.running || (state.laps || []).length >= 100
			clearLapsButton.hidden = !stopwatchMode
			clearLapsButton.disabled =
				!stopwatchMode ||
				selectedLapIndex === null ||
				selectedLapIndex >= (state.laps || []).length
			minus.hidden = plus.hidden = stopwatchMode
			messagePanel.hidden = false
			for (const i of [reset, minus, plus]) i.disabled = clockMode
			for (const b of modeButtons) {
				b.disabled = state.running
				b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode))
			}
			status.textContent =
				state.mode === 'clock'
					? M('timer.text.83')
					: d.phase === 'over'
						? M('timer.text.84')
						: state.running
							? M('timer.text.85')
							: C.remaining(state) === state.duration
								? M('timer.text.86')
								: M('timer.text.87')
			fill.style.transform = 'scaleX(' + d.progress + ')'
            fitDigits()
			toggle.disabled =
				clockMode ||
				(state.mode === 'down' &&
					state.end === 'stop' &&
					C.remaining(state) <= 0)
			toggle.textContent = state.running
				? M('timer.text.88')
				: M('timer.text.89')
			if (!state.running && state.remaining === state.duration)
				toggle.textContent = M('timer.text.68')
			if (toggle.disabled)
				toggle.textContent = clockMode ? M('timer.text.68') : M('timer.text.90')
			for (const b of [...presetButtons, minutes, seconds, prepare])
				b.disabled = state.running
			for (const b of presetList.querySelectorAll('.st-agenda-load'))
				b.disabled = state.running
		}
		function received(e) {
			if (
				e.key === 'eventspro.interface.language.v1' &&
				['es', 'en'].includes(e.newValue)
			) {
				timeI18n?.setLanguage(e.newValue)
				return
			}
			if (e.key !== KEY || !e.newValue) return
			try {
				state = C.restore(JSON.parse(e.newValue))
				sync()
				render()
				if (state.running) lock()
			} catch {}
		}
		function visibility() {
			render()
			if (state.running) lock()
		}
		function dispose() {
			if (disposed) return
			disposed = true
			clearInterval(handle)
            fitObserver?.disconnect()
			observer.disconnect()
			window.removeEventListener('storage', received)
			document.removeEventListener('visibilitychange', visibility)
			if (wake) wake.release()
		}
		window.addEventListener('storage', received)
		document.addEventListener('visibilitychange', visibility)
		const observer = new MutationObserver(() => {
			if (!app.isConnected) dispose()
		})
		observer.observe(host, { childList: true })
		handle = setInterval(render, 16)
		render()
		if (!output)
			window.EventsPROProjects?.mount(header, {
				id: 'timer',
				get: () => ({ ...state, agenda: savedPresets }),
				defaults: freshDefaults,
				validate: (v) => ({
					...C.restore(v),
					agenda: normalizePresets(v.agenda),
				}),
				decode: (v) => ({
					...C.restore(v),
					agenda: normalizePresets(v.agenda),
				}),
				set: (v) => {
					state = C.pause(C.restore(v))
					if (Array.isArray(v.agenda)) {
						savedPresets = normalizePresets(v.agenda)
						persistPresets()
						renderPresets()
					}
					save()
					sync()
				},
			})
		if(!output)timeI18n?.selector(header,{local:true});
		return {dispose}
	}
	root.EventsPROSpeakerTimerUI = { mount,renamePresetGroup,fitFontSize,formatPresetDuration }
})(window)
