const fs = require('fs')
const slugify = require('slugify')
const emojis = require('../emoji.json')

const BASE_URL = 'https://twitter.github.io/twemoji/v/latest/svg/'
const BG_CSS = '.twa-{NAME} { background-image: url({URL}.svg); }\n'
const OUTPUT = 'twemoji-awesome.css'
const opts = { lower: true, strict: true }
const amount = emojis.length

let css = fs.readFileSync('./assets/twemoji-basis.css', 'utf8')

console.log(`⏳ Processing ${amount} emojis...`)

emojis.forEach(emoji => {
    const codes = slugify(emoji.codes, opts)
    const name = slugify(emoji.name, opts)

    css += BG_CSS.replace('{NAME}', name).replace('{URL}', BASE_URL + codes)
    previous = emoji.name
})

console.log('📁 Writing to file: ' + OUTPUT)

fs.writeFile(OUTPUT, css, { encoding: 'utf8' }, err => {
    console.log(err ? `❌ ${err.message}` : '✅ Successfully generated ' + OUTPUT)
})