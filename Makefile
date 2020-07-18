.PHONY: fetch css cheatsheet

all: fetch css cheatsheet

fetch:
	node src/fetch-emojis.js

css: emojis.json
	node src/index.js

cheatsheet:
	node src/cheatsheet
