const fetch = require('node-fetch')
const slugify = require('slugify')
const fs = require('fs')

const EMOJI_JSON_URL = 'https://unpkg.com/emoji.json/emoji.json'
const twemojis = fs.readdirSync('assets/svg')
const opts = { lower: true, strict: true }

/**
 * Filter emojis to only have valid twemojis
 * @param {Array.<{codes: String, name: String}>} emojis emojis to filter
 * @return {Array} filtered emojis
 */
function filterEmojis(emojis) {
    const filtered = []
    const length = emojis.length

    console.log(`😃 ${length} emojis to filter`)

    console.log('⏳ Processing...')

    emojis.forEach((emoji) => {
        if (validateTwemoji(emoji))
            filtered.push(emoji)
    })

    const amount = filtered.length

    console.log(`⌛ Finished: ✅ ${amount} emojis filtered`)

    return filtered
}

/**
 * Verify that the emoji has a corresponding twemoji
 * @param {Object} emoji the emoji to validate
 * @param {String} emoji.codes the emoji codes
 * @return {Boolean} true if the emoij is valid
 */
const validateTwemoji = (emoji) => {
    const file = slugify(emoji.codes, opts).replace(/^[0]+/, '') + '.svg'
    return twemojis.includes(file)
}

/**
 * Main script
 */
const main = async () => {

    console.log('🔍 Fetching emojis...')

    fetch(EMOJI_JSON_URL)
        .then(res => res.json())
        .then(emojis => filterEmojis(emojis))
        .then(filtered => {
            console.log('📝 Writing to emoji.json')

            fs.writeFile('emoji.json', JSON.stringify(filtered), (err) => {
                const txt = err
                    ? `❌ ${err.message}`
                    : '✅ Successfully created emoji.json'

                console.log(txt)
            })
        })
        .catch(err => console.log(`❌ ${err.message}`))
}

main()