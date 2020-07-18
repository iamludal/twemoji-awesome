const emojis = require('../emojis.json')
const fs = require('fs')
const slugify = require('slugify')
const basis = fs.readFileSync('./cheatsheet-basis.md', 'utf8')
const OUTPUT = 'cheatsheet.md'

const opts = { lower: true, strict: true }
let previousGroup, previousEmojiName
let cheatsheetContent = ''
let newLine = true

console.log('⏳ Building cheatsheet')

emojis.sort((emoji1, emoji2) => emoji1.group.localeCompare(emoji2.group))

const groups = new Set(emojis.map(emoji => emoji.group))

// Building TOC
cheatsheetContent += '# Table of contents\n'
groups.forEach(group => cheatsheetContent += `- [${group}](#${slugify(group)})\n`)

// Building content
emojis.forEach(emoji => {
    const name = slugify(emoji.name, opts)
    const group = slugify(emoji.group, ' ')

    if (group != previousGroup) {
        cheatsheetContent += `\n## ${group}\n`
        cheatsheetContent += 'emoji | shortcode | emoji | shortcode\n'
        cheatsheetContent += '--- | --- | --- | ---\n'
        previousGroup = group
        newLine = true
    }

    if (previousEmojiName != name) {
        cheatsheetContent += `| <i class="twa twa-${name}"></i> | ${name} `
        previousEmojiName = name
        newLine = !newLine

        if (newLine)
            cheatsheetContent += '\n'
    }

})

cheatsheetContent = basis.replace('{CONTENT}', cheatsheetContent)
fs.writeFileSync(OUTPUT, cheatsheetContent)

console.log(`✅ ${OUTPUT} created successfully`)