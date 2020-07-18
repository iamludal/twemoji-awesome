module.exports = function (text) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(text)
}