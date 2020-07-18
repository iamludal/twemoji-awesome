const fetch = require('node-fetch')
const slugify = require('slugify')
const BASE_SVG_URL = 'https://twemoji.maxcdn.com/v/latest/svg/{CODE}.svg'
const EMOJI_JSON_URL = 'https://unpkg.com/emoji.json/emoji.json'
const fs = require('fs')
const updateLine = require('../lib/updateLine')

const opts = { lower: true, strict: true }

/**
 * Filter emojis to only have valid twemojis
 * @param {Array.<{codes: String, name: String}>} emojis emojis to filter
 * @return {Array} filtered emojis
 */
async function filterEmojis(emojis) {
    const filtered = [], errors = []
    const promises = []
    const length = emojis.length
    let success = 0, fail = 0

    console.log(`😃 ${length} emojis to filter`)

    console.log('⏳ Processing...')

    emojis.forEach(emoji => {

        const verify = validateTwemoji(emoji)
            .then(isValid => {
                isValid ? success++ : fail++

                const prog = Math.floor((fail + success) * 100 / length)
                const array = isValid ? filtered : errors

                array.push(emoji)
                updateLine(`✅ Success: ${success} | ⏳ Progress: ${prog}%`)
            })
            .catch(() => { })

        promises.push(verify)
    })

    await Promise.all(promises)

    console.log('\n⏳ Verifying...')

    const filteredNames = filtered.map(emoji => emoji.name)
    const n = filtered.length
    let err = 0

    errors.forEach(error => {
        if (!filteredNames.includes(error.name))
            err++
    })

    console.log(`Finished: ✅ ${n} filtered emojis | ❌ ${err} twemojis missing`)

    return filtered
}

/**
 * Verify that the emoji has a corresponding twemoji
 * @param {Object} emoji the emoji to validate
 * @param {String} emoji.codes the emoji codes
 * @return {Boolean} true if the emoij is valid
 */
const validateTwemoji = async (emoji) => {

    const url = BASE_SVG_URL.replace('{CODE}', slugify(emoji.codes, opts))

    return fetch(url)
        .then(res => !res.status.toString().match(/^[45]/))
        .catch(() => Promise.reject())
}

/**
 * Main script
 */
const main = async () => {

    console.log('🔍 Fetching emojis...')

    const emojis = await fetch(EMOJI_JSON_URL)
        .then(res => res.json())

    const filtered = await filterEmojis(emojis)
    const amount = filtered.length

    console.log('📝 Writing to emojis.json')

    fs.writeFileSync('emojis.json', JSON.stringify(filtered))

    console.log(`✅ Successfully fetched ${amount} emojis!`)
}

main()
