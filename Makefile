.PHONY: twa

all: twa

twa:
	node src/index.js > build/twemoji-awesome.css
