const emojis = require('../emoji.json')
const fs = require('fs')
const slugify = require('slugify')
const basis = fs.readFileSync('./cheatsheet-basis.md', 'utf8')
const OUTPUT = 'cheatsheet.md'
const BASE_SVG_URL = 'https://twemoji.maxcdn.com/v/latest/svg/{CODE}.svg'
const { emojiSortingFunction } = require('../lib/utils')

const opts = { lower: true, strict: true }
let previousGroup, previousEmojiName
let cheatsheetContent = ''
let newLine = true

console.log('⏳ Building cheatsheet')

emojis.sort(emojiSortingFunction)

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
        const url = BASE_SVG_URL.replace('{CODE}', slugify(emoji.codes, opts))
        cheatsheetContent += `| <img src="${url}"> | ${name} `
        previousEmojiName = name
        newLine = !newLine

        if (newLine)
            cheatsheetContent += '\n'
    }

})

cheatsheetContent = basis.replace('{CONTENT}', cheatsheetContent)
fs.writeFileSync(OUTPUT, cheatsheetContent)

console.log(`✅ ${OUTPUT} created successfully`)