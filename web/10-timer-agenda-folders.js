;(function (root) {
	'use strict'
	const states = new WeakMap()
	const direct = (node, selector) =>
		Array.from(node.children).filter((child) => child.matches(selector))
	function enhance(agenda, doc, language = 'en') {
		let state = states.get(agenda)
		if (!state) {
			state = { open: new Map(), defaultOpen: true }
			states.set(agenda, state)
		}
		const en = language === 'en',
			label = (es, eng) => (en ? eng : es)
		let tools = direct(agenda, '.st-agenda-fold-tools')[0]
		if (!tools) {
			tools = doc.createElement('div')
			tools.className = 'st-agenda-fold-tools'
			const toggle = doc.createElement('button')
			toggle.type = 'button'
			toggle.dataset.foldAction = 'toggle'
			tools.append(toggle)
			const heading = direct(agenda, '.st-agenda-head')[0]
			if (heading) heading.after(tools)
			else agenda.prepend(tools)
			toggle.addEventListener('click', () => {
				state.defaultOpen = Array.from(agenda.querySelectorAll('.st-agenda-fold-toggle')).some(b => b.getAttribute('aria-expanded') !== 'true')
				state.open.clear()
				enhance(agenda, doc, state.language)
			})
		}
		state.language = language
		function refreshTools() {
			const groups = Array.from(agenda.querySelectorAll('.st-agenda-fold-toggle'))
			tools.hidden = groups.length === 0
			const expandNext = groups.some(b => b.getAttribute('aria-expanded') !== 'true')
			const toggle = tools.querySelector('[data-fold-action="toggle"]')
			toggle.textContent = expandNext ? label('Expandir todo', 'Expand all') : label('Contraer todo', 'Collapse all')
			toggle.setAttribute('aria-expanded', String(!expandNext))
		}
		function fold(group, heading, key) {
			let button = heading.querySelector('.st-agenda-fold-toggle')
			if (!button) {
				const title = heading.textContent
				heading.textContent = ''
				button = doc.createElement('button')
				button.type = 'button'
				button.className = 'st-agenda-fold-toggle'
				button.textContent = title
				heading.append(button)
				button.addEventListener('click', () => {
					state.open.set(key, button.getAttribute('aria-expanded') !== 'true')
					paint()
					refreshTools()
				})
			}
			function paint() {
				const open = state.open.has(key)
					? state.open.get(key)
					: state.defaultOpen
				button.setAttribute('aria-expanded', String(open))
				button.title =
					(open
						? label('Contraer ', 'Collapse ')
						: label('Expandir ', 'Expand ')) + button.textContent
				group.classList.add('st-agenda-fold-group')
				for (const child of group.children)
					if (child !== heading && !child.classList.contains("st-group-rename")) child.hidden = !open
			}
			paint()
		}
		for (const day of agenda.querySelectorAll('.st-agenda-day')) {
			const h3 = direct(day, 'h3')[0]
			if (!h3) continue
			const dayName = h3.textContent
			fold(day, h3, JSON.stringify(['day', dayName]))
			for (const session of direct(day, '.st-agenda-session')) {
				const h4 = direct(session, 'h4')[0]
				if (h4)
					fold(
						session,
						h4,
						JSON.stringify(['session', dayName, h4.textContent]),
					)
			}
		}
		refreshTools()
		return state
	}
	const api = { enhance }
	if (typeof module === 'object' && module.exports) module.exports = api
	if (!root.document || root.EventsPROTimerAgendaFolders) return
	root.EventsPROTimerAgendaFolders = api
	const run = () => {
		const language = root.EventsPROI18n?.getLanguage() !== 'es' ? 'en' : 'es'
		for (const agenda of document.querySelectorAll(
			'.st-app:not(.st-output) .st-agenda',
		))
			enhance(agenda, document, language)
	}
	let queued = false
	const schedule = () => {
		if (queued) return
		queued = true
		queueMicrotask(() => {
			queued = false
			observer.disconnect()
			run()
			observer.observe(document.body, { childList: true, subtree: true })
		})
	}
	const observer = new MutationObserver(schedule)
	function ready() {
		run()
		observer.observe(document.body, { childList: true, subtree: true })
		root.EventsPROI18n?.onChange(schedule)
	}
	if (document.readyState === 'loading')
		document.addEventListener('DOMContentLoaded', ready, { once: true })
	else ready()
})(typeof globalThis !== 'undefined' ? globalThis : this)
