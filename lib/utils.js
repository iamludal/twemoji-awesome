/**
 * Update line to the console (e.g. loading bar)
 * @param {String} text 
 */
const updateLine = (text) => {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(text)
}

/**
 * Compare emojis for sorting
 * @param {Object} emoji1 
 * @param {String} emoji1.name
 * @param {String} emoji1.codes
 * @param {String} emoji1.group
 * @param {String} emoji1.category
 * @param {String} emoji1.subgroup
 * @param {String} emoji1.char
 * @param {Object} emoji2 
 * @param {String} emoji2.name
 * @param {String} emoji2.codes
 * @param {String} emoji2.group
 * @param {String} emoji2.category
 * @param {String} emoji2.subgroup
 * @param {String} emoji2.char
 */
const emojiSortingFunction = (emoji1, emoji2) => {
    const key = emoji1.category != emoji2.category ? 'category' : 'name'

    return emoji1[key].localeCompare(emoji2[key])
}

module.exports = {
    updateLine,
    emojiSortingFunction
}