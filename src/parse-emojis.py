from bs4 import BeautifulSoup
from slugify import slugify


def parse_emojis():

    with open('build/page.html', 'r') as f:
        CONTENT = f.read()

    bs = BeautifulSoup(CONTENT, features='html.parser')

    codes = map(lambda elt: slugify(elt['name']), bs.select('.code a'))
    names = map(lambda elt: slugify(elt.text), bs.select('.code ~ .name'))

    for code, name in zip(codes, names):
        print('%s;%s' % (code, name))


if __name__ == "__main__":
    parse_emojis()
