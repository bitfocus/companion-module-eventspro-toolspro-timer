;(() => {
	'use strict'
	const I=globalThis.EventsPROI18n;
 const es={'remote.title':'Control de Timer','remote.scan':'Escanea el QR de Timer con la cámara del móvil.','remote.start':'Iniciar','remote.pause':'Pausar','remote.reset':'Restablecer','remote.clear':'Borrar mensaje','remote.paired':'Conectado con Timer','remote.offline':'La ventana de Timer está desconectada','remote.disconnected':'Desconectado: {error}','remote.connecting':'Conectando'};
 const en={'remote.title':'Timer control','remote.scan':'Scan the Timer QR code using your phone camera.','remote.start':'Start','remote.pause':'Pause','remote.reset':'Reset','remote.clear':'Clear message','remote.paired':'Paired with Timer','remote.offline':'The Timer window is disconnected','remote.disconnected':'Disconnected: {error}','remote.connecting':'Connecting'};
 I.register('es',es);I.register('en',en);I.bind(document.getElementById('mobile-title'),'remote.title');I.selector(document.getElementById('mobile-header'),{local:true});
 const paintLabel=(node,key,params)=>I.render(node,I.message(key,params));
 const control = /^#timer-remote=([a-f0-9]{64})$/.exec(location.hash)?.[1]
	const status = document.getElementById('status')
	paintLabel(status,'remote.connecting')
	if (!control) {
		paintLabel(status,'remote.scan')
		return
	}
	const api = async (body) => {
		const r = await fetch('api', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...body, control }),
			cache: 'no-store',
		})
		const data = await r.json()
		if (!r.ok) throw Error(data.error)
		return data
	}
	for (const [label, action, value] of [
		['remote.start', 'start'],
		['remote.pause', 'pause'],
		['remote.reset', 'reset'],
		['remote.clear', 'message/clear'],
		['−1 min', 'adjust', -60],
		['+1 min', 'adjust', 60],
	]) {
		const b = document.createElement('button')
		if(label.startsWith('remote.'))paintLabel(b,label);else b.textContent=label
		b.onclick = async () => {
			try {
				await api({ op: 'command', command: { action, value } })
			} catch (e) {
				status.textContent = e.message
			}
		}
		document.getElementById('buttons').append(b)
	}
	async function poll() {
		try {
			const data = await api({ op: 'read' })
			paintLabel(status,data.online?'remote.paired':'remote.offline')
			document.getElementById('time').textContent = data.display.text
			document.getElementById('speaker').textContent = data.display.title
			document.getElementById('message').textContent = data.display.message
		} catch (e) {
			paintLabel(status,'remote.disconnected',{error:e.message})
		}
		setTimeout(poll, 500)
	}
	poll()
})()
