from dotenv import load_dotenv
import os


def build_css():
    load_dotenv()

    BASE_SVG_URL = os.environ.get('BASE_SVG_URL')

    with open('assets/twemoji-basis.css', 'r') as f:
        BASE_CSS = f.read()

    with open('assets/background.css', 'r') as f:
        BG = f.read()

    with open('build/list.txt', 'r') as f:
        TWEMOJIS = f.readlines()

    CSS = BASE_CSS

    for twemoji in TWEMOJIS:
        code, name = twemoji.strip().split(';')

        CSS += BG.replace('%NAME%', name).replace('%URL%', BASE_SVG_URL + code)

    print(CSS)


if __name__ == "__main__":
    build_css()
