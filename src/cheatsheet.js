const emojis = require('../emojis.json')
const fs = require('fs')
const slugify = require('slugify')

const opts = { lower: true, strict: true }
let cheatsheet = '# Emoji cheatsheet 😄\n'
let previousGroup = ''

const groups = new Set(emojis.map(emoji => emoji.group))

cheatsheet += '# Table of contents\n'

groups.forEach(group => cheatsheet += `- [${group}](#${slugify(group)})\n`)

emojis.forEach((emoji, index) => {
    const name = slugify(emoji.name, opts)
    const group = slugify(emoji.group, ' ')

    if (group != previousGroup) {
        cheatsheet += `\n## ${group}\n`
        cheatsheet += 'emoji | shortcode | emoji | shortcode\n'
        cheatsheet += '--- | --- | --- | ---\n'
        previousGroup = group
    }

    cheatsheet += `| ${emoji.char} | ${name} `

    if (index % 2)
        cheatsheet += '\n'
})

cheatsheet += '\nCheatsheet generated automatically'

fs.writeFileSync('cheatsheet.md', cheatsheet)