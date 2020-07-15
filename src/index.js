const fs = require('fs')
const slugify = require('slugify')
const emojis = require('../emojis.json')

const BG_CSS = '.twa-%NAME% { background-image: url(%URL%.svg); }\n'
const BASE_URL = 'https://twitter.github.io/twemoji/v/latest/svg/'
const opts = { lower: true, strict: true }

function main() {
    let css = fs.readFileSync('templates/twemoji-basis.css', 'utf-8')

    emojis.forEach(emoji => {
        const codes = slugify(emoji.codes, opts)
        const name = slugify(emoji.name, opts)
        css += BG_CSS.replace('%NAME%', name).replace('%URL%', BASE_URL + codes)
    })

    console.log(css)
}

main()