const fs = require('node:fs'),
	vm = require('node:vm'),
	{ createRequire } = require('node:module')
module.exports = (base) => {
	let Module
	const filename = require.resolve('../../src/main.js')
	const localRequire = createRequire(filename)
	const sdk = {
		Regex: { IP: '^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$' },
		InstanceStatus: {},
		...base,
		runEntrypoint: (M) => (Module = M),
	}
	vm.runInNewContext(
		fs.readFileSync(filename, 'utf8'),
		{
			require: (id) => (id === '@companion-module/base' ? sdk : localRequire(id)),
			setInterval,
			clearInterval,
			Buffer,
			console,
		},
		{ filename },
	)
	return Module
}
