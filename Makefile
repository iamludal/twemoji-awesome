.PHONY: page parse css twa

all: page parse css

page:
	python3 src/get-page.py > build/page.html

parse: build/page.html
	python3 src/parse-emojis.py > build/list.txt

css: build/list.txt
	python3 src/build-css.py > build/twemojis.css

twa: css

build/list.txt:
	$(MAKE) parse

build/page.html:
	$(MAKE) page