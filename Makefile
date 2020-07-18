.PHONY: emoji css cheatsheet

all: emoji css cheatsheet

emoji:
	node src/fetch-emojis.js

css: emoji.json
	node src/build-css.js

cheatsheet:
	node src/cheatsheet
