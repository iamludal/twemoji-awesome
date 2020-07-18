.PHONY: emoji css cheatsheet

all: emoji css cheatsheet

emoji:
	node src/fetch-emojis.js

css: emoji.json
	node src/index.js

cheatsheet:
	node src/cheatsheet
