const fs = require('fs')
const slugify = require('slugify')
const emojis = require('../emojis.json')

const BASE_URL = 'https://twitter.github.io/twemoji/v/latest/svg/'
const BG_CSS = '.twa-%NAME% { background-image: url(%URL%.svg); }\n'
const OUTPUT = 'twemoji-awesome.css'
const opts = { lower: true, strict: true }

function main() {
    let css = fs.readFileSync('twemoji-basis.css', 'utf8')
    let previous

    console.log('⏳ Processing emojis...')

    emojis.forEach(emoji => {
        const codes = slugify(emoji.codes, opts)
        const name = slugify(emoji.name, opts)

        if (emoji.name != previous) {
            css += BG_CSS.replace('%NAME%', name).replace('%URL%', BASE_URL + codes)
            previous = emoji.name
        }
    })

    console.log('📁 Writing to file: ' + OUTPUT)

    fs.writeFileSync(OUTPUT, css, { encoding: 'utf8' })

    console.log('✅ Successfully generated ' + OUTPUT)
}

main()