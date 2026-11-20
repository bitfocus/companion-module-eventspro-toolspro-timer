'use strict'
const fs = require('node:fs'),
	path = require('node:path')
const root = path.join(__dirname, '..'),
	web = path.join(root, 'web')
const files = fs
	.readdirSync(web)
	.filter((name) => fs.statSync(path.join(web, name)).isFile())
	.sort()
const assets = Object.fromEntries(files.map((name) => [name, fs.readFileSync(path.join(web, name), 'utf8')]))
const target = path.join(root, 'src', 'web-assets.json')
fs.writeFileSync(target, JSON.stringify(assets, null, '\t') + '\n')
for (const [source, dest] of [
	['01-speaker-timer.js', 'speaker-timer.js'],
	['05-timer-remote.js', 'remote.cjs'],
])
	fs.copyFileSync(path.join(web, source), path.join(root, 'src', dest))
console.log(`Bundled ${files.length} web assets`)
